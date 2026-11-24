/** Tuned rigid bodies for charms and sparks. No WASM. Deterministic from a seed. */

export const GRAVITY = 9.8;
/** Outgoing speed over incoming speed. High enough that a hit reads. */
export const RESTITUTION = 0.72;
/** Slowest upward speed that still looks like a bounce. */
export const BOUNCE_KICK = 1.35;
/** Height clamp for the liquid grid. The surface stays inside the bowl. */
export const SLOSH_AMP = 0.92;

/** World-down gravity, expressed in the brew's local axes (Euler XYZ). */
export function localGravity(rx: number, ry: number, rz: number, g = GRAVITY): [number, number, number] {
  const c1 = Math.cos(rx / 2);
  const s1 = Math.sin(rx / 2);
  const c2 = Math.cos(ry / 2);
  const s2 = Math.sin(ry / 2);
  const c3 = Math.cos(rz / 2);
  const s3 = Math.sin(rz / 2);
  const ix = -(s1 * c2 * c3 + c1 * s2 * s3);
  const iy = -(c1 * s2 * c3 - s1 * c2 * s3);
  const iz = -(c1 * c2 * s3 + s1 * s2 * c3);
  const iw = c1 * c2 * c3 - s1 * s2 * s3;
  const vy = -g;
  const tx = -2 * iz * vy;
  const tz = 2 * ix * vy;
  return [
    iw * tx + iy * tz,
    vy + iz * tx - ix * tz,
    iw * tz - iy * tx,
  ];
}
const FLOOR = 0.74;
const RIM = 1.18;

export type BodyKind = "charm" | "spark";

export type PhysBody = {
  id: string;
  kind: BodyKind;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  age: number;
  life: number;
  held: boolean;
  /** 1 on a hit, fading to 0. Drives squash and the flash. */
  impact: number;
  color: string;
  hue: number;
};

export type PhysicsNote = {
  seed: number;
  gravity: number;
  bodies: {
    id: string;
    kind: BodyKind;
    position: [number, number, number];
    velocity: [number, number, number];
  }[];
};

export type Slosh = { n: number; h: Float32Array; v: Float32Array };

type Ray = { origin: [number, number, number]; dir: [number, number, number] };

const bodies: PhysBody[] = [];
let seed = 1;
let rngState = 1;
let maxCharms = 8;
let maxSparks = 16;
let slosh: Slosh = createSlosh(16);
let heldId: string | null = null;
let rayView: ((x: number, y: number) => Ray | null) | null = null;
let seenBurst = -1;
let lastTick = 0;

function tickImpact(): void {
  const now = typeof performance !== "undefined" ? performance.now() : 0;
  if (now - lastTick < 80) return;
  lastTick = now;
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(12);
  } catch {
    /* this browser does not vibrate */
  }
}

function mulberry(): number {
  rngState = (rngState + 0x6d2b79f5) >>> 0;
  let t = rngState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function wallRadius(y: number): number {
  const t = Math.max(0, Math.min(1, (y - 0.28) / 0.95));
  return 0.22 + Math.sin(t * Math.PI) * 0.62;
}

export function createSlosh(n: number): Slosh {
  return { n, h: new Float32Array(n * n), v: new Float32Array(n * n) };
}

export function resetPhysics(nextSeed = 1): void {
  bodies.length = 0;
  seed = nextSeed >>> 0 || 1;
  rngState = seed;
  heldId = null;
  seenBurst = -1;
  slosh = createSlosh(slosh.n);
}

export function configurePhysics(opts: { charms: number; sparks: number; slosh: number }): void {
  maxCharms = opts.charms;
  maxSparks = opts.sparks;
  if (slosh.n !== opts.slosh) slosh = createSlosh(opts.slosh);
  trim();
}

export function sloshGrid(): Slosh {
  return slosh;
}

export function liveBodies(): readonly PhysBody[] {
  return bodies;
}

export function setRayView(fn: ((x: number, y: number) => Ray | null) | null): void {
  rayView = fn;
}

function trim(): void {
  let charms = 0;
  let sparks = 0;
  for (let i = bodies.length - 1; i >= 0; i -= 1) {
    const body = bodies[i];
    if (body.kind === "charm") {
      charms += 1;
      if (charms > maxCharms) bodies.splice(i, 1);
    } else {
      sparks += 1;
      if (sparks > maxSparks) bodies.splice(i, 1);
    }
  }
}

export function pushBody(body: PhysBody): void {
  bodies.push(body);
}

export function syncCharms(drops: { id: string; color: string; hue: number }[]): void {
  const live = drops.slice(-maxCharms);
  const ids = new Set(live.map((drop) => drop.id));
  for (let i = bodies.length - 1; i >= 0; i -= 1) {
    if (bodies[i].kind === "charm" && !ids.has(bodies[i].id)) bodies.splice(i, 1);
  }
  for (const drop of live) {
    if (bodies.some((body) => body.id === drop.id)) continue;
    bodies.push({
      id: drop.id,
      kind: "charm",
      x: (mulberry() - 0.5) * 0.28,
      y: 2.35,
      z: (mulberry() - 0.5) * 0.28,
      vx: (mulberry() - 0.5) * 0.9,
      vy: 0.35,
      vz: (mulberry() - 0.5) * 0.9,
      r: 0.1 + mulberry() * 0.05,
      age: 0,
      life: 1e6,
      held: false,
      impact: 0,
      color: drop.color,
      hue: drop.hue,
    });
  }
  trim();
}

export function noteBurst(at: number, color: string, count: number): void {
  if (at === seenBurst) return;
  seenBurst = at;
  const room = maxSparks - bodies.filter((body) => body.kind === "spark").length;
  const n = Math.max(0, Math.min(count, room, maxSparks));
  for (let i = 0; i < n; i += 1) {
    const angle = mulberry() * Math.PI * 2;
    const speed = 1.3 + mulberry() * 2.2;
    bodies.push({
      id: `spark-${seed}-${at}-${i}`,
      kind: "spark",
      x: Math.cos(angle) * 0.12,
      y: 1.28 + mulberry() * 0.18,
      z: Math.sin(angle) * 0.12,
      vx: Math.cos(angle) * speed,
      vy: 1.8 + mulberry() * 2.1,
      vz: Math.sin(angle) * speed,
      r: 0.045,
      age: 0,
      life: 1.5 + mulberry() * 0.7,
      held: false,
      impact: 0,
      color,
      hue: 40,
    });
  }
}

export function stepBodies(dt: number, gravity: [number, number, number]): void {
  const d = Math.min(0.033, Math.max(0, dt));
  if (d === 0) return;
  for (const body of bodies) {
    if (body.held) {
      body.vx = 0;
      body.vy = 0;
      body.vz = 0;
      continue;
    }
    body.vx += gravity[0] * d;
    body.vy += gravity[1] * d;
    body.vz += gravity[2] * d;
    body.x += body.vx * d;
    body.y += body.vy * d;
    body.z += body.vz * d;
    body.age += d;
    body.impact = Math.max(0, (body.impact || 0) - d * 3.4);
    const floor = FLOOR + body.r;
    if (body.y < floor) {
      body.y = floor;
      if (body.vy < -0.55) {
        body.vy = Math.max(-body.vy * RESTITUTION, BOUNCE_KICK);
        body.impact = 1;
        tickImpact();
      } else if (body.vy < 0) {
        body.vy = 0;
      }
      body.vx *= 0.8;
      body.vz *= 0.8;
    }
    const horiz = Math.hypot(body.x, body.z);
    const limit = Math.max(0.05, wallRadius(body.y) - body.r);
    if (body.y < RIM && horiz > limit) {
      const nx = body.x / (horiz || 1);
      const nz = body.z / (horiz || 1);
      body.x = nx * limit;
      body.z = nz * limit;
      const vn = body.vx * nx + body.vz * nz;
      if (vn > 0.35) {
        body.vx -= (1 + RESTITUTION) * vn * nx;
        body.vz -= (1 + RESTITUTION) * vn * nz;
        const kick = Math.hypot(body.vx, body.vz);
        if (kick < 0.9) {
          body.vx = -nx * 0.9;
          body.vz = -nz * 0.9;
        }
        body.impact = 1;
        tickImpact();
        pokeSlosh(body.x / 1.5 + 0.5, body.z / 1.5 + 0.5, Math.min(1.4, vn * 0.55));
      } else if (vn > 0) {
        body.vx -= (1 + RESTITUTION) * vn * nx;
        body.vz -= (1 + RESTITUTION) * vn * nz;
      }
    }
  }
  for (let i = 0; i < bodies.length; i += 1) {
    for (let j = i + 1; j < bodies.length; j += 1) {
      const a = bodies[i];
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      const dist = Math.hypot(dx, dy, dz) || 0.0001;
      const min = a.r + b.r;
      if (dist >= min) continue;
      const nx = dx / dist;
      const ny = dy / dist;
      const nz = dz / dist;
      const overlap = min - dist;
      if (!a.held) {
        a.x -= nx * overlap * 0.5;
        a.y -= ny * overlap * 0.5;
        a.z -= nz * overlap * 0.5;
      }
      if (!b.held) {
        b.x += nx * overlap * 0.5;
        b.y += ny * overlap * 0.5;
        b.z += nz * overlap * 0.5;
      }
      const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny + (b.vz - a.vz) * nz;
      if (rel >= 0) continue;
      const impulse = -((1 + RESTITUTION) * rel) * 0.5;
      if (!a.held) {
        a.vx -= impulse * nx;
        a.vy -= impulse * ny;
        a.vz -= impulse * nz;
      }
      if (!b.held) {
        b.vx += impulse * nx;
        b.vy += impulse * ny;
        b.vz += impulse * nz;
      }
      if (rel < -0.45) {
        a.impact = 1;
        b.impact = 1;
        tickImpact();
        pokeSlosh((a.x + b.x) * 0.5 / 1.5 + 0.5, (a.z + b.z) * 0.5 / 1.5 + 0.5, Math.min(1.2, -rel * 0.4));
      }
    }
  }
  for (let i = bodies.length - 1; i >= 0; i -= 1) {
    const body = bodies[i];
    if (body.kind === "spark" && body.age > body.life) bodies.splice(i, 1);
    else if (body.y < -3 || Math.hypot(body.x, body.z) > 5) bodies.splice(i, 1);
  }
}

export function stepSlosh(dt: number, tiltX: number, tiltZ: number, shake: number): void {
  const n = slosh.n;
  const d = Math.min(0.033, Math.max(0, dt));
  const spring = 16;
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      const i = y * n + x;
      let sum = 0;
      let count = 0;
      if (x > 0) {
        sum += slosh.h[i - 1];
        count += 1;
      }
      if (x < n - 1) {
        sum += slosh.h[i + 1];
        count += 1;
      }
      if (y > 0) {
        sum += slosh.h[i - n];
        count += 1;
      }
      if (y < n - 1) {
        sum += slosh.h[i + n];
        count += 1;
      }
      const avg = count ? sum / count : 0;
      const tilt = (x / (n - 1) - 0.5) * tiltZ * 1.15 + (y / (n - 1) - 0.5) * tiltX * 1.15;
      const noise = shake > 0.2 ? (mulberry() - 0.5) * shake * 0.28 : 0;
      slosh.v[i] += (avg - slosh.h[i] + tilt + noise) * spring * d;
      slosh.v[i] *= Math.exp(-1.7 * d);
    }
  }
  const tiltMag = Math.hypot(tiltX, tiltZ);
  if (tiltMag > 0.06) {
    pokeSlosh(
      0.5 + Math.max(-0.34, Math.min(0.34, tiltZ * 0.5)),
      0.5 + Math.max(-0.34, Math.min(0.34, tiltX * 0.5)),
      tiltMag * 0.34,
    );
  }
  if (shake > 0.12) pokeSlosh(0.5, 0.5, shake * 0.48);
  for (let i = 0; i < slosh.h.length; i += 1) {
    slosh.h[i] = Math.max(-SLOSH_AMP, Math.min(SLOSH_AMP, slosh.h[i] + slosh.v[i] * d));
  }
}

export function pokeSlosh(u: number, v: number, amount: number): void {
  const n = slosh.n;
  const cx = u * (n - 1);
  const cy = v * (n - 1);
  const radius = Math.max(2.4, n * 0.22);
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > radius) continue;
      const fall = Math.cos((dist / radius) * Math.PI * 0.5);
      slosh.v[y * n + x] += amount * fall;
    }
  }
}

function splashBodies(): void {
  for (const body of bodies) {
    if (body.held) continue;
    const floor = FLOOR + body.r;
    if (body.y <= floor + 0.04 && body.vy > 0.8 && body.impact > 0.6) {
      pokeSlosh(body.x / 1.5 + 0.5, body.z / 1.5 + 0.5, Math.min(1.6, body.vy * 0.7));
    }
  }
}

export function stepBrewPhysics(
  dt: number,
  env: { gravity: [number, number, number]; tiltX: number; tiltZ: number; shake: number },
): void {
  stepBodies(dt, env.gravity);
  stepSlosh(dt, env.tiltX, env.tiltZ, env.shake);
  splashBodies();
}

export function knockAll(ix: number, iy: number, iz: number): void {
  for (const body of bodies) {
    if (body.held) continue;
    const spread = 0.45 + mulberry() * 0.4;
    body.vx += ix * spread;
    body.vy += iy;
    body.vz += iz * spread;
  }
  pokeSlosh(0.5, 0.5, Math.min(1.2, Math.hypot(ix, iy, iz) * 0.15));
}

function rayHit(ray: Ray): PhysBody | null {
  let best: PhysBody | null = null;
  let bestT = 1e9;
  const [ox, oy, oz] = ray.origin;
  const [dx, dy, dz] = ray.dir;
  for (const body of bodies) {
    const lx = ox - body.x;
    const ly = oy - body.y;
    const lz = oz - body.z;
    const b = lx * dx + ly * dy + lz * dz;
    const rad = body.r + 0.08;
    const c = lx * lx + ly * ly + lz * lz - rad * rad;
    const disc = b * b - c;
    if (disc < 0) continue;
    const t = -b - Math.sqrt(disc);
    if (t < bestT && t > -0.15) {
      bestT = t;
      best = body;
    }
  }
  return best;
}

export function holdingPhysics(): boolean {
  return heldId != null;
}

export function grabPhysics(clientX: number, clientY: number): boolean {
  const ray = rayView?.(clientX, clientY);
  if (!ray) return false;
  const hit = rayHit(ray);
  if (!hit) return false;
  if (heldId && heldId !== hit.id) {
    const prev = bodies.find((body) => body.id === heldId);
    if (prev) prev.held = false;
  }
  heldId = hit.id;
  hit.held = true;
  hit.vx = 0;
  hit.vy = 0;
  hit.vz = 0;
  return true;
}

export function dragPhysics(clientX: number, clientY: number): void {
  const held = bodies.find((body) => body.id === heldId);
  const ray = rayView?.(clientX, clientY);
  if (!held || !ray) return;
  const [ox, oy, oz] = ray.origin;
  const [dx, dy, dz] = ray.dir;
  if (Math.abs(dy) < 1e-4) return;
  const t = (held.y - oy) / dy;
  if (t < 0 || t > 12) return;
  held.x = ox + dx * t;
  held.z = oz + dz * t;
  const limit = wallRadius(held.y) + 0.35;
  const horiz = Math.hypot(held.x, held.z);
  if (horiz > limit) {
    held.x = (held.x / horiz) * limit;
    held.z = (held.z / horiz) * limit;
  }
}

export function releasePhysics(vx: number, vy: number, vz: number): boolean {
  const held = bodies.find((body) => body.id === heldId);
  if (!held) return false;
  held.held = false;
  held.vx = vx;
  held.vy = vy;
  held.vz = vz;
  heldId = null;
  pokeSlosh(held.x / 1.5 + 0.5, held.z / 1.5 + 0.5, 0.45);
  return true;
}

export function physicsSnapshot(): PhysicsNote {
  return {
    seed,
    gravity: GRAVITY,
    bodies: bodies.slice(0, 16).map((body) => ({
      id: body.id,
      kind: body.kind,
      position: [round(body.x), round(body.y), round(body.z)],
      velocity: [round(body.vx), round(body.vy), round(body.vz)],
    })),
  };
}
