import { useEffect, useRef } from "react";
import { blendSensors, computeBrew, type Drop, type Vibe } from "./brew";
import { liveSensor, masterMix, remoteSensor, setGrabStill } from "./live";

/** Drawn cauldron used when WebGL is missing. Same brew math as the 3D stage. */
export function FlatBrew({
  drops,
  vibe,
  reduced,
}: {
  drops: Drop[];
  vibe: Vibe;
  reduced: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let time = 0;
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || 320;
      const height = canvas.clientHeight || 480;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#110e0c";
      ctx.fillRect(0, 0, width, height);
      const brew = computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
      const pace = masterMix.freeze ? 0 : reduced ? 0.004 : 0.016 * (0.7 + masterMix.stir);
      time += pace;
      const cx = width / 2 + liveSensor.tiltX * width * 0.08;
      const cy = height * 0.58 + liveSensor.tiltY * height * 0.05;
      const radius = Math.min(width, height) * 0.22 * brew.scale;
      const glow = ctx.createRadialGradient(cx, cy - radius, radius * 0.2, cx, cy - radius, radius * 1.8);
      glow.addColorStop(0, brew.color);
      glow.addColorStop(1, "rgba(17,14,12,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy - radius * 0.9, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = brew.color;
      ctx.beginPath();
      const wobble = reduced || masterMix.freeze ? 0 : Math.sin(time * (2 + brew.swirl * (0.5 + masterMix.swirl))) * 8 * brew.spikes;
      ctx.ellipse(cx, cy - radius * 1.15, radius * 0.72 + wobble, radius * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a2c24";
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.15, radius * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = brew.color;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.ellipse(cx, cy - radius * 0.18, radius * 0.82, radius * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    setGrabStill(() => {
      try {
        return canvas.toDataURL("image/jpeg", 0.72);
      } catch {
        return null;
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      setGrabStill(null);
    };
  }, [drops, vibe, reduced]);

  return <canvas ref={ref} className="flat-brew" aria-hidden="true" />;
}
