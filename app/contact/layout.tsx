import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vedhara Group | Delhi NCR",
  description: "Book a free consultation with Vedhara Group for verified property advice across Delhi NCR. Call, WhatsApp or fill out the form.",
  alternates: { canonical: "https://www.vedharagroup.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
