"use client";

import { useLayoutEffect } from "react";

/**
 * When the user arrives on /search with an active query (e.g. from the homepage
 * search bar), scroll the page straight to the listings section so they see the
 * results first instead of landing on the hero again. The hero section itself
 * stays untouched and fully visible above the results.
 */
export default function ScrollToResults({ active }: { active: boolean }) {
  useLayoutEffect(() => {
    if (!active) return;
    const el = document.getElementById("results");
    if (!el) return;
    const scrollToResults = () => {
      const navOffset = 90; // fixed navbar height + breathing room
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo(0, Math.max(0, top));
    };
    scrollToResults();
    // Re-run after the frame in case Next.js restores/resets scroll on nav.
    requestAnimationFrame(scrollToResults);
  }, [active]);

  return null;
}
