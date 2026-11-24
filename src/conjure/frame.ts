/** Camera for the cauldron. Desktop stays put. A portrait phone pulls back. */

export type CameraFrame = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
};

export const DESKTOP_FRAME: CameraFrame = {
  position: [0, 2.55, 4.05],
  lookAt: [0, 0.95, 0],
  fov: 34,
};

/** Points that must stay on screen: feet, rim, ladle, and a high spark. */
export const BREW_BOUNDS: [number, number, number][] = [
  [0, 0.02, 0],
  [1.22, 0.28, 0],
  [-1.22, 0.28, 0],
  [0, 0.28, 1.18],
  [0, 0.28, -1.18],
  [1.12, 1.08, 0],
  [-1.12, 1.08, 0],
  [1.58, 1.92, 0],
  [0, 2.62, 0],
  [1.05, 2.28, 0.35],
];

export const POT_SCALE_MIN = 0.9;
export const POT_SCALE_MAX = 1.22;
/** Largest lean the phone frame must still contain, tumble plus a throw. */
export const POT_TILT_MAX = 0.75;

/** Ground spill around the pot, in rest pose before scale and tilt. */
const SPILL_POINTS: [number, number, number][] = [
  [1.95, 0.08, 0],
  [-1.95, 0.08, 0],
  [0, 0.08, 1.95],
  [0, 0.08, -1.95],
  [1.4, 0.4, 1.25],
  [-1.4, 1.2, 0],
  [1.25, 1.85, 0],
  [0, 2.75, 0],
];

function applyTiltScale(point: [number, number, number], tilt: number, scale: number): [number, number, number] {
  const [x, y, z] = point;
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  const yx = y * c - z * s;
  const zx = y * s + z * c;
  const x2 = x * c - yx * s;
  const y2 = x * s + yx * c;
  return [x2 * scale, y2 * scale, zx * scale];
}

/** Rim, ladle, and spill after the pot's largest breath and tilt. */
export function spillFramePoints(): [number, number, number][] {
  const out: [number, number, number][] = [];
  for (const point of [...BREW_BOUNDS, ...SPILL_POINTS]) {
    out.push(applyTiltScale(point, POT_TILT_MAX, POT_SCALE_MAX));
    out.push(applyTiltScale(point, -POT_TILT_MAX, POT_SCALE_MAX));
  }
  return out;
}

export function isPhonePortrait(width: number, height: number): boolean {
  return width >= 280 && width <= 430 && height > width;
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/** Aspect-responsive frame. Recomputed by the scene on resize and orientation change. */
export function frameFor(width: number, height: number): CameraFrame {
  if (!isPhonePortrait(width, height)) {
    return {
      position: [DESKTOP_FRAME.position[0], DESKTOP_FRAME.position[1], DESKTOP_FRAME.position[2]],
      lookAt: [DESKTOP_FRAME.lookAt[0], DESKTOP_FRAME.lookAt[1], DESKTOP_FRAME.lookAt[2]],
      fov: DESKTOP_FRAME.fov,
    };
  }
  const aspect = width / Math.max(height, 1);
  // 0 on a tall phone (390×844), 1 on a short one (320×568).
  const short = clamp01((aspect - 0.42) / 0.18);
  const tall = 1 - short;
  const narrow = clamp01((430 - width) / 150);
  return {
    position: [0, 2.28 + short * 0.14 + tall * 0.18, 8.85 + tall * 0.95 + short * 0.3 + narrow * 0.35],
    lookAt: [0, 0.58 - short * 0.08, 0],
    fov: 58 + tall * 6 + narrow * 2,
  };
}

function norm(v: [number, number, number]): [number, number, number] {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function cross(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function dot(a: [number, number, number], b: [number, number, number]): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** CSS pixels the live view should trust.
 * A canvas or parent wider than the window must not keep the desktop camera. */
export function viewportForFrame(
  r3fWidth: number,
  r3fHeight: number,
  clientWidth: number,
  clientHeight: number,
  innerWidth: number,
  innerHeight: number,
): { width: number; height: number } {
  const usable = (n: number) => Number.isFinite(n) && n >= 32;
  const widths = [r3fWidth, clientWidth, innerWidth].filter(usable);
  const heights = [r3fHeight, clientHeight, innerHeight].filter(usable);
  return {
    width: widths.length ? Math.min(...widths) : 1280,
    // The tallest real measurement wins. A collapsed height must not
    // flip a narrow window into the desktop camera and crop the rim.
    height: heights.length ? Math.max(...heights) : 800,
  };
}

export function frameMode(width: number, height: number): "phone" | "desktop" {
  return isPhonePortrait(width, height) ? "phone" : "desktop";
}

export type FrameDebug = {
  innerWidth: number;
  innerHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  dpr: number;
  position: [number, number, number];
  fov: number;
  mode: "phone" | "desktop";
};

export const frameDebug: FrameDebug = {
  innerWidth: 0,
  innerHeight: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  dpr: 1,
  position: [0, 2.55, 4.05],
  fov: 34,
  mode: "desktop",
};

export function publishFrameDebug(next: FrameDebug): void {
  frameDebug.innerWidth = next.innerWidth;
  frameDebug.innerHeight = next.innerHeight;
  frameDebug.canvasWidth = next.canvasWidth;
  frameDebug.canvasHeight = next.canvasHeight;
  frameDebug.dpr = next.dpr;
  frameDebug.position = next.position;
  frameDebug.fov = next.fov;
  frameDebug.mode = next.mode;
}
export function projectFrame(
  frame: CameraFrame,
  point: [number, number, number],
  aspect: number,
): { x: number; y: number } {
  const eye = frame.position;
  const zAxis = norm([eye[0] - frame.lookAt[0], eye[1] - frame.lookAt[1], eye[2] - frame.lookAt[2]]);
  const xAxis = norm(cross([0, 1, 0], zAxis));
  const yAxis = cross(zAxis, xAxis);
  const rel: [number, number, number] = [point[0] - eye[0], point[1] - eye[1], point[2] - eye[2]];
  const vx = dot(rel, xAxis);
  const vy = dot(rel, yAxis);
  const vz = dot(rel, zAxis);
  const depth = -vz || 0.0001;
  const tan = Math.tan((frame.fov * Math.PI) / 360);
  return {
    x: (vx / depth) * (1 / (aspect * tan)),
    y: (vy / depth) * (1 / tan),
  };
}
