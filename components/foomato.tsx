import type { CSSProperties, ReactNode } from "react";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;
const o = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
const box = (x: number, y: number, w: number, h: number) => `M${x} ${y} ${x + w} ${y - 1} ${x + w + 1} ${y + h} ${x - 1} ${y + h + 1}Z`;
const arr = (x1: number, y1: number, x2: number, y2: number) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = (d: number) => `${(x2 - 10 * Math.cos(a + d)).toFixed(1)} ${(y2 - 10 * Math.sin(a + d)).toFixed(1)}`;
  return `M${x1} ${y1} ${x2} ${y2}M${h(0.5)} ${x2} ${y2} ${h(-0.5)}`;
};
const rand = (a: number, b: number) => {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

function P({ d, k = 0 }: { d: string; k?: number }) {
  return <path className="sk-ink" d={d} pathLength={1} style={v({ "--k": k })} />;
}

function F({ d, c = "paper" }: { d: string; c?: "paper" | "accent" | "blob" | "zone" }) {
  return <path className={c === "zone" ? "cs-zone" : `sk-${c}`} d={d} />;
}

function T({
  x,
  y,
  s = 16,
  f = "hand",
  a = "middle",
  r,
  m,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  f?: "hand" | "mono" | "serif";
  a?: "start" | "middle" | "end";
  r?: number;
  m?: boolean;
  children: ReactNode;
}) {
  return (
    <text
      className={`sk-label sk-${f}${m ? " cs-muted" : ""}`}
      x={x}
      y={y}
      fontSize={s}
      textAnchor={a}
      transform={r ? `rotate(${r} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

function Node({ x, y, w, h, t, sub, c = "paper", s = 17 }: { x: number; y: number; w: number; h: number; t: string; sub?: string; c?: "paper" | "accent" | "blob"; s?: number }) {
  return (
    <>
      <F d={box(x, y, w, h)} c={c} />
      <P d={box(x, y, w, h)} />
      <T x={x + w / 2} y={sub ? y + h / 2 - 2 : y + h / 2 + 5} s={s}>
        {t}
      </T>
      {sub && (
        <T x={x + w / 2} y={y + h / 2 + 15} s={10.5} f="mono" m>
          {sub}
        </T>
      )}
    </>
  );
}

function Mover({ path, dur = 3, r = 5 }: { path: string; dur?: number; r?: number }) {
  return (
    <circle className="sk-accent cs-mover" r={r}>
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

export function Fig({ view, h = 25, label, caption, children }: { view: string; h?: number; label: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="cs-fig inked reveal" style={v({ "--h": h })}>
      <svg className="cs-svg" viewBox={view} role="img" aria-label={label}>
        <g filter="url(#ink-edge)">{children}</g>
      </svg>
      {caption && <figcaption className="hand">{caption}</figcaption>}
    </figure>
  );
}

export function InkDefs() {
  return (
    <svg className="ink-defs" aria-hidden="true">
      <filter id="ink-edge">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={3} />
        <feDisplacementMap in="SourceGraphic" scale={3} />
      </filter>
      <pattern id="cs-dots" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="3.5" cy="3.5" r="1.7" fill="currentColor" />
      </pattern>
    </svg>
  );
}

const rows = [
  { name: "momo", cls: "fm-a", y: 68 },
  { name: "thakali", cls: "fm-b", y: 114 },
  { name: "sel roti", cls: "fm-c", y: 160 },
];

export function FoomatoSketch({ id = "fm-card" }: { id?: string }) {
  return (
    <svg className="sketch" viewBox="0 0 400 280" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={5} />
          <feDisplacementMap in="SourceGraphic" scale={3.4} />
        </filter>
      </defs>
      <path className="sk-blob" d="M40 150C30 84 104 38 200 44S366 76 368 150 300 252 196 250 50 216 40 150Z" />
      <g filter={`url(#${id})`}>
        <path className="sk-paper" d={box(46, 34, 104, 200)} />
        <P d={box(46, 34, 104, 200)} k={0} />
        <P d="M86 46H110" k={1} />
        {rows.map((row, i) => (
          <T key={row.name} x={60} y={row.y + 22} s={11} f="mono">
            #{i + 1}
          </T>
        ))}
        {rows.map((row, i) => (
          <g key={row.cls} className={`fm-row ${row.cls}`}>
            <path className={i === 0 ? "sk-accent" : "sk-paper"} d={box(74, row.y, 66, 34)} />
            <P d={box(74, row.y, 66, 34)} k={2 + i} />
            <T x={107} y={row.y + 22} s={15}>
              {row.name}
            </T>
          </g>
        ))}
        <T x={98} y={222} s={10} f="mono">
          for you
        </T>
        <P d="M20 250C120 246 260 252 386 247" k={5} />
        <g className="fm-speed">
          <P d="M162 206H188" k={6} />
          <P d="M168 220H194" k={6} />
          <P d="M158 236H186" k={6} />
        </g>
        <g className="fm-bob">
          <path className="sk-paper" d={box(196, 146, 48, 42)} />
          <path className="sk-accent" d={box(196, 146, 48, 12)} />
          <P d={box(196, 146, 48, 42)} k={7} />
          <T x={220} y={178} s={10} f="mono">
            foo
          </T>
          <g className="fm-steam">
            <P d="M208 138c-6-8 6-12 0-20" k={8} />
            <P d="M222 136c-6-8 6-12 0-20" k={8} />
            <P d="M236 138c-6-8 6-12 0-20" k={8} />
          </g>
          <P d="M200 228C198 208 216 198 244 200H292" k={9} />
          <P d="M232 226H300" k={10} />
          <P d="M300 226 312 180M304 178 326 176" k={11} />
          <P d="M240 196C248 188 272 188 282 196" k={12} />
          <path className="sk-paper" d={o(270, 132, 13)} />
          <path className="sk-accent" d="M257 130C258 116 282 116 283 130Z" />
          <P d={o(270, 132, 13)} k={13} />
          <P d="M266 145 258 190M264 158 310 176M258 190 286 198 294 224" k={14} />
        </g>
        <P d="M304 232C306 218 330 218 332 232" k={15} />
        {[214, 318].map((cx) => (
          <g key={cx}>
            <path className="sk-paper" d={o(cx, 232, 15)} />
            <P d={o(cx, 232, 15)} k={16} />
            <g className="fm-wheel">
              <P d={`M${cx - 10} 232H${cx + 10}M${cx} 222V242`} k={17} />
            </g>
          </g>
        ))}
        <path className="sk-paper" d={o(330, 78, 32)} />
        <P d={o(330, 78, 32)} k={18} />
        <P d="M330 50v6M330 100v6M302 78h6M352 78h6" k={19} />
        <g className="fm-hand" style={{ transformOrigin: "330px 78px" }}>
          <P d="M330 78 330 58" k={20} />
        </g>
        <path className="sk-accent" d={o(330, 78, 3.5)} />
        <T x={330} y={132} s={18}>
          eta?
        </T>
        <T x={236} y={28} s={18} r={-3}>
          your feed, your clock
        </T>
      </g>
    </svg>
  );
}

export function FailuresFig() {
  const phones = [
    { x: 24, who: "you" },
    { x: 108, who: "your aunt" },
    { x: 192, who: "a stranger" },
  ];
  const tags = [
    { x: 380, y: 60, t: "2 km, sunny", to: [428, 96] },
    { x: 610, y: 70, t: "9 km, raining", to: [560, 104] },
    { x: 620, y: 230, t: "friday, 8pm", to: [560, 190] },
  ];
  return (
    <Fig view="0 0 680 300" h={25} label="left, three phones showing an identical restaurant list; right, one clock stamped 45 minutes for every kind of order" caption="failure 1 and failure 2, drawn by someone who has seen both">
      <T x={140} y={34} s={20}>
        everyone, same list
      </T>
      {phones.map((p, i) => (
        <g key={p.x}>
          <F d={box(p.x, 56, 64, 128)} />
          <P d={box(p.x, 56, 64, 128)} k={i} />
          <F d={box(p.x + 10, 74, 44, 12)} c="accent" />
          {[0, 1, 2, 3, 4].map((r) => (
            <P key={r} d={`M${p.x + 10} ${80 + r * 22}H${p.x + 54}`} k={i + r} />
          ))}
          <T x={p.x + 32} y={208} s={15} m>
            {p.who}
          </T>
        </g>
      ))}
      <T x={140} y={240} s={11} f="mono" m>
        sorted by popularity, a to z,
      </T>
      <T x={140} y={256} s={11} f="mono" m>
        or whoever paid
      </T>
      <F d={o(500, 146, 62)} />
      <P d={o(500, 146, 62)} k={2} />
      <P d="M500 90v8M500 194v8M444 146h8M548 146h8" k={3} />
      <g className="fm-hand fm-stuck" style={{ transformOrigin: "500px 146px" }}>
        <P d="M500 146 500 108" k={4} />
      </g>
      <T x={500} y={180} s={30} f="serif">
        45
      </T>
      <T x={500} y={196} s={10} f="mono" m>
        minutes. always.
      </T>
      {tags.map((t, i) => (
        <g key={t.t}>
          <T x={t.x} y={t.y} s={16} a={t.x > 500 ? "end" : "middle"}>
            {t.t}
          </T>
          <P d={arr(t.x > 500 ? t.x - 50 : t.x, t.y + 8, t.to[0], t.to[1])} k={5 + i} />
        </g>
      ))}
      <T x={500} y={34} s={20}>
        everything, same clock
      </T>
      <T x={500} y={272} s={11} f="mono" m>
        or distance × a fixed speed
      </T>
    </Fig>
  );
}

export function SeesawFig() {
  return (
    <Fig view="0 0 680 240" h={50} label="a seesaw. one side says shown too slow, user abandons checkout. the other says shown too fast, 1 star and a refund" caption="there is no safe side to be wrong on">
      <T x={340} y={34} s={20}>
        the cost is two-sided
      </T>
      <g className="fm-rock" style={{ transformOrigin: "340px 168px" }}>
        <P d="M80 160 600 170" k={0} />
        <Node x={96} y={112} w={170} h={44} t="shown too slow" sub="underpromise" />
        <Node x={416} y={120} w={170} h={44} t="shown too fast" sub="overpromise" c="accent" />
      </g>
      <F d="M318 214 340 168 362 214Z" c="blob" />
      <P d="M318 214 340 168 362 214Z" k={3} />
      <P d="M60 216H620" k={4} />
      <T x={180} y={200} s={16} m>
        user abandons checkout
      </T>
      <T x={500} y={200} s={16} m>
        1 star, support eats the refund
      </T>
    </Fig>
  );
}

export function SystemMapFig() {
  const left = "M290 110C250 128 190 124 170 150";
  const right = "M350 110C390 128 450 124 470 150";
  return (
    <Fig view="0 0 640 380" h={150} label="system map. one order log feeds two models: the feed ranker, which orders the home feed, and ETA prediction, which sets the checkout estimate" caption="two models, one log. most of the calendar went into the log, not the model class">
      <path className="sk-blob" d="M230 40V96A90 14 0 0 0 410 96V40Z" />
      <path className="sk-paper" d="M230 40a90 14 0 1 0 180 0a90 14 0 1 0-180 0" />
      <P d="M230 40a90 14 0 1 0 180 0a90 14 0 1 0-180 0" k={0} />
      <P d="M230 40V96A90 14 0 0 0 410 96V40" k={1} />
      <T x={320} y={76} s={20}>
        order + event logs
      </T>
      <T x={320} y={96} s={11} f="mono">
        ~200K orders
      </T>
      <P d={`${left}M162 141 170 150 173 139`} k={2} />
      <P d={`${right}M461 139 470 150 473 139`} k={2} />
      <Mover path={left} dur={2.2} />
      <Mover path={right} dur={2.6} />
      {[
        { x: 30, title: "feed ranker", tag: "my primary ownership", lines: ["13 features", "feature-based hybrid ranker", "trained over orders"], out: "ranked list", c: "accent" as const },
        { x: 350, title: "ETA prediction", tag: "pod contribution", lines: ["10 features", "XGBoost regression", "single-shot minutes"], out: "minutes", c: "blob" as const },
      ].map((m, i) => (
        <g key={m.title}>
          <F d={box(m.x, 152, 260, 124)} />
          <F d={box(m.x, 152, 260, 34)} c={m.c} />
          <P d={box(m.x, 152, 260, 124)} k={3 + i} />
          <P d={`M${m.x} 186H${m.x + 260}`} k={4 + i} />
          <T x={m.x + 16} y={176} s={20} a="start">
            {m.title}
          </T>
          <T x={m.x + 246} y={174} s={10} f="mono" a="end">
            {m.tag}
          </T>
          {m.lines.map((l, j) => (
            <T key={l} x={m.x + 16} y={210 + j * 18} s={12} f="mono" a="start" m>
              {l}
            </T>
          ))}
          <T x={m.x + 16} y={266} s={12} f="mono" a="start">
            {`→ ${m.out}`}
          </T>
          <P d={arr(m.x + 130, 282, m.x + 130, 318)} k={6} />
        </g>
      ))}
      <T x={160} y={346} s={18}>
        home feed ordering
      </T>
      <T x={480} y={346} s={18}>
        checkout + tracking estimate
      </T>
    </Fig>
  );
}

const bins = Array.from({ length: 28 }, (_, i) => {
  const m = i * 5 + 2.5;
  const natural = ((m * m * Math.exp(-m / 14)) / 106) * 150;
  return i === 0 ? 30 : i >= 24 ? [9, 5, 11, 6][i - 24] : natural;
});
const bx = (min: number) => 60 + (min * 540) / 140;

export function HistogramFig() {
  return (
    <Fig view="0 0 640 280" h={85} label="sketch of a right-skewed delivery time distribution with a spike under 5 minutes and a thin tail over 120 minutes, both shaded as not-labels" caption="physically impossible times are not labels">
      <F d={`M${bx(0)} 40H${bx(5)}V230H${bx(0)}Z`} c="zone" />
      <F d={`M${bx(120)} 40H600V230H${bx(120)}Z`} c="zone" />
      {bins.map((hgt, i) => {
        const x = bx(i * 5) + 2;
        const bad = i === 0 || i >= 24;
        const d = box(x, 230 - hgt, 15, hgt);
        return (
          <g key={i}>
            <F d={d} c={bad ? "accent" : "paper"} />
            <P d={d} k={i} />
          </g>
        );
      })}
      <P d="M56 231H604" k={0} />
      {[0, 30, 60, 90, 120].map((m) => (
        <T key={m} x={bx(m)} y={250} s={11} f="mono" m>
          {m}
        </T>
      ))}
      <T x={600} y={268} s={11} f="mono" a="end" m>
        delivery minutes
      </T>
      <T x={78} y={30} s={16} a="start">
        {"< 5 min: a logging bug, not a miracle"}
      </T>
      <T x={600} y={80} s={16} a="end">
        {"> 120 min: marked late, or in a batch"}
      </T>
      <P d={arr(96, 36, 72, 190)} k={3} />
      <P d={arr(560, 88, 560, 208)} k={3} />
    </Fig>
  );
}

const months = ["m", "j", "j", "a", "s", "o", "n", "d", "j", "f", "m", "a", "m", "j"];

export function SplitFig() {
  const shuffle = Array.from({ length: 28 }, (_, i) => {
    const r = rand(i, 7);
    return r < 0.7 ? "blob" : r < 0.85 ? "paper" : "accent";
  }) as ("blob" | "paper" | "accent")[];
  return (
    <Fig view="0 0 640 290" h={250} label="timeline from may 2025 to june 2026. train covers may 2025 to march 2026, validation is april 2026, test is may and june 2026. below it, a shuffled bar crossed out" caption="respect the arrow of time, or the offline number lies to you">
      <F d={box(40, 64, 440, 44)} c="blob" />
      <F d={box(480, 64, 40, 44)} />
      <F d={box(520, 64, 80, 44)} c="accent" />
      <P d={box(40, 64, 560, 44)} k={0} />
      <P d="M480 64V108M520 64V108" k={1} />
      <T x={260} y={92} s={18}>
        train · may 2025 to mar 2026
      </T>
      <T x={500} y={52} s={14}>
        val
      </T>
      <T x={560} y={52} s={14}>
        test
      </T>
      <T x={500} y={90} s={9} f="mono">
        apr
      </T>
      <T x={560} y={90} s={9} f="mono">
        may-jun
      </T>
      {months.map((m, i) => (
        <T key={i} x={60 + i * 40} y={128} s={10} f="mono" m>
          {m}
        </T>
      ))}
      <P d="M480 40V150" k={2} />
      <T x={474} y={168} s={14} a="end">
        feature cutoff. trailing 30 days stop here
      </T>
      <P d={arr(40, 184, 606, 184)} k={3} />
      <T x={600} y={202} s={14} a="end" m>
        the arrow of time
      </T>
      {shuffle.map((c, i) => (
        <F key={i} d={box(40 + i * 20, 226, 20, 26)} c={c} />
      ))}
      <P d={box(40, 226, 560, 26)} k={4} />
      <path className="cs-cross" d="M50 222 590 258M50 258 590 222" pathLength={1} />
      <T x={40} y={274} s={11} f="mono" a="start" m>
        random 80/20 shuffle: june behaviour leaks into april scores
      </T>
    </Fig>
  );
}

export function FunnelFig() {
  return (
    <Fig view="0 0 720 320" h={150} label="funnel. about 400 vendors in a city pass through rule filters down to 40 to 60 candidates, which the model scores into about 10 cards plus one exploration slot" caption="rules retrieve, the model ranks. merge them and the model burns capacity learning closed = 0, which a boolean already knows">
      <rect x="20" y="70" width="140" height="140" fill="url(#cs-dots)" className="cs-dots" />
      <T x={90} y={56} s={16}>
        every vendor in town
      </T>
      <T x={90} y={234} s={11} f="mono" m>
        order of ~400
      </T>
      <P d={arr(166, 140, 196, 140)} k={0} />
      <F d={box(200, 60, 170, 160)} />
      <P d={box(200, 60, 170, 160)} k={1} />
      <T x={285} y={84} s={17}>
        stage 1 · rules
      </T>
      <T x={285} y={100} s={10} f="mono" m>
        hard filters, no ML
      </T>
      {["open right now", "inside delivery radius", "riders in the zone", "not churned or blocked"].map((t, i) => (
        <g key={t}>
          <P d={`M214 ${122 + i * 24}l5 5 9-11`} k={2 + i} />
          <T x={234} y={128 + i * 24} s={10.5} f="mono" a="start">
            {t}
          </T>
        </g>
      ))}
      <P d={arr(376, 140, 406, 140)} k={6} />
      <rect x="412" y="105" width="35" height="70" fill="url(#cs-dots)" className="cs-dots" />
      <T x={430} y={96} s={14}>
        40 to 60
      </T>
      <P d={arr(452, 140, 480, 140)} k={7} />
      <F d={box(484, 90, 110, 100)} c="accent" />
      <P d={box(484, 90, 110, 100)} k={8} />
      <T x={539} y={120} s={17}>
        stage 2
      </T>
      <T x={539} y={140} s={10} f="mono">
        the model
      </T>
      <T x={539} y={160} s={10} f="mono">
        this user,
      </T>
      <T x={539} y={174} s={10} f="mono">
        this hour
      </T>
      <P d={arr(598, 140, 620, 140)} k={9} />
      <F d={box(626, 60, 72, 160)} />
      <P d={box(626, 60, 72, 160)} k={10} />
      {Array.from({ length: 9 }, (_, i) => (
        <P key={i} d={`M636 ${76 + i * 15}H${688 - (i % 3) * 8}`} k={11} />
      ))}
      <F d={box(634, 196, 56, 14)} c="accent" />
      <T x={662} y={234} s={11} f="mono" m>
        ~10 cards
      </T>
      <T x={662} y={250} s={11} f="mono" m>
        + 1 explore
      </T>
    </Fig>
  );
}

export function FeatureBar() {
  const groups = [
    { n: 5, label: "user side", c: "accent" as const },
    { n: 5, label: "vendor side", c: "blob" as const },
    { n: 3, label: "context", c: "paper" as const },
  ];
  let at = 0;
  return (
    <Fig view="0 0 640 110" h={150} label="13 features split into 5 user, 5 vendor, and 3 context features">
      {groups.map((g) => {
        const x0 = 20 + at * 46;
        at += g.n;
        return (
          <g key={g.label}>
            {Array.from({ length: g.n }, (_, i) => (
              <g key={i}>
                <F d={box(x0 + i * 46, 30, 42, 36)} c={g.c} />
                <P d={box(x0 + i * 46, 30, 42, 36)} k={i} />
                <T x={x0 + i * 46 + 21} y={54} s={12} f="mono">
                  {at - g.n + i + 1}
                </T>
              </g>
            ))}
            <T x={x0 + (g.n * 46) / 2} y={92} s={16}>
              {`${g.label} · ${g.n}`}
            </T>
          </g>
        );
      })}
    </Fig>
  );
}

export function MiniModel({ kind }: { kind: "a" | "b" | "c" }) {
  const cells = [
    [0, 1],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 2],
    [4, 1],
  ];
  return (
    <svg className="cs-mini" viewBox="0 0 140 90" aria-hidden="true">
      <g filter="url(#ink-edge)">
        {kind !== "c" && (
          <>
            {cells.map(([r, c]) => (
              <F key={`${r}${c}`} d={box(14 + c * 14, 12 + r * 14, 14, 14)} c="accent" />
            ))}
            <P d={`${box(14, 12, 70, 70)}M28 12V82M42 12V82M56 12V82M70 12V82M14 26H84M14 40H84M14 54H84M14 68H84`} />
          </>
        )}
        {kind === "a" && (
          <T x={112} y={52} s={16}>
            U × V
          </T>
        )}
        {kind === "b" && (
          <>
            <F d={box(94, 12, 12, 70)} c="blob" />
            <F d={box(112, 12, 12, 70)} c="blob" />
            <P d={`${box(94, 12, 12, 70)}${box(112, 12, 12, 70)}`} />
          </>
        )}
        {kind === "c" && (
          <>
            <Node x={48} y={6} w={44} h={20} t="" />
            <Node x={14} y={38} w={40} h={20} t="" />
            <Node x={86} y={38} w={40} h={20} t="" />
            <P d="M60 26 36 38M80 26 104 38M26 58 18 74M42 58 50 74M98 58 90 74M114 58 122 74" />
            <F d={o(18, 80, 5)} c="accent" />
            <F d={o(50, 80, 5)} c="accent" />
            <F d={o(90, 80, 5)} c="accent" />
            <F d={o(122, 80, 5)} c="accent" />
          </>
        )}
      </g>
    </svg>
  );
}

export function SignalFig() {
  const items = [
    { x: 110, up: true, t: "ordered + delivered", s: "strong positive", n: "weight by repeat + recency", c: "accent" as const },
    { x: 280, up: false, t: "cancel after place", s: "weak, noisy", n: "recs: low confidence. ETA: dropped", c: "blob" as const },
    { x: 450, up: true, t: "shown, not ordered", s: "weak negative", n: "maybe they never scrolled", c: "paper" as const },
    { x: 620, up: false, t: "never shown", s: "no signal", n: "NOT a negative. bias trap", c: "paper" as const },
  ];
  return (
    <Fig view="0 0 720 280" h={300} label="scale from strong positive to no signal. ordered and delivered is strong positive; cancel after place is weak and noisy; shown but not ordered is a weak negative; never shown is no signal at all" caption="we never had dense, trusted star ratings. we had orders, and orders have shades">
      <P d={`${arr(40, 140, 690, 140)}M50 130 40 140 50 150`} k={0} />
      <T x={40} y={170} s={11} f="mono" a="start" m>
        strong +
      </T>
      <T x={690} y={124} s={11} f="mono" a="end" m>
        silence
      </T>
      {items.map((it, i) => {
        const y = it.up ? 36 : 176;
        return (
          <g key={it.t} className={it.x === 620 ? "cs-dashed" : undefined}>
            <P d={`M${it.x} 140V${it.up ? y + 70 : y}`} k={1 + i} />
            <F d={box(it.x - 80, y, 160, 70)} c={it.c} />
            <P d={box(it.x - 80, y, 160, 70)} k={2 + i} />
            <T x={it.x} y={y + 24} s={17}>
              {it.t}
            </T>
            <T x={it.x} y={y + 42} s={10.5} f="mono">
              {it.s}
            </T>
            <T x={it.x} y={y + 58} s={10} f="mono" m>
              {it.n}
            </T>
            <path className="sk-accent" d={o(it.x, 140, 5)} />
          </g>
        );
      })}
    </Fig>
  );
}

const ordered: [number, number, number][] = [
  [0, 1, 1],
  [0, 5, 0.5],
  [1, 3, 0.8],
  [2, 0, 0.4],
  [2, 6, 1],
  [3, 2, 0.6],
  [4, 4, 1],
  [4, 7, 0.35],
  [5, 1, 0.7],
];

export function MatrixFig() {
  const grid = (x0: number) => {
    let d = box(x0, 70, 208, 156);
    for (let c = 1; c < 8; c++) d += `M${x0 + c * 26} 70V226`;
    for (let r = 1; r < 6; r++) d += `M${x0} ${70 + r * 26}H${x0 + 208}`;
    return d;
  };
  const isOrdered = (r: number, c: number) => ordered.some(([a, b]) => a === r && b === c);
  let crosses = "";
  let dots = "";
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 8; c++) {
      if (isOrdered(r, c)) continue;
      const x = 40 + c * 26 + 13;
      const y = 70 + r * 26 + 13;
      crosses += `M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10`;
      dots += o(400 + c * 26 + 13, y, 2.2);
    }
  return (
    <Fig view="0 0 680 290" h={25} label="two user by vendor matrices. left, every unordered cell is a hard zero. right, ordered cells shaded by strength and unordered cells get a small baseline confidence" caption="the classic mistake teaches the model that everything it never showed you is irrelevant">
      <T x={144} y={36} s={12} f="mono">
        label = 1 if ordered else 0
      </T>
      <T x={144} y={58} s={16} m>
        everything unshown = hated?
      </T>
      {ordered.map(([r, c]) => (
        <F key={`l${r}${c}`} d={box(40 + c * 26, 70 + r * 26, 26, 26)} c="accent" />
      ))}
      <path className="cs-cross cs-cross-thin" d={crosses} />
      <P d={grid(40)} k={0} />
      <T x={504} y={36} s={12} f="mono">
        confidence weighting
      </T>
      <T x={504} y={58} s={16} m>
        unseen is not irrelevant
      </T>
      {ordered.map(([r, c, s]) => (
        <path key={`r${r}${c}`} className="sk-accent" style={{ opacity: s }} d={box(400 + c * 26, 70 + r * 26, 26, 26)} />
      ))}
      <path className="cs-dot" d={dots} />
      <P d={grid(400)} k={1} />
      <T x={144} y={250} s={11} f="mono" m>
        vendors →
      </T>
      <T x={504} y={250} s={11} f="mono" m>
        vendors →
      </T>
      <T x={26} y={148} s={11} f="mono" r={-90} m>
        users
      </T>
      <T x={386} y={148} s={11} f="mono" r={-90} m>
        users
      </T>
      <T x={340} y={278} s={15}>
        our version: negatives sampled only from what the user could have seen
      </T>
    </Fig>
  );
}

export function PositionFig() {
  return (
    <Fig view="0 0 640 250" h={85} label="bar sketch of orders per feed slot falling off from slot 1 to slot 10" caption="offline precision on logged data flatters any model that copies the old popularity sort">
      {Array.from({ length: 10 }, (_, i) => {
        const hgt = 150 * Math.pow(0.74, i) + 6;
        const d = box(70 + i * 52, 200 - hgt, 36, hgt);
        return (
          <g key={i}>
            <F d={d} c={i === 0 ? "accent" : "paper"} />
            <P d={d} k={i} />
            <T x={88 + i * 52} y={220} s={11} f="mono" m>
              {i + 1}
            </T>
          </g>
        );
      })}
      <P d="M60 201H600" k={0} />
      <T x={600} y={240} s={11} f="mono" a="end" m>
        feed slot
      </T>
      <T x={360} y={70} s={18}>
        slot 1 gets ordered partly because it is slot 1
      </T>
      <P d={arr(200, 78, 112, 60)} k={3} />
    </Fig>
  );
}

export function LadderFig() {
  const climb = "M90 208 L180 208 L300 148 L380 148 L520 88 L600 88";
  return (
    <Fig view="0 0 720 300" h={150} label="three-step staircase for new users. step one, serviceability filter. step two, popularity in this area at this hour, distance penalised. step three, the personalised ranker after a few delivered orders" caption="at 20K MAU, new or nearly-new users are a big share of daily sessions. cold start is the main path">
      <F d="M40 220H260V160H480V100H700V260H40Z" c="blob" />
      <P d="M20 220H260V160H480V100H700" k={0} />
      <P d="M20 260H700" k={1} />
      <T x={150} y={246} s={18}>
        1 · serviceability
      </T>
      <T x={370} y={188} s={18}>
        2 · popular here, now
      </T>
      <T x={590} y={128} s={18}>
        3 · personalised ranker
      </T>
      <T x={150} y={164} s={11} f="mono" m>
        open, in radius, riders
      </T>
      <T x={370} y={108} s={11} f="mono" m>
        geo + hour, distance-penalised
      </T>
      <T x={590} y={44} s={11} f="mono" m>
        after N delivered orders
      </T>
      <T x={590} y={60} s={11} f="mono" m>
        N = 3
      </T>
      <g className="cs-climber">
        <path className="sk-paper" d={o(0, -30, 7)} />
        <path className="cs-stroke" d={`${o(0, -30, 7)}M0 -23V-8M0 -8-6 0M0 -8 6 0M-7 -18 7 -16`} />
        <animateMotion dur="5s" repeatCount="indefinite" path={climb} />
      </g>
      <T x={120} y={60} s={18} r={-4}>
        new here? climb the stairs
      </T>
    </Fig>
  );
}

export function ExploreFig() {
  return (
    <Fig view="0 0 720 300" h={50} label="a phone feed with slots 4 to 6 marked as the exploration zone, a new vendor sticker sliding into slot 5. beside it, a death spiral loop: no orders, never surfaces, never gets orders" caption="an exploration slot with an impression cap, sized for our traffic">
      <F d={box(60, 20, 150, 262)} />
      <P d={box(60, 20, 150, 262)} k={0} />
      <F d={box(66, 104, 138, 72)} c="zone" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <T x={78} y={46 + i * 24} s={10} f="mono" m>
            {i + 1}
          </T>
          <P d={`M92 ${42 + i * 24}H${190 - (i % 4) * 10}`} k={1 + i} />
        </g>
      ))}
      <g className="cs-slide">
        <F d={box(212, 124, 64, 26)} c="accent" />
        <P d={box(212, 124, 64, 26)} k={11} />
        <T x={244} y={142} s={15}>
          new!
        </T>
      </g>
      <T x={250} y={96} s={14} a="start">
        slots 4 to 6
      </T>
      <T x={250} y={196} s={11} f="mono" a="start" m>
        fixed impression budget
      </T>
      <T x={250} y={212} s={11} f="mono" a="start" m>
        content features only
      </T>
      <g className="cs-spin" style={{ transformOrigin: "540px 150px" }}>
        <P d="M540 70A80 80 0 0 1 614 180M600 172l14 8 2-16" k={12} />
        <P d="M600 206A80 80 0 0 1 470 190M480 200l-10-10-4 14" k={13} />
        <P d="M462 150A80 80 0 0 1 520 72M508 70l12 2-4 12" k={14} />
      </g>
      <T x={540} y={56} s={16}>
        no orders
      </T>
      <T x={650} y={220} s={16}>
        never surfaces
      </T>
      <T x={440} y={234} s={16}>
        never gets orders
      </T>
      <T x={540} y={158} s={16} m>
        death spiral
      </T>
    </Fig>
  );
}

export function FoldFig() {
  return (
    <Fig view="0 0 640 330" h={195} label="a phone feed. ten cards sit above the fold line marked K equals 10. an ordered restaurant at slot 2 is ticked; one at slot 14 below the fold is sad" caption="ordered-click depth is the one the product actually feels">
      <F d={box(60, 16, 170, 300)} />
      <P d={box(60, 16, 170, 300)} k={0} />
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <T x={76} y={40 + i * 20} s={9} f="mono" m>
            {i + 1}
          </T>
          <P d={`M90 ${36 + i * 20}H${214 - (i % 3) * 14}`} k={i} />
        </g>
      ))}
      <F d={box(88, 48, 128, 16)} c="accent" />
      <path className="cs-cross" d="M40 226H250" pathLength={1} />
      <T x={260} y={230} s={16} a="start">
        the fold · K = 10
      </T>
      <T x={260} y={250} s={11} f="mono" a="start" m>
        a phone holds about ten cards
      </T>
      <P d={arr(360, 60, 226, 56)} k={3} />
      <T x={370} y={64} s={18} a="start">
        bought at slot 2. lovely
      </T>
      <P d={arr(360, 300, 226, 298)} k={4} />
      <T x={370} y={304} s={18} a="start">
        bought at slot 14. they had to dig
      </T>
      <T x={370} y={140} s={11} f="mono" a="start">
        precision@10 · recall@10
      </T>
      <T x={370} y={158} s={11} f="mono" a="start">
        ndcg@10 when position matters
      </T>
      <T x={370} y={176} s={11} f="mono" a="start" m>
        baseline to beat: popularity sort
      </T>
    </Fig>
  );
}

export function EtaTimelineFig() {
  const pts = [
    { x: 60, t: "placed_at" },
    { x: 250, t: "accepted_at" },
    { x: 410, t: "picked_up_at" },
    { x: 660, t: "delivered_at" },
  ];
  const brace = (x1: number, x2: number, y: number) => `M${x1} ${y - 8}q0 8 10 8H${(x1 + x2) / 2 - 8}q8 0 8 8q0-8 8-8H${x2 - 10}q10 0 10-8`;
  return (
    <Fig view="0 0 720 250" h={85} label="order clock. placed, accepted, picked up, delivered. total ETA spans placed to delivered; sub-legs are prep and accept, wait, and transit" caption="define the target before any feature. delivery time is a sloppy phrase">
      <P d="M60 80H660" k={0} />
      <Mover path="M60 80H660" dur={4} r={6} />
      {pts.map((p, i) => (
        <g key={p.t}>
          <F d={o(p.x, 80, 9)} c={i === 3 ? "accent" : "paper"} />
          <P d={o(p.x, 80, 9)} k={1 + i} />
          <T x={p.x} y={58} s={11} f="mono">
            {p.t}
          </T>
        </g>
      ))}
      <P d={brace(60, 250, 116)} k={5} />
      <P d={brace(250, 410, 116)} k={6} />
      <P d={brace(410, 660, 116)} k={7} />
      <T x={155} y={146} s={16}>
        prep / accept
      </T>
      <T x={330} y={146} s={16}>
        wait
      </T>
      <T x={535} y={146} s={16}>
        transit
      </T>
      <P d={brace(60, 660, 190)} k={8} />
      <T x={360} y={222} s={19}>
        total ETA, the checkout number
      </T>
    </Fig>
  );
}

export function MaxFig() {
  return (
    <Fig view="0 0 720 280" h={250} label="two parallel tracks. top, rider assignment then first mile. bottom, restaurant prep. they meet at a max node, then last mile to the customer" caption="prep and dispatch run in parallel. summing them double-counts. max() is the physics">
      <Node x={40} y={50} w={170} h={40} t="assignment (O2A)" s={15} />
      <Node x={210} y={50} w={170} h={40} t="first mile (FM)" c="blob" s={15} />
      <Node x={40} y={140} w={380} h={40} t="prep, incl. wait at restaurant (WT)" c="accent" s={15} />
      <P d={arr(382, 70, 460, 108)} k={3} />
      <P d={arr(422, 160, 460, 124)} k={3} />
      <F d={o(490, 116, 30)} />
      <P d={o(490, 116, 30)} k={4} />
      <T x={490} y={122} s={16} f="mono">
        max()
      </T>
      <P d={arr(522, 116, 540, 116)} k={5} />
      <Node x={544} y={96} w={140} h={40} t="last mile (LM)" s={15} />
      <T x={360} y={236} s={12.5} f="mono">
        delivery_time ≈ max(assignment + first_mile, prep) + last_mile
      </T>
      <T x={360} y={264} s={15} m>
        swiggy&apos;s cart-time identity, from their public writing
      </T>
    </Fig>
  );
}

export function TreeFig() {
  return (
    <Fig view="0 0 640 260" h={150} label="decision tree splitting on distance, then peak hour or queue load, ending in leaves from quick to grab a snack" caption="the signal is interactions: distance × peak × queue × zone. trees split on those natively">
      <Node x={250} y={20} w={140} h={40} t="far away?" />
      <Node x={100} y={110} w={140} h={40} t="peak hour?" c="blob" />
      <Node x={400} y={110} w={140} h={40} t="queue busy?" c="blob" />
      <P d="M290 60 170 110M350 60 470 110" k={3} />
      <P d="M140 150 80 200M200 150 240 200M440 150 400 200M500 150 560 200" k={4} />
      {[
        { x: 80, t: "quick" },
        { x: 240, t: "a bit slow" },
        { x: 400, t: "slow" },
        { x: 560, t: "grab a snack" },
      ].map((leaf, i) => (
        <g key={leaf.t}>
          <F d={box(leaf.x - 50, 204, 100, 30)} c={i === 3 ? "accent" : "paper"} />
          <P d={box(leaf.x - 50, 204, 100, 30)} k={5 + i} />
          <T x={leaf.x} y={224} s={15}>
            {leaf.t}
          </T>
        </g>
      ))}
      <T x={200} y={82} s={10} f="mono" m>
        no
      </T>
      <T x={440} y={82} s={10} f="mono" m>
        yes
      </T>
    </Fig>
  );
}

const curve = (late: number, early: number) => {
  const pts: string[] = [];
  for (let e = -15; e <= 15; e += 0.5) {
    const y = 230 - (e < 0 ? late : early) * e * e;
    if (y >= 26) pts.push(`${(330 + e * 18).toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" ")}`;
};

export function LossFig() {
  return (
    <Fig view="0 0 660 290" h={25} label="loss curves. a dashed symmetric parabola labelled MSE, equal pain. a solid asymmetric curve much steeper on the late side labelled what the business feels" caption="MSE says late by 15 and early by 15 are the same mistake. users disagree loudly">
      <P d="M40 231H620M330 30V236" k={0} />
      <path className="cs-dash" d={curve(0.7, 0.7)} />
      <path className="cs-stroke cs-pop" d={curve(1.7, 0.45)} />
      <T x={40} y={256} s={11} f="mono" a="start" m>
        ← shown too low (late)
      </T>
      <T x={620} y={256} s={11} f="mono" a="end" m>
        shown too high (early) →
      </T>
      <T x={330} y={276} s={11} f="mono" m>
        shown minus actual, minutes
      </T>
      <T x={150} y={60} s={16}>
        shown 30, came 45
      </T>
      <T x={150} y={78} s={11} f="mono" m>
        anger, 1 star, refund risk
      </T>
      <T x={530} y={100} s={16}>
        shown 45, came 30
      </T>
      <T x={530} y={118} s={11} f="mono" m>
        pleasant surprise, mostly
      </T>
      <T x={560} y={200} s={14} m>
        dashed = MSE, equal pain
      </T>
      <T x={560} y={178} s={14}>
        solid = what the business feels
      </T>
    </Fig>
  );
}

export function CalibrationFig() {
  const X = (m: number) => 70 + (m - 10) * 7.5;
  const Y = (m: number) => 262 - (m - 10) * 3.3;
  const preds = Array.from({ length: 12 }, (_, i) => 16 + i * 4);
  let a = "";
  let b = "";
  preds.forEach((p, i) => {
    a += o(X(p), Y(p + 8 + (rand(i, 3) - 0.5) * 2), 4);
    b += o(X(p + 1.5), Y(p + 1.5 + (i % 2 ? 1 : -1) * (6 + rand(i, 9) * 6)), 4);
  });
  return (
    <Fig view="0 0 640 300" h={195} label="predicted versus actual minutes. filled dots sit in a neat line 8 minutes above the diagonal; hollow dots scatter around the diagonal" caption="MAE 8 that is always 8 minutes optimistic loses to MAE 9 that is centred. plot predicted vs actual by hour and by zone">
      <P d="M66 263H600M70 30V267" k={0} />
      <path className="cs-dash" d={`M${X(10)} ${Y(10)}L${X(78)} ${Y(78)}`} />
      <path className="sk-accent" d={a} />
      <path className="cs-stroke" d={b} fill="none" />
      <T x={X(76)} y={Y(76) + 22} s={14} a="end" m>
        perfect
      </T>
      <T x={120} y={60} s={16} a="start">
        ● MAE 8, always 8 min optimistic
      </T>
      <T x={120} y={82} s={16} a="start">
        ○ MAE 9, centred
      </T>
      <T x={600} y={284} s={11} f="mono" a="end" m>
        predicted minutes →
      </T>
      <T x={52} y={150} s={11} f="mono" r={-90} m>
        actual minutes
      </T>
    </Fig>
  );
}

export function FeedServingFig() {
  return (
    <Fig view="0 0 720 300" h={250} label="feed serving. nightly, rebuild user features, score against serviceable vendors, write the top 80 to a cache. on request, read the cache, apply live filters, insert the exploration slot, return 10 to 20 cards" caption="taste doesn't change hourly. open, closed and riders do, so those are serve-time filters">
      <path className="sk-accent" d="M44 44a18 18 0 1 0 22 22a14 14 0 0 1-22-22Z" />
      <P d="M44 44a18 18 0 1 0 22 22a14 14 0 0 1-22-22Z" k={0} />
      <T x={56} y={104} s={14}>
        nightly
      </T>
      <P d={arr(86, 60, 104, 60)} k={1} />
      <Node x={108} y={36} w={160} h={48} t="rebuild user features" sub="orders up to yesterday" s={15} />
      <P d={arr(272, 60, 290, 60)} k={2} />
      <Node x={294} y={36} w={170} h={48} t="score each user" sub="vs serviceable vendors" s={15} />
      <P d={arr(468, 60, 486, 60)} k={3} />
      <Node x={490} y={36} w={190} h={48} t="cache top-N (say 80)" sub="key: user_id + city" c="blob" s={15} />
      <P d={arr(585, 90, 585, 170)} k={4} />
      <Mover path="M585 90V170" dur={1.8} r={4} />
      <T x={40} y={196} s={14} a="start">
        on request
      </T>
      <Node x={40} y={210} w={120} h={48} t="read cache" s={15} />
      <P d={arr(164, 234, 182, 234)} k={5} />
      <Node x={186} y={210} w={170} h={48} t="live filters" sub="open · riders · radius" s={15} />
      <P d={arr(360, 234, 378, 234)} k={6} />
      <Node x={382} y={210} w={150} h={48} t="+ explore slot" c="accent" s={15} />
      <P d={arr(536, 234, 554, 234)} k={7} />
      <Node x={558} y={210} w={122} h={48} t="10 to 20 cards" s={15} />
      <P d="M585 170C585 190 100 180 100 206" k={8} />
      <T x={360} y={290} s={14} m>
        target: tens of ms for read-and-filter. the model isn&apos;t on this path
      </T>
    </Fig>
  );
}

export function EtaServingFig() {
  return (
    <Fig view="0 0 720 200" h={85} label="ETA serving at checkout. cheap features and live features feed XGBoost, the output is clamped to a displayable range and shown as minutes" caption="most of the latency budget is feature fetch, not the tree">
      <Node x={20} y={70} w={110} h={48} t="checkout" s={16} />
      <P d={arr(134, 86, 170, 54)} k={1} />
      <P d={arr(134, 104, 170, 138)} k={1} />
      <Node x={174} y={24} w={200} h={52} t="cheap features" sub="haversine · hour · size · vendor" s={15} />
      <Node x={174} y={114} w={200} h={52} t="live features" sub="open orders · free riders, NOW" c="accent" s={15} />
      <P d={arr(378, 50, 414, 84)} k={2} />
      <P d={arr(378, 140, 414, 104)} k={2} />
      <Node x={418} y={70} w={100} h={48} t="XGBoost" c="blob" s={16} />
      <P d={arr(522, 94, 540, 94)} k={3} />
      <Node x={544} y={70} w={156} h={48} t="clamp [15, 90]" sub="whatever ops can show" s={15} />
      <T x={620} y={150} s={16}>
        → minutes
      </T>
    </Fig>
  );
}

export function RetrainFig() {
  const weeks = Array.from({ length: 10 }, (_, i) => i);
  return (
    <Fig view="0 0 640 170" h={300} label="ten week calendar. feed retrains every week. ETA retrains weekly to biweekly with extra retrains in monsoon onset and festival week" caption="festivals and monsoon move delivery time far more than they move cuisine taste. ETA gets the extra retrain">
      <T x={20} y={56} s={16} a="start">
        feed
      </T>
      <T x={20} y={116} s={16} a="start">
        ETA
      </T>
      {weeks.map((w) => (
        <g key={w}>
          <P d={box(100 + w * 52, 36, 40, 28)} k={w} />
          <F d={o(120 + w * 52, 50, 6)} c="blob" />
          <P d={box(100 + w * 52, 96, 40, 28)} k={w} />
          {w % 2 === 0 && <F d={o(120 + w * 52, 110, 6)} c="blob" />}
          {(w === 3 || w === 7) && <path className="sk-accent" d={`M${120 + w * 52} 98l3 8 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z`} />}
          <T x={120 + w * 52} y={24} s={10} f="mono" m>
            {`w${w + 1}`}
          </T>
        </g>
      ))}
      <T x={276} y={150} s={14}>
        monsoon onset
      </T>
      <T x={484} y={150} s={14}>
        festival week
      </T>
    </Fig>
  );
}

export function Stopwatch() {
  return (
    <svg className="cs-watch" viewBox="0 0 80 90" aria-hidden="true">
      <g filter="url(#ink-edge)">
        <F d={o(40, 50, 30)} />
        <P d={`${o(40, 50, 30)}M34 14h12M40 14v6M64 26l5-5`} />
        <g className="fm-hand" style={{ transformOrigin: "40px 50px" }}>
          <P d="M40 50V30" />
        </g>
        <F d={o(40, 50, 3)} c="accent" />
      </g>
    </svg>
  );
}
