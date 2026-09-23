export type StackItem = { name: string; icon: string; color?: string };
export type StackGroup = { label: string; kanji: string; meaning: string; items: StackItem[] };

const icon = (slug: string): StackItem => ({
  name: slug,
  icon: `https://cdn.simpleicons.org/${slug}/000000`,
});

const named = (name: string, slug: string, color?: string): StackItem => ({ ...icon(slug), name, color });

export const stackGroups: StackGroup[] = [
  {
    label: "languages & runtime",
    kanji: "言語",
    meaning: "gengo · languages",
    items: [
      named("TypeScript", "typescript", "#3178c6"),
      named("JavaScript", "javascript", "#e8c900"),
      named("Python", "python", "#3776ab"),
      named("Node.js", "nodedotjs", "#5fa04e"),
      named("SQL", "sqlite", "#0f80cc"),
    ],
  },
  {
    label: "product & interface",
    kanji: "画面",
    meaning: "gamen · screens",
    items: [
      named("React", "react", "#1fb6d9"),
      named("Next.js", "nextdotjs"),
      named("Tailwind", "tailwindcss", "#06b6d4"),
      named("Figma", "figma", "#f24e1e"),
      named("Vite", "vite", "#646cff"),
    ],
  },
  {
    label: "data & infrastructure",
    kanji: "基盤",
    meaning: "kiban · foundations",
    items: [
      named("Postgres", "postgresql", "#4169e1"),
      named("Redis", "redis", "#ff4438"),
      named("Convex", "convex", "#ee342f"),
      named("Prisma", "prisma"),
      named("Vercel", "vercel"),
    ],
  },
];

export const orbitStack: StackItem[] = [
  named("TypeScript", "typescript"),
  named("React", "react"),
  named("Python", "python"),
  named("Next.js", "nextdotjs"),
  named("Postgres", "postgresql"),
];
