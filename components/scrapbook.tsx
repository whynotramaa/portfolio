"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cutouts, type Cutout } from "@/lib/world";

type Pos = { x: number; y: number };
type Place = Pos & { r: number };

const initial = (list: Cutout[]) => Object.fromEntries(list.map((c) => [c.id, { x: c.x, y: c.y, r: c.rotate }]));
const KEY = "ramaa-cards";

/**
 * Cutouts pinned to a desk. Positions are percentages of the desk box so the
 * scatter survives a resize, and dragging just rewrites the percentage.
 */
export function Scrapbook() {
  const deskRef = useRef<HTMLDivElement>(null);
  const [mine, setMine] = useState<Cutout[]>([]);
  const [pos, setPos] = useState<Record<string, Place>>(() => initial(cutouts));
  const [adding, setAdding] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [top, setTop] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [dropped, setDropped] = useState<string | null>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const all = [...cutouts, ...mine];

  useEffect(() => {
    try {
      const saved: Cutout[] = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
      setMine(saved);
      setPos((prev) => ({ ...prev, ...initial(saved) }));
    } catch {}
  }, []);

  const save = (list: Cutout[]) => {
    setMine(list);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
  };

  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    const card: Cutout = {
      id: `you-${Date.now()}`,
      kind: "yours",
      title,
      meta: "pinned by you",
      note: String(form.get("note") ?? "").trim(),
      x: 20 + Math.random() * 40,
      y: 20 + Math.random() * 40,
      rotate: Math.random() * 10 - 5,
    };
    save([...mine, card]);
    setPos((prev) => ({ ...prev, ...initial([card]) }));
    setTop(card.id);
    setAdding(false);
  };

  const removeCard = (id: string) => save(mine.filter((c) => c.id !== id));

  const onPointerDown = (event: React.PointerEvent<HTMLElement>, id: string) => {
    const desk = deskRef.current;
    if (!desk) return;
    const deskBox = desk.getBoundingClientRect();
    const box = event.currentTarget.getBoundingClientRect();
    drag.current = {
      id,
      dx: ((event.clientX - box.left) / deskBox.width) * 100,
      dy: ((event.clientY - box.top) / deskBox.height) * 100,
    };
    setTop(id);
    setActive(id);
    setMoved(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const active = drag.current;
    const desk = deskRef.current;
    if (!active || !desk) return;
    const deskBox = desk.getBoundingClientRect();
    const x = ((event.clientX - deskBox.left) / deskBox.width) * 100 - active.dx;
    const y = ((event.clientY - deskBox.top) / deskBox.height) * 100 - active.dy;
    setPos((prev) => ({
      ...prev,
      [active.id]: { ...prev[active.id], x: Math.min(92, Math.max(-4, x)), y: Math.min(92, Math.max(-4, y)) },
    }));
  };

  const endDrag = () => {
    if (drag.current) setDropped(drag.current.id);
    drag.current = null;
    setActive(null);
  };

  const settle = () => {
    setShuffling(true);
    window.setTimeout(() => setShuffling(false), 700);
  };

  const reset = () => {
    settle();
    setPos(initial(all));
    setMoved(false);
  };

  const shuffle = () => {
    settle();
    setPos(
      Object.fromEntries(
        all.map((c) => [c.id, { x: Math.random() * 72, y: Math.random() * 66, r: Math.random() * 16 - 8 }]),
      ),
    );
    setTop(null);
    setMoved(true);
  };

  return (
    <div className="scrapbook">
      <div className={`desk${shuffling ? " is-shuffling" : ""}`} ref={deskRef}>
        {all.map((cut) => (
          <article
            key={cut.id}
            className={`cutout cutout-${cut.kind} cutout-${cut.id}${top === cut.id ? " is-top" : ""}${active === cut.id ? " is-dragging" : ""}${dropped === cut.id ? " is-dropped" : ""}`}
            data-cursor="drag"
            onAnimationEnd={() => setDropped(null)}
            style={{
              left: `${pos[cut.id].x}%`,
              top: `${pos[cut.id].y}%`,
              ["--rotate" as string]: `${pos[cut.id].r}deg`,
            }}
            onPointerDown={(event) => onPointerDown(event, cut.id)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {cut.kind === "stamp" ? (
              <>
                <span className="stamp-rule">passport</span>
                <strong>{cut.title}</strong>
                <span className="stamp-meta">{cut.meta}</span>
              </>
            ) : cut.kind === "yours" ? (
              <>
                <span className="cutout-tape" aria-hidden="true" />
                <span className="cutout-kind">{cut.meta}</span>
                <strong>{cut.title}</strong>
                {cut.note && <p className="hand">{cut.note}</p>}
                <button
                  type="button"
                  className="cutout-remove"
                  aria-label={`remove ${cut.title}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => removeCard(cut.id)}
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <span className="cutout-tape" aria-hidden="true" />
                <span className="cutout-kind">{cut.kind === "film" ? "watched" : "watched, loudly"}</span>
                <strong>{cut.title}</strong>
                <span className="cutout-meta">{cut.meta}</span>
                <p className="hand">{cut.note}</p>
              </>
            )}
          </article>
        ))}
      </div>
      {adding && (
        <form className="desk-form" onSubmit={addCard}>
          <input name="title" placeholder="a film, a player, a place" maxLength={40} required autoFocus />
          <input name="note" placeholder="why it is on your desk" maxLength={60} />
          <button type="submit" className="ghost-button">
            pin it
          </button>
          <button type="button" className="ghost-button" onClick={() => setAdding(false)}>
            never mind
          </button>
          <p className="label desk-form-note">saved on this device only, nobody else sees it</p>
        </form>
      )}
      <div className="desk-controls">
        <p className={`hand desk-hint${moved ? " is-used" : ""}`}>
          {moved ? "yes, they stay where you drop them" : "drag them around, it is your desk now ↙"}
        </p>
        <div className="desk-buttons">
          <button type="button" className="ghost-button" onClick={() => setAdding(true)} disabled={adding}>
            add yours
          </button>
          <button type="button" className="ghost-button" onClick={shuffle}>
            shuffle
          </button>
          <button type="button" className="ghost-button" onClick={reset} disabled={!moved}>
            tidy up
          </button>
        </div>
      </div>
    </div>
  );
}

/** Guestbook signature. Persists in the visitor's own browser, nowhere else. */
export function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signed, setSigned] = useState(false);
  const drawing = useRef(false);
  const last = useRef<Pos | null>(null);

  const ctxOf = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.getContext("2d") ?? null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxOf();
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const saved = window.localStorage.getItem("ramaa-signature");
    if (!saved) return;
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, rect.width, rect.height);
      setSigned(true);
    };
    image.src = saved;
  }, [ctxOf]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>): Pos => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    last.current = point(event);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = ctxOf();
    if (!drawing.current || !ctx || !last.current) return;
    const next = point(event);
    // pressure-ish: faster strokes draw thinner, so it reads like a pen
    const speed = Math.hypot(next.x - last.current.x, next.y - last.current.y);
    ctx.strokeStyle = "#141414";
    ctx.lineWidth = Math.max(1.1, 3 - speed * 0.09);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    last.current = next;
    setSigned(true);
  };

  const stop = () => {
    drawing.current = false;
    last.current = null;
    const canvas = canvasRef.current;
    if (canvas && signed) window.localStorage.setItem("ramaa-signature", canvas.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = ctxOf();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.localStorage.removeItem("ramaa-signature");
    setSigned(false);
  };

  return (
    <div className="signature">
      <div className="signature-frame">
        <canvas
          ref={canvasRef}
          className="signature-canvas"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          aria-label="Sign the guestbook"
          data-cursor="sign"
        />
        {!signed && <span className="signature-placeholder hand">sign here ✎</span>}
        <span className="signature-rule" aria-hidden="true" />
      </div>
      <div className="signature-foot">
        <span className="label">
          {signed ? "saved to your browser, not my server" : "you were here. prove it."}
        </span>
        <button type="button" className="ghost-button" onClick={clear} disabled={!signed}>
          clear
        </button>
      </div>
    </div>
  );
}
