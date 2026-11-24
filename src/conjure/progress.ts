export const LEVELS = [
  { id: "spark", xp: 0 },
  { id: "stir", xp: 24 },
  { id: "circle", xp: 70 },
  { id: "keep", xp: 120 },
  { id: "master", xp: 180 },
] as const;

export type LevelId = (typeof LEVELS)[number]["id"];

export const ACTIONS = {
  start: 8,
  drop: 6,
  sensor: 18,
  gather: 22,
  capture: 36,
  share: 20,
  remix: 16,
  recipe: 14,
  mint: 40,
  fling: 4,
} as const;

export type Action = keyof typeof ACTIONS;

const DAILY_CAP: Partial<Record<Action, number>> = {
  start: 1,
  drop: 12,
  sensor: 3,
  fling: 6,
  share: 4,
};

const BADGE_FOR: Partial<Record<Action, string>> = {
  start: "spark",
  drop: "drop",
  sensor: "sensor",
  gather: "circle",
  capture: "keep",
  share: "share",
  fling: "fling",
  mint: "mint",
};

export type Progress = {
  xp: number;
  level: LevelId;
  streak: number;
  lastDay: string;
  badges: string[];
  day: string;
  dayCounts: Partial<Record<Action, number>>;
};

export function emptyProgress(): Progress {
  return { xp: 0, level: "spark", streak: 0, lastDay: "", badges: [], day: "", dayCounts: {} };
}

export function localDay(now: Date): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function levelFor(xp: number): LevelId {
  let id: LevelId = "spark";
  for (const level of LEVELS) {
    if (xp >= level.xp) id = level.id;
  }
  return id;
}

export function xpToNext(xp: number): { next: LevelId | null; need: number; span: number; into: number } {
  const current = levelFor(xp);
  const index = LEVELS.findIndex((level) => level.id === current);
  const upcoming = LEVELS[index + 1];
  if (!upcoming) return { next: null, need: 0, span: 1, into: 1 };
  const floor = LEVELS[index].xp;
  return {
    next: upcoming.id,
    need: upcoming.xp - xp,
    span: upcoming.xp - floor,
    into: xp - floor,
  };
}

export function walletUnlocked(progress: Progress): boolean {
  return LEVELS.findIndex((level) => level.id === progress.level) >= 3 || progress.badges.includes("mint");
}

export function nextStepId(progress: Progress): string {
  if (!progress.badges.includes("drop")) return "drop";
  if (!progress.badges.includes("sensor")) return "sensor";
  if (!progress.badges.includes("keep")) return "capture";
  if (!progress.badges.includes("circle")) return "gather";
  if (!progress.badges.includes("share")) return "share";
  if (!progress.badges.includes("fling")) return "fling";
  if (progress.level !== "master") return "master";
  if (!progress.badges.includes("mint")) return "wallet";
  return "board";
}

export type AwardResult = { progress: Progress; gained: number; leveledUp: boolean };

export function award(progress: Progress, action: Action, now = new Date()): AwardResult {
  const day = localDay(now);
  let streak = progress.streak;
  let dayCounts = progress.day === day ? { ...progress.dayCounts } : {};
  if (progress.lastDay !== day) {
    const yesterday = localDay(new Date(now.getTime() - 86_400_000));
    streak = progress.lastDay === yesterday ? Math.max(1, progress.streak) + 1 : 1;
    dayCounts = {};
  }
  const cap = DAILY_CAP[action];
  const used = dayCounts[action] ?? 0;
  const gained = cap != null && used >= cap ? 0 : ACTIONS[action];
  if (gained > 0) dayCounts[action] = used + 1;
  const xp = progress.xp + gained;
  const level = levelFor(xp);
  const badges = new Set(progress.badges);
  const badge = BADGE_FOR[action];
  if (badge && gained > 0) badges.add(badge);
  if (streak >= 3) badges.add("streak");
  if (level === "master") badges.add("master");
  return {
    progress: {
      xp,
      level,
      streak,
      lastDay: day,
      badges: [...badges],
      day,
      dayCounts,
    },
    gained,
    leveledUp: level !== progress.level && gained > 0,
  };
}

const PROGRESS_KEY = "conjure.progress.v1";

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const base = emptyProgress();
    return {
      ...base,
      ...parsed,
      level: levelFor(parsed.xp ?? 0),
      badges: Array.isArray(parsed.badges) ? parsed.badges.filter((item) => typeof item === "string") : [],
      dayCounts: parsed.dayCounts && typeof parsed.dayCounts === "object" ? parsed.dayCounts : {},
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

const TIPS_KEY = "conjure.tips.v1";

export const TIP_ORDER = ["fling", "capture", "gather", "share", "master", "wallet", "board"] as const;
export type TipId = (typeof TIP_ORDER)[number];

export function loadDismissedTips(): TipId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(TIPS_KEY) || "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter((item): item is TipId => TIP_ORDER.includes(item as TipId));
  } catch {
    return [];
  }
}

export function dismissTip(id: TipId): TipId[] {
  const next = [...new Set([...loadDismissedTips(), id])];
  localStorage.setItem(TIPS_KEY, JSON.stringify(next));
  return next;
}

export function currentTip(dismissed: readonly string[], gates: Partial<Record<TipId, boolean>>): TipId | null {
  for (const id of TIP_ORDER) {
    if (gates[id] && !dismissed.includes(id)) return id;
  }
  return null;
}

export type BoardPrefs = { optIn: boolean; handle: string; hidden: boolean };

const BOARD_KEY = "conjure.board.v1";

export function loadBoardPrefs(): BoardPrefs {
  if (typeof window === "undefined") return { optIn: false, handle: "", hidden: false };
  try {
    const parsed = JSON.parse(localStorage.getItem(BOARD_KEY) || "{}") as Partial<BoardPrefs>;
    return {
      optIn: Boolean(parsed.optIn),
      handle: typeof parsed.handle === "string" ? parsed.handle : "",
      hidden: Boolean(parsed.hidden),
    };
  } catch {
    return { optIn: false, handle: "", hidden: false };
  }
}

export function saveBoardPrefs(prefs: BoardPrefs): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BOARD_KEY, JSON.stringify(prefs));
}

export function cleanHandle(raw: string): string {
  const text = raw.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 16);
  if (!text) return "";
  if (text.includes("@")) return "";
  if (/^0x[a-fA-F0-9]{6,}$/.test(text)) return "";
  return text;
}
