import { timingSafeEqual } from 'node:crypto';

export function verifyStudioPasskey(passkey: string | null): boolean {
  const expected = process.env.ADMIN_INITIAL_PASSWORD;
  if (!passkey || !expected) return false;

  const providedBuffer = Buffer.from(passkey);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(providedBuffer, expectedBuffer);
}
