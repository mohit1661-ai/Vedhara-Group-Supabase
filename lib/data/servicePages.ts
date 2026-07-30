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
    ],
    ctaLabel: "Discuss Your Commercial Requirement",
  },
  luxury: {
    slug: "luxury",
    eyebrow: "Luxury Properties",
    h1: "Curated Premium Residences,",
    h1Accent: "White-Glove Advisory",
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
    h1: "Your Property, Managed",
    h1Accent: "Managed Without You Being There",
    intro:
      "For owners who don't want to personally chase tenants, coordinate repairs, or track rent, Vedhara's property management service handles the operational side of ownership.",
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
    ],
    ctaLabel: "Discuss Property Management",
  },
};
