import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redis } from '@/lib/redis';
import { DEFAULT_PORTFOLIO_STATE, Endorsement, PortfolioState } from '@/data/defaultPortfolio';

const REDIS_KEY = 'portfolio:state';
const RATE_LIMIT = 3;
const RATE_WINDOW_SEC = 3600;

function stripHtml(value: string) {
  return value.replace(/<[^>]*>?/gm, '').trim();
}

function clientIp(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  return ip.slice(0, 64);
}

export async function POST(req: Request) {
  if (!redis) {
    return NextResponse.json({ error: 'Redis unavailable.' }, { status: 503 });
  }

  let body: { name?: unknown; role?: unknown; quote?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (typeof body.name !== 'string' || typeof body.role !== 'string' || typeof body.quote !== 'string') {
    return NextResponse.json({ error: 'Invalid endorsement payload.' }, { status: 400 });
  }

  const name = stripHtml(body.name);
  const role = stripHtml(body.role);
  const quote = stripHtml(body.quote);

  if (!name || !quote || name.length > 60 || quote.length > 400) {
    return NextResponse.json({ error: 'Invalid endorsement fields.' }, { status: 400 });
  }

  const rateKey = `endorsements:rate:${clientIp(req)}`;
  try {
    const count = await redis.incr(rateKey);
    if (count === 1) await redis.expire(rateKey, RATE_WINDOW_SEC);
    if (count > RATE_LIMIT) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
  } catch (err) {
    console.error('[endorsements POST] rate limit failed:', err);
    return NextResponse.json({ error: 'Failed to submit endorsement.' }, { status: 500 });
  }

  const initials =
    name.split(' ').map((part) => part[0]).join('').substring(0, 2).toUpperCase() || 'TH';

  const entry: Endorsement = {
    id: `end-${Date.now()}`,
    name,
    role: role || 'Software Industry Peer',
    quote,
    initials,
    avatarBg: '#FFD13B',
  };

  try {
    const current = (await redis.get<PortfolioState>(REDIS_KEY)) ?? DEFAULT_PORTFOLIO_STATE;
    const endorsements = [entry, ...(current.endorsements ?? [])];
    await redis.set(REDIS_KEY, { ...current, endorsements });
    revalidatePath('/');
    return NextResponse.json(endorsements);
  } catch (err) {
    console.error('[endorsements POST] Redis write failed:', err);
    return NextResponse.json({ error: 'Failed to persist endorsement.' }, { status: 500 });
  }
}
