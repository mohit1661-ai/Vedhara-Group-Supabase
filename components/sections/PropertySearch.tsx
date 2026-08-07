"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const modes = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "sell", label: "Sell" },
];

const popular = [
  { label: "3 BHK in Gurugram", href: "/gurugram" },
  { label: "Penthouse on Golf Course Road", href: "/gurugram" },
  { label: "Plots in Greater Noida", href: "/greater-noida" },
  { label: "2 BHK in Noida", href: "/noida" },
  { label: "Office in Sector 62", href: "/search?mode=buy&type=commercial" },
  { label: "Villa in Panchkula", href: "/panchkula" },
  { label: "Apartments in Chandigarh", href: "/chandigarh" },
  { label: "Plots in Mohali", href: "/mohali" },
];

const BUY_BUDGETS = [
  { value: "any", label: "Any Budget" },
  { value: "under1", label: "Under ₹1 Cr" },
  { value: "1-3", label: "₹1 – 3 Cr" },
  { value: "3-5", label: "₹3 – 5 Cr" },
  { value: "5-10", label: "₹5 – 10 Cr" },
  { value: "10plus", label: "₹10 Cr+" },
];

const RENT_BUDGETS = [
  { value: "any", label: "Any Monthly Rent" },
  { value: "under20k", label: "Under ₹20K /mo" },
  { value: "20k-50k", label: "₹20K – 50K /mo" },
  { value: "50k-1l", label: "₹50K – 1L /mo" },
  { value: "1l-2l", label: "₹1L – 2L /mo" },
  { value: "2lplus", label: "₹2L+ /mo" },
];

export default function PropertySearch() {
  const router = useRouter();
  const [mode, setMode] = useState("buy");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("any");
  const [budget, setBudget] = useState("any");
  const budgets = mode === "rent" ? RENT_BUDGETS : BUY_BUDGETS;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (loc.trim()) p.set("q", loc.trim());
    if (mode !== "buy") p.set("mode", mode);
    if (type !== "any") p.set("type", type);
    if (budget !== "any") p.set("budget", budget);
    const qs = p.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  }

  return (
    <section
      style={{
        background: "var(--navy)",
        padding: "64px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Catchy but readable backdrop: faint skyline + navy veil + warm gold glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.pexels.com/photos/11729105/pexels-photo-11729105.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.22,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, var(--navy) 0%, rgba(15,30,56,0.72) 45%, var(--navy) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 720,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,168,67,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold-lt) 50%, var(--gold) 70%, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="v-line" style={{ margin: "0 auto 14px" }} />
          <p className="eyebrow" style={{ color: "var(--gold-lt)", marginBottom: 10 }}>
            Search Properties
          </p>
          <p className="body-lg" style={{ color: "rgba(252,250,244,0.8)", margin: 0 }}>
            Verified listings across Gurugram, Noida, Greater Noida, South Delhi &amp; the Tricity,
            every one passing the Vedhara Verification Framework.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ps-card">
          <div className="ps-modes">
            {modes.map((m) => (
              <button
                key={m.key}
                type="button"
                className={mode === m.key ? "ps-mode ps-mode-active" : "ps-mode"}
                onClick={() => {
                  setMode(m.key);
                  setBudget("any");
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="ps-row">
            <div className="ps-field">
              <label className="ps-label" htmlFor="ps-loc">
                Location / Keyword
              </label>
              <input
                id="ps-loc"
                className="ps-input"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="City, locality or project name"
              />
            </div>
            <div className="ps-field">
              <label className="ps-label" htmlFor="ps-type">
                Type
              </label>
              <select
                id="ps-type"
                className="ps-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="any">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot / Land</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="ps-field">
              <label className="ps-label" htmlFor="ps-budget">
                {mode === "rent" ? "Monthly Rent" : "Budget"}
              </label>
              <select
                id="ps-budget"
                className="ps-input"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {budgets.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="ps-submit">
              Search
            </button>
          </div>
        </form>

        <div className="ps-popular">
          <span className="ps-pop-label">Popular searches</span>
          {popular.map((p) => (
            <Link key={p.label} href={p.href} className="ps-chip">
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .ps-card {
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(212,168,67,0.55);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 30px 60px -30px rgba(9,15,29,0.6);
          backdrop-filter: blur(6px);
        }
        .ps-modes { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .ps-mode {
          font-family: var(--t-head); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 8px 18px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.12); color: #ffffff;
          transition: all 0.25s ease;
        }
        .ps-mode:hover { border-color: var(--gold-lt); background: rgba(255,255,255,0.2); color: #ffffff; }
        .ps-mode-active {
          background: linear-gradient(135deg, var(--gold), var(--gold-dk));
          color: var(--navy); border-color: var(--gold); box-shadow: 0 8px 20px -8px rgba(212,168,67,0.6);
        }
        .ps-mode-active:hover { background: linear-gradient(135deg, var(--gold), var(--gold-dk)); color: var(--navy); }
        .ps-row { display: grid; grid-template-columns: 1.6fr 1fr 1fr auto; gap: 12px; align-items: end; }
        .ps-field { display: flex; flex-direction: column; gap: 6px; }
        .ps-label {
          font-family: var(--t-head); font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-dk);
        }
        .ps-input {
          font-family: var(--t-body); font-size: 14px; color: var(--navy);
          background: #fff; border: 1px solid rgba(15,30,56,0.14); border-radius: 10px;
          padding: 12px 14px; outline: none; width: 100%;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ps-input::placeholder { color: rgba(42,45,53,0.4); }
        .ps-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(212,168,67,0.18); }
        .ps-submit {
          font-family: var(--t-head); font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--navy);
          background: linear-gradient(135deg, var(--gold), var(--gold-dk));
          border: none; border-radius: 10px; padding: 13px 26px; cursor: pointer;
          white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.25s ease;
        }
        .ps-submit:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -12px rgba(212,168,67,0.7); }
        .ps-popular { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
        .ps-pop-label {
          font-family: var(--t-head); font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(252,250,244,0.55);
        }
        .ps-chip {
          font-family: var(--t-body); font-size: 12px; color: var(--light);
          background: rgba(255,255,255,0.08); border: 1px solid rgba(212,168,67,0.3);
          border-radius: 999px; padding: 6px 14px; text-decoration: none;
          transition: all 0.25s ease;
        }
        .ps-chip:hover { background: rgba(212,168,67,0.16); border-color: var(--gold); color: var(--gold-lt); }
        @media (max-width: 900px) { .ps-row { grid-template-columns: 1fr 1fr; } .ps-submit { grid-column: 1 / -1; } }
        @media (max-width: 520px) { .ps-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
