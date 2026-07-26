/**
 * lib/validation.ts
 *
 * Server-side validation for the consultation form.
 * Runs inside the API route, never on the client.
 */

export interface FormInput {
  fullName?:    string;
  phone?:       string;
  email?:       string;
  interest?:    string;
  timezone?:    string;
  message?:     string;
  sourcePage?:  string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const VALID_INTERESTS = [
  "buy_property", "sell_property", "rent_/_lease",
  "commercial_real_estate", "investment_advisory",
  "nri_services", "property_management",
  "luxury_properties", "general_enquiry",
];

const INDIAN_PHONE  = /^(\+91|91|0)?[6-9]\d{9}$/;
const INTL_PHONE    = /^\+[1-9]\d{6,14}$/;
const EMAIL_RE      = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(input: FormInput): ValidationResult {
  const errors: Record<string, string> = {};

  // fullName
  const name = input.fullName?.trim() ?? "";
  if (!name) {
    errors.fullName = "Name is required.";
  } else if (name.length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  } else if (name.length > 80) {
    errors.fullName = "Name is too long.";
  }

  // phone
  const phone = input.phone?.trim().replace(/[\s\-()]/g, "") ?? "";
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!INDIAN_PHONE.test(phone) && !INTL_PHONE.test(phone)) {
    errors.phone = "Enter a valid Indian or international phone number.";
  }

  // email (optional but validate if provided)
  const email = input.email?.trim() ?? "";
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (email && email.length > 254) {
    errors.email = "Email address is too long.";
  }

  // interest
  const interest = (input.interest ?? "").toLowerCase().replace(/\s+/g, "_");
  if (!interest) {
    errors.interest = "Please select a service you are interested in.";
  } else if (!VALID_INTERESTS.includes(interest)) {
    errors.interest = "Invalid service selection.";
  }

  // message (optional, length cap)
  const message = input.message?.trim() ?? "";
  if (message.length > 2000) {
    errors.message = "Message is too long (max 2000 characters).";
  }

  // Primitive bot / spam check, honeypot handled client-side
  if (input.timezone && input.timezone.length > 100) {
    errors.timezone = "Invalid timezone value.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Sanitise a string: strip HTML, trim, truncate */
export function sanitise(s?: string, max = 500): string {
  if (!s) return "";
  return s
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, "") // strip control chars
    .trim()
    .slice(0, max);
}
