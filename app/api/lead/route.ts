// app/api/lead/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { source, name, phone, address, preferredTime, details } = body;

    if (!phone) {
      return NextResponse.json({ error: "Телефон обязателен" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    let chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    // Авто-коррекция ID супергруппы если пропущен префикс -100
    if (chatId && !chatId.startsWith("-100") && chatId.startsWith("-")) {
      chatId = "-100" + chatId.substring(1);
    } else if (chatId && !chatId.startsWith("-") && chatId.length >= 9) {
      chatId = "-100" + chatId;
    }

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
    
    let message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА «УДОБНА»</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📌 <b>Источник:</b> ${source || "Форма сайта"}\n`;
    if (name) message += `👤 <b>Имя клиента:</b> ${name}\n`;
    message += `📱 <b>Телефон:</b> <code>${phone}</code>\n`;
    if (address) message += `📍 <b>Район / ЖК:</b> ${address}\n`;
    if (preferredTime) message += `⏱ <b>Удобное время:</b> ${preferredTime}\n`;
    if (details) message += `\n📋 <b>Параметры расчета:</b>\n${details}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏰ <i>${now} (МСК)</i>`;

    if (botToken && chatId && chatId !== "your_chat_id_here") {
      console.log(`[Telegram API] Отправка в Chat ID: ${chatId}...`);
      
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      const resJson = await tgRes.json();
      
      if (!tgRes.ok || !resJson.ok) {
        console.error("❌ [Telegram API Error]:", resJson);
        return NextResponse.json({ 
          success: false, 
          error: resJson.description || "Telegram API Error" 
        }, { status: 500 });
      }

      console.log("✅ [Telegram API Success]: Сообщение доставлено в группу!");
    } else {
      console.warn("⚠️ [Telegram API]: TELEGRAM_CHAT_ID не настроен. Сообщение:\n", message);
    }

    return NextResponse.json({ success: true, message: "Заявка успешно отправлена" });
  } catch (error) {
    console.error("API Lead Error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}