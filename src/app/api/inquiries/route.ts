import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Inquiry from '@/lib/db/models/Inquiry';
import { dispatchMultiChannelAlerts } from '@/lib/dispatch';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let inquiryId = 'mem-' + Date.now();
    const db = await connectToDatabase();

    if (db) {
      try {
        const inquiry = await Inquiry.create({ name, email, message });
        inquiryId = inquiry._id.toString();
      } catch (dbErr) {
        console.warn('[Inquiries API] DB persist failed, continuing alert dispatch:', dbErr);
      }
    } else {
      console.log(`[Lead Captured Locally] ${name} <${email}>: "${message}"`);
    }

    // Multi-channel alerts fire independently regardless of DB status
    await dispatchMultiChannelAlerts({ name, email, message });

    return NextResponse.json({ success: true, id: inquiryId }, { status: 201 });
  } catch (err) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}