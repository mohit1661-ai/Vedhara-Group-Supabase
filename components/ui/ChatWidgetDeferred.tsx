"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ChatWidget is a fixed floating element; it needs zero work before the page is
// interactive. Rendered client-only and mounted after the window `load` event
// (with requestIdleCallback + a hard fallback timeout) so its module and
// hydration never compete with LCP/TBT on the critical path. The visuals are
// byte-identical to an eager render — the button simply appears with the page.
const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const init = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const onLoad = () => init();
    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", onLoad);
    }
    const fallback = window.setTimeout(init, 2500);
    const idleId = w.requestIdleCallback ? w.requestIdleCallback(init, { timeout: 3000 }) : undefined;
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
      done = true;
    };
  }, []);

  return ready ? <ChatWidget /> : null;
}