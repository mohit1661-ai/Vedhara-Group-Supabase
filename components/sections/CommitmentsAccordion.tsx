"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Commitment {
  icon: string;
  n: string;
  title: string;
  desc: string;
  grad: string;
}

export default function CommitmentsAccordion({ commitments }: { commitments: Commitment[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3">
        {commitments.map((c, i) => {
          const isOpen = openIndex === i;
          return (
          <ScrollReveal key={c.n} delay={i * 70}>
            <div
              onClick={() => toggle(i)}
              className="svc-card comm-card"
              style={{
                background:"var(--cream)",
                borderRadius:0,
                cursor:"pointer",
                display:"flex",
                flexDirection:"column",
                height:"100%",
              }}
            >
              <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:14 }}>
                <div className="gold-accent" style={{width:24,height:2,margin:0}}></div>
                <span className="eyebrow" style={{ color:"var(--gold)" }}>{c.n}</span>
              </div>
              <h3 className="svc-card-title" style={{ marginBottom:8 }}>{c.title}</h3>

              {/* Collapsible description */}
              <div
                className="comm-desc-wrap"
                style={{
                  overflow:"hidden",
                  maxHeight: isOpen ? "300px" : "60px",
                  transition:"max-height 0.4s ease, opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0.7,
                  flex: 1,
                }}
              >
                <p className="svc-card-desc" style={{ margin:0 }}>{c.desc}</p>
              </div>

              {/* Toggle indicator */}
              <div
                style={{
                  marginTop:"auto",
                  paddingTop:12,
                  display:"flex",
                  alignItems:"center",
                  gap:6,
                  fontFamily:"var(--t-head)",
                  fontSize:9,
                  fontWeight:700,
                  letterSpacing:"0.08em",
                  textTransform:"uppercase",
                  color:"var(--gold)",
                  transition:"opacity 0.3s",
                  opacity: isOpen ? 0.5 : 1,
                }}
              >
                <span>{isOpen ? "▲ Less" : "▼ More"}</span>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
      <CommCardStyles />
    </>
  );
}

/* ── Hover & card sizing styles ── */
function CommCardStyles() {
  return <style>{`
    .comm-card {
      transition: background 0.35s var(--ease-out), transform 0.25s var(--ease-spring), box-shadow 0.3s ease;
    }
    .comm-card:hover {
      background: #0F1E38 !important;
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(9,15,29,0.18);
    }
    .comm-card:hover .svc-card-title {
      color: #E8C970;
    }
    .comm-card:hover .comm-desc-wrap {
      opacity: 1 !important;
    }
    .comm-card .svc-card-desc {
      transition: color 0.3s;
    }
    .comm-card:hover .svc-card-desc {
      color: rgba(232,201,112,0.55);
    }
  `}</style>;
}
