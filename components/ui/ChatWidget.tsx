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

  return (
    <>
      {/* Floating button — always above everything */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="chat-widget-btn"
        style={{
          position: "fixed",
          bottom: "max(24px, calc(64px + env(safe-area-inset-bottom, 0px)))",
          right: 20,
          zIndex: 10000,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
          boxShadow: "0 6px 28px rgba(212,168,67,0.5), 0 0 0 3px rgba(212,168,67,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 36px rgba(212,168,67,0.6), 0 0 0 4px rgba(212,168,67,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(212,168,67,0.5), 0 0 0 3px rgba(212,168,67,0.15)";
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            bottom: "max(92px, calc(132px + env(safe-area-inset-bottom, 0px)))",
            right: 20,
            zIndex: 10000,
            width: 400,
            maxWidth: "calc(100vw - 40px)",
            height: 560,
            maxHeight: "calc(100vh - 180px)",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--cream)",
            border: "1px solid rgba(212,168,67,0.25)",
            boxShadow: "0 24px 80px rgba(9,15,29,0.35), 0 0 0 1px rgba(212,168,67,0.1)",
            fontFamily: "var(--t-body)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "var(--navy)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--t-head)",
                  fontSize: 13,
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
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                }}
              >
                AI-powered &middot; Typically replies instantly
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
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
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    fontFamily: "var(--t-body)",
                    fontSize: 12.5,
                    lineHeight: 1.65,
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
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
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

          {/* Quick replies — only show when no user messages yet */}
          {messages.length <= 1 && (
            <div
              style={{
                padding: "0 16px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "var(--cream)",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px",
                  fontFamily: "var(--t-head)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--slate)",
                }}
              >
                Quick questions
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.query)}
                    style={{
                      fontFamily: "var(--t-head)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      padding: "7px 12px",
                      borderRadius: 20,
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
              padding: "12px 16px",
              borderTop: "1px solid rgba(212,168,67,0.15)",
              display: "flex",
              gap: 8,
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
              placeholder="Ask about properties, pricing..."
              disabled={loading}
              style={{
                flex: 1,
                fontFamily: "var(--t-body)",
                fontSize: 12.5,
                padding: "10px 14px",
                borderRadius: 10,
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
                width: 40,
                height: 40,
                borderRadius: 10,
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={loading || !input.trim() ? "var(--slate)" : "var(--navy)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        @media (max-width: 640px) {
          .chat-widget-panel {
            right: 10px !important;
            left: 10px !important;
            width: auto !important;
            maxWidth: none !important;
            bottom: 80px !important;
            height: calc(100vh - 160px) !important;
            max-height: none !important;
            border-radius: 14px !important;
          }
        }
      `}</style>
    </>
  );
}
