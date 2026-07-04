import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone, area, type } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
🚀 *Новая заявка с сайта!*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
📏 *Площадь:* ${area || 'Не указано'} м²
🏠 *Тип:* ${type || 'Не указано'}

#lead #stretchceilings
    `;

    if (token && chatId) {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    // Always log for debugging and return success if Telegram is not configured yet
    console.log('Form submission:', { name, phone, area, type });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
