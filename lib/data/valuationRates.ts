/**
 * Seller valuation baseline rates — the single file to update when the market
 * moves. Update the bands below and bump VALUATION_RATES_LAST_VERIFIED; the
 * valuation tool at /sell/valuation surfaces both to users automatically.
 *
 * Rates are indicative market bands for September 2026, verified from:
 *   - MagicBricks locality rate trackers (Jul 2026 refresh)
 *   - 99acres property rate trends
 *   - Housing.com price trends
 *   - SquareYards locality data (Jul 2026)
 *   - Government circle-rate schedules (Haryana/UP/Delhi jurisdictions)
 *
 * res:   [low, high] ₹/sq.ft   (apartments, builder floors, houses)
 * plot:  [low, high] ₹/sq.yd   (land; optional — computed from res when absent)
 * com:   [low, high] ₹/sq.ft   (offices, retail; optional — res × 1.25-1.55 when absent)
 */

export const VALUATION_RATES_LAST_VERIFIED = "September 2026";

export const VALUATION_RATE_SOURCES = [
  "MagicBricks locality rate trackers",
  "99acres price trends",
  "Housing.com price trends",
  "SquareYards locality data",
  "Government circle-rate schedules",
];

export type RateBand = [number, number];

export type LocalityRates = {
  city: string;
  name: string;
  res: RateBand;
  plot?: RateBand;
  com?: RateBand;
};

export const VALUATION_LOCALITIES: LocalityRates[] = [
  { city: "Gurugram", name: "Golf Course Road (Sectors 42-56)", res: [25000, 32000], plot: [100000, 160000], com: [28000, 40000] },
  { city: "Gurugram", name: "Golf Course Extension Road (Sectors 58-70)", res: [14000, 19000], plot: [70000, 110000] },
  { city: "Gurugram", name: "Dwarka Expressway (Sectors 102-113)", res: [9000, 14000], plot: [66000, 95000] },
  { city: "Gurugram", name: "Cyber City / DLF Phases / MG Road", res: [18000, 26000], plot: [100000, 160000], com: [25000, 38000] },
  { city: "Gurugram", name: "Sohna Road (Sectors 47-49)", res: [11000, 15000], plot: [50000, 80000] },
  { city: "Gurugram", name: "Southern Peripheral Road (Sectors 66-71)", res: [9500, 13500], plot: [45000, 70000] },
  { city: "Gurugram", name: "Sectors 55-57 (GCR Belt)", res: [12000, 16000], plot: [60000, 90000] },
  { city: "Gurugram", name: "Old Gurgaon (Sectors 4-15)", res: [10000, 14000], plot: [45000, 70000] },
  { city: "Gurugram", name: "Manesar / New Gurgaon (Sectors 80-95)", res: [6500, 10000], plot: [25000, 45000] },
  { city: "Noida", name: "Sector 150 / Noida Expressway South", res: [11000, 16000], plot: [55000, 90000] },
  { city: "Noida", name: "Sectors 43-44 (Metro Core)", res: [11000, 17000], plot: [70000, 110000] },
  { city: "Noida", name: "Sectors 75-79 (Central Noida)", res: [9500, 14500], plot: [55000, 85000] },
  { city: "Noida", name: "Sectors 62-63 (IT Corridor)", res: [8500, 13000], com: [12000, 18000] },
  { city: "Noida", name: "Sectors 100-110 (Expressway)", res: [13000, 19000] },
  { city: "Noida", name: "Sectors 137-143", res: [10000, 14000] },
  { city: "Greater Noida", name: "Greater Noida West (Noida Extension)", res: [7500, 11000], plot: [35000, 55000] },
  { city: "Greater Noida", name: "Greater Noida (Pari Chowk / Knowledge Park)", res: [6500, 10000], plot: [30000, 50000] },
  { city: "Greater Noida", name: "Yamuna Expressway", res: [4500, 7500], plot: [18000, 35000] },
  { city: "Delhi", name: "Greater Kailash I/II & Chittaranjan Park", res: [22000, 33000], com: [40000, 70000] },
  { city: "Delhi", name: "Defence Colony / Vasant Vihar", res: [35000, 48000] },
  { city: "Delhi", name: "Hauz Khas / Malviya Nagar / Saket", res: [18000, 28000] },
  { city: "Delhi", name: "Dwarka (Delhi)", res: [12000, 16000] },
  { city: "Faridabad", name: "Neharpar / Greater Faridabad (Sectors 75-85)", res: [5500, 9500], plot: [25000, 45000] },
  { city: "Faridabad", name: "Sector 39 / Charmwood / Suraj Kund", res: [9000, 14000], plot: [40000, 65000] },
  { city: "Faridabad", name: "Old Faridabad / Mathura Road / Badkhal", res: [6000, 9000], plot: [30000, 50000] },
  { city: "Ghaziabad", name: "Indirapuram / Ahinsa Khand", res: [9000, 11500], plot: [55000, 95000] },
  { city: "Ghaziabad", name: "Vaishali / Kaushambi", res: [10500, 16000], plot: [70000, 120000] },
  { city: "Ghaziabad", name: "Raj Nagar Extension", res: [6800, 9000], plot: [28000, 45000] },
  { city: "Ghaziabad", name: "Crossing Republik / Siddharth Vihar / Vasundhara", res: [6500, 10500], plot: [30000, 55000] },
  { city: "Tricity", name: "Chandigarh (Main Sectors)", res: [8000, 13000], plot: [55000, 95000] },
  { city: "Tricity", name: "Mohali (IT City & Sectors)", res: [5500, 12500], plot: [35000, 70000] },
  { city: "Tricity", name: "Panchkula", res: [4000, 6500], plot: [25000, 45000] },
  { city: "Tricity", name: "Zirakpur / Kharar / New Chandigarh", res: [6000, 10500], plot: [30000, 55000] },
  { city: "Mathura", name: "Mathura / Vrindavan", res: [4500, 8500], plot: [15000, 30000] },
];
