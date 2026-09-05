/**
 * /api/admin/login
 *
 * POST: validates the submitted ADMIN_SECRET and, on success, sets an
 * HttpOnly session cookie used to gate access to the admin dashboard.
 * DELETE: clears the session cookie (logout).
 *
 * The cookie value is an HMAC of the secret (see lib/adminAuth), never the
 * secret itself.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  adminConfigured,
  adminToken,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_SECRET in your environment variables." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const { secret } = body as Record<string, unknown>;
  if (typeof secret !== "string" || secret.trim().length === 0) {
    return NextResponse.json({ error: "Secret is required." }, { status: 422 });
  }

  if (secret.trim() !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const token = adminToken();
  if (!token) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
