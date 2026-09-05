"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * AdminLogin — client form that validates the ADMIN_SECRET and logs the user
 * into the admin dashboard. Posts to /api/admin/login which sets the HttpOnly
 * session cookie on success.
 */
export default function AdminLogin() {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || (res.status === 401 ? "Incorrect secret." : "Login failed."));
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "var(--navy)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "var(--cream)",
          border: "1px solid rgba(212,168,67,0.25)",
          padding: "32px 28px",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 6 }}>Vedhara Group</div>
        <h1 className="heading-md" style={{ color: "var(--navy)", marginBottom: 4 }}>
          Admin Sign In
        </h1>
        <p className="body-sm" style={{ color: "var(--slate)", marginBottom: 24 }}>
          Enter the admin secret to view and manage leads.
        </p>

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
          Admin secret
        </label>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="••••••••••••"
          autoFocus
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 14,
            fontFamily: "var(--t-body)",
            color: "var(--navy)",
            background: "#fff",
            border: "1px solid rgba(15,30,56,0.2)",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: 12,
          }}
        />

        {error && (
          <p style={{ color: "#a33", fontSize: 13, margin: "0 0 12px" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !secret}
          style={{
            width: "100%",
            padding: "13px 16px",
            fontFamily: "var(--t-head)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--navy)",
            background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading || !secret ? 0.6 : 1,
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
