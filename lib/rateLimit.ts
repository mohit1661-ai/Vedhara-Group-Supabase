/**
 * lib/rateLimit.ts
 *
 * Simple in-memory rate limiter for the consultation API.
 * Resets on every serverless cold-start, that's fine for
 * a low-traffic marketing site. No Redis needed.
 *
 * Default: 5 requests per IP per 10 minutes.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS  = 10 * 60 * 1000; // 10 minutes
const MAX_HITS   = 5;               // max requests per window

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    // First request or window expired, start fresh
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_HITS) {
    return true; // rate limited
  }

  entry.count++;
  return false;
}

// Clean up stale entries every hour to avoid memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(ip);
  }
}, 60 * 60 * 1000);
