"use client";

import { useState } from "react";

type ValuationInput = {
  locality: string;
  propertyType: string;
  size: string;
  circleRate: string;
};

// The valuation formula will be supplied separately. This keeps the wireframe
// functional without presenting an invented estimate.
function estimateValue(_input: ValuationInput): null {
  void _input;
  return null;
}

export default function ValuationTool() {
  const [input, setInput] = useState<ValuationInput>({ locality: "", propertyType: "residential", size: "", circleRate: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof ValuationInput) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput((current) => ({ ...current, [key]: event.target.value }));
    setSubmitted(false);
  };

  const estimate = submitted ? estimateValue(input) : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid-2">
      <div>
        <h2 className="heading-md" style={{ color: "var(--navy)", marginBottom: 8 }}>Property Details</h2>
        <p className="body-sm" style={{ color: "var(--slate)", marginBottom: 20 }}>Enter the information available for your property. The final tool will compare locality evidence with applicable government circle rate data.</p>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-locality">Locality</label>
          <input id="valuation-locality" value={input.locality} onChange={update("locality")} className="input-field" placeholder="e.g. Sector 57, Gurugram" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-type">Property Type</label>
          <select id="valuation-type" value={input.propertyType} onChange={update("propertyType")} className="input-field">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Plot / Land</option>
            <option value="luxury">Luxury Property</option>
          </select>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-size">Floor Size / Plot Area</label>
          <input id="valuation-size" value={input.size} onChange={update("size")} className="input-field" placeholder="e.g. 1,500 sq.ft." />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="input-label" htmlFor="valuation-circle-rate">Government Circle Rate (optional)</label>
          <input id="valuation-circle-rate" value={input.circleRate} onChange={update("circleRate")} className="input-field" placeholder="Enter if already known" />
        </div>
        <button type="button" className="btn btn-dark" onClick={() => setSubmitted(true)}>Prepare Valuation Estimate</button>
      </div>
      <div style={{ background: "var(--navy)", padding: "28px 24px" }}>
        <h3 className="eyebrow" style={{ color: "var(--gold)", marginBottom: 20 }}>Valuation Preview</h3>
        {estimate === null ? (
          <>
            <p className="body-lg" style={{ color: "var(--light)", marginBottom: 16 }}>Your estimate will appear here.</p>
            <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>This tool is currently a wireframe. Its valuation formula will be connected after the locality comparable and circle-rate methodology is specified.</p>
          </>
        ) : (
          <p className="body-sm" style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>{estimate}</p>
        )}
      </div>
    </div>
  );
}
