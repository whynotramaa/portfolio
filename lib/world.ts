export type Cutout = {
  id: string;
  kind: "film" | "cricket" | "stamp";
  title: string;
  meta: string;
  note: string;
  /** initial position as % of the desk, so it scales with the viewport */
  x: number;
  y: number;
  rotate: number;
};

export const cutouts: Cutout[] = [
  { id: "yjhd", kind: "film", title: "Yeh Jawaani Hai Deewani", meta: "2013 · rewatch count: high", note: "bunny was right about the running", x: 3, y: 6, rotate: -4 },
  { id: "wakeupsid", kind: "film", title: "Wake Up Sid", meta: "2009 · bombay, rain, deadlines", note: "the one that hits at 2am", x: 30, y: 2, rotate: 3 },
  { id: "3idiots", kind: "film", title: "3 Idiots", meta: "2009 · engineering, allegedly", note: "aal izz well, allegedly", x: 57, y: 8, rotate: -2.5 },
  { id: "tumbbad", kind: "film", title: "Tumbbad", meta: "2018 · greed, rain, one lamp", note: "best looking indian film. fight me", x: 8, y: 44, rotate: 2 },
  { id: "asur", kind: "film", title: "Asur", meta: "series · mythology meets forensics", note: "the writing really holds", x: 34, y: 52, rotate: -3.5 },
  { id: "suits", kind: "film", title: "Suits", meta: "series · confidence as a skill", note: "nobody talks like harvey", x: 62, y: 40, rotate: 4 },
  { id: "kohli", kind: "cricket", title: "Virat Kohli", meta: "the chase, the gears, the noise", note: "whatever i am, i try to be his copy", x: 74, y: 62, rotate: -5 },
  { id: "stokes", kind: "cricket", title: "Ben Stokes", meta: "Ashes · Headingley 2019", note: "135*. the attitude more than the runs", x: 46, y: 74, rotate: 3 },
  { id: "india", kind: "stamp", title: "India", meta: "karmasthan", note: "", x: 82, y: 12, rotate: 8 },
  { id: "nepal", kind: "stamp", title: "Nepal", meta: "home · janmasthan", note: "", x: 84, y: 34, rotate: -9 },
];

export const home = { name: "Rourkela", lat: 22.2604, lon: 84.8536 };
