import type { Metadata } from "next";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Real Estate FAQ | Delhi NCR Property Advice", description:"Clear, verified answers to the most common Delhi NCR real estate questions: buying costs, stamp duty, RERA, home loans, NRI rules and rentals.", alternates:{ canonical:"https://www.vedharagroup.com/faq" } };

const topics = [
  { title:"Buying Process", desc:"Base prices, stamp duty, GST, home loans, and documentation, everything that goes into buying a property in Delhi NCR." },
  { title:"RERA & Legal", desc:"RERA protections, EDC/IDC, registration, agreements, and the legal checks that keep your transaction safe." },
  { title:"NRI Services", desc:"What NRIs can buy, home loans, Power of Attorney, and NRE/NRO banking rules for property in India." },
  { title:"Selling & Pricing", desc:"How properties are priced, capital gains tax, documentation, and how to get a fair value for your asset." },
  { title:"Investment Advisory", desc:"Micro-market analysis, rental yields, capital appreciation, and Vedhara's independent advisory approach." },
  { title:"Rentals", desc:"Tenant screening, rent agreements, security deposits, and property management for owners and tenants." },
];

const faqGroups = [
  {
    label:"Buying a Property in Delhi NCR",
    icon:"🏠",
    faqs:[
      { q:"What are the total costs involved in buying a property in Delhi NCR?", a:"Total acquisition cost includes: Base price + PLC (preferential location charges) + EDC/IDC (external/internal development charges) + GST (5% for under-construction, nil for ready) + Stamp duty (4–7% depending on state and buyer category) + Registration charge (1%) + Brokerage if applicable. All-in costs typically add 12–18% above base price for under-construction properties. Vedhara itemises every cost in writing before you commit." },
      { q:"Should I buy a ready-to-move or under-construction property?", a:"Ready-to-move properties eliminate construction risk and allow immediate possession, but typically carry a price premium and full stamp duty upfront. Under-construction properties offer deferred payment through construction-linked plans and potential for lower entry prices, but carry delivery risk and GST at 5%. The right choice depends on your financial position, risk tolerance, and how urgently you need possession. Your Vedhara advisor can model both scenarios side by side." },
      { q:"What documents do I need to buy a property in Delhi NCR?", a:"You will typically need: government-issued photo ID (Aadhaar, PAN, passport), proof of address, income documents for home loan eligibility, and, for the property itself, the title deed, RERA registration number, approved layout plan, occupancy certificate (for ready properties), and a recent property tax receipt. Vedhara's verification team checks the complete chain of title before recommending any property." },
      { q:"What is stamp duty and registration in Delhi NCR, and who pays it?", a:"Stamp duty is a state-level tax on the transfer of property ownership, ranging from about 4% to 7% depending on the state (Delhi, Haryana, UP) and the buyer's gender and category. Registration charges are typically a flat 1% of the property value. The buyer pays both. Stamp duty on a ready-to-move property is calculated on the full value, while under-construction projects are typically registered and stamped at a later stage. These charges are non-negotiable and must be factored into your budget." },
      { q:"How do I apply for a home loan in India as a first-time buyer?", a:"First-time buyers can usually borrow up to 80–90% of the property value, depending on the lender and their income profile. You will need your PAN, Aadhaar, bank statements, income tax returns, and employment details. Interest rates vary between banks and NBFCs, and several lenders offer lower rates for women co-applicants (which also reduce stamp duty in some states). Vedhara can shortlist lenders and help you compare offers, but we never push any specific bank's loan." },
    ],
  },
  {
    label:"RERA, Legal & Compliance",
    icon:"⚖️",
    faqs:[
      { q:"What is RERA and how does it protect property buyers in Delhi NCR?", a:"RERA (Real Estate Regulatory Authority) is a central government Act administered by state-level authorities, HRERA in Haryana, UP RERA in Uttar Pradesh, and Delhi RERA in Delhi. It mandates developer registration, requires regular construction progress reporting, caps advance payment at 10% before agreement, and provides a complaint mechanism for buyers against builders. Every project Vedhara recommends is verified for RERA registration before listing." },
      { q:"Is Vedhara Group a builder or a broker?", a:"Neither in the traditional sense. Vedhara Group is an independent real estate advisory and brokerage firm. We are not a builder (we don't develop properties). We are a RERA-compliant property advisor and channel partner who represents buyers, sellers, investors, and NRIs, and lists verified projects from developer partners. Our independence means we have no developer inventory to push; advice comes first." },
      { q:"What are EDC, IDC, and PLC charges on new projects?", a:"EDC (External Development Charges) and IDC (Internal Development Charges) fund infrastructure such as roads, sewers, electricity, and common areas, and are set by the state authority. PLC (Preferential Location Charges) is a premium for units with a preferred view or location within a project, such as park-facing or corner units. These are added to the base price and should be itemised in the allotment letter. Always ask for a full cost sheet that lists EDC, IDC, and PLC separately." },
      { q:"Is an 11-month rent agreement legally valid in Delhi NCR?", a:"Yes. 11-month agreements are legally valid and widely used across Delhi NCR specifically to avoid the mandatory registration requirement that applies to agreements of 12 months or more. For higher-value rentals, Vedhara recommends registered agreements regardless of tenure to strengthen enforceability and protect both owner and tenant." },
      { q:"Do I need a lawyer when buying a property in India?", a:"While not mandatory, an independent legal review of the title documents is strongly recommended for any high-value transaction. A lawyer or a verification specialist checks the chain of title, encumbrances, pending litigation, and municipal dues. Vedhara's Verification Framework performs these checks internally, and we will flag any risk we find rather than push the deal through." },
    ],
  },
  {
    label:"NRI Property Purchase & Rules",
    icon:"🌏",
    faqs:[
      { q:"What properties can an NRI buy in India?", a:"NRIs and PIOs can purchase residential property and commercial property in India without RBI approval. Agricultural land, plantation property, and farmhouses generally cannot be purchased by NRIs without specific RBI permission. All purchase consideration must flow through NRE or NRO banking channels, and the property can be held in the NRI's own name or jointly with another NRI or an Indian resident." },
      { q:"Can NRIs take a home loan in India?", a:"Yes. NRIs are eligible for home loans from Indian banks and NBFCs for residential property. Loan-to-value ratios are typically up to 75–90% for NRIs depending on the lender and property. You will need to provide income documents from your country of residence, and the loan is usually repaid through NRE or NRO accounts. Several banks offer pre-approved NRI home loans that can be processed fully online." },
      { q:"Do NRIs need a Power of Attorney to buy property in India?", a:"An NRI who cannot be physically present in India can authorise a trusted person to act on their behalf through a General Power of Attorney (GPA) or a Special Power of Attorney (SPA) for a specific property transaction. The Power of Attorney must be notarised in the country where it is executed and, in many cases, apostilled or attested by the Indian Embassy. Vedhara coordinates GPA documentation and can recommend reliable attorneys for remote buyers." },
      { q:"How do NRE and NRO accounts work for property transactions?", a:"An NRE (Non-Resident External) account holds funds earned abroad and allows free repatriation; an NRO (Non-Resident Ordinary) account holds income earned in India with repatriation limited to USD 1 million per financial year. For property purchases, the consideration can be paid from either account, but when the property is later sold, the sale proceeds can only be repatriated if the purchase was funded through banking channels. Keep every transfer receipt to make future sale proceeds fully repatriable." },
    ],
  },
  {
    label:"Selling Your Property & Pricing",
    icon:"📈",
    faqs:[
      { q:"How should I price my property in Delhi NCR?", a:"A realistic price is based on recent comparable sales (comps) in your micro-market, adjusted for floor, facing, age, legal clearances, and amenities, not on what other sellers are asking. Overpricing leads to long listing periods and eventually a lower sale price. Vedhara prepares a pricing analysis from verified transaction data and will tell you honestly if your expectation is above the market." },
      { q:"What is capital gains tax when I sell my property?", a:"Profits from selling a property are subject to capital gains tax. For properties held over 24 months, gains are treated as long-term and taxed at 20% with indexation benefit; for short-term holdings, gains are added to your income and taxed at your slab rate. You can reduce tax by reinvesting in another residential property under Section 54 or in specified capital gains bonds under Section 54EC, subject to conditions. Vedhara recommends consulting a tax professional before structuring the sale." },
      { q:"What documents do I need to sell my property in India?", a:"You will need the original title deed, the sale agreement, the latest property tax receipts, the approved building plan, the occupancy certificate (if applicable), and a no-objection certificate from the housing society or association where relevant. Buyers and banks will also ask for the previous chain of sale deeds to verify an unbroken title. Vedhara can help you assemble a complete, bank-ready document file." },
    ],
  },
  {
    label:"Investment & Advisory",
    icon:"💼",
    faqs:[
      { q:"What is Vedhara's independent investment advisory approach?", a:"Vedhara does not earn commission by pushing any developer's inventory. Every recommendation starts with the client's requirement, budget, and timeline, not our margin. We analyse micro-markets, infrastructure developments, rental demand, and price trends before shortlisting, and we will tell you when a property is not a good buy even if it means losing the engagement." },
      { q:"Which NCR micro-markets are currently strong for investment?", a:"Investment strength depends on your horizon and budget. Emerging corridors near new expressways, metro extensions, and upcoming commercial hubs, such as parts of New Gurugram, Dwarka Expressway, and select Noida and Greater Noida zones, have shown meaningful appreciation. Rental demand is strongest near IT corridors and education hubs. Vedhara publishes a monthly Ground Report with micro-market data to help you decide on evidence rather than hype." },
      { q:"What is the minimum investment to start in Delhi NCR real estate?", a:"Entry points vary widely by location and project type. Budget micro-markets may offer units from roughly ₹30–40 lakh, mid-market options from ₹60 lakh to ₹1.2 crore, and luxury or commercial investment from ₹2 crore upward. Construction-linked payment plans can spread the outlay over several years. Vedhara will help you identify realistic options for your budget rather than showing properties above your means." },
    ],
  },
  {
    label:"Rentals & Property Management",
    icon:"🔑",
    faqs:[
      { q:"How does Vedhara screen tenants?", a:"Every prospective tenant undergoes identity verification, employment checks, prior landlord references, and credit history review before we present them to the owner. Owners see the full verification dossier and approve the shortlist. This five-point screening significantly reduces the risk of defaults and disputes." },
      { q:"What does Vedhara's property management service include?", a:"Our property management service covers tenant sourcing and screening, lease drafting and registration, rent collection, maintenance coordination, vendor management, and monthly reporting with photo and video walkthroughs. It is built for NRI and investor owners who need remote, hands-off management with full transparency." },
      { q:"Who pays the security deposit, and how is it returned?", a:"The tenant typically pays a security deposit equal to 1–3 months of rent, held by the owner for the lease term. It is returned (less agreed deductions for damage beyond normal wear and tear) when the tenant vacates and the property is handed back. Vedhara documents the property's condition at move-in and move-out with photos so the deposit process is fair and dispute-free." },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ name:"Home", href:"/" },{ name:"FAQ", href:"/faq" }]} />
      <VideoHeroSection>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>FAQ Hub</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Real Estate Questions,<br /><span style={{ color:"var(--gold-lt)" }}>Answered Honestly.</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(255,255,255,0.85)",maxWidth:580,margin:"0 auto" }}>Whether you are buying your first property in Noida, selling a flat in Gurugram, or investing from the UAE, straight answers without a sales pitch.</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 48px" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Common Questions</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              Everything You Need to Know<br /><span style={{ color:"#d4a843" }}>Before Your Next Move</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              From RERA regulations to stamp duty rates, NRI investment rules to rental agreements, find clear answers to the most common property questions we hear every day at Vedhara. Every answer is grounded in current rules and micro-market data, never generic advice.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Browse by Topic – Vibrant Cream Cards on Navy */}
      <section style={{ background:"var(--navy)",padding:"56px 32px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"10%",right:"-8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:12 }}>Browse by Topic</p>
              <h2 className="heading-xl" style={{ color:"var(--light)",marginBottom:12 }}>
                Find the Answer,<br /><span style={{ color:"var(--gold-lt)" }}>Skip the Jargon</span>
              </h2>
              <p className="body-lg" style={{ color:"rgba(252,250,244,0.5)",maxWidth:600,margin:"0 auto" }}>
                Six topics cover the questions we answer most, each one explained in plain language, backed by the rules that actually apply.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="grid-3">
            {topics.map((t,i)=>(
              <ScrollReveal key={t.title} delay={i*70} style={{ display:"flex" }}>
                <div className="hover-lift" style={{ background:"var(--cream)",border:"1px solid rgba(212,168,67,0.2)",borderRadius:16,overflow:"hidden",flex:1,display:"flex",flexDirection:"column",boxShadow:"0 8px 24px rgba(0,0,0,0.15)" }}>
                  <div style={{ height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-lt),var(--gold))",flexShrink:0 }} />
                  <div style={{ padding:"24px 20px 24px",flex:1,display:"flex",flexDirection:"column",textAlign:"center" }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:12 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:7.5,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"2px 7px",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",color:"var(--navy)",borderRadius:3,flexShrink:0 }}>Vedhara</span>
                    </div>
                    <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--gold),var(--gold-lt))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",flexShrink:0 }}>
                      <span style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)" }}>{i+1}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--t-head)",fontSize:14,fontWeight:700,color:"var(--navy)",marginBottom:8,lineHeight:1.3 }}>{t.title}</h3>
                    <p className="body-sm" style={{ color:"var(--slate)",fontSize:12,lineHeight:1.7,flex:1 }}>{t.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delhi NCR at a Glance – Navy + Cream Card Pair */}
      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign:"center",marginBottom:48 }}>
              <span className="v-line" style={{ margin:"0 auto 14px" }} />
              <p className="eyebrow" style={{ color:"#d4a843",marginBottom:14 }}>Quick Reference</p>
              <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
                Delhi NCR Property Rules,<br /><span style={{ color:"#d4a843" }}>At a Glance</span>
              </h2>
              <p className="body-lg" style={{ color:"var(--slate)",maxWidth:620,margin:"0 auto" }}>
                The numbers and rules that matter most, summarised from current government rates and RERA requirements, and how Vedhara answers your questions on top of them.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }} className="grid-2">
            {/* Key Numbers – Navy */}
            <ScrollReveal>
              <div className="gold-frame-card gfc-navy" style={{ padding:"44px 36px",boxShadow:"0 16px 40px rgba(9,15,29,0.2)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-lt)",marginBottom:14 }}>The Numbers</p>
                <h2 className="heading-lg" style={{ color:"var(--light)",marginBottom:24 }}>Costs &amp; Rules That Apply</h2>
                <p className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.8,marginBottom:24 }}>
                  These figures reflect current norms across Delhi NCR. State-specific rates vary, and your advisor will confirm the exact numbers for your transaction.
                </p>
                {["Stamp duty between 4% and 7% depending on the state and buyer category","Registration charge of 1% of the property value in most NCR states","GST of 5% on under-construction properties; nil on ready-to-move","RERA registration mandatory for all new residential projects before sale","NRI buyers can purchase residential and commercial property without RBI approval","Long-term capital gains taxed at 20% with indexation after 24 months of holding"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:16,fontWeight:700,lineHeight:1 }}>✓</span>
                    <span className="body-md" style={{ color:"rgba(252,250,244,0.78)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* How We Answer – Cream */}
            <ScrollReveal delay={120} direction="right">
              <div className="gold-frame-card gfc-cream" style={{ padding:"44px 36px",boxShadow:"0 8px 24px rgba(9,15,29,0.06)" }}>
                <span className="v-line" style={{ background:"var(--gold)" }} />
                <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>How We Answer</p>
                <h2 className="heading-lg" style={{ color:"var(--navy)",marginBottom:24 }}>Our Promise to You</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8,marginBottom:24 }}>
                  A good answer starts with the right question. Here is how we make sure the advice you get is accurate, current, and genuinely useful.
                </p>
                {["Every answer is grounded in current RERA rules and micro-market data, not generic advice","We verify facts against project RERA numbers, government circulars, and bank lending rates","You get a named advisor, not a call centre, for every follow-up question","No cost and no obligation for the first consultation; we answer first and advise later","If a question is outside our expertise, we say so and point you to a trusted specialist","We never manufacture urgency: if the right move is to wait, we will tell you"].map(item=>(
                  <div key={item} style={{ display:"flex",gap:14,marginBottom:14,alignItems:"flex-start" }}>
                    <span style={{ color:"var(--gold)",flexShrink:0,marginTop:2,fontSize:14,lineHeight:1 }}>◆</span>
                    <span className="body-md" style={{ color:"var(--slate)",lineHeight:1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FAQSection
        title="Delhi NCR Property FAQ"
        dark={false}
        groups={faqGroups}
        decor
      />
      <CTASection />
    </>
  );
}
