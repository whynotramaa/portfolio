export type StackItem = { name: string; icon: string };
export type StackGroup = { label: string; items: StackItem[] };

/** monochrome by design: the brand here is black ink, so the logos are too */
const icon = (slug: string): StackItem => ({
  name: slug,
  icon: `https://cdn.simpleicons.org/${slug}/000000`,
});

const named = (name: string, slug: string): StackItem => ({ ...icon(slug), name });

export const stackGroups: StackGroup[] = [
  {
    label: "languages & runtime",
    items: [
      named("TypeScript", "typescript"),
      named("JavaScript", "javascript"),
      named("Python", "python"),
      named("Node.js", "nodedotjs"),
      named("SQL", "sqlite"),
    ],
  },
  {
    label: "product & interface",
    items: [
      named("React", "react"),
      named("Next.js", "nextdotjs"),
      named("Tailwind", "tailwindcss"),
      named("Figma", "figma"),
      named("Vite", "vite"),
    ],
  },
  {
    label: "data & infrastructure",
    items: [
      named("Postgres", "postgresql"),
      named("Redis", "redis"),
      named("Convex", "convex"),
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
