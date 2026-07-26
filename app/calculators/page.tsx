"use client";
import { useState } from "react";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

function ROICalculator() {
  const [v, setV] = useState({ price:"8000000",rent:"28000",app:"6",years:"5",maint:"1" });
  const s = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setV(p=>({...p,[k]:e.target.value}));
  const p=+v.price||0, r=+v.rent||0, app=+v.app||0, y=+v.years||0, m=+v.maint||0;
  const ar=r*12, am=(p*m)/100, gy=p>0?(ar/p)*100:0, ny=p>0?((ar-am)/p)*100:0;
  const rv=p*Math.pow(1+app/100,y), tr=ar*y, tg=(rv-p)+tr;
  const roi=p>0&&y>0?((Math.pow((p+tg)/p,1/y)-1)*100):0;
  const fmt=(n:number)=>"₹"+n.toLocaleString("en-IN",{maximumFractionDigits:0});
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
      <div>
        <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:8 }}>ROI &amp; Rental Yield Calculator</h3>
        <p className="body-sm" style={{ color:"var(--slate)",marginBottom:20 }}>Estimate gross yield, net yield, and total return over your holding period.</p>
        {[{l:"Purchase Price (₹)",k:"price"},{l:"Expected Monthly Rent (₹)",k:"rent"},{l:"Expected Annual Appreciation (%)",k:"app"},{l:"Holding Period (Years)",k:"years"},{l:"Annual Maintenance (% of Value)",k:"maint"}].map(f=>(
          <div key={f.k} style={{ marginBottom:14 }}>
            <label className="input-label">{f.l}</label>
            <input type="number" value={v[f.k as keyof typeof v]} onChange={s(f.k)} className="input-field" />
          </div>
        ))}
      </div>
      <div style={{ background:"var(--navy)",padding:"28px 24px" }}>
        <h4 className="eyebrow" style={{ color:"var(--gold)",marginBottom:20 }}>Results</h4>
        {[{l:"Gross Rental Yield",val:`${gy.toFixed(2)}%`,h:false},{l:"Net Rental Yield",val:`${ny.toFixed(2)}%`,h:true},{l:"Projected Resale Value",val:fmt(rv),h:false},{l:"Total Rental Income (period)",val:fmt(tr),h:false},{l:"Total Gain (Appreciation + Rent)",val:fmt(tg),h:false},{l:"Annualised ROI",val:`${roi.toFixed(1)}%`,h:true}].map(row=>(
          <div key={row.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <span className="body-sm" style={{ color:"rgba(255,255,255,0.5)" }}>{row.l}</span>
            <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:row.h?"var(--gold-lt)":"var(--light)" }}>{row.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EMICalculator() {
  const [v, setV] = useState({ loan:"5000000",rate:"8.5",tenure:"20" });
  const s = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setV(p=>({...p,[k]:e.target.value}));
  const p=+v.loan||0, r=(+v.rate||0)/100/12, n=(+v.tenure||0)*12;
  const emi=r>0&&n>0?(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1):0;
  const total=emi*n, interest=total-p;
  const fmt=(n:number)=>"₹"+n.toLocaleString("en-IN",{maximumFractionDigits:0});
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
      <div>
        <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:8 }}>Home Loan EMI Calculator</h3>
        <p className="body-sm" style={{ color:"var(--slate)",marginBottom:20 }}>Monthly EMI, total interest, and full amortisation schedule using the standard reducing-balance formula, identical to bank calculations.</p>
        {[{l:"Loan Amount (₹)",k:"loan"},{l:"Annual Interest Rate (%)",k:"rate"},{l:"Loan Tenure (Years)",k:"tenure"}].map(f=>(
          <div key={f.k} style={{ marginBottom:14 }}>
            <label className="input-label">{f.l}</label>
            <input type="number" value={v[f.k as keyof typeof v]} onChange={s(f.k)} className="input-field" />
          </div>
        ))}
      </div>
      <div style={{ background:"var(--navy)",padding:"28px 24px" }}>
        <h4 className="eyebrow" style={{ color:"var(--gold)",marginBottom:20 }}>Results</h4>
        {[{l:"Monthly EMI",val:fmt(emi),h:true},{l:"Total Interest Payable",val:fmt(interest),h:false},{l:"Total Payment (Principal + Interest)",val:fmt(total),h:false},{l:"Principal (Loan Amount)",val:fmt(p),h:false}].map(row=>(
          <div key={row.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <span className="body-sm" style={{ color:"rgba(255,255,255,0.5)" }}>{row.l}</span>
            <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:row.h?"var(--gold-lt)":"var(--light)" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ marginTop:16,padding:"12px",background:"rgba(184,146,42,0.08)",border:"1px solid rgba(184,146,42,0.15)" }}>
          <p className="body-sm" style={{ color:"rgba(255,255,255,0.4)",margin:0 }}>Uses standard reducing-balance formula, identical to bank calculations.</p>
        </div>
      </div>
    </div>
  );
}

function StampDutyCalculator() {
  const rates:Record<string,{g:number;w:number;reg:number;name:string}> = {
    delhi:{g:6,w:4,reg:1,name:"Delhi"}, haryana:{g:7,w:5,reg:1,name:"Haryana"},
    up:{g:7,w:6,reg:1,name:"Uttar Pradesh"}, rajasthan:{g:6,w:5,reg:1,name:"Rajasthan"},
    maharashtra:{g:5,w:4,reg:1,name:"Maharashtra"},
  };
  const [state,setState]=useState("delhi"), [value,setValue]=useState("10000000"), [gender,setGender]=useState("general");
  const r=rates[state], v=+value||0, sr=gender==="women"?r.w:r.g;
  const stamp=(v*sr)/100, reg=(v*r.reg)/100, total=stamp+reg;
  const fmt=(n:number)=>"₹"+n.toLocaleString("en-IN",{maximumFractionDigits:0});
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
      <div>
        <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:8 }}>Stamp Duty &amp; Registration Calculator</h3>
        <p className="body-sm" style={{ color:"var(--slate)",marginBottom:20 }}>State-wise stamp duty and registration charges. Current rates for Delhi, Haryana, UP, Rajasthan, and Maharashtra. Verify rates before transacting.</p>
        <div style={{ marginBottom:14 }}>
          <label className="input-label">State</label>
          <select value={state} onChange={e=>setState(e.target.value)} className="input-field">
            {Object.entries(rates).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:14 }}>
          <label className="input-label">Property Value (₹)</label>
          <input type="number" value={value} onChange={e=>setValue(e.target.value)} className="input-field" />
        </div>
        <div style={{ marginBottom:14 }}>
          <label className="input-label">Buyer Category</label>
          <select value={gender} onChange={e=>setGender(e.target.value)} className="input-field">
            <option value="general">General</option>
            <option value="women">Woman Owner (lower rate)</option>
          </select>
        </div>
      </div>
      <div style={{ background:"var(--navy)",padding:"28px 24px" }}>
        <h4 className="eyebrow" style={{ color:"var(--gold)",marginBottom:20 }}>Results, {r.name}</h4>
        {[{l:`Stamp Duty (${sr}%)`,val:fmt(stamp),h:false},{l:`Registration Charge (${r.reg}%)`,val:fmt(reg),h:false},{l:"Total Payable",val:fmt(total),h:true},{l:"Property Value",val:fmt(v),h:false}].map(row=>(
          <div key={row.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <span className="body-sm" style={{ color:"rgba(255,255,255,0.5)" }}>{row.l}</span>
            <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:row.h?"var(--gold-lt)":"var(--light)" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ marginTop:16,padding:"12px",background:"rgba(184,146,42,0.08)",border:"1px solid rgba(184,146,42,0.15)" }}>
          <p className="body-sm" style={{ color:"rgba(255,255,255,0.4)",margin:0 }}>Rates are indicative. Verify with sub-registrar office before any transaction.</p>
        </div>
      </div>
    </div>
  );
}

function AffordabilityCalculator() {
  const [v, setV] = useState({ income:"150000",existing:"0",down:"2000000",rate:"8.5",tenure:"20" });
  const s = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setV(p=>({...p,[k]:e.target.value}));
  const inc=+v.income||0, ex=+v.existing||0, down=+v.down||0;
  const r=(+v.rate||0)/100/12, n=(+v.tenure||0)*12;
  const maxEmi=inc*0.45-ex;
  const maxLoan=maxEmi>0&&r>0?maxEmi*(Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n)):0;
  const budget=maxLoan+down;
  const fmt=(n:number)=>"₹"+n.toLocaleString("en-IN",{maximumFractionDigits:0});
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
      <div>
        <h3 className="heading-md" style={{ color:"var(--navy)",marginBottom:8 }}>Affordability Calculator</h3>
        <p className="body-sm" style={{ color:"var(--slate)",marginBottom:20 }}>Realistic property budget based on the standard 40–50% Fixed Obligation to Income Ratio (FOIR) used by Indian lenders. This calculator conservatively uses 45%.</p>
        {[{l:"Monthly Gross Income (₹)",k:"income"},{l:"Existing Monthly EMIs (₹)",k:"existing"},{l:"Available Down Payment (₹)",k:"down"},{l:"Expected Interest Rate (%)",k:"rate"},{l:"Preferred Loan Tenure (Years)",k:"tenure"}].map(f=>(
          <div key={f.k} style={{ marginBottom:14 }}>
            <label className="input-label">{f.l}</label>
            <input type="number" value={v[f.k as keyof typeof v]} onChange={s(f.k)} className="input-field" />
          </div>
        ))}
      </div>
      <div style={{ background:"var(--navy)",padding:"28px 24px" }}>
        <h4 className="eyebrow" style={{ color:"var(--gold)",marginBottom:20 }}>Results</h4>
        {[{l:"Max Affordable Monthly EMI",val:fmt(maxEmi),h:false},{l:"Maximum Loan Eligibility",val:fmt(maxLoan),h:false},{l:"Realistic Property Budget",val:fmt(budget),h:true},{l:"Down Payment Available",val:fmt(down),h:false}].map(row=>(
          <div key={row.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <span className="body-sm" style={{ color:"rgba(255,255,255,0.5)" }}>{row.l}</span>
            <span style={{ fontFamily:"var(--t-head)",fontSize:15,fontWeight:700,color:row.h?"var(--gold-lt)":"var(--light)" }}>{row.val}</span>
          </div>
        ))}
        <div style={{ marginTop:16,padding:"12px",background:"rgba(184,146,42,0.08)",border:"1px solid rgba(184,146,42,0.15)" }}>
          <p className="body-sm" style={{ color:"rgba(255,255,255,0.4)",margin:0 }}>Based on 45% FOIR. Actual eligibility depends on your lender, credit score, and employer type.</p>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id:"roi",   icon:"📊", label:"ROI & Rental Yield" },
  { id:"emi",   icon:"🏦", label:"EMI Calculator" },
  { id:"stamp", icon:"📋", label:"Stamp Duty" },
  { id:"afford",icon:"💡", label:"Affordability" },
];

const faqs = [
  { q:"Are the stamp duty rates in the calculator current?", a:"The stamp duty calculator uses rates verified at the time of publishing and updated when state governments revise rates through official notification. Always verify the applicable rate with the relevant state's sub-registrar office or stamp vendor before transacting, as local cess, surcharges, or revised notifications may apply." },
  { q:"What is the difference between gross and net rental yield?", a:"Gross rental yield is annual rent divided by property price, a simple, widely-used metric. Net rental yield deducts annual maintenance costs (typically 1% of property value), property tax, and vacancy periods from the annual rent before calculating yield. Net yield is a more realistic measure of actual investment return." },
  { q:"What FOIR do Indian banks use for home loan eligibility?", a:"Most Indian banks and HFCs apply a Fixed Obligation to Income Ratio (FOIR) of 40% to 50%, meaning your total monthly loan EMIs should not exceed 40–50% of your gross monthly income. Our affordability calculator conservatively uses 45%; confirm with your specific lender." },
  { q:"How accurate is the EMI calculator?", a:"The EMI calculator uses the standard reducing-balance formula: EMI = P × r × (1+r)^n / ((1+r)^n – 1). This is the same formula all Indian banks use. Your actual bank EMI may differ marginally due to processing fees or specific bank calculation conventions, but the difference is typically less than ₹50–100 per lakh." },
];

export default function CalculatorsPage() {
  const [active, setActive] = useState("roi");
  return (
    <>
      <VideoHeroSection videoSrc="/videos/Real%20Estate%20Calculator.mp4">
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>Free Tools</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Four Free Property Calculators,<br /><span style={{ color:"var(--gold-lt)" }}>No Sign-Up, No Phone Number.</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:520,margin:"0 auto" }}>
            Every property decision in Delhi NCR comes down to numbers. These four tools are free, instant, and available without sharing your contact details. Run the numbers first. Then talk to an advisor.
          </p>
        </VideoHeroSection>

      <section style={{ background:"var(--cream)",padding:"72px 32px" }}>
        <div style={{ maxWidth:980,margin:"0 auto" }}>
          <div style={{ display:"flex",gap:2,flexWrap:"wrap",marginBottom:36,borderBottom:"2px solid rgba(42,45,53,0.08)" }}>
            {tabs.map(tab=>(
              <button key={tab.id} onClick={()=>setActive(tab.id)}
                style={{ fontFamily:"var(--t-head)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",padding:"12px 22px",border:"none",cursor:"pointer",background:active===tab.id?"var(--navy)":"transparent",color:active===tab.id?"white":"var(--slate)",borderBottom:active===tab.id?"2px solid var(--gold)":"2px solid transparent",transition:"all 0.25s",display:"inline-flex",alignItems:"center",gap:7 }}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <ScrollReveal>
            {active==="roi"    && <ROICalculator />}
            {active==="emi"    && <EMICalculator />}
            {active==="stamp"  && <StampDutyCalculator />}
            {active==="afford" && <AffordabilityCalculator />}
          </ScrollReveal>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Calculator FAQ" />
    </>
  );
}
