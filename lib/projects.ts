export type Project = {
  number: string;
  name: string;
  type: string;
  hook: string;
  problem: string;
  built: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Howzat",
    type: "full-stack · realtime",
    hook: "a scorecard that gets out of the way.",
    problem: "Club cricket lives in paper and WhatsApp groups. Nobody wants to install an app just to see the score.",
    built: "A one-tap scoring console, offline queue, public no-login share link, fixtures, playoffs, and points tables.",
    tags: ["typescript", "websockets", "offline first"],
    href: "https://howzat.ramaa.tech",
  },
  {
    number: "02",
    name: "Shardly",
    type: "systems · search",
    hook: "a small search engine that shows its work.",
    problem: "Search libraries hide the interesting parts when you are trying to learn or explain them.",
    built: "Segments, WAL, inverted index, tokenizer, and BM25 ranking, all written in TypeScript.",
    tags: ["typescript", "bm25", "storage engine"],
    href: "https://shardly.ramaa.tech",
  },
  {
    number: "03",
    name: "PaperCode",
    type: "terminal · ai",
    hook: "a coding agent with a brake pedal.",
    problem: "Terminal agents can make destructive actions feel too easy.",
    built: "A provider-agnostic coding agent with a read-only PLAN mode and permission gates.",
    tags: ["ink", "openai sdk", "node.js"],
    href: "https://papercode.ramaa.tech",
  },
  {
    number: "04",
    name: "Kairo",
    type: "product · ai",
    hook: "no-code automation without the mystery.",
    problem: "Teams want flexible workflows without losing logs, retries, or credential safety.",
    built: "A visual builder for APIs, AI providers, notifications, and durable background jobs.",
    tags: ["next.js", "xyflow", "inngest"],
    href: "https://kairo-automation.vercel.app",
  },
  {
    number: "05",
    name: "PlayWhatever",
    type: "social · multiplayer",
    hook: "pass the phone, not the signup wall.",
    problem: "Same-room games need private info, timers, votes, and content that lands fast.",
    built: "Guest-friendly rooms, four games, daily IPL puzzle, scores, and optional room voice.",
    tags: ["convex", "next.js", "webrtc"],
    href: "https://playwhatever.vercel.app",
  },
  {
    number: "06",
    name: "MovieFlix & Chill",
    type: "web · recommendations",
    hook: "the next movie, minus twelve open tabs.",
    problem: "Search, trailers, ratings, and trend lists never seem to agree.",
    built: "Personalized picks, debounced infinite search, trailer playback, and live trending data.",
    tags: ["react", "tmdb", "appwrite"],
    href: "https://movie-flix-chill.vercel.app",
  },
  {
    number: "07",
    name: "FCSG-Net",
    type: "research · deep learning",
    hook: "image restoration with a tiny GPU budget.",
    problem: "Research needs interpretable expert routing under 5M parameters, with training that survives a killed notebook.",
    built: "Frequency bands, per-location routing, DnCNN validation, ablations, and resumable checkpoints.",
    tags: ["pytorch", "cnn experts", "kaggle"],
    href: "https://github.com/whynotramaa/fcsg-capstone",
  },
];
