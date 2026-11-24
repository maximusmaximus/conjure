import { emptySensor, type SensorMix } from "./brew";

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
