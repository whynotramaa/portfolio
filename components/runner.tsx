"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GROUND = 170;
const PX = 80;
const GRAVITY = 1900;
const JUMP = 640;
const BEST = "ramaa-runs";

type Kind = "stumps" | "pasta";
type Thing = { x: number; kind: Kind };
const size: Record<Kind, { w: number; h: number }> = { stumps: { w: 22, h: 50 }, pasta: { w: 40, h: 30 } };
const outs = ["OUT! bowled", "OUT! lbw, no review", "OUT! caught behind", "run out. classic", "OUT! hit wicket"];

const fresh = () => ({
  state: "idle" as "idle" | "run" | "out",
  y: 0,
  vy: 0,
  dist: 0,
  speed: 280,
  next: 420,
  things: [] as Thing[],
  out: outs[0],
});

function Stumps() {
  return (
    <>
      <ellipse className="rn-blob" cx="11" cy="-24" rx="20" ry="27" style={{ ["--h" as string]: 85 }} />
      <path className="rn-ink" d="M1 0 2 -50M11 0 11 -51M21 0 20 -50M-2 -52 12 -53M10 -53 24 -52" />
    </>
  );
}

function Pasta() {
  return (
    <>
      <ellipse className="rn-blob" cx="20" cy="-14" rx="26" ry="18" style={{ ["--h" as string]: 25 }} />
      <path className="rn-paper" d="M0 -24h40v14c0 7-5 10-10 10H10C5 0 0-3 0-10Z" />
      <path className="rn-ink" d="M0 -24h40v14c0 7-5 10-10 10H10C5 0 0-3 0-10ZM-6 -20h6M40 -20h6M8 -24c2 8 6 8 6 14M26 -24c-2 6 3 9 1 15M14 -30c-3-4 3-6 0-10M26 -31c-3-4 3-6 0-10" />
    </>
  );
}

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <path
      className="rn-cloud"
      transform={`translate(${x} ${y})`}
      d="M0 20c-10 0-12-14-2-16 0-10 14-14 20-6 6-10 24-8 24 4 10 0 12 16 0 18Z"
    />
  );
}

export function Runner({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const game = useRef(fresh());
  const [, setFrame] = useState(0);
  const [best, setBest] = useState(0);

  const act = useCallback(() => {
    const g = game.current;
    if (g.state === "out") {
      game.current = { ...fresh(), state: "run" };
      return;
    }
    g.state = "run";
    if (g.y === 0) g.vy = JUMP;
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    game.current = fresh();
    try {
      setBest(Number(window.localStorage.getItem(BEST)) || 0);
    } catch {}
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const g = game.current;
      if (g.state === "run") {
        g.vy -= GRAVITY * dt;
        g.y = Math.max(0, g.y + g.vy * dt);
        if (g.y === 0) g.vy = 0;
        const step = g.speed * dt;
        g.dist += step;
        g.speed = Math.min(560, g.speed + 9 * dt);
        g.things.forEach((t) => (t.x -= step));
        g.things = g.things.filter((t) => t.x > -60);
        g.next -= step;
        if (g.next <= 0) {
          g.things.push({ x: 640, kind: Math.random() < 0.55 ? "stumps" : "pasta" });
          g.next = 240 + Math.random() * 300 + g.speed * 0.3;
        }
        const hit = g.things.some((t) => {
          const s = size[t.kind];
          return t.x < PX + 30 && t.x + s.w > PX + 6 && g.y < s.h - 6;
        });
        if (hit) {
          g.state = "out";
          g.out = outs[Math.floor(Math.random() * outs.length)];
          const runs = Math.floor(g.dist / 40);
          setBest((b) => {
            if (runs <= b) return b;
            try {
              window.localStorage.setItem(BEST, String(runs));
            } catch {}
            return runs;
          });
        }
      }
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "ArrowUp") return;
      event.preventDefault();
      act();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, act]);

  const g = game.current;
  const runs = Math.floor(g.dist / 40);
  const bob = g.y === 0 && g.state === "run" ? Math.abs(Math.sin(g.dist / 14)) * 4 : 0;
  const lean = g.y > 0 ? -14 : g.state === "run" ? -6 : 0;
  const tick = g.dist % 60;

  return (
    <dialog
      ref={dialogRef}
      className="runner"
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="runner-card inked">
        <div className="runner-head">
          <div>
            <span className="label">easter egg · the m</span>
            <h2 className="runner-title">
              the m <em>runs</em>
            </h2>
            <p className="hand runner-sub">you found it. now keep it alive.</p>
          </div>
          <div className="runner-score">
            <strong>{runs}</strong>
            <span className="label">runs · best {Math.max(best, runs)}</span>
          </div>
        </div>

        <div className="runner-field" onPointerDown={act}>
          <svg viewBox="0 0 600 200" className="runner-svg" role="img" aria-label={`runner game, ${runs} runs`}>
            <Cloud x={(600 - ((g.dist * 0.15) % 700)) | 0} y={30} />
            <Cloud x={(900 - ((g.dist * 0.1 + 300) % 900)) | 0} y={62} />
            <g filter="url(#ink-edge)">
              <path className="rn-ink" d="M0 170C120 167 240 173 360 169S560 172 600 170" />
              {Array.from({ length: 11 }, (_, i) => {
                const x = i * 60 - tick;
                return <path key={i} className="rn-tick" d={`M${x} 178l6-3M${x + 26} 182l4-2`} />;
              })}
              {g.things.map((t, i) => (
                <g key={i} transform={`translate(${t.x} ${GROUND})`}>
                  {t.kind === "stumps" ? <Stumps /> : <Pasta />}
                </g>
              ))}
              <ellipse className="rn-shadow" cx={PX + 18} cy={GROUND + 2} rx={Math.max(6, 16 - g.y / 10)} ry="3" />
              <g transform={`translate(${PX} ${GROUND - g.y - bob}) rotate(${lean} 18 -10)`}>
                {g.state === "run" && g.y === 0 && <path className="rn-tick" d="M-10 -26h-12M-8 -16h-16M-12 -6h-8" />}
                <text className="rn-m" x="0" y="-2">
                  m
                </text>
              </g>
            </g>
          </svg>

          {g.state === "idle" && <p className="hand runner-callout">tap or space to take guard</p>}
          {g.state === "out" && (
            <div className="runner-out">
              <span className="hire-ink">
                {g.out}
                <strong>{runs} runs</strong>
              </span>
            </div>
          )}
        </div>

        <div className="runner-foot">
          <p className="hand runner-hint">
            {g.state === "out" ? "space or tap to bat again" : "hop the stumps. and my pasta."}
          </p>
          <button type="button" className="ghost-button" onClick={onClose}>
            back to the site
          </button>
        </div>
      </div>
    </dialog>
  );
}
