/** Angular motion for the brew. One shared state, eased every frame. */

export type SpinNote = {
  angularVelocity: number;
  axis: [number, number, number];
  damping: number;
  spinCount: number;
  velocity: [number, number, number];
  angle: [number, number, number];
};

export const spin = {
  x: 0,
  y: 0,
  z: 0,
  vx: 0,
  vy: 0,
  vz: 0,
  damping: 1.7,
  spins: 0,
};

const MAX = 8;

function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export function resetSpin(): void {
  spin.x = 0;
  spin.y = 0;
  spin.z = 0;
  spin.vx = 0;
  spin.vy = 0;
  spin.vz = 0;
  spin.damping = 1.7;
  spin.spins = 0;
}

/** Add angular velocity in radians per second. */
export function impulse(x: number, y: number, z: number): void {
  spin.vx = clamp(spin.vx + x, -MAX, MAX);
  spin.vy = clamp(spin.vy + y, -MAX, MAX);
  spin.vz = clamp(spin.vz + z, -MAX, MAX);
}

export function stepSpin(dt: number): void {
  const d = Math.min(Math.max(dt, 0), 0.1);
  spin.x += spin.vx * d;
  spin.y += spin.vy * d;
  spin.z += spin.vz * d;
  const before = Math.hypot(spin.vx, spin.vy, spin.vz);
  const keep = Math.exp(-d * spin.damping);
  spin.vx *= keep;
  spin.vy *= keep;
  spin.vz *= keep;
  const after = Math.hypot(spin.vx, spin.vy, spin.vz);
  spin.spins += ((before + after) * 0.5 * d) / (Math.PI * 2);
  if (after < 0.02) {
    spin.vx = 0;
    spin.vy = 0;
    spin.vz = 0;
  }
}

export function spinSnapshot(): SpinNote {
  const speed = Math.hypot(spin.vx, spin.vy, spin.vz);
  const axis: [number, number, number] =
    speed < 0.0001 ? [0, 1, 0] : [spin.vx / speed, spin.vy / speed, spin.vz / speed];
  return {
    angularVelocity: round(speed),
    axis: [round(axis[0]), round(axis[1]), round(axis[2])],
    damping: round(spin.damping),
    spinCount: round(spin.spins),
    velocity: [round(spin.vx), round(spin.vy), round(spin.vz)],
    angle: [round(spin.x), round(spin.y), round(spin.z)],
  };
}

export function restoreSpin(note: SpinNote): void {
  spin.x = note.angle[0];
  spin.y = note.angle[1];
  spin.z = note.angle[2];
  spin.vx = note.velocity[0];
  spin.vy = note.velocity[1];
  spin.vz = note.velocity[2];
  spin.damping = note.damping || 1.7;
  spin.spins = note.spinCount;
}

let captured: SpinNote | null = null;

export function rememberMotion(note: SpinNote): void {
  captured = note;
}

export function rememberedMotion(): SpinNote | null {
  return captured;
}

export type SpinFrame = { t: number; x: number; y: number; z: number; speed: number };

/** Pose samples of a captured spin as it eases out. Used by the GLB clip. */
export function spinFrames(note: SpinNote, seconds = 6, steps = 24): SpinFrame[] {
  const frames: SpinFrame[] = [];
  let x = note.angle[0];
  let y = note.angle[1];
  let z = note.angle[2];
  let vx = note.velocity[0];
  let vy = note.velocity[1];
  let vz = note.velocity[2];
  const damp = note.damping || 1.7;
  const dt = seconds / steps;
  for (let i = 0; i <= steps; i += 1) {
    frames.push({ t: i * dt, x, y, z, speed: Math.hypot(vx, vy, vz) });
    x += vx * dt;
    y += vy * dt;
    z += vz * dt;
    const keep = Math.exp(-dt * damp);
    vx *= keep;
    vy *= keep;
    vz *= keep;
  }
  return frames;
}

export function brewMetadata(input: {
  title: string;
  animationUrl: string;
  image?: string;
  spin: SpinNote | null;
  vibe: string;
  chainId: number;
  royaltyBps: number;
}): Record<string, unknown> {
  const note = input.spin;
  const axis = note?.axis ?? [0, 1, 0];
  return {
    name: input.title,
    description: "A Conjure brew.",
    image: input.image ?? "",
    animation_url: input.animationUrl,
    attributes: [
      { trait_type: "Angular velocity", value: note?.angularVelocity ?? 0 },
      { trait_type: "Axis", value: axis.map((n) => n.toFixed(3)).join(", ") },
      { trait_type: "Damping", value: note?.damping ?? 0 },
      { trait_type: "Spin count", value: note?.spinCount ?? 0 },
    ],
    vibe: input.vibe,
    chainId: input.chainId,
    royaltyBps: input.royaltyBps,
  };
}
