import { Redis } from '@upstash/redis';

/**
 * Singleton Upstash Redis client.
 * Returns null during local builds / CI when env vars are absent
 * so that the rest of the app can fall back to DEFAULT_PORTFOLIO_STATE.
 */
function createRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[redis] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing — Redis disabled.');
    return null;
  }

  return Redis.fromEnv();
}

export const redis = createRedisClient();
