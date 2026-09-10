"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { projects } from "@/lib/projects";
import { orbitStack, stackGroups } from "@/lib/stack";
import Distance from "@/components/distance";
import { Scrapbook, SignaturePad } from "@/components/scrapbook";

function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

/** Hand-drawn arrows, drawn in with stroke-dashoffset when they scroll into view. */
function Arrow({ variant = "down", className = "" }: { variant?: "down" | "curl" | "up"; className?: string }) {
  const paths = {
    down: "M3 3c14 2 25 12 26 27M29 30l-7-7M29 30l1-10",
    curl: "M2 22C10 4 34 1 52 8c12 5 14 16 6 19-7 3-12-3-8-8 5-6 20-4 28 6M78 25l-3-9M78 25l-9 1",
    up: "M4 32C6 16 16 6 30 4M30 4l-9 2M30 4l3 9",
  };
  const box = { down: "0 0 34 34", curl: "0 0 84 34", up: "0 0 36 36" }[variant];
  return (
    <svg className={`ink-arrow ${className}`} viewBox={box} fill="none" aria-hidden="true">
      <path d={paths[variant]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="theme-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <g className="draw" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 1.4v2.2M10 16.4v2.2M18.6 10h-2.2M3.6 10H1.4M16.08 3.92l-1.56 1.56M5.48 14.52l-1.56 1.56M16.08 16.08l-1.56-1.56M5.48 5.48L3.92 3.92" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-glyph" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        className="draw"
        d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
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

const tickerWords = [
  "products",
  "interfaces",
  "little experiments",
  "failed companies",
  "cricket at odd hours",
  "worst pasta",
  "best jokes",
  "things that need a laptop to explain",
];

export default function PortfolioShell() {
  const [dark, setDark] = useState(false);
  const [nerdMode, setNerdMode] = useState(false);
  const [time, setTime] = useState("--:--");
  const pageRef = useRef<HTMLDivElement>(null);

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

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
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
            const progress = Math.min((now - start) / 900, 1);
            counter.textContent = String(Math.round(progress * target));
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

  return (
    <div ref={pageRef} className={nerdMode ? "nerd-mode" : undefined}>
      <header className="site-header">
        <Link className="wordmark" href="#top">
          ramaa<span className="wordmark-dot">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          <Link href="#work">work</Link>
          <Link href="#world">my world</Link>
          <Link href="#stack">stack</Link>
          <Link href="/blog">notes</Link>
          <Link href="#contact">contact</Link>
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
        </nav>
      </header>

      <nav className="mobile-nav" aria-label="Mobile">
        <Link href="#work">work</Link>
        <Link href="#world">world</Link>
        <Link href="#stack">stack</Link>
        <Link href="#contact">say hi</Link>
      </nav>

      <main id="top">
        <section className="hero shell">
          <div className="hero-status">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="label">looking for a job</span>
            <span className="nerd-comment">hero: 7 letters, 40ms stagger, css doing main-character work</span>
          </div>

          <div className="hero-name-wrap">
            <h1 className="hero-name" aria-label="ramaa">
              {"ramaa".split("").map((letter, index) => (
                <span key={index} style={{ ["--i" as string]: index } as CSSProperties}>
                  {letter}
                </span>
              ))}
            </h1>
            <p className="hero-aka hand">
              or formally, ramnath
              <Arrow variant="down" className="arrow-aka" />
            </p>
          </div>

          <div className="hero-copy">
            <p className="hero-line">I make worst pasta and best jokes.</p>
            <p className="hero-blurb">
              Products, interfaces, little experiments, failed companies, sports, and occasionally things that are
              difficult to explain without opening a laptop.
            </p>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>currently</dt>
              <dd>NIT Rourkela · B.Tech CSE · final year</dd>
            </div>
            <div>
              <dt>graduating</dt>
              <dd>2027</dd>
            </div>
            <div>
              <dt>my clock</dt>
              <dd>
                <span className="clock">{time}</span> IST
              </dd>
            </div>
          </dl>

          <div className="hero-actions">
            <Link className="button" href="#contact">
              say hello
              <span className="button-arrow">{"\u2197\uFE0E"}</span>
            </Link>
            <ExternalLink className="text-link" href="https://github.com/whynotramaa">
              github.com/whynotramaa
            </ExternalLink>
            <span className="hand hero-aside">I really do reply</span>
          </div>

          <div className="orbit-row">
            <span className="label">current orbit</span>
            <ul className="orbit-icons">
              {orbitStack.map((item, index) => (
                <li key={item.name} className="orbit-icon" style={{ ["--i" as string]: index } as CSSProperties}>
                  <img src={item.icon} alt="" width={18} height={18} loading="lazy" />
                  <span className="tip" role="tooltip">
                    {item.name}
                  </span>
                </li>
              ))}
              <li className="orbit-icon orbit-more">
                +
                <span className="tip" role="tooltip">
                  more &amp; more
                </span>
              </li>
            </ul>
            <span className="hand orbit-note">hover for names</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-run" key={copy}>
                {tickerWords.map((word) => (
                  <span key={`${copy}-${word}`}>
                    {word}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="facts shell">
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
        </section>

        <section className="block shell" id="about">
          <SectionHead eyebrow="the person behind the tabs" title={<>small team energy, one person</>} note="no boring bio here" />
          <div className="about reveal">
            <div className="about-lead">
              <p className="lede">
                I like making useful things feel obvious. Sometimes that means a quiet interface. Sometimes it means
                teaching a tiny search engine how to explain its own decisions.
              </p>
              <p className="muted">
                Final year B.Tech CSE at NIT Rourkela, India. Graduating 2027, and looking for a job before then.
              </p>
            </div>
            <aside className="note-card">
              <span className="tape" aria-hidden="true" />
              <span className="note-index">01</span>
              <p className="hand note-title">into these lately</p>
              <ul>
                <li>products people use without a manual</li>
                <li>realtime systems that do not panic</li>
                <li>sports, interfaces, and bad ideas with good names</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="block shell" id="work">
          <SectionHead
            eyebrow={
              <>
                selected work
                <span className="nerd-comment">rows: transform-only hover, your layout engine gets the day off</span>
              </>
            }
            title={<>things I built instead of studying</>}
            note="the good drawer"
          />
          <div className="work-list">
            {projects.map((project) => (
              <ProjectRow key={project.number} project={project} />
            ))}
          </div>
        </section>

        <section className="block shell" id="stack">
          <SectionHead eyebrow="the current toolbox" title={<>what I make things with</>} note="plus 43 open tabs" />
          <div className="toolbox reveal">
            {stackGroups.map((group) => (
              <div className="tool-group" key={group.label}>
                <span className="label">{group.label}</span>
                <ul className="tool-list">
                  {group.items.map((item, index) => (
                    <li key={item.name} className="tool" style={{ ["--i" as string]: index } as CSSProperties}>
                      <img src={item.icon} alt="" width={24} height={24} loading="lazy" />
                      <span className="tip" role="tooltip">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="block shell" id="world">
          <SectionHead
            eyebrow={
              <>
                off the clock
                <span className="nerd-comment">desk: percent offsets, vibes-based physics, survives a resize</span>
              </>
            }
            title={<>my world, roughly pinned down</>}
            note="drag anything ↓"
          />
          <div className="reveal">
            <Scrapbook />
          </div>
        </section>

        <section className="block shell distance-section">
          <SectionHead
            eyebrow={
              <>
                right now
                <span className="nerd-comment">geo: ipapi.co, city-level, no cookies</span>
              </>
            }
            title={<>you are this far from me</>}
            note="as the crow flies"
          />
          <div className="reveal">
            <Distance />
          </div>
        </section>

        <section className="block shell">
          <SectionHead eyebrow="the guestbook" title={<>leave a mark before you go</>} note="stays in your browser" />
          <div className="reveal">
            <SignaturePad />
          </div>
        </section>

        <section className="block shell" id="contact">
          <div className="contact reveal">
            <span className="label">one last thing</span>
            <h2>have a problem worth opening a laptop for?</h2>
            <p>Send me the messy version. That one is usually more interesting.</p>
            <ExternalLink className="button button-invert" href="https://github.com/whynotramaa">
              find me on github
              <span className="button-arrow">{"\u2197\uFE0E"}</span>
            </ExternalLink>
            <p className="hand contact-aside">
              probably up too late building something
              <Arrow variant="up" className="arrow-contact" />
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <div className="footer-side">
          <Link className="wordmark" href="#top">
            ramaa<span className="wordmark-dot">.</span>
          </Link>
          <span>made with zero em dashes</span>
        </div>
        <div className="footer-side">
          <span>
            <span className="clock">{time}</span> IST
          </span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: ReactNode; title: ReactNode; note: string }) {
  return (
    <div className="section-head reveal">
      <div>
        <span className="label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p className="hand head-note">
        {note}
        <Arrow variant="curl" className="arrow-head" />
      </p>
    </div>
  );
}

function ProjectRow({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="work-row reveal">
      <ExternalLink className="work-hit" href={project.href}>
        <span className="sr-only">{`Open ${project.name}`}</span>
      </ExternalLink>
      <span className="work-ghost" aria-hidden="true">
        {project.number}
      </span>
      <div className="work-inner">
        <header className="work-top">
          <span className="work-number">{project.number}</span>
          <span className="label work-type">{project.type}</span>
          <span className="work-arrow" aria-hidden="true">
            {"\u2197\uFE0E"}
          </span>
        </header>
        <div className="work-main">
          <div className="work-title">
            <h3>{project.name}</h3>
            <p className="hand work-hook">{project.hook}</p>
          </div>
          <dl className="work-details">
            <dt>problem</dt>
            <dd>{project.problem}</dd>
            <dt>built</dt>
            <dd>{project.built}</dd>
          </dl>
        </div>
        <ul className="tags">
          {project.tags.map((tag, index) => (
            <li key={tag} style={{ ["--i" as string]: index } as CSSProperties}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
