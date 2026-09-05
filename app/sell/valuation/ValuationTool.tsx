"use client";

import { useState } from "react";
import Link from "next/link";
import { VALUATION_LOCALITIES, VALUATION_RATES_LAST_VERIFIED, VALUATION_RATE_SOURCES, type LocalityRates, type RateBand } from "@/lib/data/valuationRates";

/**
 * Seller property valuation estimator.
 *
 * Locality bands come from lib/data/valuationRates.ts (verified from published
 * listing trackers, transaction reports and circle-rate schedules). The tool
 * applies property-level adjustments and returns a ±12% band, mirroring the
 * Price Fairness check in the Verification Framework. It is an evidence-based
 * starting point, not a certified appraisal — the advisor CTA covers the
 * refined valuation. The last-verified date and sources are shown to the user.
 */

const CITIES = [...new Set(VALUATION_LOCALITIES.map(l => l.city))];

type PropertyType = "residential" | "commercial" | "plot" | "luxury";
type Unit = "sqft" | "sqyd";

const AGE_FACTORS: Record<string, { f: number; label: string }> = {
  new: { f: 1.0, label: "New / under construction" },
  u5: { f: 0.96, label: "Up to 5 years old" },
  u10: { f: 0.9, label: "5-10 years old" },
  u20: { f: 0.82, label: "10-20 years old" },
  o20: { f: 0.72, label: "Over 20 years old" },
};

const parseArea = (v: string): number => {
  const n = Number(v.replace(/[,\s]/g, "").replace(/(sq\.?ft\.?|sq\.?yd\.?|sq\.?yds?\.?)/gi, ""));
  return Number.isFinite(n) ? n : 0;
};

const formatINR = (n: number): string => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

const formatRate = (n: number): string => `₹${Math.round(n).toLocaleString("en-IN")}`;

type Result = {
  low: number; mid: number; high: number;
  rateMid: number; unitRate: Unit;
  localityName: string; matched: boolean;
  circleNote: string | null;
};

function estimate(localityIdx: number, type: PropertyType, area: number, unit: Unit, age: string, circleRate: number): Result | null {
  if (area <= 0) return null;
  const generic: LocalityRates = { city: "Delhi NCR", name: "Other / Not Listed", res: [6500, 9500] };
  const loc = localityIdx >= 0 && localityIdx < VALUATION_LOCALITIES.length ? VALUATION_LOCALITIES[localityIdx] : generic;
  const matched = loc !== generic;

  let band: RateBand;
  let unitRate: Unit;
  if (type === "plot") {
    // Plot bands are ₹/sq.yd; computed fallback where not researched (~70-85% of the
    // built-rate equivalent, since land trades below finished rate per developed sq.ft).
    band = loc.plot ?? [Math.round(loc.res[0] * 9 * 0.7), Math.round(loc.res[1] * 9 * 0.85)];
    unitRate = "sqyd";
  } else {
    const base = type === "commercial" ? (loc.com ?? [Math.round(loc.res[0] * 1.25), Math.round(loc.res[1] * 1.55)]) : loc.res;
    band = [base[0], base[1]];
    unitRate = "sqft";
  }

  // Convert area to the rate's unit.
  const areaSqft = unit === "sqyd" ? area * 9 : area;
  const areaInRateUnit = unitRate === "sqyd" ? areaSqft / 9 : areaSqft;

  const midRate = (band[0] + band[1]) / 2;
  let mid = midRate * areaInRateUnit * (AGE_FACTORS[age]?.f ?? 1);
  if (type === "luxury") mid *= 1.2; // premium specification / view / floor premium

  const low = mid * 0.88;
  const high = mid * 1.12;

  let circleNote: string | null = null;
  if (circleRate > 0) {
    const premium = ((midRate - circleRate) / circleRate) * 100;
    circleNote = premium >= 0
      ? `Your circle rate of ${formatRate(circleRate)}/${unitRate === "sqyd" ? "sq.yd" : "sq.ft"} sits ${premium.toFixed(0)}% below the implied market rate, a normal spread in most NCR micro-markets.`
      : `Your circle rate of ${formatRate(circleRate)}/${unitRate === "sqyd" ? "sq.yd" : "sq.ft"} is ${Math.abs(premium).toFixed(0)}% above the implied market rate; registration value may exceed achievable market value here.`;
  }

  return { low, mid, high, rateMid: midRate, unitRate, localityName: loc.name, matched, circleNote };
}

export default function ValuationTool() {
  const [localityIdx, setLocalityIdx] = useState(0);
  const [type, setType] = useState<PropertyType>("residential");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState<Unit>("sqft");
  const [age, setAge] = useState("u5");
  const [circleRate, setCircleRate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const areaNum = parseArea(area);
  const result = submitted ? estimate(localityIdx, type, areaNum, unit, age, parseArea(circleRate)) : null;

  const run = () => {
    if (areaNum <= 0) {
      setError("Enter the built-up area or plot area to prepare an estimate.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const updateArea = (v: string) => { setArea(v); setSubmitted(false); setError(null); };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
      <div>
        <h2 className="heading-md" style={{ color: "var(--navy)", marginBottom: 8 }}>Property Details</h2>
        <p className="body-sm" style={{ color: "var(--slate)", marginBottom: 12 }}>Locality bands are verified from published listing trackers, transaction data and circle-rate schedules. Adjustments for type and age are applied automatically.</p>
        <p className="body-sm" style={{ color: "var(--gold-ink)", fontWeight: 600, marginBottom: 20 }}>Rates last verified: {VALUATION_RATES_LAST_VERIFIED} · Sources: {VALUATION_RATE_SOURCES.join(", ")}</p>

        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-locality">Locality</label>
          <select id="valuation-locality" value={localityIdx} onChange={e => { setLocalityIdx(Number(e.target.value)); setSubmitted(false); }} className="input-field">
            {CITIES.map(city => (
              <optgroup key={city} label={city}>
                {VALUATION_LOCALITIES.map((l, i) => l.city === city ? <option key={l.name} value={i}>{l.name}</option> : null)}
              </optgroup>
            ))}
            <optgroup label="Other">
              <option value={VALUATION_LOCALITIES.length}>Other / Not Listed</option>
            </optgroup>
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-type">Property Type</label>
          <select id="valuation-type" value={type} onChange={e => { setType(e.target.value as PropertyType); setSubmitted(false); }} className="input-field">
            <option value="residential">Residential (Apartment / Floor / House)</option>
            <option value="commercial">Commercial (Office / Retail)</option>
            <option value="plot">Plot / Land</option>
            <option value="luxury">Luxury Property</option>
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-size">Area</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input id="valuation-size" value={area} onChange={e => updateArea(e.target.value)} className="input-field" placeholder={type === "plot" ? "e.g. 500" : "e.g. 1,500"} inputMode="decimal" />
            <select aria-label="Area unit" value={unit} onChange={e => { setUnit(e.target.value as Unit); setSubmitted(false); }} className="input-field" style={{ width: 120, flexShrink: 0 }}>
              <option value="sqft">sq.ft.</option>
              <option value="sqyd">sq.yd.</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-age">Age of Property</label>
          <select id="valuation-age" value={age} onChange={e => { setAge(e.target.value); setSubmitted(false); }} className="input-field">
            {Object.entries(AGE_FACTORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-circle-rate">Government Circle Rate (optional)</label>
          <input id="valuation-circle-rate" value={circleRate} onChange={e => { setCircleRate(e.target.value); setSubmitted(false); }} className="input-field" placeholder={type === "plot" ? "₹ per sq.yd., if known" : "₹ per sq.ft., if known"} inputMode="decimal" />
        </div>

        {error && <p className="body-sm" style={{ color: "#b03a2e", margin: "0 0 12px" }}>{error}</p>}
        <button type="button" className="btn btn-dark" onClick={run}>Prepare Valuation Estimate</button>
      </div>

      <div style={{ background: "var(--navy)", padding: "28px 24px" }}>
        <h3 className="eyebrow" style={{ color: "var(--gold)", marginBottom: 20 }}>Valuation Preview</h3>
        {!result ? (
          <>
            <p className="body-lg" style={{ color: "var(--light)", marginBottom: 16 }}>Your estimate will appear here.</p>
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>Choose the locality, property type and area, then prepare your estimate. The tool benchmarks your property against verified {VALUATION_RATES_LAST_VERIFIED} locality rate bands with type and age adjustments.</p>
          </>
        ) : (
          <div>
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Estimated Market Value{result.matched ? `, ${result.localityName}` : ", General NCR Band"}</p>
            <p style={{ fontFamily: "var(--t-head)", fontSize: 26, fontWeight: 700, color: "var(--gold-lt)", margin: "0 0 4px", lineHeight: 1.2 }}>
              {formatINR(result.low)} – {formatINR(result.high)}
            </p>
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.75)", margin: "0 0 16px" }}>Midpoint {formatINR(result.mid)} · implied rate {formatRate(result.rateMid)}/{result.unitRate === "sqyd" ? "sq.yd" : "sq.ft"}</p>

            {result.circleNote && (
              <div style={{ padding: "12px 14px", background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 8, marginBottom: 16 }}>
                <p className="body-sm" style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>{result.circleNote}</p>
              </div>
            )}

            <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none" }}>
              {[
                `Baseline: verified ${VALUATION_RATES_LAST_VERIFIED} locality rate band for your property type`,
                "Adjustments: property age and specification applied to the baseline",
                "Band: ±12% around the midpoint, the realistic negotiating range",
              ].map(t => (
                <li key={t} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: "var(--gold-lt)", flexShrink: 0, fontSize: 10, lineHeight: 1.7 }}>◆</span>
                  <span className="body-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{t}</span>
                </li>
              ))}
            </ul>

            {!result.matched && (
              <p className="body-sm" style={{ color: "rgba(232,201,112,0.85)", margin: "0 0 16px" }}>Your locality is not in our tracked list yet; this is a general NCR band. An advisor can price your specific micro-market precisely.</p>
            )}

            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Data transparency: rates are indicative bands last verified {VALUATION_RATES_LAST_VERIFIED} from {VALUATION_RATE_SOURCES.length} published sources and refreshed by our research team as the market moves. Indicative estimate, not a certified appraisal; plots and high-value assets vary most.</p>
            <p className="body-sm" style={{ color: "rgba(232,201,112,0.8)", margin: "0 0 18px" }}>Sources: {VALUATION_RATE_SOURCES.join(" · ")}</p>
            <Link href="/contact#sell" className="btn btn-primary">Get an Advisor-Verified Valuation →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
