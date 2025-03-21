// Calculator Routes
export const CALCULATOR_LINKS = [
  {
    href: "/all-in-one-calculator",
    label: "All in One Calculator",
    logoUrl: "/images/all-in-one.svg",
  },
  {
    href: "/name-numerology-calculator",
    label: "Name Numerology",
    logoUrl: "/images/name-numerology.svg",
  },
  {
    href: "/destiny-number-calculator",
    label: "Destiny Number",
    logoUrl: "/images/destiny-number.svg",
  },
  {
    href: "/pinnacle-number-calculator",
    label: "Pinnacle Number",
    logoUrl: "/images/pinnacle-number.svg",
  },
  {
    href: "/personality-number",
    label: "Personality Number",
    logoUrl: "/images/personality-number.svg",
  },
  {
    href: "/loshu-grid",
    label: "Lo-shu Grid",
    logoUrl: "/images/loshu-grid.svg",
  },
];

// Pythagorean Numerology Mapping (A-Z → 1-9)
export const PYTHAGOREAN_MAPPING: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

// Chaldean Numerology Mapping (A-Z → 1-8)
export const CHALDEAN_MAPPING: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
};

export const APP_TITLE = "Vagmi Richa Vishwajiet";

export const HEADER_MENU_ITEMS = [
  {
    title: "Calculator",
    items: CALCULATOR_LINKS.map((rec) => ({ ...rec, title: rec["label"] })),
  },
  {
    title: "About",
    href: "/about",
  },
];

// Database table names
export const INTERPRETATIONS_TABLE = "INTERPRETATIONS";
export const SYS_USERS_TABLE = "SYS_USERS";

// INTERPRETATION TYPES
export const NAME_TO_NUM_INTERPRETATION = "NAME_TO_NUMBER";
export const SOUL_NUM_INTERPRETATION = "SOUL";
export const DESTINY_NUM_INTERPRETATION = "DESTINY";
export const PERSONALITY_NUM_INTERPRETATION = "PERSONALITY";
export const CHALLENGE_NUM_INTERPRETATION = "CHALLENGE";
export const PINNACLE_NUM_INTERPRETATION = "PINNACLE";

export const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=59";
