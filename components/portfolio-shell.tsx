"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { orbitStack, stackGroups } from "@/lib/stack";
import Distance from "@/components/distance";
import Work from "@/components/work";
import { projects, research } from "@/lib/projects";
import { AsciiField } from "@/components/ascii";
import { Runner } from "@/components/runner";
import { Ink, doodles, studies } from "@/components/sketches";
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

function AiScribble() {
  return (
    <svg className="glyph glyph-wide ai-scribble" viewBox="0 0 26 16" fill="none" aria-hidden="true">
      <path
        d="M2 14.6C4 10.2 6.1 5.4 8.3 1.5c1.4 3.6 3 8.4 4.9 13.2M4.2 9.9c2.5-.9 5.2-.6 8.1-.3M16.2 2.1c1.9-.5 3.8-.2 5.6-.4M18.9 2c.2 4.1-.4 8.2.1 12.4M15.9 14.7c2.1-.6 4.2 0 6.4-.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
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

const groupHue = [250, 150, 25];

const facts = [
  { doodle: "drawer", value: "7", label: "projects shipped", h: 85 },
  { doodle: "cap", value: "2027", label: "graduating from NIT Rourkela", h: 250 },
  { doodle: "stamps", value: "2", label: "countries visited", h: 25 },
  { doodle: "open", value: "open", label: "to full-time roles", h: 150 },
];

const lately = [
  "llm harness engineering, so agents use fewer tokens",
  "go for backend services",
  "image restoration research with fcsg-net",
  "memory for ai agents",
  "building a personal ai assistant, like muse",
  "an idea: real-time netflix ads, picked per user and per show",
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
            <span className="status-name">{name}</span>
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
          <p className="proj-hook">Built the home feed ranker and the delivery time (ETA) model, trained on 200K past orders.</p>
          <div className="proj-foot exp-foot">
            <p className="label proj-tags">feed ranker · eta model</p>
            <span className="ink-link exp-go">
              read the full write-up <ArrowIcon />
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
}

const studying = [
  { key: "browser", name: "Browser use", hook: "How AI agents use a website: open pages, click buttons, read the result and retry when something breaks.", tags: "dom · playwright · vision", h: 195 },
  { key: "memory", name: "Agentic memory", hook: "How AI agents remember things between chats, and decide what to keep, forget or look up.", tags: "episodic · semantic · retrieval", h: 300 },
];

function StudyCards() {
  return (
    <ul className="work study">
      {studying.map((s) => (
        <li key={s.key} className="proj exp inked redraw" style={v({ "--h": s.h })}>
          <div className="proj-art">
            <Ink d={studies[s.key]} id={`ink-study-${s.key}`} />
          </div>
          <div className="proj-body">
            <p className="label proj-meta">studying now</p>
            <h3>{s.name}</h3>
            <p className="proj-hook">{s.hook}</p>
            <div className="proj-foot exp-foot">
              <p className="label proj-tags">{s.tags}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function portfolioMarkdown() {
  const project = (p: (typeof projects)[number]) => [
    `### ${p.number}. ${p.name}`,
    "",
    p.hook,
    "",
    `- **type:** ${p.type}`,
    `- **problem:** ${p.problem}`,
    `- **built:** ${p.built}`,
    `- **result:** ${p.proof.value}, ${p.proof.label}`,
    `- **stack:** ${p.tags.join(", ")}`,
    `- **live:** [${p.href.replace(/^https?:\/\//, "")}](${p.href})`,
    `- **code:** [${p.repo.replace(/^https?:\/\//, "")}](${p.repo})`,
    "",
  ];
  return [
    "---",
    "name: Ramnath (ramaa)",
    "role: B.Tech CSE student, final year, NIT Rourkela, India",
    "graduating: 2027",
    "status: open to full-time roles",
    `email: ${EMAIL}`,
    "github: https://github.com/whynotramaa",
    "timezone: IST (Asia/Kolkata)",
    "---",
    "",
    "# ramaa",
    "",
    "> I make the worst pasta and the best jokes.",
    "",
    "Products, interfaces, little experiments, failed companies, sports, and occasionally things that are difficult to explain without opening a laptop.",
    "",
    "## About",
    "",
    "I build web apps, developer tools and small machine learning models. I like products that are simple to use and code that is easy to read.",
    "",
    "Final year B.Tech CSE student at NIT Rourkela, India. I graduate in 2027 and I am looking for a full-time job.",
    "",
    "### Quick facts",
    "",
    ...facts.map((f) => `- **${f.value}** ${f.label}`),
    "",
    "### What I am into lately",
    "",
    ...lately.map((item) => `- ${item}`),
    "",
    "### Status, self reported",
    "",
    "| thing | score | note |",
    "| --- | --- | --- |",
    ...status.map(([name, n, value]) => `| ${name} | ${n}/10 | ${value} |`),
    "",
    "## Experience",
    "",
    "### Foomato, ML intern",
    "",
    "- **when:** May to Jul 2026",
    "- **where:** Nepal",
    "- **what:** Built the home feed ranker and the delivery time (ETA) model, trained on 200K past orders.",
    "- **write-up:** [/experience/foomato](/experience/foomato)",
    "",
    "## Studying now",
    "",
    ...studying.flatMap((s) => [`### ${s.name}`, "", s.hook, "", `- **topics:** ${s.tags.replaceAll(" · ", ", ")}`, ""]),
    "## Projects",
    "",
    ...projects.flatMap(project),
    "## Research",
    "",
    ...research.flatMap(project),
    "## Tech stack",
    "",
    ...stackGroups.flatMap((g) => [`### ${g.title}, ${g.label}`, "", ...g.items.map((i) => `- **${i.name}:** ${i.note}`), ""]),
    "## Contact",
    "",
    "Email me about a job, a project, or anything you are building. I reply to every email.",
    "",
    `- **email:** [${EMAIL}](mailto:${EMAIL})`,
    "- **github:** [github.com/whynotramaa](https://github.com/whynotramaa)",
  ].join("\n");
}

function MarkdownInline({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold)
      return (
        <strong key={i}>
          <span className="md-mark">**</span>
          {bold[1]}
          <span className="md-mark">**</span>
        </strong>
      );
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link)
      return (
        <span key={i}>
          <span className="md-mark">[</span>
          {link[1]}
          <span className="md-mark">](</span>
          <a className="md-link" href={link[2]}>
            {link[2]}
          </a>
          <span className="md-mark">)</span>
        </span>
      );
    return part;
  });
}

function MarkdownFile({ source }: { source: string }) {
  const lines = source.split("\n");
  let front = 0;
  return (
    <article className="md-file">
      <div className="md-bar label">
        <span>ramaa.md</span>
        <span>{lines.length} lines · plain text, made for llms</span>
      </div>
      <div className="md-body">
        {lines.map((line, i) => {
          if (line === "---") front++;
          const heading = line.match(/^(#{1,3}) (.*)$/);
          const marker = line.match(/^(- |> )(.*)$/);
          let cls = "md-line";
          let body: ReactNode = <MarkdownInline text={line} />;
          if (front < 2 || line === "---") {
            cls += " md-front";
            const [key, ...rest] = line.split(": ");
            body = rest.length ? (
              <>
                <span className="md-key">{key}</span>
                <span className="md-mark">: </span>
                {rest.join(": ")}
              </>
            ) : (
              <span className="md-mark">{line}</span>
            );
          } else if (heading) {
            cls += ` md-h${heading[1].length}`;
            body = (
              <>
                <span className="md-mark">{heading[1]} </span>
                {heading[2]}
              </>
            );
          } else if (marker) {
            cls += marker[1] === "> " ? " md-quote" : "";
            body = (
              <>
                <span className="md-mark">{marker[1]}</span>
                <MarkdownInline text={marker[2]} />
              </>
            );
          } else if (line.startsWith("|")) {
            cls += " md-table";
            body = line.split(/(\|)/).map((cell, j) => (cell === "|" ? <span key={j} className="md-mark">|</span> : cell));
          }
          return (
            <div key={i} className={cls}>
              <span>{body}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function SectionHead({ no, caption, title, note }: { no: string; caption: ReactNode; title: ReactNode; note?: ReactNode }) {
  return (
    <header className="section-head reveal">
      <span className="label">
        <span className="section-no">{no}</span> {caption}
      </span>
      <h2>{title}</h2>
      {note && <p className="hand head-note">{note}</p>}
    </header>
  );
}

export default function PortfolioShell() {
  const [aiMode, setAiMode] = useState(false);
  const [time, setTime] = useState("--:--");
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
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

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
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
            aria-pressed={aiMode}
            onClick={() => {
              setAiMode((enabled) => !enabled);
              window.scrollTo(0, 0);
            }}
            aria-label="markdown version for ai"
            data-tip={aiMode ? "back to the pretty one" : "markdown for ai"}
          >
            <AiScribble />
          </button>
          <ThemeToggle />
        </div>
      </header>


      {aiMode ? (
        <main className="shell md-view">
          <MarkdownFile source={portfolioMarkdown()} />
        </main>
      ) : (
      <>
      <main className="shell">
        <section className="hero" id="top">
          <AsciiField />
          <div className="hero-top">
            <span className="label">
              portfolio · vol. 26
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
            caption="about"
            title={
              <>
                a bit <em>about me</em>
              </>
            }
          />
          <p className="lede reveal">
            I build web apps, developer tools and small machine learning models. I like products that are simple to use and
            code that is easy to read.
          </p>
          <p className="about-sub reveal">
            Final year B.Tech CSE student at NIT Rourkela, India. I graduate in 2027 and I am looking for a full-time job.
          </p>
          <div className="about-grid">
            <InkStatus />
            <div className="note-card inked">
              <p className="note-title">what I am into lately</p>
              <ul>
                {lately.map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
                experience
              </>
            }
            title={
              <>
                my <em>internship</em>
              </>
            }
            note="foomato, nepal"
          />
          <ExperienceCard />
        </section>

        <section className="block" id="studying">
          <SectionHead
            no="03"
            caption="studying now"
            title={
              <>
                what I am <em>learning</em> right now
              </>
            }
            note="notes coming soon"
          />
          <StudyCards />
        </section>

        <section className="block" id="work">
          <SectionHead
            no="04"
            caption={
              <>
                projects
              </>
            }
            title={
              <>
                projects <em>I have built</em>
              </>
            }
          />
          <Work />
        </section>

        <section className="block" id="research">
          <SectionHead
            no="05"
            caption="research"
            title={
              <>
                my <em>research</em>
              </>
            }
            note="in progress"
          />
          <Work items={research} />
        </section>

        <section className="block" id="stack">
          <SectionHead
            no="06"
            caption="tech stack"
            title={
              <>
                tools I <em>use</em>
              </>
            }
          />
          <div className="recipe inked reveal">
            <div className="recipe-top">
              <span className="label">recipe no. 26</span>
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
                      <span className="recipe-qty">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="block" id="world">
          <SectionHead
            no="07"
            caption={
              <>
                outside work
              </>
            }
            title={
              <>
                things I <em>love</em>
              </>
            }
            note="you can drag these"
          />
          <div className="reveal">
            <Scrapbook />
          </div>
        </section>

        <section className="block">
          <SectionHead
            no="08"
            caption="say hi"
            title={
              <>
                distance and <em>guestbook</em>
              </>
            }
          />
          <div className="duo reveal">
            <div className="card inked" style={v({ "--h": 195 })}>
              <span className="label">
                distance
              </span>
              <h3>you are this far from me</h3>
              <Distance />
            </div>
            <div className="card inked" style={v({ "--h": 300 })}>
              <span className="label">the guestbook</span>
              <h3>sign the guestbook</h3>
              <SignaturePad />
            </div>
          </div>
        </section>

        <section className="block" id="contact">
          <div className="contact inked redraw reveal" style={v({ "--h": 25 })}>
            <div className="contact-copy">
              <span className="label">
                <span className="section-no">09</span> contact
              </span>
              <h2>
                want to <em>work together</em>?
              </h2>
              <p className="contact-lead">Email me about a job, a project, or anything you are building. I reply to every email.</p>
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
            </div>
            <Ink d={doodles.letter} id="ink-letter" className="sketch contact-art" />
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <AsciiCricket />
        <p className="footer-status">
          <Manifest /> · 7 projects shipped
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
      </>
      )}
    </div>
  );
}

