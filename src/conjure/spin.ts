/** Angular motion for the brew. One shared state, eased every frame. */

import type { MaterialNote } from "./fx";
import type { PhysicsNote } from "./physics";
import { POT_SCALE_MAX, POT_SCALE_MIN } from "./frame.ts";

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
/** Pulls the pot and ladle back to an upright rest. */
const SPRING = 1.15;

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

type SpinPose = { x: number; y: number; z: number; vx: number; vy: number; vz: number };

/** One eased step. A spring returns the pose to rest so a knock cannot stick. */
export function integrateSpin(pose: SpinPose, damp: number, dt: number): { before: number; after: number } {
  const d = Math.min(Math.max(dt, 0), 0.1);
  pose.vx += -pose.x * SPRING * d;
  pose.vy += -pose.y * SPRING * d;
  pose.vz += -pose.z * SPRING * d;
  pose.vx = clamp(pose.vx, -MAX, MAX);
  pose.vy = clamp(pose.vy, -MAX, MAX);
  pose.vz = clamp(pose.vz, -MAX, MAX);
  pose.x += pose.vx * d;
  pose.y += pose.vy * d;
  pose.z += pose.vz * d;
  pose.x = clamp(pose.x, -Math.PI * 2, Math.PI * 2);
  pose.y = clamp(pose.y, -Math.PI * 2, Math.PI * 2);
  pose.z = clamp(pose.z, -Math.PI * 2, Math.PI * 2);
  const before = Math.hypot(pose.vx, pose.vy, pose.vz);
  const keep = Math.exp(-d * damp);
  pose.vx *= keep;
  pose.vy *= keep;
  pose.vz *= keep;
  const after = Math.hypot(pose.vx, pose.vy, pose.vz);
  const settled = Math.hypot(pose.x, pose.y, pose.z) < 0.03 && after < 0.05;
  if (settled) {
    pose.x = 0;
    pose.y = 0;
    pose.z = 0;
    pose.vx = 0;
    pose.vy = 0;
    pose.vz = 0;
  }
  return { before, after: settled ? 0 : after };
}

export function stepSpin(dt: number): void {
  const moved = integrateSpin(spin, spin.damping, dt);
  spin.spins += ((moved.before + moved.after) * 0.5 * Math.min(Math.max(dt, 0), 0.1)) / (Math.PI * 2);
}

export const SCALE_MIN = POT_SCALE_MIN;
export const SCALE_MAX = POT_SCALE_MAX;

/** Idle tumble. User spin damps back onto this, it does not replace it. */
export const tumble = {
  x: 0,
  y: 0,
  z: 0,
  scale: 1,
  energy: 0,
  time: 0,
};

export function resetTumble(): void {
  tumble.x = 0;
  tumble.y = 0;
  tumble.z = 0;
  tumble.scale = 1;
  tumble.energy = 0;
  tumble.time = 0;
}

/** Continuous multi-axis turn and a breathing scale. Energy speeds both up. */
export function stepTumble(dt: number, energy: number, opts?: { reduced?: boolean; frozen?: boolean }): void {
  const d = Math.min(0.05, Math.max(0, dt));
  if (opts?.frozen || d === 0) return;
  const reduced = Boolean(opts?.reduced);
  const target = Math.max(0, Math.min(1, energy));
  tumble.energy += (target - tumble.energy) * Math.min(1, d * 4);
  const drive = reduced ? 0.28 : 0.62 + tumble.energy * 0.85;
  tumble.time += d * (reduced ? 0.35 : 0.62 + tumble.energy * 1.35);
  const t = tumble.time;
  tumble.x = Math.sin(t * 0.41) * 0.42 * drive;
  tumble.z = Math.sin(t * 0.27 + 0.8) * 0.42 * drive;
  tumble.y += d * (reduced ? 0.22 : 0.48 + tumble.energy * 1.25);
  if (tumble.y > Math.PI * 2) tumble.y -= Math.PI * 2;
  const breath = Math.sin(t * (1.15 + tumble.energy * 2.1));
  const span = (SCALE_MAX - SCALE_MIN) * 0.5;
  const mid = (SCALE_MAX + SCALE_MIN) * 0.5;
  const amp = reduced ? 0.4 : 0.62 + tumble.energy * 0.38;
  tumble.scale = mid + breath * span * amp;
  if (tumble.scale < SCALE_MIN) tumble.scale = SCALE_MIN;
  if (tumble.scale > SCALE_MAX) tumble.scale = SCALE_MAX;
}

export function poseNow(leanX: number, leanZ: number, frozen: boolean): { x: number; y: number; z: number; scale: number } {
  if (frozen) return { x: 0, y: tumble.y, z: 0, scale: tumble.scale };
  return {
    x: tumble.x + spin.x + leanX,
    y: tumble.y + spin.y,
    z: tumble.z + spin.z + leanZ,
    scale: tumble.scale,
  };
}

export type MotionNote = {
  rotation: [number, number, number];
  scale: number;
  scaleMin: number;
  scaleMax: number;
  energy: number;
  spillLip: number;
  spillMouth: number;
  spillGround: number;
  bodyCap: number;
};

export function motionSnapshot(spill: {
  lip: number;
  mouth: number;
  ground: number;
  bodyCap: number;
}): MotionNote {
  return {
    rotation: [round(tumble.x + spin.x), round(tumble.y + spin.y), round(tumble.z + spin.z)],
    scale: round(tumble.scale),
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    energy: round(tumble.energy),
    spillLip: spill.lip,
    spillMouth: spill.mouth,
    spillGround: spill.ground,
    bodyCap: spill.bodyCap,
  };
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
  const pose = {
    x: note.angle[0],
    y: note.angle[1],
    z: note.angle[2],
    vx: note.velocity[0],
    vy: note.velocity[1],
    vz: note.velocity[2],
  };
  const damp = note.damping || 1.7;
  const dt = seconds / steps;
  for (let i = 0; i <= steps; i += 1) {
    frames.push({ t: i * dt, x: pose.x, y: pose.y, z: pose.z, speed: Math.hypot(pose.vx, pose.vy, pose.vz) });
    integrateSpin(pose, damp, dt);
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
  physics?: PhysicsNote | null;
  material?: MaterialNote | null;
  motion?: MotionNote | null;
}): Record<string, unknown> {
  const note = input.spin;
  const axis = note?.axis ?? [0, 1, 0];
  const physics = input.physics ?? { seed: 0, gravity: 9.8, bodies: [] };
  const material = input.material ?? {
    transmission: 0,
    ior: 1.4,
    thickness: 0,
    iridescence: 0,
    clearcoat: 0,
    sheen: 0,
    emissiveIntensity: 0,
    bloom: 0,
    toneMapping: "ACES" as const,
    tier: "mid",
    dof: false,
    shadows: false,
  };
  const motion = input.motion ?? {
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    energy: 0,
    spillLip: 1.05,
    spillMouth: 0.98,
    spillGround: 0.05,
    bodyCap: 0,
  };
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
      { trait_type: "Gravity", value: physics.gravity },
      { trait_type: "Physics seed", value: physics.seed },
      { trait_type: "Bodies", value: physics.bodies.length },
      { trait_type: "Transmission", value: material.transmission },
      { trait_type: "IOR", value: material.ior },
      { trait_type: "Thickness", value: material.thickness },
      { trait_type: "Iridescence", value: material.iridescence },
      { trait_type: "Emissive intensity", value: material.emissiveIntensity },
      { trait_type: "Bloom", value: material.bloom },
      { trait_type: "Tone mapping", value: material.toneMapping },
      { trait_type: "Tier", value: material.tier },
      { trait_type: "Rotation", value: motion.rotation.map((n) => n.toFixed(3)).join(", ") },
      { trait_type: "Scale", value: motion.scale },
      { trait_type: "Scale range", value: `${motion.scaleMin}–${motion.scaleMax}` },
      { trait_type: "Spill lip", value: motion.spillLip },
      { trait_type: "Body cap", value: motion.bodyCap },
    ],
    properties: {
      physics,
      material,
      motion,
    },
    vibe: input.vibe,
    chainId: input.chainId,
    royaltyBps: input.royaltyBps,
  };
}
