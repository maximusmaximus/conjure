import type { Drop, FormId, Vibe } from "./brew";
import type { MaterialNote } from "./fx";
import type { PhysicsNote } from "./physics";
import type { SpinNote, MotionNote } from "./spin";

export type Contributor = {
  id: string;
  name: string;
  included: boolean;
};

export type Creation = {
  id: string;
  title: string;
  vibe: Vibe;
  form: FormId;
  drops: Drop[];
  contributors: Contributor[];
  remixOf?: string;
  remixTitle?: string;
  createdAt: number;
  still?: string;
  spin?: SpinNote;
  motion?: MotionNote;
  physics?: PhysicsNote;
  material?: MaterialNote;
};

const KEY = "conjure.creations.v1";
const FLAGS = "conjure.flags.v1";
const DEVICE = "conjure.device";
const NAME = "conjure.name";
const OPT = "conjure.optIn";

export type Flags = {
  usedIngredient: boolean;
  passedSensors: boolean;
  usedGroup: boolean;
  savedRecipe: boolean;
  hintDrop: boolean;
  hintSensor: boolean;
  hintKeys: boolean;
};

export const defaultFlags = (): Flags => ({
  usedIngredient: false,
  passedSensors: false,
  usedGroup: false,
  savedRecipe: false,
  hintDrop: true,
  hintSensor: true,
  hintKeys: true,
});

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function deviceId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(DEVICE);
  if (!id || !/^d_[a-zA-Z0-9]{8,32}$/.test(id)) {
    const rnd =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : Math.random().toString(36).slice(2, 12);
    id = `d_${rnd}`;
    localStorage.setItem(DEVICE, id);
  }
  return id;
}

export function loadName(): string {
  return readJson<string>(NAME, "");
}

export function saveName(name: string): void {
  localStorage.setItem(NAME, JSON.stringify(name));
}

export function loadOptIn(): boolean {
  return readJson<boolean>(OPT, false);
}

export function saveOptIn(value: boolean): void {
  localStorage.setItem(OPT, JSON.stringify(value));
}

export function loadFlags(): Flags {
  return { ...defaultFlags(), ...readJson<Partial<Flags>>(FLAGS, {}) };
}

export function saveFlags(flags: Flags): void {
  localStorage.setItem(FLAGS, JSON.stringify(flags));
}

export function loadCreations(): Creation[] {
  const list = readJson<Creation[]>(KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveCreation(creation: Creation): void {
  const list = loadCreations().filter((item) => item.id !== creation.id);
  list.unshift(creation);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 24)));
}

export function creationById(id: string): Creation | null {
  return loadCreations().find((item) => item.id === id) ?? null;
}

export function encodeCreation(creation: Creation): string {
  const copy: Creation = { ...creation, still: undefined };
  const json = JSON.stringify(copy);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeCreation(payload: string): Creation | null {
  try {
    const pad = payload.length % 4 === 0 ? "" : "=".repeat(4 - (payload.length % 4));
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Creation;
    if (!parsed || typeof parsed.id !== "string" || !Array.isArray(parsed.drops)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const EVENTS = "conjure.events.v1";

export function trackLocal(name: "share" | "remix" | "capture" | "mint"): void {
  if (typeof window === "undefined") return;
  const cur = readJson<Record<string, number>>(EVENTS, {});
  cur[name] = (cur[name] ?? 0) + 1;
  localStorage.setItem(EVENTS, JSON.stringify(cur));
}

export type MintNote = { hash: string; uri: string; at: number };

const MINTS = "conjure.mints.v1";

export function loadMints(): MintNote[] {
  const list = readJson<MintNote[]>(MINTS, []);
  return Array.isArray(list) ? list : [];
}

export function saveMint(note: MintNote): void {
  const list = loadMints().filter((item) => item.hash !== note.hash);
  list.unshift(note);
  localStorage.setItem(MINTS, JSON.stringify(list.slice(0, 40)));
}
