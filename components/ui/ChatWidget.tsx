"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm Vedhara's property advisor. I can help you find properties, check prices, or learn about our services across Delhi NCR. What are you looking for?",
};

const QUICK_REPLIES = [
  { label: "Gurugram Properties", query: "Show me properties available in Gurugram with prices" },
  { label: "Commercial Deals", query: "What commercial properties do you have for sale or lease?" },
  { label: "Sell My Property", query: "I want to sell my property. How does Vedhara help sellers?" },
  { label: "Investment Advice", query: "Which areas are best for real estate investment in Delhi NCR right now?" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Deep-link landing: /gurugram#gg-bk2 etc. Browsers fire their one-shot native
  // fragment jump before hero videos/lazy images/fonts settle, so late layout
  // shifts push the target away and users stay at the top. Re-center the target
  // on mount + hashchange + same-page anchor clicks with staged retries once the
  // layout has stabilized, and flash the card so it's unmistakable.
  useEffect(() => {
    const timers: number[] = [];

    const flashAndCenter = (el: HTMLElement) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const centerIt = () => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      // Staged: quick catch-up for fast loads, later passes absorb image/video shifts
      timers.push(window.setTimeout(centerIt, 150));
      timers.push(window.setTimeout(centerIt, 700));
      timers.push(window.setTimeout(centerIt, 1600));
      // Flash highlight
      timers.push(window.setTimeout(() => {
        el.classList.add("chat-link-target");
        setTimeout(() => el.classList.remove("chat-link-target"), 2800);
      }, 1600));
    };

    const focusHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const el = document.getElementById(hash.slice(1));
      if (el) flashAndCenter(el);
    };

    // Same-page anchor clicks (e.g. clicking a card jumps to itself/another listing)
    const onClickCapture = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const idx = href.indexOf("#");
      if (idx === -1) return;
      const path = href.slice(0, idx);
      if (path && !window.location.pathname.startsWith(path.replace(/\/$/, ""))) return; // cross-page → let native handle on load
      const el = document.getElementById(href.slice(idx + 1));
      if (el) flashAndCenter(el);
    };

    focusHash();
    window.addEventListener("hashchange", focusHash);
    document.addEventListener("click", onClickCapture, true);
    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("hashchange", focusHash);
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const send = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || loading) return;

      const userMsg: Message = { role: "user", content: msg };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "Something went wrong." },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Network error. Please try again or call us at +91-98106-47063.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Renders [Title](url) markdown links and bare URLs as real anchors
  const renderContent = (text: string) => {
    const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)<)]+)/g);
    return parts.map((p, i) => {
      const md = p.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (md) {
        return (
          <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--gold-dk)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>
            {md[1]}
          </a>
        );
      }
      if (/^https?:\/\//.test(p)) {
        const label = p.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        return (
          <a key={i} href={p} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--gold-dk)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2, wordBreak: "break-all" }}>
            {label}
          </a>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  return (
    <>
      {/* Floating button — bright gold with white icon */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="chat-widget-btn"
        style={{
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 10000,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
          boxShadow: "0 4px 20px rgba(212,168,67,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(212,168,67,0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,168,67,0.5)";
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="chat-widget-panel"
          style={{
            position: "fixed",
            bottom: 82,
            right: 20,
            zIndex: 10000,
            width: 380,
            maxWidth: "calc(100vw - 40px)",
            height: 480,
            maxHeight: "calc(100vh - 120px)",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--cream)",
            border: "1px solid rgba(212,168,67,0.25)",
            boxShadow: "0 20px 60px rgba(9,15,29,0.3), 0 0 0 1px rgba(212,168,67,0.1)",
            fontFamily: "var(--t-body)",
          }}
        >
          {/* Header — always visible, contains close button */}
          <div
            style={{
              padding: "12px 14px",
              background: "var(--navy)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--t-head)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--gold-lt)",
                  letterSpacing: "0.02em",
                }}
              >
                Vedhara Property Advisor
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                }}
              >
                AI-powered &middot; Replies instantly
              </p>
            </div>
            {/* Close button in header — always accessible */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "var(--cream)",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "9px 12px",
                    borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                    fontFamily: "var(--t-body)",
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: m.role === "user" ? "var(--navy)" : "var(--ink)",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, var(--gold), var(--gold-lt))"
                        : "white",
                    boxShadow:
                      m.role === "user"
                        ? "0 2px 8px rgba(212,166,67,0.3)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px 12px 12px 4px",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        animation: "chatDot 1.2s infinite",
                        animationDelay: `${d * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick replies — only at start */}
          {messages.length <= 1 && (
            <div
              style={{
                padding: "0 14px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                background: "var(--cream)",
              }}
            >
              <p
                style={{
                  margin: "0 0 3px",
                  fontFamily: "var(--t-head)",
                  fontSize: 8.5,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--slate)",
                }}
              >
                Quick questions
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.query)}
                    style={{
                      fontFamily: "var(--t-head)",
                      fontSize: 9.5,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      padding: "6px 10px",
                      borderRadius: 18,
                      border: "1px solid rgba(212,168,67,0.3)",
                      background: "white",
                      color: "var(--gold-ink)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--gold)";
                      e.currentTarget.style.color = "var(--navy)";
                      e.currentTarget.style.borderColor = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "var(--gold-ink)";
                      e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)";
                    }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "10px 14px",
              borderTop: "1px solid rgba(212,168,67,0.15)",
              display: "flex",
              gap: 6,
              alignItems: "center",
              background: "white",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about properties..."
              disabled={loading}
              style={{
                flex: 1,
                fontFamily: "var(--t-body)",
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(212,168,67,0.2)",
                outline: "none",
                background: "var(--cream)",
                color: "var(--ink)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)")}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                background:
                  loading || !input.trim()
                    ? "rgba(212,168,67,0.2)"
                    : "linear-gradient(135deg, var(--gold), var(--gold-lt))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "opacity 0.2s",
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={loading || !input.trim() ? "var(--slate)" : "var(--navy)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        /* Native-anchor fallback positioning (sticky navbar clearance) */
        .prop-grid [id], .grid-3 [id] {
          scroll-margin-top: 96px;
        }
        /* Chat deep-link highlight flash on the targeted listing card */
        .chat-link-target {
          outline: 3px solid var(--gold) !important;
          outline-offset: -3px;
          border-radius: 16px;
          box-shadow: 0 0 0 8px rgba(212, 168, 67, 0.25);
          transition: box-shadow 0.4s ease;
        }
        @media (max-width: 1024px) {
          .chat-widget-panel {
            width: 360px !important;
          }
        }
        @media (max-width: 640px) {
          .chat-widget-btn {
            width: 42px !important;
            height: 42px !important;
            left: auto !important;
            right: 14px !important;
            bottom: calc(60px + env(safe-area-inset-bottom, 0px)) !important;
          }
          .chat-widget-btn svg {
            width: 17px !important;
            height: 17px !important;
          }
          .chat-widget-panel {
            position: fixed !important;
            top: 16px !important;
            right: 8px !important;
            left: 8px !important;
            bottom: auto !important;
            width: auto !important;
            maxWidth: none !important;
            height: calc(100vh - 32px) !important;
            max-height: none !important;
            border-radius: 14px !important;
          }
        }
      `}</style>
    </>
  );
}
