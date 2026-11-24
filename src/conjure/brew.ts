export type IngredientId =
  | "ember"
  | "moss"
  | "moon"
  | "salt"
  | "honey"
  | "frost"
  | "ink"
  | "spark";

export type Vibe = "calm" | "chaotic" | "spooky";

export type FormId = "orb" | "spire" | "bloom" | "ribbon";

export type Drop = {
  id: string;
  ingredient: IngredientId;
  by: string;
  at: number;
  neutral?: boolean;
};

export type SensorMix = {
  loudness: number;
  pitch: number;
  burst: number;
  tiltX: number;
  tiltY: number;
  shake: number;
  /** 0–360, or null when no color has been sampled. */
  sampleHue: number | null;
  /** 0–1 wave energy from the camera, picture stays on device. */
  wave: number;
};

export type Brew = {
  hue: number;
  saturation: number;
  lightness: number;
  energy: number;
  spikes: number;
  scale: number;
  swirl: number;
  glow: number;
  color: string;
};

export type Ingredient = {
  id: IngredientId;
  emoji: string;
  label: string;
  hue: number;
  energy: number;
  spikes: number;
};

export const INGREDIENTS: Ingredient[] = [
  { id: "ember", emoji: "🔥", label: "Ember", hue: 16, energy: 0.85, spikes: 0.45 },
  { id: "moss", emoji: "🌿", label: "Moss", hue: 132, energy: 0.4, spikes: 0.15 },
  { id: "moon", emoji: "🌙", label: "Moon", hue: 252, energy: 0.35, spikes: 0.2 },
  { id: "salt", emoji: "🧂", label: "Salt", hue: 40, energy: 0.25, spikes: 0.55 },
  { id: "honey", emoji: "🍯", label: "Honey", hue: 42, energy: 0.55, spikes: 0.12 },
  { id: "frost", emoji: "❄️", label: "Frost", hue: 196, energy: 0.45, spikes: 0.7 },
  { id: "ink", emoji: "🖤", label: "Ink", hue: 275, energy: 0.5, spikes: 0.3 },
  { id: "spark", emoji: "⚡", label: "Spark", hue: 52, energy: 0.95, spikes: 0.85 },
];

export const VIBES: Vibe[] = ["calm", "chaotic", "spooky"];

export const FORMS: { id: FormId; label: string }[] = [
  { id: "orb", label: "Orb" },
  { id: "spire", label: "Spire" },
  { id: "bloom", label: "Bloom" },
  { id: "ribbon", label: "Ribbon" },
];

const VIBE_BIAS: Record<Vibe, { hue: number; sat: number; light: number; energy: number; shake: number }> = {
  calm: { hue: 152, sat: 0.42, light: 0.46, energy: 0.72, shake: 0.35 },
  chaotic: { hue: 18, sat: 0.82, light: 0.52, energy: 1.35, shake: 1 },
  spooky: { hue: 278, sat: 0.38, light: 0.3, energy: 0.9, shake: 0.7 },
};

export function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

export function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 1);
  const lig = clamp(l, 0, 1);
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const c = lig - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * clamp(c, 0, 1))
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function mixHue(weights: { hue: number; w: number }[]): number {
  let x = 0;
  let y = 0;
  for (const { hue, w } of weights) {
    if (w <= 0) continue;
    const r = (hue * Math.PI) / 180;
    x += Math.cos(r) * w;
    y += Math.sin(r) * w;
  }
  if (x === 0 && y === 0) return 28;
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

export function ingredientById(id: IngredientId): Ingredient {
  const found = INGREDIENTS.find((item) => item.id === id);
  if (!found) throw new Error(`unknown ingredient ${id}`);
  return found;
}

export function emptySensor(): SensorMix {
  return {
    loudness: 0,
    pitch: 0.5,
    burst: 0,
    tiltX: 0,
    tiltY: 0,
    shake: 0,
    sampleHue: null,
    wave: 0,
  };
}

export function blendSensors(list: SensorMix[]): SensorMix {
  if (!list.length) return emptySensor();
  const n = list.length;
  const hues = list
    .filter((s) => s.sampleHue != null)
    .map((s) => ({ hue: s.sampleHue as number, w: 1 }));
  return {
    loudness: clamp(
      list.reduce((sum, item) => sum + item.loudness, 0) / n,
      0,
      1,
    ),
    pitch: clamp(
      list.reduce((sum, item) => sum + item.pitch, 0) / n,
      0,
      1,
    ),
    burst: clamp(Math.max(...list.map((s) => s.burst)), 0, 1),
    tiltX: clamp(
      list.reduce((sum, item) => sum + item.tiltX, 0) / n,
      -1,
      1,
    ),
    tiltY: clamp(
      list.reduce((sum, item) => sum + item.tiltY, 0) / n,
      -1,
      1,
    ),
    shake: clamp(Math.max(...list.map((s) => s.shake)), 0, 1),
    sampleHue: hues.length ? mixHue(hues) : null,
    wave: clamp(Math.max(...list.map((s) => s.wave)), 0, 1),
  };
}

export function computeBrew(drops: Drop[], sensor: SensorMix, vibe: Vibe): Brew {
  const bias = VIBE_BIAS[vibe];
  const weights = drops.map((drop) => {
    const ing = ingredientById(drop.ingredient);
    const energy = drop.neutral ? 0.12 : ing.energy;
    return {
      hue: drop.neutral ? 32 : ing.hue,
      w: energy,
      spikes: drop.neutral ? 0.05 : ing.spikes,
      energy,
    };
  });
  if (sensor.sampleHue != null) {
    weights.push({ hue: sensor.sampleHue, w: 1.35, spikes: 0.2, energy: 0.35 });
  }
  const baseHue = weights.length ? mixHue(weights) : bias.hue;
  const pitchShift = (sensor.pitch - 0.5) * (vibe === "spooky" ? -48 : 72);
  const wild = vibe === "chaotic" ? sensor.loudness * 36 : 0;
  const hue = (baseHue + pitchShift + wild + 360) % 360;
  const weightSum = weights.reduce((sum, item) => sum + item.w, 0) || 1;
  const energySum = weights.reduce((sum, item) => sum + item.energy, 0);
  const spikeAvg = weights.reduce((sum, item) => sum + item.spikes * item.w, 0) / weightSum;
  const loud = sensor.loudness * bias.energy;
  const energy = clamp(
    0.28 + energySum * 0.16 + loud * 0.85 + sensor.burst * 0.45 + sensor.shake * bias.shake * 0.35,
    0.2,
    1.85,
  );
  const spikes = clamp(spikeAvg + sensor.burst * 0.35 + (vibe === "spooky" ? 0.08 : 0), 0, 1.25);
  const scale = clamp(
    0.74 + Math.min(drops.filter((d) => !d.neutral).length, 8) * 0.055 + loud * 0.42 + sensor.burst * 0.18,
    0.62,
    1.85,
  );
  const swirl = clamp(
    Math.hypot(sensor.tiltX, sensor.tiltY) * 1.5 + sensor.wave * 1.1 + (vibe === "calm" ? 0.22 : 0.55),
    0,
    2.6,
  );
  const sat = clamp(bias.sat + (drops.length ? 0.16 : 0) + loud * 0.15, 0.18, 0.92);
  const light = clamp(bias.light + sensor.burst * 0.06, 0.2, 0.62);
  const glow = clamp(0.32 + energy * 0.38 + sensor.burst * 0.28, 0, 1.7);
  return {
    hue,
    saturation: sat,
    lightness: light,
    energy,
    spikes,
    scale,
    swirl,
    glow,
    color: hslToHex(hue, sat, light),
  };
}

export function titleFromDrops(drops: Drop[]): string {
  const counts = new Map<IngredientId, number>();
  for (const drop of drops) {
    if (drop.neutral) continue;
    counts.set(drop.ingredient, (counts.get(drop.ingredient) ?? 0) + 1);
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
  if (!top.length) return "Quiet brew";
  return `${top.map(([id]) => ingredientById(id).label).join(" ")} brew`;
}

export function decaySensor(sensor: SensorMix, dt: number): void {
  const burstK = Math.exp(-dt * 2.4);
  const shakeK = Math.exp(-dt * 1.8);
  const waveK = Math.exp(-dt * 1.6);
  sensor.burst *= burstK;
  sensor.shake *= shakeK;
  sensor.wave *= waveK;
  if (sensor.burst < 0.01) sensor.burst = 0;
  if (sensor.shake < 0.01) sensor.shake = 0;
  if (sensor.wave < 0.01) sensor.wave = 0;
}
