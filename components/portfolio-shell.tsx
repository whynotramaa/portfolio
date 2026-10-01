"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { orbitStack, stackGroups } from "@/lib/stack";
import Distance from "@/components/distance";
import Work, { FlipWords } from "@/components/work";
import { research } from "@/lib/projects";
import { AsciiField } from "@/components/ascii";
import { Runner } from "@/components/runner";
import { Ink, doodles } from "@/components/sketches";
import { Scrapbook, SignaturePad } from "@/components/scrapbook";
import { FoomatoSketch } from "@/components/foomato";

const EMAIL = "hire.ramaa@gmail.com";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const MANIFESTATION = "get a ≥ 1.25 lakh per month job";

function Manifest() {
  const [clicks, setClicks] = useState(0);
  const bits = useMemo(
    () =>
      [...MANIFESTATION].map(() => ({
        "--x": `${(Math.random() - 0.5) * 240}px`,
        "--y": `${(Math.random() - 0.5) * 80}px`,
        "--r": `${(Math.random() - 0.5) * 180}deg`,
      })),
    [],
  );
  return (
    <>
      <button className="manifest-btn" type="button" onClick={() => setClicks((c) => c + 1)}>
        manifesting things{".".repeat(Math.min(clicks, 3))}
      </button>
      {clicks > 3 && (
        <span className="manifestation" role="status">
          {[...MANIFESTATION].map((ch, i) => (
            <span key={i} className="mote" style={v({ ...bits[i], "--i": i })}>
              {ch}
            </span>
          ))}
        </span>
      )}
    </>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow-icon ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link className="wordmark" href={href}>
      <span className="wordmark-star" aria-hidden="true">
        ✱
      </span>
      ramaa
    </Link>
  );
}

function Wobble() {
  return (
    <svg className="wobble" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path
        d="M2 9C14 3 24 13 36 8S58 3 70 8 94 14 106 8 128 3 140 8 164 13 176 8 192 5 198 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}

function HandArrow() {
  return (
    <svg className="hand-arrow" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M4 32C6 16 16 6 30 4M30 4l-9 2M30 4l3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4M15.8 15.8l-1.4-1.4M5.6 5.6 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      setDark(!dark);
    };
    window.localStorage.setItem("ramaa-theme", next);
    root.style.setProperty("--vt-x", `${event.clientX}px`);
    root.style.setProperty("--vt-y", `${event.clientY}px`);
    const transition = document.startViewTransition?.bind(document);
    if (!transition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    transition(apply);
  };

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggle}
      aria-label={`switch to ${dark ? "light" : "dark"} mode`}
      data-tip={dark ? "lights on" : "lights off"}
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function GlassesIcon() {
  return (
    <svg className="glyph glyph-wide" viewBox="0 0 26 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="20" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.4 7c1-1 4.2-1 5.2 0M1.6 5.4 0.6 4M24.4 5.4l1-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const banter = [
  ["ok ok, I heard you", "still hiring me?"],
  ["that's four clicks", "I call that commitment"],
  ["hr has entered", "the chat"],
  ["salary?", "negotiable. pasta isn't"],
  ["fine.", "start monday?"],
];

function BestJokes() {
  const [clicks, setClicks] = useState(0);
  const said = clicks >= 4 ? "// not funny, as per peehu" : clicks === 3 ? "// fine, not best jokes" : "";

  return (
    <>
      <button type="button" className={`circled best-jokes${said ? " is-struck" : ""}`} onClick={() => setClicks((n) => n + 1)}>
        <span className="jokes-best">best</span> jokes
        <Wobble />
        {!said && (
          <span className="jokes-q" aria-hidden="true">
            ?
          </span>
        )}
      </button>
      .
      <span key={said} className="jokes-said" aria-live="polite">
        {said}
      </span>
    </>
  );
}

function HireStamp() {
  const [clicks, setClicks] = useState(0);
  const stage = clicks % (banter.length + 3);
  const line = stage >= 3 ? banter[stage - 3] : null;
  const motion = clicks === 0 ? "" : stage === 1 || stage === 2 ? " is-thunk" : " is-flip";

  return (
    <button type="button" className="hire-stamp" onClick={() => setClicks((n) => n + 1)} aria-live="polite">
      <span key={clicks} className={`hire-ink${motion}${line ? " is-back" : ""}`}>
        {line ? line[0] : "looking for a job"}
        <strong>{line ? line[1] : "class of 2027"}</strong>
      </span>
    </button>
  );
}

function Clock({ time }: { time: string }) {
  const [h, m] = time.split(":");
  return (
    <span className="clock">
      {h}
      <span className="blink">:</span>
      {m}
    </span>
  );
}

const excuses = ["instead of studying", "at 3am, mostly", "between cricket matches", "instead of sleeping", "for the plot"];

const groupHue = [250, 150, 25];

const facts = [
  { doodle: "drawer", value: "7", label: "things in this drawer", h: 85 },
  { doodle: "cap", value: "2027", label: "graduating from NIT Rourkela", h: 250 },
  { doodle: "stamps", value: "2", label: "countries stood in", h: 25 },
  { doodle: "open", value: "open", label: "to work and good problems", h: 150 },
];

const GLYPHS = "!<>-_/[]{}=+*^?#";

function useScrambleOnHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const busy = new WeakSet<Element>();
    const over = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.("[data-scramble]");
      if (!el || busy.has(el) || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return;
      const node = [...el.childNodes].find((n): n is Text => n.nodeType === 3 && !!n.textContent?.trim());
      if (!node) return;
      const text = node.textContent ?? "";
      busy.add(el);
      let frame = 0;
      const timer = window.setInterval(() => {
        const done = ++frame / 1.4;
        node.textContent = [...text]
          .map((ch, i) => (ch === " " || i < done ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("");
        if (done < text.length) return;
        window.clearInterval(timer);
        node.textContent = text;
        busy.delete(el);
      }, 28);
    };
    document.addEventListener("pointerover", over);
    return () => document.removeEventListener("pointerover", over);
  }, []);
}

const status: [string, number, string, number][] = [
  ["jokes", 10, "best", 150],
  ["pasta", 1, "worst", 25],
  ["cricket", 9, "every weekend", 85],
  ["sleep", 3, "negotiable", 250],
  ["shipping", 8, "7 things", 300],
];

function InkStatus() {
  return (
    <div className="status-card inked reveal" style={v({ "--h": 195 })}>
      <p className="status-prompt">
        <span className="label">~/ramaa $ status --honest</span>
        <span className="hand status-aside">self reported</span>
      </p>
      <ul className="status-list">
        {status.map(([name, n, value, h]) => (
          <li key={name} className="status-row" style={v({ "--h": h })}>
            <span className="hand status-name">{name}</span>
            <svg className="status-bar" viewBox="0 0 200 22" preserveAspectRatio="none" role="img" aria-label={`${n} out of 10`}>
              <g filter="url(#ink-edge)">
                <path className="status-fill" d={`M3 4H${3 + n * 19.4}V18H4Z`} />
                <path className="status-track" d="M3 4 197 3 196 18 4 18Z" />
              </g>
            </svg>
            <span className="label status-value">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const W = 46;
const STEPS = 38;

function cricketFrame(t: number) {
  const grid = Array.from({ length: 5 }, () => Array<string>(W).fill(" "));
  const put = (row: number, col: number, text: string) =>
    [...text].forEach((ch, i) => {
      if (ch !== " " && row >= 0 && row < 5 && col + i >= 0 && col + i < W) grid[row][col + i] = ch;
    });
  const hit = t >= 16;
  put(2, 0, "|||");
  put(3, 0, "|||");
  if (hit && t >= 19) {
    put(1, 4, "\\o/");
    put(2, 5, "|");
    put(3, 4, "/ \\");
  } else {
    put(1, 5, "o");
    put(2, 4, hit ? "/|\\_" : "/|\\");
    put(3, 4, "/ \\");
    if (!hit) put(2, 7, "\\");
  }
  put(1, 42, t < 4 ? "o/" : "o");
  put(2, 41, t < 4 ? "/|" : "/|\\");
  put(3, 41, "/ \\");
  if (!hit) put(2, 38 - t * 2, "•");
  else {
    const k = t - 16;
    put(2 - Math.floor(k / 2), 10 + k * 3, "•");
  }
  if (t >= 24 && t % 4 < 3) put(0, 20, "SIX!");
  put(4, 0, "._.-".repeat(W / 4 + 1).slice(0, W));
  return grid.map((row) => row.join("")).join("\n");
}

function AsciiCricket() {
  const [t, setT] = useState(30);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setT((step) => (step + 1) % STEPS), 110);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <pre className="ascii" role="img" aria-label="ascii animation of a batter hitting a six">
      {cricketFrame(t)}
    </pre>
  );
}

function ExperienceCard() {
  return (
    <ul className="work">
      <li className="proj exp inked redraw" style={v({ "--h": 25 })}>
        <div className="proj-art">
          <FoomatoSketch />
        </div>
        <div className="proj-body">
          <p className="label proj-meta">ml intern · may to jul 2026 · nepal</p>
          <h3>
            <Link href="/experience/foomato">Foomato</Link>
          </h3>
          <p className="hand proj-hook">taught 200K old orders to set the table and read the clock.</p>
          <div className="proj-foot exp-foot">
            <p className="label proj-tags">feed ranker · eta model</p>
            <span className="ink-link exp-go">
              read the case file <ArrowIcon />
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
}

function SectionHead({ no, caption, title, note }: { no: string; caption: ReactNode; title: ReactNode; note: ReactNode }) {
  return (
    <header className="section-head reveal">
      <span className="label">
        <span className="section-no">{no}</span> {caption}
      </span>
      <h2>{title}</h2>
      <p className="hand head-note">{note}</p>
    </header>
  );
}

export default function PortfolioShell() {
  const [nerdMode, setNerdMode] = useState(false);
  const [time, setTime] = useState("--:--");
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  useScrambleOnHover();

  useEffect(() => {
    const clock = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    };
    clock();
    const timer = window.setInterval(clock, 20000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!nerdMode) return;
    pageRef.current
      ?.querySelectorAll<HTMLElement>("section, div, article, header, footer, nav, main, ul, aside")
      .forEach((element) => {
        if (!element.dataset.tag) element.dataset.tag = element.tagName.toLowerCase();
      });
  }, [nerdMode]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div ref={pageRef} className={nerdMode ? "nerd-mode" : undefined}>
      <svg className="ink-defs" aria-hidden="true">
        <filter id="ink-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={3} />
        </filter>
      </svg>
      <div className="loader" aria-hidden="true">
        <span className="loader-spin" />
        <span>ramaa</span>
        <span className="faint">warming up the jokes</span>
      </div>

      <header className="site-header">
        <Wordmark href="#top" />
        <div className="header-tools">
          <span className="label header-clock">
            <Clock time={time} /> ist
          </span>
          <button
            className="icon-button"
            type="button"
            aria-pressed={nerdMode}
            onClick={() => setNerdMode((enabled) => !enabled)}
            aria-label="nerd mode"
            data-tip={nerdMode ? "nerd mode: on" : "nerd mode"}
          >
            <GlassesIcon />
          </button>
          <ThemeToggle />
        </div>
      </header>


      <main className="shell">
        <section className="hero" id="top">
          <AsciiField />
          <div className="hero-top">
            <span className="label">
              portfolio · vol. 26
              <span className="nerd-comment">hero: 5 letters, 60ms stagger, zero images</span>
            </span>
          </div>

          <div className="hero-name">
            <h1 className="hero-title" aria-label="ramaa">
              {"ramaa".split("").map((letter, index) => (
                <span
                  key={index}
                  className={letter === "m" ? "char char-m" : "char"}
                  aria-hidden="true"
                  style={v({ "--i": index })}
                  onClick={letter === "m" ? () => setPlaying(true) : undefined}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <HireStamp />
            <Runner open={playing} onClose={() => setPlaying(false)} />
          </div>
          <p className="hand hero-aka">
            <HandArrow />
            or formally, ramnath
          </p>
          <p className="hero-line">
            I make worst pasta
            <span className="emo sticker-pasta" aria-hidden="true">
              🍝
            </span>{" "}
            and{" "}
            <BestJokes />
          </p>
          <p className="hero-blurb">
            Products, interfaces, little experiments, failed companies, sports, and occasionally things that are
            difficult to explain without opening a laptop.
          somehow, also interned at a food delivery company based out of Nepal, Foomato. built recommendation engine and ETA prediction.
          </p>

          <dl className="hero-meta inked" style={v({ "--h": 85 })}>
            <div>
              <dt className="hand">currently at</dt>
              <dd>NIT Rourkela</dd>
              <dd className="label">b.tech cse, final year</dd>
            </div>
            <div>
              <dt className="hand">graduating</dt>
              <dd>2027</dd>
              <dd className="label">hireable before then</dd>
            </div>
            <div>
              <dt className="hand">my clock</dt>
              <dd>
                <Clock time={time} />
              </dd>
              <dd className="label">ist, rourkela</dd>
            </div>
          </dl>

          <div className="hero-actions">
            <a className="button" href={`mailto:${EMAIL}`}>
              <span className="emo wave" aria-hidden="true">
                👋
              </span>
              say hello
              <ArrowIcon />
            </a>
            <ExternalLink className="button button-ghost" href="https://github.com/whynotramaa">
              github.com/whynotramaa
            </ExternalLink>
            <span className="hand hero-aside">I really do reply</span>
          </div>

          <div className="orbit">
            <span className="label">current orbit</span>
            <ul className="orbit-icons">
              {orbitStack.map((item, index) => (
                <li
                  key={item.name}
                  className="orbit-icon"
                  tabIndex={0}
                  data-tip={item.name}
                  style={v({ "--i": index, "--icon": `url(${item.icon})` })}
                />
              ))}
              <li className="orbit-icon orbit-more" tabIndex={0} data-tip="more & more">
                +
              </li>
            </ul>
          </div>
        </section>

        <section className="block" id="about">
          <SectionHead
            no="01"
            caption="the person holding the pen"
            title={
              <>
                small team energy, <em>one person</em>
              </>
            }
            note="no boring bio here"
          />
          <p className="lede reveal">
            I like making useful things feel obvious. Sometimes that means a quiet interface. Sometimes it means teaching a
            tiny search engine how to explain its own decisions.
          </p>
          <p className="about-sub reveal">
            Final year B.Tech CSE at NIT Rourkela, India. Graduating 2027, and looking for a job before then.
          </p>
          <div className="about-grid">
            <InkStatus />
            <div className="note-card inked">
              <p className="hand note-title">into these lately</p>
              <ul>
                <li>llm and harness engineering to optimize tokens</li>
                <li>go-lang for backend</li>
                <li>research on image restoration using fcsg-net</li>
                <li>learning about the memory layer for agents</li>
                <li>trying to build a personal agentic bot system, like muse</li>
                <li>daydreaming about swapping netflix ads per user and per series, all realtime</li>
              </ul>
            </div>
          </div>
          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.doodle} className="fact inked redraw reveal" style={v({ "--h": fact.h })}>
                <Ink d={doodles[fact.doodle]} id={`ink-${fact.doodle}`} className="fact-art" />
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="block" id="experience">
          <SectionHead
            no="02"
            caption={
              <>
                where someone paid me to think
                <span className="nerd-comment">one card, one route, a whole case file behind it</span>
              </>
            }
            title={
              <>
                one internship, <em>two models</em>
              </>
            }
            note={
              <>
                real users, real momo<span className="x-out">s</span>
              </>
            }
          />
          <ExperienceCard />
        </section>

        <section className="block" id="work">
          <SectionHead
            no="03"
            caption={
              <>
                selected work
                <span className="nerd-comment">card grid, hover replays the ink and boils the turbulence</span>
              </>
            }
            title={
              <>
                things I built{" "}
                <FlipWords words={excuses} />
              </>
            }
            note="the good drawer"
          />
          <Work />
        </section>

        <section className="block" id="research">
          <SectionHead
            no="04"
            caption="ongoing research"
            title={
              <>
                poking at <em>machine learning</em>
              </>
            }
            note="still training"
          />
          <Work items={research} />
        </section>

        <section className="block" id="stack">
          <SectionHead
            no="05"
            caption="the current toolbox"
            title={
              <>
                what I make <em>things with</em>
              </>
            }
            note="plus 43 open tabs"
          />
          <div className="recipe inked reveal">
            <div className="recipe-top">
              <span className="label">recipe no. 26</span>
              <span className="hand recipe-serves">serves one working product</span>
            </div>
            {stackGroups.map((group, g) => (
              <div className="recipe-group" key={group.label} style={v({ "--h": groupHue[g] })}>
                <div className="recipe-head">
                  <h3 className="hand recipe-title">{group.title}</h3>
                  <span className="label">{group.label}</span>
                </div>
                <ul className="recipe-list">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="recipe-item"
                      style={v({ "--icon": `url(${item.icon})`, ...(item.color ? { "--brand": item.color } : {}) })}
                    >
                      <span className="stack-icon" aria-hidden="true" />
                      <span className="recipe-name">{item.name}</span>
                      <span className="recipe-dots" aria-hidden="true" />
                      <span className="hand recipe-qty">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="hand recipe-method">method: stir until it ships, serve warm.</p>
          </div>
        </section>

        <section className="block" id="world">
          <SectionHead
            no="06"
            caption={
              <>
                off the clock
                <span className="nerd-comment">desk: percent offsets, survives a resize</span>
              </>
            }
            title={
              <>
                my world, <em>roughly pinned down</em>
              </>
            }
            note="drag anything"
          />
          <div className="reveal">
            <Scrapbook />
          </div>
        </section>

        <section className="block">
          <SectionHead
            no="07"
            caption="right now"
            title={
              <>
                you, me, <em>and the map</em>
              </>
            }
            note="as the crow flies"
          />
          <div className="duo reveal">
            <div className="card inked" style={v({ "--h": 195 })}>
              <span className="label">
                distance
                <span className="nerd-comment">geo: ipapi.co, city-level, no cookies</span>
              </span>
              <h3>you are this far from me</h3>
              <Distance />
            </div>
            <div className="card inked" style={v({ "--h": 300 })}>
              <span className="label">the guestbook</span>
              <h3>leave a mark before you go</h3>
              <SignaturePad />
            </div>
          </div>
        </section>

        <section className="block" id="contact">
          <div className="contact inked redraw reveal" style={v({ "--h": 25 })}>
            <div className="contact-copy">
              <span className="label">
                <span className="section-no">08</span> one last thing
              </span>
              <h2>
                have a problem worth <em>opening a laptop</em> for?
              </h2>
              <p className="contact-lead">Send me the messy version. That one is usually more interesting.</p>
              <div className="mail-row">
                <a className="mail-link" href={`mailto:${EMAIL}`}>
                  <span data-scramble>{EMAIL}</span>
                </a>
                <button className="pill copy-button" type="button" onClick={copyEmail} aria-live="polite">
                  {copied ? "copied" : "copy"}
                </button>
              </div>
              <div className="hero-actions">
                <a className="button" href={`mailto:${EMAIL}`}>
                  write to me
                  <ArrowIcon />
                </a>
                <ExternalLink className="button button-ghost" href="https://github.com/whynotramaa">
                  github
                  <ArrowIcon />
                </ExternalLink>
              </div>
              <p className="hand contact-aside">probably up too late building something</p>
            </div>
            <Ink d={doodles.letter} id="ink-letter" className="sketch contact-art" />
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <AsciiCricket />
        <p className="footer-status">
          <Manifest /> · 7 things shipped · 1 pasta incident, unresolved
        </p>
        <div className="footer-bar">
          <Wordmark href="#top" />
          <span className="label">made with zero em dashes</span>
          <span className="label">
            <Clock time={time} /> ist, rourkela · © 2026
          </span>
          <a className="label back-top" href="#top">
            <span data-scramble>back to top</span> ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

