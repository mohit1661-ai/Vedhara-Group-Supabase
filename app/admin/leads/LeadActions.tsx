"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead, LeadStatus } from "@/lib/leads";

const STATUS_STYLES: Record<LeadStatus, { bg: string; color: string; label: string }> = {
  new:       { bg: "rgba(212,168,67,0.15)",  color: "#8a6d14", label: "New" },
  contacted: { bg: "rgba(63,126,255,0.12)",  color: "#1d4ed8", label: "Contacted" },
  converted: { bg: "rgba(22,163,74,0.14)",  color: "#15803d", label: "Converted" },
  closed:    { bg: "rgba(90,96,112,0.14)",  color: "#5a6070", label: "Closed" },
};

const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "converted", "closed"];

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function interestLabel(interest?: string): string {
  if (!interest) return "—";
  return interest.split("_").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}

/**
 * LeadActions — client row for a single lead. Lets an admin change status and
 * edit internal notes without leaving the page. Writes go to PATCH /api/leads.
 */
export default function LeadActions({ lead }: { lead: Lead }) {
  const router = useRouter();
  const status = (lead.status as LeadStatus | undefined) ?? "new";
  const [notes, setNotes] = useState(lead.notes || "");
  const [notesOpen, setNotesOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  async function changeStatus(next: string) {
    setSaving(true);
    setSavedMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: next }),
      });
      if (res.ok) {
        router.refresh();
        setSavedMsg("Status saved.");
      } else {
        setSavedMsg("Failed to save status.");
      }
    } catch {
      setSavedMsg("Failed to save status.");
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    setSaving(true);
    setSavedMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, notes }),
      });
      setSavedMsg(res.ok ? "Notes saved." : "Failed to save notes.");
    } catch {
      setSavedMsg("Failed to save notes.");
    } finally {
      setSaving(false);
    }
  }

  const st = STATUS_STYLES[status];

  return (
    <tr style={{ borderBottom: "1px solid rgba(15,30,56,0.08)", verticalAlign: "top" }}>
      {/* Name */}
      <td style={{ padding: "12px 14px", minWidth: 150 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{lead.full_name}</div>
        <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{lead.phone}</div>
        {lead.email && (
          <div style={{ fontSize: 11, color: "var(--slate)" }}>{lead.email}</div>
        )}
      </td>

      {/* Interest */}
      <td style={{ padding: "12px 14px", minWidth: 120 }}>
        <span style={{ fontSize: 12, color: "var(--ink)" }}>{interestLabel(lead.interest)}</span>
        <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>
          {lead.source_page || "—"}
        </div>
      </td>

      {/* Message */}
      <td style={{ padding: "12px 14px", minWidth: 200, maxWidth: 320 }}>
        {lead.message ? (
          <span style={{ fontSize: 12, color: "var(--ink)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {lead.message}
          </span>
        ) : (
          <span style={{ fontSize: 12, color: "var(--slate)" }}>—</span>
        )}
      </td>

      {/* Created */}
      <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 11, color: "var(--slate)" }}>{formatDate(lead.created_at)}</span>
      </td>

      {/* Status */}
      <td style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: st.color,
              background: st.bg,
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            {st.label}
          </span>
          <select
            value={status}
            onChange={(e) => changeStatus(e.target.value)}
            disabled={saving}
            style={{
              fontSize: 12,
              fontFamily: "var(--t-body)",
              color: "var(--navy)",
              background: "#fff",
              border: "1px solid rgba(15,30,56,0.2)",
              padding: "5px 6px",
              cursor: "pointer",
            }}
            aria-label={`Change status for ${lead.full_name}`}
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{STATUS_STYLES[s].label}</option>
            ))}
          </select>
        </div>
      </td>

      {/* Notes / actions */}
      <td style={{ padding: "12px 14px", minWidth: 150 }}>
        <button
          type="button"
          onClick={() => setNotesOpen((o) => !o)}
          style={{
            fontSize: 11,
            fontFamily: "var(--t-head)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--gold-dk)",
            background: "none",
            border: "none",
            borderBottom: "1px solid transparent",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {notesOpen ? "Hide notes" : "Notes"}
        </button>
        {notesOpen && (
          <div style={{ marginTop: 8 }}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Internal advisor notes…"
              style={{
                width: "100%",
                fontSize: 12,
                fontFamily: "var(--t-body)",
                color: "var(--navy)",
                background: "#fff",
                border: "1px solid rgba(15,30,56,0.2)",
                padding: "8px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <button
                type="button"
                onClick={saveNotes}
                disabled={saving}
                style={{
                  fontSize: 11,
                  fontFamily: "var(--t-head)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#fff",
                  background: "var(--navy)",
                  border: "none",
                  padding: "5px 10px",
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.6 : 1,
                }}
              >
                Save
              </button>
              {savedMsg && <span style={{ fontSize: 11, color: "var(--gold-dk)" }}>{savedMsg}</span>}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
