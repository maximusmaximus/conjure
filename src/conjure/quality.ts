export type Tier = "low" | "mid" | "high";

export type Quality = {
  tier: Tier;
  dpr: [number, number];
  particles: number;
  detail: number;
  webgpu: boolean;
  webgl2: boolean;
};

export function tierFrom(signals: {
  webgpu: boolean;
  cores: number;
  memory: number;
  saveData: boolean;
}): Tier {
  if (signals.saveData || (signals.memory > 0 && signals.memory <= 2) || signals.cores <= 2) {
    return "low";
  }
  if (signals.webgpu && signals.cores >= 8 && (signals.memory === 0 || signals.memory >= 8)) {
    return "high";
  }
  if (signals.cores <= 4) return "low";
  return "mid";
}

export function qualityFromTier(tier: Tier, webgpu: boolean, webgl2: boolean): Quality {
  if (tier === "low") return { tier, dpr: [1, 1], particles: 70, detail: 2, webgpu, webgl2 };
  if (tier === "high") return { tier, dpr: [1, 1.75], particles: 420, detail: 5, webgpu, webgl2 };
  return { tier, dpr: [1, 1.4], particles: 180, detail: 3, webgpu, webgl2 };
}

export async function probeQuality(): Promise<Quality> {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
    gpu?: { requestAdapter: () => Promise<unknown> };
  };
  let webgpu = false;
  if (nav.gpu?.requestAdapter) {
    try {
      webgpu = (await nav.gpu.requestAdapter()) != null;
    } catch {
      webgpu = false;
    }
  }
  let webgl2 = false;
  try {
    const canvas = document.createElement("canvas");
    webgl2 = canvas.getContext("webgl2") != null;
  } catch {
    webgl2 = false;
  }
  const tier = tierFrom({
    webgpu,
    cores: navigator.hardwareConcurrency || 4,
    memory: nav.deviceMemory ?? 0,
    saveData: Boolean(nav.connection?.saveData),
  });
  return qualityFromTier(tier, webgpu, webgl2);
}
