import type { Metadata } from "next";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import FAQSection from "@/components/sections/FAQSection";
export const metadata: Metadata = { title:"Real Estate FAQ | Property Buying, Selling, NRI & Investment Questions | Vedhara Group Delhi NCR", description:"Answers to the most common real estate questions in Delhi NCR, buying process, RERA, stamp duty, NRI property, home loans, rental agreements, and investment advisory.", alternates:{ canonical:"https://www.vedharagroup.com/faq" } };
const faqs = [
  { q:"Is Vedhara Group a builder or a broker?", a:"Neither in the traditional sense. Vedhara Group is an independent real estate advisory and brokerage firm. We are not a builder (we don't develop properties). We are a RERA-compliant property advisor and channel partner who represents buyers, sellers, investors, and NRIs, and lists verified projects from developer partners." },
  { q:"What are the total costs involved in buying a property in Delhi NCR?", a:"Total acquisition cost includes: Base price + PLC (preferential location charges) + EDC/IDC (external/internal development charges) + GST (5% for under-construction, nil for ready) + Stamp duty (4–7% depending on state and buyer category) + Registration charge (1%) + Brokerage if applicable. All-in costs typically add 12–18% above base price for under-construction properties." },
  { q:"What is RERA and how does it protect property buyers in Delhi NCR?", a:"RERA (Real Estate Regulatory Authority) is a central government Act administered by state-level authorities, HRERA in Haryana, UP RERA in Uttar Pradesh, and Delhi RERA in Delhi. It mandates developer registration, requires regular construction progress reporting, caps advance payment at 10% before agreement, and provides a complaint mechanism for buyers against builders." },
  { q:"Should I buy a ready-to-move or under-construction property?", a:"Ready-to-move properties eliminate construction risk and allow immediate possession, but typically carry a price premium and full stamp duty upfront. Under-construction properties offer deferred payment through construction-linked plans and potential for lower entry prices, but carry delivery risk and GST at 5%. The right choice depends on your financial position, risk tolerance, and how urgently you need possession." },
  { q:"What properties can an NRI buy in India?", a:"NRIs and PIOs can purchase residential property and commercial property in India without RBI approval. Agricultural land, plantation property, and farmhouses generally cannot be purchased by NRIs without specific RBI permission. All purchase consideration must flow through NRE or NRO banking channels." },
  { q:"Is an 11-month rent agreement legally valid in Delhi NCR?", a:"Yes. 11-month agreements are legally valid and widely used across Delhi NCR specifically to avoid the mandatory registration requirement that applies to agreements of 12 months or more. For higher-value rentals, Vedhara recommends registered agreements regardless of tenure." },
  { q:"Is the initial consultation genuinely free?", a:"Yes. Vedhara's initial consultation has no cost and no minimum engagement requirement. We ask for 30–45 minutes to understand your goals; in return, you receive an honest, informed perspective on what is achievable and realistic in your target market." },
  { q:"How quickly will Vedhara respond to an enquiry?", a:"Contact form and WhatsApp enquiries are responded to within 24 business hours. For urgent requirements, WhatsApp is the fastest channel, direct to the advisory team, not a call centre." },
];
export default function Page() {
  return (
    <>
      <VideoHeroSection>
          <span className="v-line" style={{ margin:"0 auto 14px" }} />
          <p className="eyebrow" style={{ marginBottom:18 }}>FAQ Hub</p>
          <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5.5vw,64px)",color:"var(--light)",lineHeight:1.05,marginBottom:24 }}>
            Real Estate Questions,<br /><span style={{ color:"var(--gold-lt)" }}>Answered Honestly.</span>
          </h1>
          <p className="body-lg" style={{ color:"rgba(252,250,244,0.52)",maxWidth:520,margin:"0 auto" }}>Whether you are buying your first property in Noida, selling a flat in Gurugram, or investing from the UAE, straight answers without a sales pitch.</p>
        </VideoHeroSection>
      <FAQSection faqs={faqs} title="Delhi NCR Property FAQ" />
    </>
  );
}
