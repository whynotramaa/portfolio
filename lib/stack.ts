export type StackItem = { name: string; icon: string; color?: string; note?: string };
export type StackGroup = { title: string; label: string; items: StackItem[] };

const icon = (slug: string): StackItem => ({
  name: slug,
  icon: `https://cdn.simpleicons.org/${slug}/000000`,
});

const named = (name: string, slug: string, color?: string, note?: string): StackItem => ({ ...icon(slug), name, color, note });

export const stackGroups: StackGroup[] = [
  {
    title: "languages",
    label: "and runtimes",
    items: [
      named("TypeScript", "typescript", "#3178c6", "most code"),
      named("JavaScript", "javascript", "#e8c900", "older code"),
      named("Python", "python", "#3776ab", "ml work"),
      named("Node.js", "nodedotjs", "#5fa04e", "servers"),
      named("SQL", "sqlite", "#0f80cc", "by hand"),
    ],
  },
  {
    title: "frontend",
    label: "and design",
    items: [
      named("React", "react", "#1fb6d9", "daily"),
      named("Next.js", "nextdotjs", undefined, "most sites"),
      named("Tailwind", "tailwindcss", "#06b6d4", "styling"),
      named("Figma", "figma", "#f24e1e", "design"),
      named("Vite", "vite", "#646cff", "small apps"),
    ],
  },
  {
    title: "backend",
    label: "data and hosting",
    items: [
      named("Postgres", "postgresql", "#4169e1", "main db"),
      named("Redis", "redis", "#ff4438", "caching"),
      named("Convex", "convex", "#ee342f", "realtime"),
      named("Prisma", "prisma", undefined, "orm"),
      named("Vercel", "vercel", undefined, "hosting"),
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
