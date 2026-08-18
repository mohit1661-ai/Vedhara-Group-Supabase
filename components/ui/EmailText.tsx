/**
 * Renders the support email address split across separate text nodes so the
 * plain value never appears contiguously in the serialized HTML or RSC payload.
 * Scrapers that harvest "user@domain.tld" patterns from page source can't match
 * it, while the rendered text (and the surrounding mailto: link) stays fully
 * functional for humans.
 */
export default function EmailText() {
  return (
    <>
      {"contact"}
      {"@"}
      {"vedharagroup"}
      {".com"}
    </>
  );
}