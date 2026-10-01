"use client";

import { useEffect, useRef, useState } from "react";

const RAMP = " .·:-=+*#";
const CW = 9;
const CH = 15;

export function AsciiField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const size = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(canvas.clientWidth / CW);
      rows = Math.ceil(canvas.clientHeight / CH);
    };

    const draw = (now: number) => {
      raf = still || !visible ? 0 : requestAnimationFrame(draw);
      if (now - last < 66) return;
      last = now;
      const t = now / 1000;
      const style = getComputedStyle(canvas);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = style.color;
      ctx.font = `12px ${style.fontFamily}`;
      ctx.textBaseline = "top";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave = (Math.sin(c * 0.16 + t * 0.8) + Math.sin(r * 0.42 - t * 0.6) + Math.sin((c - r) * 0.09 + t * 0.4) + 3) / 6;
          const d = Math.hypot(c * CW - pointer.x, r * CH - pointer.y);
          const ripple = Math.exp(-d / 110) * (0.5 + 0.5 * Math.sin(d * 0.07 - t * 7));
          const v = Math.min(1, Math.pow(wave, 3.2) + ripple * 0.95);
          const ch = RAMP[Math.floor(v * (RAMP.length - 1))];
          if (ch !== " ") ctx.fillText(ch, c * CW, r * CH);
        }
      }
    };

    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    };
    const resize = () => {
      size();
      if (still) requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !still) raf = requestAnimationFrame(draw);
    });

    size();
    observer.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="ascii-field" aria-hidden="true" />;
}

const CMD = 'mail ramaa --subject "a messy problem"';
const TYPE = CMD.length;
const SEND = TYPE + 6;
const DONE = SEND + 20;
const LOOP = DONE + 40;

export function MailTerminal() {
  const ref = useRef<HTMLPreElement>(null);
  const [t, setT] = useState(LOOP - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => setT((n) => (n + 1) % LOOP), 80);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const p = Math.min(10, Math.max(0, Math.floor((t - SEND) / 2)));
  const lines = [`~/you $ ${CMD.slice(0, t)}${t < TYPE || (t < SEND && t % 4 < 2) ? "▌" : ""}`];
  if (t >= SEND) lines.push(`sending  [${"█".repeat(p)}${"░".repeat(10 - p)}] ${p * 10}%`);
  if (t >= DONE) lines.push(`✓ delivered. ramaa is typing${".".repeat(1 + (Math.floor(t / 3) % 3))}`);

  return (
    <pre ref={ref} className="ascii mail-term" aria-hidden="true">
      {lines.join("\n")}
    </pre>
  );
}
