import ScrollReveal from "@/components/ui/ScrollReveal";

interface Commitment {
  icon: string;
  n: string;
  title: string;
  desc: string;
  grad: string;
}

export default function CommitmentsAccordion({ commitments }: { commitments: Commitment[] }) {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(42,45,53,0.08)" }} className="grid-3 svc-card-alt">
      {commitments.map((c, i) => (
        <ScrollReveal key={c.n} delay={i * 70}>
          <div className="svc-card" style={{ borderRadius:0 }}>
            <div className="gold-accent"></div>
            <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:14 }}>
              <span className="eyebrow" style={{ color:"var(--gold)",margin:0 }}>{c.n}</span>
            </div>
            <h3 className="svc-card-title">{c.title}</h3>
            <p className="svc-card-desc">{c.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
