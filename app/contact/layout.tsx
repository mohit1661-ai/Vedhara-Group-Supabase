import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vedhara Group | Property Advisory in Delhi NCR",
  description: "Contact Vedhara Group for verified property advisory across Delhi NCR. Book a free consultation for buying, selling, renting or investment, call, WhatsApp or fill the form.",
  alternates: { canonical: "https://www.vedharagroup.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
