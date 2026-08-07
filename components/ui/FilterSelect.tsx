"use client";
import { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Custom dropdown select (replaces native <select> whose options popup could
 * render off-screen / get clipped by ancestor overflow or backdrop-filter).
 *
 * The options panel is `position: fixed` so it always escapes ancestor
 * overflow/backdrop-filter containing blocks, is constrained to the field
 * width and to the viewport height (opens upward when not enough space
 * below), so the "box of options" can never go off-screen on mobile/desktop.
 *
 * When `id` is provided, a hidden <input name={id}> carries the selected
 * value so the component works inside a plain GET <form>.
 */
export default function FilterSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id?: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(value);
  const [pos, setPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxH: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSel(value);
  }, [value]);

  useEffect(() => {
    function close() {
      setOpen(false);
    }
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, []);

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    const b = btnRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const gap = 6;
    const below = window.innerHeight - r.bottom - gap;
    const above = r.top - gap;
    const maxH = Math.min(240, Math.max(below, above) - 4);
    const openUp = below < Math.min(200, above);
    setPos(
      openUp
        ? { bottom: window.innerHeight - r.top + gap, left: r.left, width: r.width, maxH }
        : { top: r.bottom + gap, left: r.left, width: r.width, maxH }
    );
    setOpen(true);
  }

  const current = options.find((o) => o.value === sel) || options[0];

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      {id && <input type="hidden" name={id} value={sel} />}
      <button
        ref={btnRef}
        type="button"
        className="fs-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {current ? current.label : label}
        </span>
        <span className={`fs-caret${open ? " open" : ""}`}>▾</span>
      </button>

      {open && pos && (
        <ul
          role="listbox"
          aria-label={label}
          style={{
            position: "fixed",
            margin: 0,
            padding: 6,
            listStyle: "none",
            zIndex: 9999,
            background: "#fff",
            border: "1px solid rgba(212,168,67,0.45)",
            borderRadius: 10,
            boxShadow: "0 18px 40px -18px rgba(9,15,29,0.4)",
            maxHeight: pos.maxH,
            overflowY: "auto",
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            width: pos.width,
          }}
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === sel}>
              <button
                type="button"
                className={`fs-opt${o.value === sel ? " active" : ""}`}
                onClick={() => {
                  setSel(o.value);
                  onChange?.(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .fs-btn {
          font-family: var(--t-body); font-size: 14px; color: var(--navy);
          background: #fff; border: 1px solid rgba(15,30,56,0.14); border-radius: 10px;
          padding: 12px 14px; width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 8px; cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .fs-btn:hover, .fs-btn:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(212,168,67,0.18); outline: none; }
        .fs-caret { font-size: 11px; color: var(--gold-dk); transition: transform 0.25s ease; flex-shrink: 0; }
        .fs-caret.open { transform: rotate(180deg); }
        .fs-opt {
          font-family: var(--t-body); font-size: 13.5px; color: var(--navy); text-align: left;
          background: transparent; border: none; border-radius: 8px; width: 100%;
          padding: 9px 12px; cursor: pointer; transition: background 0.2s ease, color 0.2s ease;
        }
        .fs-opt:hover { background: rgba(212,168,67,0.12); }
        .fs-opt.active { background: linear-gradient(135deg, var(--gold), var(--gold-dk)); font-weight: 700; }
      `}</style>
    </div>
  );
}
