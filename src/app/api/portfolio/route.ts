import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redis } from '@/lib/redis';
import { DEFAULT_PORTFOLIO_STATE, PortfolioState } from '@/data/defaultPortfolio';

const REDIS_KEY = 'portfolio:state';

// Cache-Control: serve stale for up to 5 min, revalidate in bg for 24 h
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
};

/**
 * GET /api/portfolio
 * Returns the full portfolio state from Redis, falling back to hardcoded defaults.
 */
export async function GET() {
  if (redis) {
    try {
      const stored = await redis.get<PortfolioState>(REDIS_KEY);
      if (stored) {
        return NextResponse.json(stored, { headers: CACHE_HEADERS });
      }
    } catch (err) {
      console.warn('[portfolio GET] Redis read failed, serving defaults:', err);
    }
  }

  return NextResponse.json(DEFAULT_PORTFOLIO_STATE, { headers: CACHE_HEADERS });
}

/**
 * PUT /api/portfolio
 * Merges a partial PortfolioState patch into the persisted state.
 * Protected by src/proxy.ts (requires portfolio_auth_token cookie).
 */
export async function PUT(req: Request) {
  if (!redis) {
    return NextResponse.json(
      { error: 'Redis unavailable — persistence disabled in this environment.' },
      { status: 503 },
    );
  }

  let patch: Partial<PortfolioState>;
  try {
    patch = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    // Read current state (or fall back to defaults) then merge the patch
    const current =
      (await redis.get<PortfolioState>(REDIS_KEY)) ?? DEFAULT_PORTFOLIO_STATE;

    const next: PortfolioState = { ...current, ...patch };

    // Persist with no TTL — this is intentional long-lived portfolio content
    await redis.set(REDIS_KEY, next);
    revalidatePath('/');

    return NextResponse.json(next);
  } catch (err) {
    console.error('[portfolio PUT] Redis write failed:', err);
    return NextResponse.json({ error: 'Failed to persist portfolio state.' }, { status: 500 });
  }
}

/**
 * DELETE /api/portfolio
 * Resets Redis state back to DEFAULT_PORTFOLIO_STATE.
 * Protected by src/proxy.ts.
 */
export async function DELETE() {
  if (!redis) {
    return NextResponse.json(
      { error: 'Redis unavailable.' },
      { status: 503 },
    );
  }

  try {
    await redis.set(REDIS_KEY, DEFAULT_PORTFOLIO_STATE);
    revalidatePath('/');
    return NextResponse.json({ reset: true });
  } catch (err) {
    console.error('[portfolio DELETE] Redis reset failed:', err);
    return NextResponse.json({ error: 'Failed to reset portfolio state.' }, { status: 500 });
  }
}
