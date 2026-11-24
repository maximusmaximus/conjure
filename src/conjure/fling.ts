type Sample = { x: number; y: number; t: number };

const pointers = new Map<number, Sample>();

/** Latest fling velocity in pixels per millisecond. Decays after release. */
export const flingVel = { x: 0, y: 0 };

export function sceneMoving(opts: { started: boolean; reduced: boolean; frozen: boolean }): boolean {
  return opts.started && !opts.reduced && !opts.frozen;
}

export function pointerDown(id: number, x: number, y: number, now = 0): void {
  pointers.set(id, { x, y, t: now || (typeof performance !== "undefined" ? performance.now() : 0) });
}

export function pointerMove(
  id: number,
  x: number,
  y: number,
  now = 0,
): { dx: number; dy: number } | null {
  const prev = pointers.get(id);
  if (!prev) return null;
  const t = now || (typeof performance !== "undefined" ? performance.now() : prev.t + 16);
  const dx = x - prev.x;
  const dy = y - prev.y;
  const dt = Math.max(8, t - prev.t);
  pointers.set(id, { x, y, t });
  flingVel.x = dx / dt;
  flingVel.y = dy / dt;
  return { dx, dy };
}

export function pointerUp(id: number): number {
  pointers.delete(id);
  const speed = Math.hypot(flingVel.x, flingVel.y);
  if (pointers.size > 0) return speed;
  if (speed < 0.12) {
    flingVel.x = 0;
    flingVel.y = 0;
    return 0;
  }
  return speed;
}

export function decayFling(dt: number): void {
  const keep = Math.exp(-dt * 2.6);
  flingVel.x *= keep;
  flingVel.y *= keep;
  if (Math.hypot(flingVel.x, flingVel.y) < 0.008) {
    flingVel.x = 0;
    flingVel.y = 0;
  }
}

export function isFling(speedPxPerMs: number): boolean {
  return speedPxPerMs >= 0.45;
}

export function haptic(pattern: number | number[]): void {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(pattern);
    }
  } catch {
    /* this browser does not vibrate */
  }
}

export function resetFling(): void {
  pointers.clear();
  flingVel.x = 0;
  flingVel.y = 0;
}
