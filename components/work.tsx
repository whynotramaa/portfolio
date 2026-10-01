"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { projects, type Project } from "@/lib/projects";
import { Sketch } from "@/components/sketches";

const hues = [150, 250, 25, 300, 50, 85, 195];

export function FlipWords({ words, every = 2400 }: { words: string[]; every?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setI((n) => (n + 1) % words.length), every);
    return () => window.clearInterval(timer);
  }, [words, every]);

  return (
    <em className="flip" aria-label={words[0]}>
      <span key={i} className="flip-word" aria-hidden="true">
        {words[i]}
      </span>
    </em>
  );
}

function ExternalLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Work({ items = projects }: { items?: Project[] }) {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <ul className="work">
      {items.map((project) => {
        const i = Number(project.number) - 1;
        const live = project.href !== project.repo;
        return (
          <li
            key={project.number}
            className="proj inked redraw"
            style={{ "--h": hues[i] } as CSSProperties}
            onPointerEnter={() => setHot(i)}
            onPointerLeave={() => setHot(null)}
          >
            <div className="proj-art">
              <Sketch index={i} boil={hot === i} />
            </div>
            <div className="proj-body">
              <p className="label proj-meta">
                {project.number} / {project.type}
              </p>
              <h3>
                <ExternalLink href={project.href}>{project.name}</ExternalLink>
              </h3>
              <p className="hand proj-hook">{project.hook}</p>
              <p className="proj-stat">
                <strong>{project.proof.value}</strong>
                <span>{project.proof.label}</span>
              </p>
              <div className="proj-foot">
                <p className="label proj-tags">{project.tags.join(" · ")}</p>
                <div className="proj-links">
                  {live && (
                    <ExternalLink className="ink-link" href={project.href}>
                      open <Arrow />
                    </ExternalLink>
                  )}
                  <ExternalLink className="ink-link" href={project.repo}>
                    <span data-scramble>source</span> <Arrow />
                  </ExternalLink>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
