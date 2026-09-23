"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { projects } from "@/lib/projects";
import { orbitStack, stackGroups } from "@/lib/stack";
import Distance from "@/components/distance";
import { Scrapbook, SignaturePad } from "@/components/scrapbook";

const EMAIL = "hire.ramaa@gmail.com";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function ExternalLink({
  href,
  className,
  children,
  cursor,
  magnetic,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  cursor?: string;
  magnetic?: boolean;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor={cursor}
      data-magnetic={magnetic ? "" : undefined}
    >
      {children}
    </a>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow-icon ${className}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link className="wordmark" href={href}>
      <span className="seal jp" aria-hidden="true" data-tip="rama, in katakana" data-tip-pos="bottom">
        ラマ
      </span>
      ramaa
    </Link>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`ink-arrow ${className}`} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M4 32C6 16 16 6 30 4M30 4l-9 2M30 4l3 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

function Wobble() {
  return (
    <svg className="wobble" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path
        d="M2 9C14 3 24 13 36 8S58 3 70 8 94 14 106 8 128 3 140 8 164 13 176 8 192 5 198 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}

function Draggable({ className, children }: { className: string; children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const end = () => {
    start.current = null;
    setDragging(false);
  };

  return (
    <aside
      className={`${className} draggable${dragging ? " is-dragging" : ""}`}
      data-cursor="drag"
      style={{ translate: `${offset.x}px ${offset.y}px` }}
      onPointerDown={(event) => {
        start.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const from = start.current;
        if (from) setOffset({ x: from.ox + event.clientX - from.x, y: from.oy + event.clientY - from.y });
      }}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {children}
    </aside>
  );
}

function PencilRing({ className = "" }: { className?: string }) {
  return (
    <svg className={`pencil-ring ${className}`} viewBox="0 0 200 80" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path
        d="M172 12C128 0 44 4 16 26-6 44 34 74 104 75c70 1 100-24 82-50-10-14-38-19-70-17"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="theme-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 1.4v2.2M10 16.4v2.2M18.6 10h-2.2M3.6 10H1.4M16.08 3.92l-1.56 1.56M5.48 14.52l-1.56 1.56M16.08 16.08l-1.56-1.56M5.48 5.48L3.92 3.92" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GlassesIcon() {
  return (
    <svg className="glasses" viewBox="0 0 26 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.4" />
      <path className="draw" d="M10.4 7c1-1 4.2-1 5.2 0M1.6 5.4 0.6 4M24.4 5.4l1-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function RollLink({ href, children }: { href: string; children: string }) {
  return (
    <Link className="roll" href={href} data-text={children}>
      <span>{children}</span>
    </Link>
  );
}

const blossoms = [
  [560, 34, 1.1],
  [520, 58, 0.8],
  [470, 118, 1],
  [455, 168, 1.25],
  [420, 106, 0.7],
  [380, 142, 0.9],
  [338, 98, 1.05],
  [300, 86, 0.75],
  [272, 250, 1.15],
  [252, 178, 0.85],
  [160, 206, 1],
  [116, 176, 0.8],
  [88, 262, 1.2],
];

function Branch() {
  return (
    <svg className="branch" viewBox="0 0 600 320" fill="none" aria-hidden="true">
      <defs>
        <symbol id="sakura" viewBox="-14 -14 28 28" overflow="visible">
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              className="sakura-petal"
              transform={`rotate(${angle})`}
              d="M0 0C-5.5-3-6.8-9.5-2.4-12.6L0-10.4 2.4-12.6C6.8-9.5 5.5-3 0 0Z"
            />
          ))}
          <circle className="sakura-heart" r="1.8" />
        </symbol>
      </defs>
      <g className="branch-sway">
        <path className="twig twig-main" pathLength={1} d="M620 26C540 36 480 64 424 108S330 170 250 180 140 212 88 262" />
        <path className="twig" pathLength={1} d="M472 72C484 110 472 142 455 168" />
        <path className="twig" pathLength={1} d="M382 140C362 112 340 96 300 86" />
        <path className="twig" pathLength={1} d="M300 172C302 206 292 232 272 250" />
        <path className="twig" pathLength={1} d="M184 200C164 182 142 176 116 176" />
        {blossoms.map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <use className="bloom" href="#sakura" x="-14" y="-14" width="28" height="28" style={v({ "--i": i })} />
          </g>
        ))}
      </g>
    </svg>
  );
}

const petals = Array.from({ length: 16 }, (_, i) => ({
  x: `${(i * 37 + 11) % 100}%`,
  s: 0.6 + ((i * 7) % 5) / 6,
  dur: `${12 + ((i * 5) % 9)}s`,
  delay: `${-((i * 13) % 19)}s`,
  sw: `${2.4 + ((i * 3) % 4) * 0.7}s`,
}));

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={v({ "--x": p.x, "--s": p.s, "--dur": p.dur, "--delay": p.delay, "--sw": p.sw })}>
          <i />
        </span>
      ))}
    </div>
  );
}

const ascii = String.raw`                                                           .--.
       *  *   * *  *                                      (    )
    * *  ** * * **  * *                                    '--'
   *  ** *\ * /* ** * *                   __/\__                          ______________
    * *  \ \|/ /  * *                  __/ /\/\ \__                       \____________/
      *   \_|_/  *   *               _/  /      \  \_                       |   ||   |
       *    |      *               _/                \_                    _|________|_
            |                    _/                    \_                   |        |
            |                  _/                        \_                 |        |
___________/|\______________________________________________________________________________
  ~   ~~    ~   ~~~   ~    ~~   ~   ~~~    ~   ~~   ~    ~~~   ~   ~~    ~   ~~~   ~    ~~
~~   ~    ~~~   ~   ~~    ~   ~~~    ~   ~~    ~   ~~~   ~    ~~   ~   ~~~   ~    ~~   ~   ~
                    ,                                             *
                                            *                                      ,`;

function AsciiScene() {
  let bloom = 0;
  return (
    <pre className="ascii" role="img" aria-label="ascii drawing of a cherry tree, mount fuji and a torii gate by the water">
      {ascii.split("\n").map((line, row) => (
        <span key={row} className="ascii-line">
          {line.split(/(\*)/).map((chunk, index) =>
            chunk === "*" ? (
              <span key={index} className="b" style={v({ "--i": bloom++ })}>
                *
              </span>
            ) : (
              chunk
            ),
          )}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let frame = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      root.classList.add("cursor-on");
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor], a, button, canvas");
      ring.dataset.state = target ? (target.dataset.cursor ? "label" : "link") : "";
      setLabel(target?.dataset.cursor ?? "");
    };
    const burst = (event: PointerEvent) => {
      if (calm || (event.target as Element).closest("canvas, .cutout, .draggable")) return;
      for (let i = 0; i < 7; i++) {
        const petal = document.createElement("i");
        petal.className = "burst";
        petal.style.left = `${event.clientX}px`;
        petal.style.top = `${event.clientY}px`;
        document.body.appendChild(petal);
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
        const reach = 36 + Math.random() * 46;
        petal.animate(
          [
            { transform: "translate(-50%, -50%) scale(0) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${Math.cos(angle) * reach}px), calc(-50% + ${Math.sin(angle) * reach + 34}px)) scale(1) rotate(${200 + Math.random() * 260}deg)`,
              opacity: 0,
            },
          ],
          { duration: 1000 + Math.random() * 500, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        ).onfinish = () => petal.remove();
      }
    };
    const down = (event: PointerEvent) => {
      root.classList.add("cursor-down");
      burst(event);
    };
    const up = () => root.classList.remove("cursor-down");
    const leave = () => root.classList.remove("cursor-on");
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const pull = (event: PointerEvent) => {
      const el = event.currentTarget as HTMLElement;
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    };
    const release = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.transform = "";
    };
    magnets.forEach((el) => {
      el.addEventListener("pointermove", pull);
      el.addEventListener("pointerleave", release);
    });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor", "cursor-on", "cursor-down");
      magnets.forEach((el) => {
        el.removeEventListener("pointermove", pull);
        el.removeEventListener("pointerleave", release);
      });
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function FillText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={index} className="fill-word">
          {word}{" "}
        </span>
      ))}
    </>
  );
}

export default function PortfolioShell() {
  const [dark, setDark] = useState(false);
  const [nerdMode, setNerdMode] = useState(false);
  const [time, setTime] = useState("--:--");
  const [copied, setCopied] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("ramaa-theme");
    const initialDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(initialDark);
    document.documentElement.dataset.theme = initialDark ? "dark" : "light";

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
    const clockTimer = window.setInterval(clock, 20000);

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      headerRef.current?.classList.toggle("is-scrolled", y > 40);
      headerRef.current?.classList.toggle("is-hidden", y > 480 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px" },
    );
    pageRef.current?.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const counter = pageRef.current?.querySelector<HTMLElement>("[data-count]");
    let countObserver: IntersectionObserver | null = null;
    if (counter) {
      countObserver = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          const target = Number(counter.dataset.count);
          const start = performance.now();
          counter.textContent = "0";
          const tick = (now: number) => {
            const progress = Math.min((now - start) / 1100, 1);
            counter.textContent = String(Math.round((1 - (1 - progress) ** 3) * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countObserver?.disconnect();
        },
        { threshold: 1 },
      );
      countObserver.observe(counter);
    }

    return () => {
      window.clearInterval(clockTimer);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      countObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!nerdMode) return;
    pageRef.current
      ?.querySelectorAll<HTMLElement>("section, div, article, header, footer, nav, main, ul, aside")
      .forEach((element) => {
        if (!element.dataset.tag) element.dataset.tag = element.tagName.toLowerCase();
      });
  }, [nerdMode]);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("ramaa-theme", nextDark ? "dark" : "light");
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div ref={pageRef} className={nerdMode ? "nerd-mode" : undefined}>
      <div className="intro" aria-hidden="true">
        <span className="intro-seal jp">ラマー</span>
        <span className="intro-line label">portfolio, 2026</span>
      </div>
      <Cursor />
      <div className="progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-header" ref={headerRef}>
        <Wordmark href="#top" />
        <nav className="desktop-nav" aria-label="Primary">
          <RollLink href="#work">work</RollLink>
          <RollLink href="#world">my world</RollLink>
          <RollLink href="#stack">stack</RollLink>
          <RollLink href="/blog">notes</RollLink>
          <RollLink href="#contact">contact</RollLink>
        </nav>
        <div className="header-tools">
          <span className="label header-clock">
            <span className="clock" key={time}>
              {time}
            </span>{" "}
            ist
          </span>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`switch to ${dark ? "light" : "dark"} mode`}
          >
            {dark ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            className="nerd-toggle"
            type="button"
            aria-pressed={nerdMode}
            onClick={() => setNerdMode((enabled) => !enabled)}
          >
            <GlassesIcon />
            <span className="nerd-label">nerd mode</span>
          </button>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile">
        <Link href="#work">work</Link>
        <Link href="#world">world</Link>
        <Link href="#stack">stack</Link>
        <Link href="#contact">say hi</Link>
      </nav>

      <main>
        <section className="hero" id="top">
          <Branch />
          <Petals />
          <p className="hero-vertical jp" aria-hidden="true" data-tip="craftsmanship, and sometimes jokes" data-tip-pos="left">
            ものづくり、ときどき冗談。
          </p>

          <div className="hero-inner shell">
            <div className="hero-top">
              <span className="status">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="label">looking for a job, class of 2027</span>
              </span>
              <span className="label">
                portfolio · vol. 26
                <span className="nerd-comment">hero: 5 letters, 70ms stagger, one svg branch</span>
              </span>
            </div>

            <div className="hero-title-wrap">
              <h1 className="hero-title" aria-label="ramaa">
                {"ramaa".split("").map((letter, index) => (
                  <span key={index} className="char" aria-hidden="true" style={v({ "--i": index })}>
                    <span className="char-in">{letter}</span>
                  </span>
                ))}
              </h1>
              <p className="hero-aka hand">
                <Arrow className="arrow-aka" />
                or formally, ramnath
              </p>
            </div>

            <div className="hero-grid">
              <p className="hero-line">
                I make worst pasta and{" "}
                <span className="circled">
                  best jokes
                  <Wobble />
                </span>
                .
              </p>
              <div className="hero-side">
                <p className="hero-blurb">
                  Products, interfaces, little experiments, failed companies, sports, and occasionally things that are
                  difficult to explain without opening a laptop.
                </p>
                <dl className="hero-meta">
                  <div>
                    <dt>currently</dt>
                    <dd>NIT Rourkela, B.Tech CSE</dd>
                  </div>
                  <div>
                    <dt>graduating</dt>
                    <dd>2027</dd>
                  </div>
                  <div>
                    <dt>my clock</dt>
                    <dd>
                      <span className="clock" key={time}>
                        {time}
                      </span>{" "}
                      IST
                    </dd>
                  </div>
                </dl>
                <div className="hero-actions">
                  <a className="button" href={`mailto:${EMAIL}`} data-magnetic="">
                    <span className="button-fill" aria-hidden="true" />
                    <span className="button-text">say hello</span>
                    <ArrowIcon className="button-arrow" />
                  </a>
                  <ExternalLink className="text-link" href="https://github.com/whynotramaa">
                    github.com/whynotramaa
                  </ExternalLink>
                  <span className="hand hero-aside">I really do reply</span>
                </div>
              </div>
            </div>

            <div className="hero-foot">
              <div className="orbit-row">
                <span className="label">current orbit</span>
                <ul className="orbit-icons">
                  {orbitStack.map((item, index) => (
                    <li key={item.name} className="orbit-icon" tabIndex={0} style={v({ "--i": index })}>
                      <img src={item.icon} alt="" width={16} height={16} loading="lazy" />
                      <span className="tip" role="tooltip">
                        {item.name}
                      </span>
                    </li>
                  ))}
                  <li className="orbit-icon orbit-more" tabIndex={0}>
                    +
                    <span className="tip" role="tooltip">
                      more &amp; more
                    </span>
                  </li>
                </ul>
              </div>
              <a className="scroll-cue label" href="#about">
                scroll
                <span className="scroll-line" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="block shell" id="about">
          <SectionHead
            no="01"
            kanji="私"
            caption="the person behind the tabs"
            title={
              <>
                small team energy, <em>one person</em>
              </>
            }
            note="no boring bio here"
          />
          <div className="about">
            <p className="lede">
              <FillText text="I like making useful things feel obvious. Sometimes that means a quiet interface. Sometimes it means teaching a tiny search engine how to explain its own decisions." />
            </p>
            <div className="about-grid reveal">
              <p className="about-sub">
                Final year B.Tech CSE at NIT Rourkela, India. Graduating 2027, and looking for a job before then.
              </p>
              <Draggable className="note-card">
                <span className="note-pin" aria-hidden="true" />
                <p className="hand note-title">into these lately</p>
                <ul>
                  <li>llm and harness engineering to optimize tokens</li>
                  <li>go-lang for backend</li>
                  <li>research on image restoration using fcsg-net</li>
                </ul>
              </Draggable>
            </div>
            <div className="facts reveal">
              <div className="fact">
                <strong data-count="7">7</strong>
                <span className="label">things in this drawer</span>
              </div>
              <div className="fact">
                <strong>2027</strong>
                <span className="label">graduating from NIT Rourkela</span>
              </div>
              <div className="fact">
                <strong>2</strong>
                <span className="label">countries stood in</span>
              </div>
              <div className="fact">
                <strong className="fact-word">open</strong>
                <span className="label">to work and good problems</span>
              </div>
            </div>
          </div>
        </section>

        <section className="block shell" id="work">
          <SectionHead
            no="02"
            kanji="作品"
            caption={
              <>
                selected work
                <span className="nerd-comment">every row shows its proof up front, hover only nudges</span>
              </>
            }
            title={
              <>
                things I built <em>instead of studying</em>
              </>
            }
            note="the good drawer"
          />
          <Work />
        </section>

        <section className="block shell" id="stack">
          <SectionHead
            no="03"
            kanji="道具"
            caption="the current toolbox"
            title={
              <>
                what I make <em>things with</em>
              </>
            }
            note="plus 43 open tabs"
          />
          <div className="stack reveal">
            {stackGroups.map((group, groupIndex) => (
              <div className="stack-card" key={group.label}>
                <div className="stack-head">
                  <span className="section-no">0{groupIndex + 1}</span>
                  <span className="stack-kanji jp" aria-hidden="true" data-tip={group.meaning}>
                    {group.kanji}
                  </span>
                </div>
                <h3 className="stack-title">{group.label}</h3>
                <ul className="stack-list">
                  {group.items.map((item, index) => (
                    <li
                      key={item.name}
                      className="stack-item"
                      style={v({ "--i": index, "--icon": `url(${item.icon})`, ...(item.color ? { "--brand": item.color } : {}) })}
                    >
                      <span className="stack-icon" aria-hidden="true" />
                      <span className="stack-name">{item.name}</span>
                      <span className="stack-mark" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
                <span className="label stack-count">{group.items.length} tools</span>
              </div>
            ))}
          </div>
        </section>

        <section className="block shell" id="world">
          <SectionHead
            no="04"
            kanji="世界"
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

        <section className="block shell">
          <SectionHead
            no="05"
            kanji="今"
            caption="right now"
            title={
              <>
                you, me, <em>and the map</em>
              </>
            }
            note="as the crow flies"
          />
          <div className="duo reveal">
            <div className="duo-col">
              <span className="label">
                distance
                <span className="nerd-comment">geo: ipapi.co, city-level, no cookies</span>
              </span>
              <h3>you are this far from me</h3>
              <Distance />
            </div>
            <div className="duo-col">
              <span className="label">the guestbook</span>
              <h3>leave a mark before you go</h3>
              <SignaturePad />
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <span className="contact-kanji jp" aria-hidden="true">
            縁
          </span>
          <div className="contact-inner shell reveal">
            <span className="label">06 · one last thing</span>
            <h2>
              have a problem worth <em>opening a laptop</em> for?
            </h2>
            <p className="contact-lead">Send me the messy version. That one is usually more interesting.</p>
            <div className="mail-row">
              <a className="mail-link" href={`mailto:${EMAIL}`} data-cursor="write">
                {EMAIL}
              </a>
              <button className="ghost-button copy-button" type="button" onClick={copyEmail} aria-live="polite">
                {copied ? "copied ✿" : "copy"}
              </button>
            </div>
            <ExternalLink className="button" href="https://github.com/whynotramaa" magnetic>
              <span className="button-fill" aria-hidden="true" />
              <span className="button-text">find me on github</span>
              <ArrowIcon className="button-arrow" />
            </ExternalLink>
            <p className="hand contact-aside">
              probably up too late building something
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <AsciiScene />
          <div className="footer-bar">
            <div className="footer-side">
              <Wordmark href="#top" />
              <span className="label">made with zero em dashes</span>
            </div>
            <span className="footer-thanks jp" aria-hidden="true" data-tip="arigatō · thank you">
              ありがとう
            </span>
            <div className="footer-side">
              <span className="label">
                <span className="clock" key={time}>
                  {time}
                </span>{" "}
                ist, rourkela
              </span>
              <span className="label">© 2026</span>
              <a className="label back-top" href="#top">
                back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const kanjiMeaning: Record<string, string> = {
  私: "watashi · me",
  作品: "sakuhin · works",
  道具: "dōgu · tools",
  世界: "sekai · world",
  今: "ima · now",
};

function SectionHead({
  no,
  kanji,
  caption,
  title,
  note,
}: {
  no: string;
  kanji: string;
  caption: ReactNode;
  title: ReactNode;
  note: string;
}) {
  return (
    <div className="section-head reveal">
      <div className="section-index">
        <span className="section-no">{no}</span>
        <span className="section-kanji jp" aria-hidden="true" data-tip={kanjiMeaning[kanji]}>
          {kanji}
        </span>
      </div>
      <h2>{title}</h2>
      <div className="head-side">
        <span className="label">{caption}</span>
        <p className="hand head-note">{note}</p>
      </div>
    </div>
  );
}

function Work() {
  return (
    <ol className="work-list">
      {projects.map((project, index) => {
        const live = project.href !== project.repo;
        return (
          <li key={project.number} className="work-row reveal" style={v({ "--i": index })}>
            <span className="work-number">{project.number}</span>
            <div className="work-main">
              <h3 className="work-title">
                <ExternalLink className="work-link" href={project.href} cursor={live ? "visit ↗" : "read code ↗"}>
                  <span className="work-name">{project.name}</span>
                </ExternalLink>
                <span className="hand work-hook">{project.hook}</span>
              </h3>
              <dl className="work-details">
                <div>
                  <dt>problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>built</dt>
                  <dd>{project.built}</dd>
                </div>
              </dl>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="work-side">
              <p className="work-proof">
                <strong>
                  {project.proof.value}
                  <PencilRing />
                </strong>
                <span>{project.proof.label}</span>
              </p>
              <span className="label work-type">{project.type}</span>
              <div className="work-actions">
                {live && (
                  <ExternalLink className="work-action" href={project.href}>
                    live site <ArrowIcon />
                  </ExternalLink>
                )}
                <ExternalLink className="work-action" href={project.repo}>
                  source <ArrowIcon />
                </ExternalLink>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
