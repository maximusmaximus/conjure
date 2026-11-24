import { useEffect, useRef } from "react";
import { blendSensors, computeBrew, hslToHex, ingredientById, type Drop, type Vibe } from "./brew";
import { liveSensor, masterMix, punch, punchStrength, remoteSensor, setGrabStill, toolTouch } from "./live";
import { spin } from "./spin";

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
      const last = [...drops].reverse().find((drop) => !drop.neutral);
      const shown = last ? hslToHex(ingredientById(last.ingredient).hue, 0.8, 0.52) : brew.color;
      const color = punchStrength() > 0.2 ? punch.hex : shown;
      const stir = toolTouch.stir ? masterMix.stir : 0.1;
      time += masterMix.freeze ? 0 : reduced ? 0.004 : 0.016 * (0.7 + stir);
      const cx = width / 2 + liveSensor.tiltX * width * 0.12;
      const cy = height * 0.52 + liveSensor.tiltY * height * 0.06;
      const bloom = toolTouch.bloom ? masterMix.bloom : 0.3;
      const radius =
        Math.min(width, height) *
        0.22 *
        brew.scale *
        (1 + liveSensor.burst * 0.35) *
        (0.75 + bloom);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(spin.y);
      const glow = ctx.createRadialGradient(0, -radius, radius * 0.2, 0, -radius, radius * 1.8);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "rgba(17,14,12,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, -radius * 0.9, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      const wobble =
        reduced || masterMix.freeze
          ? 0
          : Math.sin(time * (2 + brew.swirl + Math.abs(spin.vy))) * 14 * (0.4 + brew.spikes);
      ctx.ellipse(0, -radius * 1.15, radius * 0.72 + wobble, radius * 0.85, spin.z * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = "#3a2c24";
      ctx.beginPath();
      ctx.ellipse(cx, cy + radius * 0.15, radius * 1.15, radius * 0.42, spin.y * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.ellipse(cx, cy - radius * 0.05, radius * 0.82, radius * 0.22, spin.y, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.save();
      ctx.translate(cx, cy - radius * 0.15);
      ctx.rotate(spin.y);
      ctx.strokeStyle = "#fff6df";
      ctx.lineWidth = Math.max(3, radius * 0.08);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 1.35, -radius * 0.95);
      ctx.stroke();
      ctx.fillStyle = "#fff8e8";
      ctx.beginPath();
      ctx.arc(radius * 1.35, -radius * 0.95, Math.max(8, radius * 0.16), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      drops.slice(-8).forEach((drop, i) => {
        const hue = ingredientById(drop.ingredient).hue;
        const a = time * 1.4 + i * 0.9 + spin.y;
        const orbit = radius * (1.15 + (i % 3) * 0.18);
        ctx.fillStyle = hslToHex(hue, 0.85, 0.55);
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * orbit, cy - radius * 0.35 + Math.sin(a) * orbit * 0.45, Math.max(6, radius * 0.12), 0, Math.PI * 2);
        ctx.fill();
      });
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
