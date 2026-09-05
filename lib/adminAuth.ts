/**
 * lib/adminAuth.ts
 *
 * Lightweight admin-session helpers for the internal CRM dashboard.
 *
 * The admin flow re-uses the same `ADMIN_SECRET` env var that already guards
 * `/api/leads`. The secret is never sent to the browser. Instead, when an admin
 * submits the correct secret to /api/admin/login, we set an HttpOnly cookie
 * whose value is a deterministic HMAC of the secret. The admin page compares
 * the incoming cookie against a freshly computed HMAC, so no session table or
 * external state is needed (works across cold starts on Vercel).
 *
 * Because the token is HMAC-derived from the secret, the raw ADMIN_SECRET is
 * never exposed to the client, and tokens can't be forged without the secret.
 */

import { createHmac, timingSafeEqual } from "crypto";

/** Cookie name used for the admin session. */
export const ADMIN_COOKIE = "vg_admin_session";

/** Session lifetime, in seconds (one hour). */
export const ADMIN_SESSION_MAX_AGE = 60 * 60;

/**
 * True when an ADMIN_SECRET is set to a real value (not the placeholder).
 * Mirrors the guard already used by the /api/leads endpoint.
 */
export function adminConfigured(): boolean {
  const secret = process.env.ADMIN_SECRET;
  return Boolean(
    secret && secret !== "change_this_to_a_strong_password"
  );
}

/**
 * Produce the session token for the configured ADMIN_SECRET.
 * Deterministic HMAC (SHA-256) so both /api/admin/login and the admin page
 * can derive and compare it without shared mutable state.
 */
export function adminToken(): string | null {
  const secret = process.env.ADMIN_SECRET;
  if (!adminConfigured()) return null;
  return createHmac("sha256", secret as string)
    .update("vedhara-admin-session-v1")
    .digest("hex");
}

/** Constant-time comparison of a candidate cookie value against the real token. */
export function isValidAdminToken(candidate: string | undefined): boolean {
  if (!candidate) return false;
  const expected = adminToken();
  if (!expected) return false;
  const a = Buffer.from(candidate, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
