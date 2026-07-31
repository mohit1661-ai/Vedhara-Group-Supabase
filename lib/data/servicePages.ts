import type { ServicePageContent } from "@/components/templates/ServicePageTemplate";

export const servicePages: Record<string, ServicePageContent> = {
  buy: {
    slug: "buy",
    eyebrow: "Buy With Confidence",
    h1: "Browse Verified Properties",
    h1Accent: "Independent Advice",
    intro:
      "Trust our expert guidance through verified listings, from initial shortlisting to final paperwork, with your interests always first.",
    included: [
      "Goal-mapping session to understand budget, location priorities, and long-term plans",
      "Curated shortlist based on the Vedhara Verification Framework, not a flood of irrelevant listings",
      "Independent site visits with honest, unfiltered assessments",
      "Legal and title due diligence support before any commitment",
      "Price negotiation support grounded in comparable market data",
      "Paperwork, registration, and handover coordination",
    ],
    whoFor: [
      "First-time home buyers who want clarity, not pressure",
      "Families upgrading homes or relocating to a new city",
      "Investors purchasing residential property for rental income or appreciation",
    ],
    faqs: [
      {
        q: "Do I pay Vedhara a fee to buy a property?",
        a: "In most cases, no direct fee is charged to buyers; Vedhara is compensated through standard brokerage commission paid by the seller or developer side, disclosed on the specific listing.",
      },
      {
        q: "Can I see properties that aren't from partner developers?",
        a: "Our listed inventory comes from verified partner developers. If you've already found a property elsewhere and want an independent opinion on it, our advisory team can offer a Second Opinion review as a separate engagement.",
      },
    ],
    ctaLabel: "Start Your Property Search",
  },
  sell: {
    slug: "sell",
    eyebrow: "Sell Strategically",
    h1: "Sell at What Your Property",
    h1Accent: "Is Actually Worth",
    intro:
      "Most sellers either underprice out of urgency or overprice out of attachment. Vedhara helps you price, and sell, based on real market data.",
    included: [
      "Comparative market analysis to determine a realistic, defensible asking price",
      "Access to Vedhara's network of pre-qualified buyers and investors",
      "Marketing guidance, presentation, positioning, and timing strategy",
      "Negotiation support to protect your bottom line",
      "Documentation and registration coordination through to handover",
    ],
    whoFor: [
      "Owners selling a primary residence due to relocation or upgrading",
      "Investors exiting a property as part of portfolio rebalancing",
      "Families managing inherited property sales",
    ],
    faqs: [
      {
        q: "How does Vedhara determine my property's value?",
        a: "We analyse recent comparable transactions in your locality, current demand trends, and the specific condition and positioning of your property, arriving at a price range that is realistic, not aspirational.",
      },
      {
        q: "What if I'm not ready to sell yet but want an opinion?",
        a: "That's exactly the kind of conversation we welcome. Our Portfolio Health Check service is designed for owners who want an honest hold, sell, or rebalance assessment, with no obligation to act.",
      },
    ],
    ctaLabel: "Get a Free Property Valuation",
  },
  rent: {
    slug: "rent",
    eyebrow: "Rent & Lease Advisory",
    h1: "Renting, Done",
    h1Accent: "The Transparent Way",
    intro:
      "Whether you're a tenant searching for the right home or a landlord seeking a reliable tenant, Vedhara ensures the process is transparent and fair for both sides.",
    includedTitle: "For Tenants",
    included: [
      "Verified listings matched to your budget, location, and lifestyle needs",
      "Lease term review so you understand obligations before signing",
      "Support with deposit, documentation, and move-in coordination",
    ],
    whoForTitle: "For Landlords",
    whoFor: [
      "Tenant screening and verification",
      "Market-rate rental pricing guidance",
      "Lease agreement drafting support and renewal management",
    ],
    faqs: [
      {
        q: "Does Vedhara handle rental disputes?",
        a: "While Vedhara is not a legal firm, we help both parties understand lease terms clearly upfront, which is the most effective way to prevent disputes. For active legal matters, we can refer clients to trusted legal partners.",
      },
    ],
    ctaLabel: "Find or List a Rental",
  },
  commercial: {
    slug: "commercial",
    eyebrow: "Commercial Advisory",
    h1: "Commercial Real Estate,",
    h1Accent: "Backed by Data",
    intro:
      "Retail footfall, office accessibility, mixed-use zoning, commercial real estate has its own rules. Vedhara's advisory is built around them.",
    included: [
      "Site selection based on footfall, accessibility, and zoning analysis",
      "Valuation and rent benchmarking against comparable commercial spaces",
      "Lease or purchase negotiation support",
      "Due diligence on commercial title, zoning compliance, and approvals",
    ],
    whoFor: [
      "Retail brands seeking new store locations",
      "Business owners purchasing commercial premises for operations",
      "Investors acquiring commercial assets for rental yield",
    ],
    faqs: [
      {
        q: "Does Vedhara help with corporate office leasing too?",
        a: "Yes, corporate office leasing has its own dedicated advisory covering space planning, location strategy, and lease negotiation. Contact us for details on our corporate leasing support.",
      },
      {
        q: "Is commercial real estate a better investment than residential in Delhi NCR?",
        a: "Commercial assets typically offer higher rental yields (often 7–9% or more) than residential property (commonly 2–4%) in most Delhi NCR micro-markets, with standardised leases and stronger rental growth potential. However, commercial spaces carry higher vacancy risk, larger ticket sizes, and different tax obligations. The right choice depends on your capital, holding horizon, and income goals — Vedhara can run a comparative yield and appreciation analysis on specific assets before you commit.",
      },
      {
        q: "What rental yield can I expect from commercial property in Gurugram or Noida?",
        a: "Gross rental yields for good commercial assets in Gurugram and Noida typically range between 7% and 10%, depending on location, asset class (office, retail, industrial), and lease structure. Pre-leased properties may show a slightly lower initial yield but carry far lower vacancy risk. We benchmark every property against comparable transactions before recommending a purchase.",
      },
      {
        q: "What is a pre-leased commercial property, and is it a good investment?",
        a: "A pre-leased property comes with an existing tenant and a signed lease in place, so you receive rent from day one. These assets generally have lower vacancy risk and are easier to finance, but the purchase price may already reflect the income stream. We verify the tenant profile, lease terms, escalation clauses, and lock-in periods before recommending one.",
      },
      {
        q: "Can NRIs buy commercial property in India, and are there restrictions?",
        a: "Yes, NRIs and OCI card holders can freely purchase commercial property in India, and can repatriate rental income and sale proceeds subject to FEMA and RBI guidelines. Agricultural land and farmhouses remain restricted for NRIs. We coordinate documentation, PAN and bank account setup, and repatriation guidance with our legal and tax partners.",
      },
      {
        q: "What taxes apply on buying or renting commercial property — stamp duty and GST?",
        a: "On purchase, under-construction commercial property attracts 12% GST in addition to stamp duty and registration, whose rates differ across Delhi, Haryana, and Uttar Pradesh. Ready-to-move-in commercial purchases are generally outside GST but still attract stamp duty and registration. Leasing commercial space typically attracts 18% GST. Because rates and surcharges change, we share the current applicable figures for the specific property and recommend a CA review for your exact situation.",
      },
      {
        q: "How is capital gains tax calculated when I sell a commercial property?",
        a: "If you hold the property for more than 24 months, the gain is treated as long-term and currently attracts 12.5% without indexation for sales on or after 23 July 2024; short-term gains are added to your income and taxed at your slab rate. Costs such as stamp duty, brokerage, and capital improvements can be added to your cost basis, and exemptions under Sections 54/54EC may apply to reinvested gains. A chartered accountant can compute the exact liability for your case.",
      },
      {
        q: "How do I choose the right retail or showroom location for my business?",
        a: "We evaluate footfall patterns, catchment demographics, visibility and signage, accessibility and parking, nearby anchor tenants, and current vacancy in the same corridor. We also verify zoning and local compliance so the space is genuinely usable for your business type before you sign anything.",
      },
      {
        q: "What due diligence should I do before buying a commercial property?",
        a: "We run our five-point Verification Framework covering the title chain, developer or builder history, approvals and zoning, encumbrances, and price benchmarking. For commercial assets we additionally review lease deeds (if tenanted), occupancy certificates, fire NOCs, and the municipal or authority approvals relevant to the specific property.",
      },
      {
        q: "Do banks finance commercial property purchases, and what is the typical LTV?",
        a: "Yes, commercial property loans are widely available — typically financing 70–80% of the value with tenures up to 15–20 years and rates usually a little higher than home loans. Loan-to-value and eligibility depend on the property's income potential and your profile. We help shortlist lenders and prepare the documentation.",
      },
      {
        q: "Is it better to buy or lease commercial space for my business?",
        a: "Buying builds equity and protects against rental inflation but locks up capital and reduces flexibility; leasing preserves cash for the business and makes relocation or scaling easier. The right answer depends on your cash flow, growth plans, and tax position. We map the buy-versus-lease economics for your specific requirement before you decide.",
      },
      {
        q: "Which are the best commercial micro-markets in Delhi NCR right now?",
        a: "Gurugram's Golf Course Road and MG Road corridors remain strong for offices and retail, Noida's Sector 18 and the Yamuna Expressway belt for retail and logistics, and the NH-48/NH-8 corridors for industrial and warehousing. The 'best' location depends on your asset class and target tenants — we shortlist based on current demand, rental trends, and absorption data rather than hearsay.",
      },
    ],
    ctaLabel: "Discuss Your Commercial Requirement",
  },
  luxury: {
    slug: "luxury",
    eyebrow: "Luxury Properties",
    h1: "Luxury Properties",
    h1Accent: "Premium Advisory",
    intro:
      "Luxury real estate demands discretion, speed, and an advisor who understands what premium buyers actually value. Vedhara's luxury desk is built for exactly that.",
    included: [
      "Private, curated shortlist of premium residences from verified developers",
      "Discreet, scheduling-flexible site visits",
      "Dedicated single point of contact through the entire transaction",
      "Concierge-style coordination with legal, interior, and relocation partners",
    ],
    whoFor: [
      "HNI individuals and families purchasing a primary or second luxury home",
      "Buyers relocating who require a fast, high-touch process",
      "International and NRI clients seeking premium Indian residences",
    ],
    faqs: [
      {
        q: "How is the Luxury desk different from standard Buy Property advisory?",
        a: "The Luxury desk applies the same Verification Framework but adds a dedicated single advisor, more flexible scheduling, and coordination with legal, interior design, and relocation partners, suited to higher-value, higher-discretion transactions.",
      },
    ],
    ctaLabel: "Speak to Our Luxury Desk",
  },
  "property-management": {
    slug: "property-management",
    eyebrow: "Property Management",
    h1: "Your Property",
    h1Accent: "Managed Remotely",
    intro:
      "For owners who don't want to chase tenants, coordinate repairs, or track rent, Vedhara handles the operational side of ownership.",
    included: [
      "Tenant sourcing, screening, and lease management",
      "Rent collection and timely owner payouts",
      "Maintenance coordination and vendor management",
      "Periodic property condition reporting",
    ],
    whoFor: [
      "NRI owners managing Indian property remotely",
      "Investors with multiple rental properties seeking centralised management",
      "Owners who simply prefer not to handle day-to-day tenant matters",
    ],
    faqs: [
      {
        q: "Can NRIs use the property management service without visiting India?",
        a: "Yes, this service is specifically designed to let NRI owners manage Indian property remotely, with regular reporting and video updates in place of physical visits.",
      },
      {
        q: "How is Vedhara different from a regular real estate agent or broker?",
        a: "Unlike a broker who facilitates a one-time transaction, Vedhara provides ongoing operational management — tenant sourcing, lease administration, rent collection, maintenance coordination, and periodic reporting. We act as your long-term property operations partner, not a middleman.",
      },
      {
        q: "What kind of reporting do property owners receive?",
        a: "Owners receive monthly statements showing rent collected, expenses incurred, and net payouts. Additionally, we provide periodic property condition reports with photo and video documentation, and immediate alerts for any maintenance issues or tenant concerns.",
      },
      {
        q: "How does Vedhara screen potential tenants?",
        a: "Our screening includes identity verification, employment and income checks, prior landlord references, credit history review, and rental track record assessment — all documented and shared with the owner before lease finalisation.",
      },
      {
        q: "What happens if a tenant damages the property or defaults on rent?",
        a: "Our lease agreements include a security deposit mechanism and clear damage liability clauses. In case of default, we initiate the legally prescribed notice and eviction process on your behalf, coordinating with our empanelled legal partners to minimise your exposure.",
      },
      {
        q: "Does Vedhara handle maintenance and emergency repairs?",
        a: "Yes. We have a vetted network of vendors for plumbing, electrical, painting, carpentry, and other common repairs. For emergency issues, owners authorise us to approve repairs up to a pre-agreed threshold without prior approval, ensuring swift resolution.",
      },
    ],
    ctaLabel: "Discuss Property Management",
  },
};
