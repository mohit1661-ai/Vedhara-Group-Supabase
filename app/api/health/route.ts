/**
 * /api/health
 * Simple uptime check: useful for monitoring services.
 */
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Vedhara Group",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
}
