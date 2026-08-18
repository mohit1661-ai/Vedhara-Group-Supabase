import { Fragment } from "react";
import EmailText from "@/components/ui/EmailText";

const EMAIL = "contact@vedharagroup.com";

/**
 * Renders a block of prose with any occurrence of the plain support email
 * replaced by <EmailText /> (which splits the address across text nodes so the
 * value never appears contiguously in the serialized HTML). The plain email is
 * still preserved where it matters (mailto: hrefs, JSON-LD), but page text no
 * longer leaks it to regex-based email harvesters.
 */
export default function ObfuscateEmailText({ text }: { text: string }) {
  if (!text.includes(EMAIL)) return <>{text}</>;
  const parts = text.split(EMAIL);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <EmailText />}
        </Fragment>
      ))}
    </>
  );
}