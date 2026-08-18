import type { ServicePageContent } from "@/components/templates/ServicePageTemplate";

export const servicePages: Record<string, ServicePageContent> = {
  buy: {
    slug: "buy",
    eyebrow: "Buy With Confidence",
    h1: "Buy Verified Property",
    h1Accent: "in Delhi NCR",
    intro:
      "Trust our expert guidance through verified residential and commercial property across Delhi NCR, Faridabad, Manesar and Chandigarh, from initial shortlisting to final paperwork, with your interests always first.",
    seoText:
      "Buying a property in Delhi NCR involves far more than picking a project from a brochure. RERA registration status, builder delivery history, project-level approvals, price-to-locality fairness and the title chain all need to be verified before you commit. Vedhara's five-point Verification Framework does exactly that and publishes the results on every listing, so you can shortlist with confidence, negotiate with comparable market data, and complete registration without surprises — whether you are a first-time buyer in Gurugram, an investor tracking the Noida Expressway, or a family upgrading in Faridabad or Chandigarh.",
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
        a: "In most cases, Vedhara charges a disclosed commission on both the buyer and seller sides, in line with the standard rules and practices followed by real estate businesses. The commission is clearly stated on every specific listing.",
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
    h1: "Sell Property in Delhi NCR,",
    h1Accent: "at What It's Actually Worth",
    intro:
      "Most sellers either underprice out of urgency or overprice out of attachment. Vedhara helps you price, and sell, property across Delhi NCR, Faridabad, Manesar and Chandigarh based on real market data.",
    seoText:
      "Selling property in Delhi NCR is about pricing it where the market actually is, not where attachment thinks it should be. Vedhara builds a comparative market analysis from recent registered transactions and current demand, positions your property for the right buyer segment, and negotiates on your behalf through to documentation and handover. From an inherited property in South Delhi to an investment exit on the Dwarka Expressway or in Mohali, you get a realistic, data-backed asking price and a disciplined sales process instead of guesswork.",
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
    h1: "Rent Property in Delhi NCR,",
    h1Accent: "Done The Transparent Way",
    intro:
      "Whether you're a tenant searching for the right home or a landlord seeking a reliable tenant across Delhi NCR, Faridabad, Manesar or Chandigarh, Vedhara ensures the process is transparent and fair for both sides.",
    seoText:
      "Renting in Delhi NCR cuts both ways: tenants want a verified home without hidden clauses, and landlords want vetted tenants without management headaches. Vedhara matches both sides — verified listings and lease-term reviews for tenants, and screening, market-rate pricing and agreement drafting support for landlords — across Delhi, Gurugram, Noida, Faridabad and Chandigarh. Whether it is an 11-month residential lease or a long-term commercial tenancy, every obligation is written down clearly so the relationship starts without ambiguity.",
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
      {
        q: "How much security deposit is standard in Delhi NCR?",
        a: "For residential tenancies, 1–2 months' rent is standard for unfurnished properties and 2–3 months for furnished or higher-value homes, though some landlords ask for more in premium micro-markets. We help both sides agree a fair, documented deposit before the lease is signed.",
      },
      {
        q: "Are 11-month rent agreements legal in India?",
        a: "Yes. 11-month agreements are fully legal and widely used across Delhi NCR specifically to avoid the mandatory registration that applies to leases of 12 months or more. For higher-value or long-term rentals, we recommend a registered agreement regardless of tenure to strengthen enforceability for both owner and tenant.",
      },
      {
        q: "Who is responsible for maintenance and repairs during a tenancy?",
        a: "Generally, structural and major repairs are the landlord's responsibility, while minor wear-and-tear and day-to-day consumables are the tenant's; the exact split is defined in the lease agreement. We make sure this is written clearly so there are no surprises when something needs fixing.",
      },
      {
        q: "How does Vedhara screen tenants for landlords?",
        a: "Every prospective tenant undergoes identity verification, employment and income checks, prior landlord references, and a credit history review before being presented to the owner. Owners see the full verification dossier and approve the shortlist, which significantly reduces the risk of defaults and disputes.",
      },
      {
        q: "Can an NRI rent out their property in India remotely?",
        a: "Yes. Through our Property Management service, NRI owners can list, vet tenants, collect rent into their NRE/NRO account, and coordinate maintenance entirely remotely, with monthly statements and photo or video condition reports in place of physical visits.",
      },
      {
        q: "How is rental income taxed for a landlord in India?",
        a: "Rental income is taxed under 'Income from House Property', where you can claim a 30% standard deduction on the net annual value plus property tax paid. Where monthly rent exceeds ₹50,000, tenants are generally required to deduct TDS at 5% under Section 194-IB. A CA can help structure your exact liability and any interest deductions on a home loan.",
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
      "Retail footfall, office accessibility, mixed-use zoning, commercial real estate has its own rules. Vedhara's advisory across Delhi NCR, Faridabad and Manesar is built around them.",
    seoText:
      "Commercial real estate in Delhi NCR runs on data: footfall, accessibility, zoning, lease structures and tenant profiles. Vedhara's commercial desk handles office leasing, retail site selection, industrial assets and land deals across Gurugram's Golf Course Road and MG Road corridors, Noida's Sector 18 and expressway belt, Manesar and Faridabad — with rent benchmarking, lease negotiation, and due diligence on title, approvals and encumbrances on every transaction. For investors, pre-leased assets and yield analysis are benchmarked against real comparables before any recommendation.",
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
        a: "Commercial assets typically offer higher rental yields (often 7–9% or more) than residential property (commonly 2–4%) in most Delhi NCR micro-markets, with standardised leases and stronger rental growth potential. However, commercial spaces carry higher vacancy risk, larger ticket sizes, and different tax obligations. The right choice depends on your capital, holding horizon, and income goals; Vedhara can run a comparative yield and appreciation analysis on specific assets before you commit.",
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
        q: "What taxes apply on buying or renting commercial property, including stamp duty and GST?",
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
        a: "Yes, commercial property loans are widely available; typically financing 70–80% of the value with tenures up to 15–20 years and rates usually a little higher than home loans. Loan-to-value and eligibility depend on the property's income potential and your profile. We help shortlist lenders and prepare the documentation.",
      },
      {
        q: "Is it better to buy or lease commercial space for my business?",
        a: "Buying builds equity and protects against rental inflation but locks up capital and reduces flexibility; leasing preserves cash for the business and makes relocation or scaling easier. The right answer depends on your cash flow, growth plans, and tax position. We map the buy-versus-lease economics for your specific requirement before you decide.",
      },
      {
        q: "Which are the best commercial micro-markets in Delhi NCR right now?",
        a: "Gurugram's Golf Course Road and MG Road corridors remain strong for offices and retail, Noida's Sector 18 and the Yamuna Expressway belt for retail and logistics, and the NH-48/NH-8 corridors including Manesar and Faridabad for industrial and warehousing. The 'best' location depends on your asset class and target tenants; we shortlist based on current demand, rental trends, and absorption data rather than hearsay.",
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
      "Luxury real estate demands discretion, speed, and an advisor who understands what premium buyers actually value. Vedhara's luxury desk across Delhi NCR, Chandigarh Tricity and North India is built for exactly that.",
    seoText:
      "Luxury property in Delhi NCR demands discretion, speed and an advisor who understands what premium buyers actually value. Vedhara's luxury desk curates a private shortlist across Golf Course Road, DLF, Vasant Kunj, premium Noida pockets and Chandigarh Tricity, applying the same five-point Verification Framework with deeper legal and title review at higher values. Off-market opportunities are shared with qualified buyers only, and NRI clients are handled end-to-end remotely with video walkthroughs, digital documentation and POA coordination.",
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
      {
        q: "What is the typical budget for a luxury property in Delhi NCR?",
        a: "Luxury in Delhi NCR generally starts around ₹2–3 crore and can range well above ₹20 crore for penthouses, farmhouses, and branded residences. The exact threshold depends on location and asset type; a premium apartment on Golf Course Road, a duplex in DLF, or an independent floor in Vasant Kunj each sit at different price points, and we curate accordingly.",
      },
      {
        q: "Do you have off-market or unlisted luxury properties?",
        a: "Yes. Because discretion matters in this segment, some opportunities are shared privately with qualified buyers before or without being publicly listed. Every off-market property still passes the same five-point Verification Framework and price benchmarking before we present it.",
      },
      {
        q: "Can NRIs or overseas buyers use the luxury desk?",
        a: "Absolutely. We run remote-first luxury engagements with video walkthroughs, digital documentation, and Power of Attorney coordination, and schedule visits around your travel. Several of our high-value NRI transactions have been completed with the buyer never setting foot in India.",
      },
      {
        q: "How is a luxury property verified differently from a regular one?",
        a: "The same five-point Verification Framework applies, but at higher value we go deeper: a full chain-of-title legal review, builder reputation and delivery track record, project and RERA approvals, encumbrance checks, and benchmarked price-to-locality analysis. For branded and under-construction residences we also review the developer's financial and delivery history.",
      },
      {
        q: "Is there a fee to use the Luxury desk?",
        a: "In most cases buyers are not charged a direct fee; Vedhara is compensated through the seller or developer side, disclosed on the specific listing. For highly bespoke engagements, such as portfolio acquisitions or complex off-market deals, a fixed advisory fee may apply and is always agreed in writing before work begins.",
      },
      {
        q: "What makes a property 'luxury' in Delhi NCR?",
        a: "Beyond price, we look at location and exclusivity, unit size and privacy, architecture and brand, amenities and services, and scarcity of supply. Premium corridors such as Golf Course Road, Golf Course Extension Road, DLF, Vasant Kunj, and select Noida and New Gurugram pockets consistently deliver these qualities, and we shortlist based on what genuinely fits your lifestyle, not a price tag alone.",
      },
    ],
    ctaLabel: "Speak to Our Luxury Desk",
  },
  "property-management": {
    slug: "property-management",
    eyebrow: "Property Management",
    h1: "Property Management Services,",
    h1Accent: "Managed Remotely",
    intro:
      "For owners who don't want to chase tenants, coordinate repairs, or track rent across Delhi NCR, Faridabad, Chandigarh or North India, Vedhara handles the operational side of ownership.",
    seoText:
      "Property management in Delhi NCR is about being present without being personally involved in every repair, tenant conversation or rent reminder. Vedhara handles tenant sourcing and screening, lease administration, rent collection with timely owner payouts, and maintenance coordination through a vetted vendor network — with monthly statements and photo or video condition reports for owners. It is built for NRI owners managing Indian property remotely, investors running multiple rental units, and owners who simply want the operational load removed.",
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
        a: "Unlike a broker who facilitates a one-time transaction, Vedhara provides ongoing operational management; tenant sourcing, lease administration, rent collection, maintenance coordination, and periodic reporting. We act as your long-term property operations partner, not a middleman.",
      },
      {
        q: "What kind of reporting do property owners receive?",
        a: "Owners receive monthly statements showing rent collected, expenses incurred, and net payouts. Additionally, we provide periodic property condition reports with photo and video documentation, and immediate alerts for any maintenance issues or tenant concerns.",
      },
      {
        q: "How does Vedhara screen potential tenants?",
        a: "Our screening includes identity verification, employment and income checks, prior landlord references, credit history review, and rental track record assessment; all documented and shared with the owner before lease finalisation.",
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
