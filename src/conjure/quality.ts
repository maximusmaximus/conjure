export type Tier = "low" | "mid" | "high";

export type Quality = {
  tier: Tier;
  dpr: [number, number];
  particles: number;
  detail: number;
  webgpu: boolean;
  webgl2: boolean;
  master: boolean;
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
  if (tier === "low") return { tier, dpr: [1, 1], particles: 70, detail: 2, webgpu, webgl2, master: false };
  if (tier === "high") return { tier, dpr: [1, 1.75], particles: 420, detail: 5, webgpu, webgl2, master: false };
  return { tier, dpr: [1, 1.4], particles: 180, detail: 3, webgpu, webgl2, master: false };
}

export type GpuLimits = { dpr: number; maxTexture: number; width: number; height: number };

/** Device pixel ratio, never above the GPU's max texture or an 8 megapixel budget. */
export function capDpr(dpr: number, maxTexture: number, width: number, height: number): number {
  const longest = Math.max(1, width, height);
  const byTexture = Math.max(1, maxTexture) / longest;
  const pixels = Math.max(1, width * height);
  const byBudget = Math.sqrt(8_000_000 / pixels);
  const safe = Math.min(Math.max(dpr, 1), byTexture, byBudget, 3);
  return Math.max(1, Math.floor(safe * 100) / 100);
}

export function masterQuality(base: Quality, gpu: GpuLimits): Quality {
  const dpr = capDpr(gpu.dpr, gpu.maxTexture, gpu.width, gpu.height);
  return {
    ...base,
    tier: "high",
    master: true,
    dpr: [1, dpr],
    particles: Math.min(800, Math.max(base.particles, 640)),
    detail: 5,
    webgpu: base.webgpu,
    webgl2: base.webgl2,
  };
}

function readGpu(): GpuLimits {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  const width = typeof window === "undefined" ? 1280 : window.innerWidth || 1280;
  const height = typeof window === "undefined" ? 800 : window.innerHeight || 800;
  let maxTexture = 4096;
  if (typeof document !== "undefined") {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      const size = gl?.getParameter(gl.MAX_TEXTURE_SIZE);
      if (typeof size === "number" && size >= 1024) maxTexture = size;
    } catch {
      /* keep the conservative cap */
    }
  }
  return { dpr, maxTexture, width, height };
}

export async function probeQuality(opts?: { master?: boolean }): Promise<Quality> {
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
  const base = qualityFromTier(tier, webgpu, webgl2);
  if (!opts?.master) return base;
  return masterQuality(base, readGpu());
}
