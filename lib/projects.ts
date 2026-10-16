export type Project = {
  number: string;
  name: string;
  type: string;
  hook: string;
  problem: string;
  built: string;
  tags: string[];
  href: string;
  repo: string;
  proof: { value: string; label: string };
  lab?: string;
  feat?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Howzat",
    type: "full-stack · realtime",
    hook: "Live cricket scoring for local clubs. Anyone can follow a match without an app or a login.",
    problem: "Club cricket lives in paper and WhatsApp groups. Nobody wants to install an app just to see the score.",
    built: "A one-tap scoring console, offline queue, public no-login share link, fixtures, playoffs, and points tables.",
    tags: ["typescript", "websockets", "offline first"],
    href: "https://howzat.ramaa.tech",
    repo: "https://github.com/whynotramaa/howzat",
    proof: { value: "0 logins", label: "needed to follow a live match" },
  },
  {
    number: "02",
    name: "octlm",
    type: "ml · language models",
    hook: "A small language model I built from scratch, from the tokenizer to fine-tuning.",
    problem: "Most LLM projects start at someone else's tokenizer and end at someone else's fine-tuning library.",
    built: "Byte-level BPE, a modern decoder, a 26M TinyStories model, Qwen3-0.6B in the same code, and a hand-written LoRA.",
    tags: ["pytorch", "lora", "qwen3-0.6b"],
    href: "https://octlm.ramaa.tech",
    repo: "https://github.com/whynotramaa/octlm",
    proof: { value: "2.5% → 46.7%", label: "agent pass rate on 40 tasks, after a LoRA I wrote myself" },
    lab: "from byte 0",
    feat: true,
  },
  {
    number: "03",
    name: "Shardly",
    type: "systems · search",
    hook: "A search engine written from scratch in TypeScript, with BM25 ranking.",
    problem: "Search libraries hide the interesting parts when you are trying to learn or explain them.",
    built: "Segments, WAL, inverted index, tokenizer, and BM25 ranking, all written in TypeScript.",
    tags: ["typescript", "bm25", "storage engine"],
    href: "https://shardly.ramaa.tech",
    repo: "https://github.com/whynotramaa/shardly",
    proof: { value: "6–21 ms", label: "per query on 50k docs, down from ~800 ms" },
  },
  {
    number: "04",
    name: "PaperCode",
    type: "terminal · ai",
    hook: "A coding agent for the terminal that asks before it changes your files.",
    problem: "Terminal agents can make destructive actions feel too easy.",
    built: "A provider-agnostic coding agent with a read-only PLAN mode and permission gates.",
    tags: ["ink", "openai sdk", "node.js"],
    href: "https://papercode.ramaa.tech",
    repo: "https://github.com/whynotramaa/papercode",
    proof: { value: "153 tests", label: "covering every tool and permission check" },
  },
  {
    number: "05",
    name: "PlayWhatever",
    type: "social · multiplayer",
    hook: "Party games for friends in the same room. Join with a code, no signup.",
    problem: "Same-room games need private info, timers, votes, and content that lands fast.",
    built: "Guest-friendly rooms, four games, daily IPL puzzle, scores, and optional room voice.",
    tags: ["convex", "next.js", "webrtc"],
    href: "https://playwhatever.ramaa.tech",
    repo: "https://github.com/whynotramaa/playwhatever",
    proof: { value: "4 games", label: "join a room with a 6-letter code" },
  },
  {
    number: "06",
    name: "MovieFlix & Chill",
    type: "web · recommendations",
    hook: "Find a movie to watch, with search, trailers, ratings and trending lists in one place.",
    problem: "Search, trailers, ratings, and trend lists never seem to agree.",
    built: "Personalized picks, debounced infinite search, trailer playback, and live trending data.",
    tags: ["react", "tmdb", "appwrite"],
    href: "https://github.com/whynotramaa/movie-recommendation",
    repo: "https://github.com/whynotramaa/movie-recommendation",
    proof: { value: "infinite", label: "scroll in search results" },
  },

  {
    number: "07",
    name: "Kairo",
    type: "product · ai",
    hook: "A no-code tool to build automations with APIs and AI, with logs and retries.",
    problem: "Teams want flexible workflows without losing logs, retries, or credential safety.",
    built: "A visual builder for APIs, AI providers, notifications, and durable background jobs.",
    tags: ["next.js", "xyflow", "inngest"],
    href: "https://kairo-automation.vercel.app",
    repo: "https://github.com/whynotramaa/kairo---automation",
    proof: { value: "4 ai providers", label: "OpenAI, Anthropic, Google and Groq" },
  },];

export const research: Project[] = [
  {
    number: "08",
    name: "FCSG-Net",
    type: "ongoing · machine learning",
    hook: "Research on removing noise from photos, with a model under 5M parameters.",
    problem: "Research needs interpretable expert routing under 5M parameters, with training that survives a killed notebook.",
    built: "Frequency bands, per-location routing, DnCNN validation, ablations, and resumable checkpoints.",
    tags: ["pytorch", "cnn experts", "kaggle"],
    href: "https://github.com/whynotramaa/fcsg-capstone",
    repo: "https://github.com/whynotramaa/fcsg-capstone",
    proof: { value: "< 5M params", label: "checked against a published DnCNN baseline" },
    lab: "still training",
  },
];
