// app/api/lead/telegram-webhook/route.ts
import { NextResponse } from "next/server";

// Словари для расшифровки параметров
const typesMap: Record<number, string> = {
  0: "Кухня",
  1: "Кухня + Мебель во всю квартиру",
  2: "Шкаф-купе / Гардеробная",
  3: "Шкаф-кровать трансформер",
};

const shapesMap: Record<number, Record<number, string>> = {
  0: { 0: "Прямая (линейная)", 1: "Угловая (Г-образная)", 2: "П-образная", 3: "С островом / барной стойкой" },
  1: { 0: "Студия / 1-комнатная", 1: "2-комнатная квартира", 2: "3-комнатная квартира", 3: "Частный дом / Коттедж" },
  2: { 0: "Корпусный (2–4 створки)", 1: "Встроенный от пола до потолка", 2: "Угловой вместительный шкаф", 3: "Отдельная гардеробная комната" },
  3: { 0: "Откидная кровать в шкафу", 1: "Трансформер с рабочим столом", 2: "Вертикальная с диваном", 3: "Двухъярусная трансформер" },
};

const materialsMap: Record<number, string> = {
  0: "Практичный стандарт (Egger + PUR)",
  1: "Комфорт (МДФ / AGT Supramat)",
  2: "Премиум (Шпон / Blum)",
  3: "Сравнить образцы на замере",
};

const installmentsMap: Record<number, string> = {
  0: "Рассрочка 0% (от 7 500 ₽/мес)",
  1: "Оплата наличными / картой (10% после сборки)",
};

export async function POST(req: Request) {
  try {
    const update = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const groupChatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken) {
      return NextResponse.json({ ok: true });
    }

    // ══════════════════════════════════════════════════════════════
    // 1. ОБРАБОТКА НАЖАТИЯ НА КНОПКУ «ВЫЗВАТЬ ТЕХНОЛОГА»
    // ══════════════════════════════════════════════════════════════
    if (update.callback_query) {
      const callback = update.callback_query;
      const clientChatId = callback.message.chat.id;
      const userFirstName = callback.from.first_name || "Клиент";
      const username = callback.from.username ? `@${callback.from.username}` : "Без юзернейма";

      if (callback.data === "book_zamer") {
        await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callback_query_id: callback.id }),
        });

        const confirmationText = 
          `🎉 <b>Заявка на бесплатный выезд зафиксирована!</b>\n\n` +
          `${userFirstName}, дежурный технолог фабрики «Удобна» свяжется с вами в Telegram в течение 10 минут для согласования адреса и удобного времени.\n\n` +
          `🧰 Мастер привезет чемодан из 200+ образцов и сделает точный 3D-проект на месте.`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: clientChatId,
            text: confirmationText,
            parse_mode: "HTML",
          }),
        });

        if (groupChatId) {
          const groupAlert = 
            `🚨 <b>ГОРЯЧАЯ ЗАЯВКА НА ВЫЕЗД ТЕХНОЛОГА!</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Клиент:</b> ${userFirstName} (${username})\n` +
            `🆔 <b>Chat ID:</b> <code>${clientChatId}</code>\n` +
            `🎯 <b>Действие:</b> Нажал кнопку «Вызвать технолога с образцами» в боте\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n` +
            `<i>Срочно напишите клиенту в ЛС: ${username}</i>`;

          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: groupChatId,
              text: groupAlert,
              parse_mode: "HTML",
            }),
          });
        }
      }

      return NextResponse.json({ ok: true });
    }

    // ══════════════════════════════════════════════════════════════
    // 2. ОБРАБОТКА КОМАНДЫ /start ПОСЛЕ КВИЗА (С ПОЛНОЙ РАСШИФРОВКОЙ)
    // ══════════════════════════════════════════════════════════════
    if (update.message) {
      const message = update.message;
      const chatId = message.chat.id;
      const text = message.text || "";
      const userFirstName = message.from?.first_name || "друг";
      const username = message.from?.username ? `@${message.from.username}` : "Без юзернейма";

      if (text.startsWith("/start")) {
        const payload = text.split(" ")[1] || "";
        
        let priceEstimate = "по выбранным параметрам";
        let typeText = "Не указано";
        let shapeText = "Не указано";
        let materialText = "Не указано";
        let installmentText = "Не указано";

        // 🎯 Расшифровка нового формата qz_T_S_M_I_MIN_MAX
        if (payload.startsWith("qz_")) {
          const parts = payload.split("_");
          // parts: ["qz", "0", "1", "1", "0", "175000", "215000"]
          const tIdx = parseInt(parts[1], 10);
          const sIdx = parseInt(parts[2], 10);
          const mIdx = parseInt(parts[3], 10);
          const iIdx = parseInt(parts[4], 10);
          const minP = parseInt(parts[5], 10);
          const maxP = parseInt(parts[6], 10);

          typeText = typesMap[tIdx] || "Кухня";
          shapeText = shapesMap[tIdx]?.[sIdx] || "Индивидуальная";
          materialText = materialsMap[mIdx] || "Комфорт";
          installmentText = installmentsMap[iIdx] || "Обычная оплата";

          if (!isNaN(minP) && !isNaN(maxP)) {
            priceEstimate = `${minP.toLocaleString("ru-RU")} — ${maxP.toLocaleString("ru-RU")} ₽`;
          }
        } else if (payload.startsWith("quiz_")) {
          // Обратная совместимость
          const rawPrice = payload.replace("quiz_", "");
          const num = parseInt(rawPrice, 10);
          if (!isNaN(num)) {
            priceEstimate = `~${num.toLocaleString("ru-RU")} ₽`;
          }
        }

        // 1. Приветствие клиенту
        const clientMessage = 
          `Здравствуйте, ${userFirstName}! 👋\n\n` +
          `Фабрика мебели <b>«Удобна»</b> (г. Ростов-на-Дону).\n\n` +
          `📊 <b>Ваш расчет зафиксирован:</b> ${priceEstimate}\n` +
          `Дежурный технолог цеха скоро свяжется с вами для обсуждения деталей.\n\n` +
          `🎁 <b>Ваш подарок:</b> полезное руководство по разводке электрики доступно по кнопке ниже.`;

        const keyboard = {
          inline_keyboard: [
            [
              { 
                text: "📄 Скачать PDF-гайд по розеткам", 
                url: "https://site-brown-one-80.vercel.app/guide-electro.pdf" 
              }
            ],
            [
              { 
                text: "📐 Вызвать технолога с чемоданом образцов", 
                callback_data: "book_zamer" 
              }
            ],
            [
              { 
                text: "💬 Написать технологу цеха", 
                url: process.env.NEXT_PUBLIC_TG_MANAGER || "https://t.me/Udobna_Chat"
              }
            ]
          ]
        };

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: clientMessage,
            parse_mode: "HTML",
            reply_markup: keyboard,
          }),
        });

        // 2. ПОДРОБНОЕ УВЕДОМЛЕНИЕ В РАБОЧУЮ ГРУППУ
        if (groupChatId) {
          let groupNotification = `⚡ <b>НОВЫЙ КЛИЕНТ В БОТЕ ПОСЛЕ КВИЗА!</b>\n`;
          groupNotification += `━━━━━━━━━━━━━━━━━━━━━\n`;
          groupNotification += `👤 <b>Клиент:</b> ${userFirstName} (${username})\n`;
          groupNotification += `🆔 <b>Chat ID:</b> <code>${chatId}</code>\n\n`;
          
          groupNotification += `📋 <b>ВЫБРАННЫЕ ПАРАМЕТРЫ:</b>\n`;
          groupNotification += `• <b>Изделие:</b> ${typeText}\n`;
          groupNotification += `• <b>Конфигурация:</b> ${shapeText}\n`;
          groupNotification += `• <b>Класс материалов:</b> ${materialText}\n`;
          groupNotification += `• <b>Оплата:</b> ${installmentText}\n\n`;

          groupNotification += `💰 <b>Ориентир сметы:</b> <b>${priceEstimate}</b>\n`;
          groupNotification += `━━━━━━━━━━━━━━━━━━━━━\n`;
          groupNotification += `<i>Клиенту автоматически отправлен расчет и гайд.</i>`;

          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: groupChatId,
              text: groupNotification,
              parse_mode: "HTML",
            }),
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook Failed" }, { status: 500 });
  }
}