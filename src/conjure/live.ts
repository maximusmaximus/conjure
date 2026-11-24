import {
  blendSensors,
  computeBrew,
  emptySensor,
  hslToHex,
  ingredientById,
  type Drop,
  type SensorMix,
  type Vibe,
} from "./brew";

/** Frame-rate sensor values. Mutated in place so the canvas does not re-render. */
export const liveSensor: SensorMix = emptySensor();

export const remoteSensor: SensorMix = emptySensor();

let grabStill: (() => string | null) | null = null;
let exportGlb: (() => Promise<Blob | null>) | null = null;
let enterAR: (() => Promise<void>) | null = null;
let webgl = true;

export function setEnterAR(fn: (() => Promise<void>) | null): void {
  enterAR = fn;
}

export function startAR(): Promise<void> {
  if (!enterAR) return Promise.reject(new Error("AR is not on this stage."));
  return enterAR();
}

export function setGrabStill(fn: (() => string | null) | null): void {
  grabStill = fn;
}

export function takeStill(): string | null {
  return grabStill ? grabStill() : null;
}

export function setExportGlb(fn: (() => Promise<Blob | null>) | null): void {
  exportGlb = fn;
}

export function downloadGlb(): Promise<Blob | null> {
  return exportGlb ? exportGlb() : Promise.resolve(null);
}

export function setWebglOk(ok: boolean): void {
  webgl = ok;
}

export function webglOk(): boolean {
  return webgl;
}

/** Master tools. Mutated in place, same as the sensors. */
export const masterMix = {
  stir: 0.35,
  hue: 0,
  swirl: 0.45,
  bloom: 0.55,
  freeze: false,
};

/** Which tools the brewer has actually moved. Defaults stay quiet until then. */
export const toolTouch = {
  stir: false,
  hue: false,
  swirl: false,
  bloom: false,
  freeze: false,
};

export const punch = { hex: "", hue: 0, until: 0 };

/** Screen-space ring. Mutated in place so a frame can show it without a re-render. */
export const pulse = { hex: "#e27a3a", until: 0, ms: 900 };

export function flashPulse(hex: string, ms = 900): void {
  pulse.hex = hex;
  pulse.ms = ms;
  pulse.until = Date.now() + ms;
}

export function punchColor(hex: string, hue: number, ms = 1500): void {
  punch.hex = hex;
  punch.hue = hue;
  punch.until = Date.now() + ms;
  flashPulse(hex, Math.min(ms, 1000));
}

export function punchStrength(): number {
  const left = punch.until - Date.now();
  if (left <= 0 || !punch.hex) return 0;
  return Math.min(1, left / 900);
}

export type Spark = { color: string; at: number; angle: number };

export const sparks: Spark[] = [];

export function burstSparks(color: string, count = 8): void {
  const at = Date.now();
  for (let i = 0; i < count; i += 1) {
    sparks.push({ color, at, angle: (i / count) * Math.PI * 2 + Math.random() * 0.2 });
  }
  if (sparks.length > 32) sparks.splice(0, sparks.length - 32);
}

/** Hue and hex the stage should show right now, including the last drop and any punch. */
export function shownColor(drops: Drop[], vibe: Vibe): { hue: number; hex: string } {
  const hueShift = toolTouch.hue ? masterMix.hue : 0;
  if (punch.until > Date.now() && punch.hex) {
    return { hue: (punch.hue + 360) % 360, hex: punch.hex };
  }
  const last = [...drops].reverse().find((drop) => !drop.neutral);
  if (last) {
    const hue = (ingredientById(last.ingredient).hue + hueShift + 360) % 360;
    return { hue, hex: hslToHex(hue, 0.8, 0.52) };
  }
  const brew = computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
  const hue = (brew.hue + hueShift + 360) % 360;
  return { hue, hex: hslToHex(hue, Math.max(brew.saturation, 0.55), Math.max(brew.lightness, 0.42)) };
}
