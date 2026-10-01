export type StackItem = { name: string; icon: string; color?: string; note?: string };
export type StackGroup = { title: string; label: string; items: StackItem[] };

const icon = (slug: string): StackItem => ({
  name: slug,
  icon: `https://cdn.simpleicons.org/${slug}/000000`,
});

const named = (name: string, slug: string, color?: string, note?: string): StackItem => ({ ...icon(slug), name, color, note });

export const stackGroups: StackGroup[] = [
  {
    title: "the base",
    label: "languages & runtime",
    items: [
      named("TypeScript", "typescript", "#3178c6", "a lot"),
      named("JavaScript", "javascript", "#e8c900", "leftovers"),
      named("Python", "python", "#3776ab", "ml bits"),
      named("Node.js", "nodedotjs", "#5fa04e", "to taste"),
      named("SQL", "sqlite", "#0f80cc", "by hand"),
    ],
  },
  {
    title: "the plating",
    label: "product & interface",
    items: [
      named("React", "react", "#1fb6d9", "daily"),
      named("Next.js", "nextdotjs", undefined, "the pan"),
      named("Tailwind", "tailwindcss", "#06b6d4", "a pinch"),
      named("Figma", "figma", "#f24e1e", "first"),
      named("Vite", "vite", "#646cff", "quick ones"),
    ],
  },
  {
    title: "the pantry",
    label: "data & infrastructure",
    items: [
      named("Postgres", "postgresql", "#4169e1", "stocked"),
      named("Redis", "redis", "#ff4438", "a dash"),
      named("Convex", "convex", "#ee342f", "realtime"),
      named("Prisma", "prisma", undefined, "sparingly"),
      named("Vercel", "vercel", undefined, "to serve"),
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
