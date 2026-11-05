import { Resend } from 'resend';

interface InquiryPayload {
  name: string;
  email: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

async function sendTelegram(data: InquiryPayload) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return;

  const text = `🔔 *New Portfolio Inquiry*\n\n` +
               `*Name:* ${data.name}\n` +
               `*Email:* ${data.email}\n` +
               `*Message:*\n${data.message}`;

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    }
  );
  if (!res.ok) throw new Error('Telegram dispatch failed');
}

async function sendGmail(data: InquiryPayload) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_GMAIL) return;

  await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: [process.env.ADMIN_GMAIL, process.env.SECONDARY_GMAIL || ''].filter(Boolean),
    subject: `⚡ New Inquiry: ${data.name}`,
    replyTo: data.email,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  });
}

export async function dispatchMultiChannelAlerts(data: InquiryPayload) {
  const results = await Promise.allSettled([
    sendTelegram(data),
    sendGmail(data),
  ]);

  results.forEach((res, i) => {
    const channel = ['Telegram', 'Gmail'][i];
    if (res.status === 'rejected') {
      console.warn(`[Dispatch] ${channel} alert failed:`, res.reason);
    }
  });
}