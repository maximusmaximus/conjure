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
    position: [0, 1.92 + short * 0.38 + tall * 0.12, 6.35 + tall * 1.15 + short * 0.45 + narrow * 0.28],
    lookAt: [0, 0.38 - short * 0.1, 0],
    fov: 52 + tall * 12 + narrow * 2,
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

/** Normalized device coordinates. y = 1 is the top of the view. */
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
