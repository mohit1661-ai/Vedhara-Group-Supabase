"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Country {
  flag: string;
  name: string;
  cities: string;
  grad: string;
}

const countryCodes: Record<string, string> = {
  UAE: "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Canada: "CA",
  Singapore: "SG",
  Australia: "AU",
};

export default function CountriesAccordion({ countries }: { countries: Country[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <>
      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(6,1fr)",
          gap:12,
        }}
        className="grid-6"
      >
        {countries.map((c, i) => {
          const isOpen = openIndex === i;
          return (
            <ScrollReveal key={c.name} delay={i * 60}>
              <div
                onClick={() => toggle(i)}
                className="country-card"
                style={{
                  background:"var(--navy)",
                  borderRadius:12,
                  cursor:"pointer",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  height:"100%",
                  padding:"32px 16px 18px",
                  textAlign:"center",
                  border:"1px solid rgba(184,146,42,0.12)",
                }}
              >
                {/* Country code badge — white */}
                <div
                  className="country-code"
                  style={{
                    fontSize:28,
                    fontWeight:700,
                    fontFamily:"var(--t-head)",
                    letterSpacing:"0.06em",
                    color:"rgba(255,255,255,0.85)",
                    lineHeight:1,
                    marginBottom:6,
                  }}
                >
                  {countryCodes[c.name] || c.flag}
                </div>

                {/* Gold accent bar */}
                <div
                  className="gold-accent-sm"
                  style={{ margin:"0 auto 12px" }}
                />

                {/* Country name — gold */}
                <div
                  className="country-name"
                  style={{
                    fontFamily:"var(--t-head)",
                    fontSize:13,
                    fontWeight:600,
                    color:"var(--gold-lt)",
                    marginBottom:2,
                    lineHeight:1.3,
                  }}
                >
                  {c.name}
                </div>

                {/* Key cities — white */}
                <div
                  style={{
                    fontFamily:"var(--t-body)",
                    fontSize:10,
                    color:"rgba(255,255,255,0.65)",
                    lineHeight:1.4,
                    marginBottom:4,
                  }}
                >
                  {c.cities.split(",")[0].trim()}
                  {c.cities.includes(",") ? " +" : ""}
                </div>

                {/* Collapsible cities detail */}
                <div
                  className="cities-wrap"
                  style={{
                    overflow:"hidden",
                    maxHeight: isOpen ? "100px" : "0px",
                    transition:"max-height 0.4s ease, opacity 0.35s ease, margin 0.3s ease",
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? 8 : 0,
                    width:"100%",
                  }}
                >
                  <div
                    className="country-cities"
                    style={{
                      fontFamily:"var(--t-body)",
                      fontSize:10.5,
                      color:"rgba(255,255,255,0.8)",
                      lineHeight:1.5,
                      padding:"10px 0 4px",
                      borderTop:"1px solid rgba(184,146,42,0.1)",
                    }}
                  >
                    {c.cities}
                  </div>
                </div>

                {/* Toggle button */}
                <div
                  style={{
                    marginTop:"auto",
                    paddingTop:10,
                    fontFamily:"var(--t-head)",
                    fontSize:8.5,
                    fontWeight:700,
                    letterSpacing:"0.08em",
                    textTransform:"uppercase",
                    color:"rgba(255,255,255,0.7)",
                    opacity: isOpen ? 0.9 : 0.55,
                    transition:"opacity 0.3s",
                    display:"flex",
                    alignItems:"center",
                    gap:4,
                  }}
                >
                  <span style={{ fontSize:10 }}>{isOpen ? "▲" : "▼"}</span>
                  {isOpen ? "Less" : "Cities"}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
      <CountriesCardStyles />
    </>
  );
}

function CountriesCardStyles() {
  return <style>{`
    .country-card {
      transition: transform 0.25s var(--ease-spring), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease !important;
    }
    .country-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 12px 36px rgba(9,15,29,0.3);
      border-color: rgba(184,146,42,0.3);
      background: linear-gradient(135deg, #0F1E38 0%, #16243F 100%) !important;
    }
    .country-card:hover .country-name {
      color: #D4AA52;
    }
    .country-card:hover .country-code {
      color: rgba(255,255,255,1) !important;
    }
    .country-card:hover .country-cities {
      color: rgba(255,255,255,0.95) !important;
    }
    .country-card .gold-accent-sm {
      transition: width 0.3s ease, background 0.3s ease;
      width: 24px;
    }
    .country-card:hover .gold-accent-sm {
      width: 40px;
      background: linear-gradient(90deg, var(--gold), var(--gold-lt));
    }
    @media(max-width:1024px){.grid-6{grid-template-columns:repeat(3,1fr)!important;}}
    @media(max-width:640px){.grid-6{grid-template-columns:repeat(2,1fr)!important;}}
  `}</style>;
}
