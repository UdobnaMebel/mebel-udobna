// app/api/telegram-webhook/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const update = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const groupChatId = process.env.TELEGRAM_CHAT_ID;

    if (!update.message || !botToken) {
      return NextResponse.json({ ok: true });
    }

    const message = update.message;
    const chatId = message.chat.id; // Личный ID клиента
    const text = message.text || "";
    const userFirstName = message.from?.first_name || "друг";
    const username = message.from?.username ? `@${message.from.username}` : "Без юзернейма";

    // Обрабатываем команду /start
    if (text.startsWith("/start")) {
      // Извлекаем ориентир цены из deep-link (например, /start quiz_165000 -> 165 000 ₽)
      const payload = text.split(" ")[1] || "";
      let priceEstimate = "по выбранным параметрам";
      
      if (payload.startsWith("quiz_")) {
        const rawPrice = payload.replace("quiz_", "");
        const num = parseInt(rawPrice, 10);
        if (!isNaN(num)) {
          priceEstimate = `~${num.toLocaleString("ru-RU")} ₽`;
        }
      }

      // 1. Отправляем ответ клиенту
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
              url: "https://your-domain.ru/guide-electro.pdf" // Заменим на реальную ссылку или файл
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
              url: process.env.NEXT_PUBLIC_TG_MANAGER || "https://t.me/your_manager_username"
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

      // 2. Отправляем уведомление в рабочую группу
      if (groupChatId && groupChatId !== "your_chat_id_here") {
        const groupNotification = 
          `⚡ <b>НОВЫЙ КЛИЕНТ В БОТЕ!</b>\n` +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Клиент:</b> ${userFirstName} (${username})\n` +
          `🆔 <b>Chat ID:</b> <code>${chatId}</code>\n` +
          `💰 <b>Смета из квиза:</b> ${priceEstimate}\n` +
          `━━━━━━━━━━━━━━━━━━━━━\n` +
          `<i>Клиенту автоматически отправлен расчет и гайд.</i>`;

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook Failed" }, { status: 500 });
  }
}