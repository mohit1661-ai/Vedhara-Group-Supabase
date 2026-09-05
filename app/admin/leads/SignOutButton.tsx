"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * SignOutButton — calls DELETE /api/admin/login to clear the session cookie,
 * then refreshes the page (which will show the login form again).
 */
export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch {
      // ignore — refresh below still lands on the login form
    }
    router.refresh();
    router.push("/admin/leads");
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      style={{
        fontSize: 12,
        fontFamily: "var(--t-head)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--gold-dk)",
        background: "none",
        border: "1px solid rgba(184,146,42,0.4)",
        padding: "8px 14px",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      Sign out
    </button>
  );
}