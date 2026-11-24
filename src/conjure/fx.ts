import type { Tier } from "./quality";

/** What a quality tier is allowed to draw. Low skips the expensive path. */
export type FxProfile = {
  tier: Tier;
  master: boolean;
  bodies: number;
  sparkBodies: number;
  particles: number;
  slosh: number;
  transmission: number;
  charmTransmission: number;
  thickness: number;
  ior: number;
  iridescence: number;
  clearcoat: number;
  sheen: number;
  emissiveIntensity: number;
  bloom: number;
  dof: boolean;
  shadows: boolean;
  adaptiveDpr: boolean;
  toneMapping: "ACES" | "AgX";
};

export type MaterialNote = {
  transmission: number;
  ior: number;
  thickness: number;
  iridescence: number;
  clearcoat: number;
  sheen: number;
  emissiveIntensity: number;
  bloom: number;
  toneMapping: "ACES" | "AgX";
  tier: string;
  dof: boolean;
  shadows: boolean;
};

type FxInput = { tier: Tier; master: boolean; particles: number };

export function effectsFor(quality: FxInput): FxProfile {
  const particles = quality.particles;
  if (quality.master) {
    return {
      tier: "high",
      master: true,
      bodies: 8,
      sparkBodies: 28,
      particles: Math.max(particles, 640),
      slosh: 24,
      transmission: 0.94,
      charmTransmission: 0.9,
      thickness: 1.45,
      ior: 1.48,
      iridescence: 0.85,
      clearcoat: 1,
      sheen: 0.4,
      emissiveIntensity: 0.72,
      bloom: 0.62,
      dof: true,
      shadows: true,
      adaptiveDpr: true,
      toneMapping: "AgX",
    };
  }
  if (quality.tier === "low") {
    return {
      tier: "low",
      master: false,
      bodies: 4,
      sparkBodies: 8,
      particles: Math.min(particles, 70),
      slosh: 12,
      transmission: 0,
      charmTransmission: 0,
      thickness: 0,
      ior: 1.4,
      iridescence: 0,
      clearcoat: 0.15,
      sheen: 0,
      emissiveIntensity: 0.35,
      bloom: 0,
      dof: false,
      shadows: false,
      adaptiveDpr: true,
      toneMapping: "ACES",
    };
  }
  if (quality.tier === "high") {
    return {
      tier: "high",
      master: false,
      bodies: 8,
      sparkBodies: 20,
      particles,
      slosh: 20,
      transmission: 0.72,
      charmTransmission: 0.55,
      thickness: 1.1,
      ior: 1.45,
      iridescence: 0.55,
      clearcoat: 0.8,
      sheen: 0.25,
      emissiveIntensity: 0.55,
      bloom: 0.32,
      dof: false,
      shadows: true,
      adaptiveDpr: true,
      toneMapping: "ACES",
    };
  }
  return {
    tier: "mid",
    master: false,
    bodies: 6,
    sparkBodies: 14,
    particles,
    slosh: 16,
    transmission: 0.48,
    charmTransmission: 0.32,
    thickness: 0.7,
    ior: 1.42,
    iridescence: 0.28,
    clearcoat: 0.55,
    sheen: 0.15,
    emissiveIntensity: 0.45,
    bloom: 0.16,
    dof: false,
    shadows: true,
    adaptiveDpr: true,
    toneMapping: "ACES",
  };
}

export function materialNote(fx: FxProfile): MaterialNote {
  return {
    transmission: fx.transmission,
    ior: fx.ior,
    thickness: fx.thickness,
    iridescence: fx.iridescence,
    clearcoat: fx.clearcoat,
    sheen: fx.sheen,
    emissiveIntensity: fx.emissiveIntensity,
    bloom: fx.bloom,
    toneMapping: fx.toneMapping,
    tier: fx.master ? "master" : fx.tier,
    dof: fx.dof,
    shadows: fx.shadows,
  };
}
