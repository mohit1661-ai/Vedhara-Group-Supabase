import type { Metadata } from "next";
import Link from "next/link";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title:"Privacy Policy | Vedhara Group", description:"Vedhara Group privacy policy, how we collect, use, and protect your personal information.", alternates:{ canonical:"https://www.vedharagroup.com/privacy" } };

const sections = [
  ["Information We Collect","We collect information you provide directly (name, phone, email, enquiry details) and standard analytics data. We do not sell your personal information to third parties. In some cases, we may collect property-related documents when you request specific advisory services."],
  ["How We Use It","We use your contact information to respond to consultation requests and provide the service you have requested. Analytics data is used to improve the website experience. We may use your contact details to send service-related communications and, with your consent, periodic market insights such as the Ground Report."],
  ["Data Storage","Contact form submissions are stored securely on encrypted servers. We retain enquiry data for a maximum of 2 years or until you request deletion. Transaction-related records may be retained longer to comply with legal and regulatory obligations."],
  ["Third-Party Sharing","We do not sell, rent, or trade your personal data. We may share data with service providers (e.g., CRM, email delivery) who process data on our behalf under strict confidentiality agreements. We do not share data with developers or third-party marketers without your explicit consent."],
  ["Your Rights","You may request access to, correction of, or deletion of your personal data at any time by emailing contact@vedharagroup.com. You may also withdraw consent for marketing communications at any time."],
  ["Contact","For privacy-related queries or data requests: contact@vedharagroup.com or +91 98106 47063."],
];

export default function PrivacyPage() {
  return (
    <>
      <VideoHeroSection>
        <span className="v-line" style={{ margin:"0 auto 14px" }} />
        <h1 style={{ fontFamily:"var(--t-display)",fontStyle:"italic",fontWeight:300,fontSize:"clamp(32px,5vw,56px)",color:"var(--light)",lineHeight:1.1,marginBottom:14 }}>Privacy Policy</h1>
        <p className="body-sm" style={{ color:"rgba(252,250,244,0.35)" }}>Last updated: July 2026</p>
      </VideoHeroSection>

      {/* Gold differentiator */}
      <div style={{ background:"var(--navy)",padding:"0 32px" }}>
        <div style={{ width:"100%",height:1.5,background:"linear-gradient(90deg,transparent,var(--gold),var(--gold-lt),var(--gold),transparent)",opacity:0.4 }} />
      </div>

      {/* Intro block */}
      <div style={{ background:"var(--cream)",textAlign:"center",padding:"48px 32px 0" }}>
        <div style={{ maxWidth:700,margin:"0 auto" }}>
          <ScrollReveal>
            <span className="v-line" style={{ margin:"0 auto 14px" }} />
            <p className="eyebrow" style={{ color:"var(--gold-dk)",marginBottom:14 }}>Your Privacy Matters</p>
            <h2 className="heading-xl" style={{ color:"var(--navy)",marginBottom:16 }}>
              How We Handle<br /><span style={{ color:"var(--gold-dk)" }}>Your Data</span>
            </h2>
            <p className="body-lg" style={{ color:"var(--slate)",lineHeight:1.8 }}>
              Vedhara Group respects your privacy. This policy explains what information we collect, how we use it, and what rights you have over your data.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section style={{ background:"var(--cream)",padding:"60px 32px" }}>
        <div style={{ maxWidth:760,margin:"0 auto" }}>
          {sections.map(([t,b],i)=>(
            <ScrollReveal key={t} delay={i*60}>
              <div style={{ marginBottom:36,paddingBottom:36,borderBottom:"1px solid rgba(42,45,53,0.08)" }}>
                <h2 className="heading-md" style={{ color:"var(--gold-dk)",marginBottom:12 }}>{t}</h2>
                <p className="body-md" style={{ color:"var(--slate)",lineHeight:1.8 }}>{b}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
