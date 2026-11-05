import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const { passphrase } = await req.json();
    if (!passphrase) {
      return NextResponse.json({ error: 'Passphrase required' }, { status: 400 });
    }

    let isValid = false;
    const db = await connectToDatabase();

    if (db) {
      const Admin =
        mongoose.models.Admin ||
        mongoose.model(
          'Admin',
          new mongoose.Schema({
            username: String,
            passwordHash: String,
          })
        );
      const admin = await Admin.findOne({ username: 'taha' });
      if (admin) {
        isValid = await bcrypt.compare(passphrase, admin.passwordHash);
      }
    }

    // Direct fallback passphrase if DB is not initialized or user not seeded
    if (!isValid) {
      const defaultPassphrase = process.env.ADMIN_INITIAL_PASSWORD || 'wingslug2026';
      isValid = passphrase === defaultPassphrase;
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Passphrase' }, { status: 401 });
    }

    const secretKey = process.env.JWT_SECRET || 'dev_secret_key_32_chars_minimum_safe_default';
    const secret = new TextEncoder().encode(secretKey);

    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'portfolio_auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}