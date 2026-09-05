/**
 * /admin/leads — internal CRM dashboard.
 *
 * Server-rendered. Reads the admin session cookie (set by /api/admin/login).
 * When authenticated, loads leads via getLeads() (same Supabase table the
 * live consultation form writes to) and renders a stats row + table.
 * Otherwise renders the login form.
 */

import { cookies } from "next/headers";
import Link from "next/link";
import { getLeads, LEAD_STATUSES, type Lead } from "@/lib/leads";
import { isValidAdminToken } from "@/lib/adminAuth";
import AdminLogin from "./AdminLogin";
import LeadActions from "./LeadActions";
import SignOutButton from "./SignOutButton";

export const metadata = {
  title: "Leads Dashboard",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  new:       { label: "New",       bg: "rgba(212,168,67,0.15)", color: "#8a6d14" },
  contacted: { label: "Contacted", bg: "rgba(63,126,255,0.12)", color: "#1d4ed8" },
  converted: { label: "Converted", bg: "rgba(22,163,74,0.14)", color: "#15803d" },
  closed:    { label: "Closed",    bg: "rgba(90,96,112,0.14)", color: "#5a6070" },
};

export default async function AdminLeadsPage() {
  const cookieStore = await cookies();
  const authed = isValidAdminToken(cookieStore.get("vg_admin_session")?.value);

  if (!authed) {
    return <AdminLogin />;
  }

  let leads: Lead[] = [];
  let error: string | null = null;
  try {
    leads = await getLeads();
  } catch (err) {
    console.error("[Admin leads fetch failed]", err);
    error = "Failed to load leads.";
  }

  // Stats
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const countByStatus = LEAD_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {});
  let todayCount = 0;
  for (const l of leads) {
    const st = l.status ?? "new";
    if (st in countByStatus) countByStatus[st]++;
    if (l.created_at && new Date(l.created_at) >= startOfToday) todayCount++;
  }

  const statCards = [
    { label: "Total leads", value: leads.length },
    { label: "New today", value: todayCount },
    ...LEAD_STATUSES.map((s) => ({
      label: STATUS_LABELS[s].label,
      value: countByStatus[s],
    })),
  ];

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Vedhara Group · CRM</div>
            <h1 className="heading-lg" style={{ color: "var(--navy)", margin: 0 }}>
              Lead Dashboard
            </h1>
            <p style={{ color: "var(--slate)", fontSize: 13, marginTop: 6 }}>
              {leads.length} leads · {todayCount} new today · reads the same Supabase table as the live forms
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link
              href="/"
              style={{
                fontSize: 12,
                fontFamily: "var(--t-head)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--gold-dk)",
              }}
            >
              ← Back to site
            </Link>
            <SignOutButton />
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(170,51,51,0.08)", border: "1px solid rgba(170,51,51,0.25)", color: "#a33", padding: 14, fontSize: 13, marginBottom: 24 }}>
            {error}
          </div>
        )}

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginBottom: 32 }}>
          {statCards.map((c) => (
            <div
              key={c.label}
              style={{
                background: "#fff",
                border: "1px solid rgba(15,30,56,0.08)",
                padding: "18px 20px",
                boxShadow: "0 4px 14px rgba(15,30,56,0.05)",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 700, color: "var(--navy)", fontFamily: "var(--t-head)", lineHeight: 1 }}>
                {c.value}
              </div>
              <div style={{ fontSize: 11, color: "var(--slate)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", background: "#fff", border: "1px solid rgba(15,30,56,0.08)", boxShadow: "0 4px 20px rgba(15,30,56,0.06)" }}>
          {leads.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: "var(--slate)", fontSize: 14 }}>
              No leads yet. Submissions from the consultation forms will appear here.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
              <thead>
                <tr style={{ background: "var(--navy)", textAlign: "left" }}>
                  {["Contact", "Interest", "Message", "Created", "Status", "Notes"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--gold-lt)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <LeadActions key={l.id} lead={l} />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p style={{ fontSize: 11, color: "var(--slate)", marginTop: 16 }}>
          Queries to /api/leads are still protected by ADMIN_SECRET. This dashboard uses the same
          secret via an HttpOnly session cookie.
        </p>
      </div>
    </div>
  );
}