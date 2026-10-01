import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "ramaa, not the chosen one";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#141414";
const MUTED = "#666663";
const BG = "#fafaf9";

const pasta = {
  blob: "M58 150C46 88 118 42 204 48S350 72 356 140 312 244 204 246 70 212 58 150Z",
  paper: ["M96 150C100 214 150 236 200 236S300 214 304 150Z", "M96 150a104 16 0 1 0 208 0a104 16 0 1 0-208 0"],
  accent: ["M118 148C122 108 166 90 204 94S278 114 282 148C240 158 160 158 118 148Z"],
  ink: [
    "M96 150C100 214 150 236 200 236S300 214 304 150",
    "M96 150a104 16 0 1 0 208 0a104 16 0 1 0-208 0",
    "M120 192C170 202 230 202 282 192",
    "M40 238C140 232 270 242 372 236",
    "M132 138C150 118 170 142 188 120S222 134 240 114 264 132 274 140",
    "M142 124C162 106 184 126 204 104S242 116 258 122",
    "M162 110C178 98 196 108 216 98",
    "M248 118 322 30",
    "M316 24 330 36",
    "M254 106a12 7 -50 1 0 14 12a12 7 -50 1 0-14-12",
    "M124 86C114 72 134 62 124 48",
    "M152 78C142 64 162 54 152 38",
    "M180 76C170 62 190 52 180 36",
    "M346 70 354 56",
    "M340 82 356 77",
    "M348 92 360 98",
  ],
};

const drawing = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="800" height="560">
<defs><filter id="w"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.4"/></filter></defs>
<path d="${pasta.blob}" fill="#ffc5bf"/>
<g filter="url(#w)">
${pasta.paper.map((d) => `<path d="${d}" fill="#ffffff"/>`).join("")}
${pasta.accent.map((d) => `<path d="${d}" fill="#f47b74"/>`).join("")}
${pasta.ink.map((d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
</g></svg>`;

const K = 1;

export default async function Image() {
  const font = (file: string) => readFile(join(process.cwd(), file));
  const [serif, hand, mono] = await Promise.all([
    font("public/fonts/Zarathustra.otf"),
    font("app/og/Peehu-Regular.ttf"),
    font("app/og/GeistMono.ttf"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 80px", background: BG, color: INK, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Zarathustra", fontSize: 30 }}>
            <svg width="18" height="18" viewBox="0 0 20 20">
              <path d="M10 1v18M2.2 5.5l15.6 9M2.2 14.5l15.6-9" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            </svg>
            ramaa
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 17, color: MUTED }}>portfolio · vol. 26</div>
        </div>

        <div style={{ display: "flex", marginTop: 28, fontFamily: "Zarathustra", fontSize: 196, lineHeight: 0.95, letterSpacing: "-0.01em" }}>ramaa</div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginLeft: 6, marginTop: 6, fontFamily: "Peehu", fontSize: 34, color: MUTED }}>
          <svg width="32" height="32" viewBox="0 0 36 36" style={{ transform: "rotate(90deg) scaleX(-1)", marginBottom: 6 }}>
            <path d="M4 32C6 16 16 6 30 4M30 4l-9 2M30 4l3 9" stroke={MUTED} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          or formally, ramnath
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 26, fontFamily: "Zarathustra", fontSize: 46 }}>
          I make worst pasta 🍝 and&nbsp;
          <div style={{ display: "flex", position: "relative" }}>
            best jokes
            <svg width="220" height="16" viewBox="0 0 200 16" preserveAspectRatio="none" style={{ position: "absolute", left: -4, bottom: -8 }}>
              <path d="M2 9C14 3 24 13 36 8S58 3 70 8 94 14 106 8 128 3 140 8 164 13 176 8 192 5 198 7" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          .
        </div>

        <div style={{ display: "flex", marginTop: 34, width: 760, padding: "6px 0", background: "#ffffff", border: `1.7px solid ${INK}`, borderRadius: "16px 22px 14px 24px" }}>
          {[
            ["currently at", "NIT Rourkela", "b.tech cse, final year"],
            ["graduating", "2027", "hireable before then"],
            ["say hello", "ramaa.tech", "I really do reply"],
          ].map(([dt, dd, note], i) => (
            <div key={dt} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "10px 24px", borderLeft: i ? "1.4px dashed rgba(20,20,20,0.18)" : "none" }}>
              <div style={{ fontFamily: "Peehu", fontSize: 24, color: MUTED }}>{dt}</div>
              <div style={{ fontFamily: "Zarathustra", fontSize: 32, lineHeight: 1.15 }}>{dd}</div>
              <div style={{ fontFamily: "Geist Mono", fontSize: 14, color: MUTED }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", position: "absolute", right: 56, top: 74, width: 400 * K, height: 280 * K, transform: "rotate(-3deg)" }}>
          <img src={`data:image/svg+xml;base64,${Buffer.from(drawing).toString("base64")}`} width={400 * K} height={280 * K} />
          <div style={{ display: "flex", position: "absolute", left: 30 * K, top: 16 * K, fontFamily: "Peehu", fontSize: 28, transform: "rotate(-9deg)" }}>worst pasta</div>
          <div style={{ display: "flex", position: "absolute", left: 150 * K, top: 250 * K, fontFamily: "Geist Mono", fontSize: 12 }}>serves 1 · regrets 2</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zarathustra", data: serif, style: "normal", weight: 400 },
        { name: "Peehu", data: hand, style: "normal", weight: 400 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
