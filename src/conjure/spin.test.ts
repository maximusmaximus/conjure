import assert from "node:assert/strict";
import { test } from "node:test";
import {
  brewMetadata,
  impulse,
  resetSpin,
  resetTumble,
  SCALE_MAX,
  SCALE_MIN,
  spin,
  spinFrames,
  spinSnapshot,
  stepSpin,
  stepTumble,
  tumble,
} from "./spin.ts";

test("spin eases out and the snapshot keeps axis, damping, and count", () => {
  resetSpin();
  impulse(0, 2.4, 0);
  const before = spin.vy;
  stepSpin(0.35);
  assert.ok(spin.y > 0);
  assert.ok(spin.vy < before);
  assert.ok(spin.vy > 0);
  assert.ok(spin.spins > 0);
  const note = spinSnapshot();
  assert.equal(note.damping, 1.7);
  assert.ok(note.angularVelocity > 0);
  const length = Math.hypot(note.axis[0], note.axis[1], note.axis[2]);
  assert.ok(Math.abs(length - 1) < 0.02);
  const frames = spinFrames(note, 6, 12);
  assert.equal(frames[0].t, 0);
  assert.equal(frames.at(-1)?.t, 6);
  assert.ok((frames.at(-1)?.speed ?? 1) < frames[0].speed);
  resetSpin();
});

test("the pot and ladle spring back to rest after a knock", () => {
  resetSpin();
  impulse(1.4, 2.2, 0.8);
  for (let i = 0; i < 240; i += 1) stepSpin(1 / 30);
  assert.ok(Math.abs(spin.x) < 0.05);
  assert.ok(Math.abs(spin.y) < 0.05);
  assert.ok(Math.abs(spin.z) < 0.05);
  assert.ok(Math.hypot(spin.vx, spin.vy, spin.vz) < 0.05);
  resetSpin();
});

test("mint metadata points at the loop and records the spin", () => {
  const meta = brewMetadata({
    title: "Moss brew",
    animationUrl: "data:video/webm;base64,aaaa",
    image: "data:image/jpeg;base64,bbbb",
    spin: {
      angularVelocity: 1.25,
      axis: [0, 1, 0.2],
      damping: 1.7,
      spinCount: 3.5,
      velocity: [0, 1.2, 0.24],
      angle: [0, 0.4, 0],
    },
    vibe: "calm",
    chainId: 46630,
    royaltyBps: 500,
  });
  assert.equal(meta.animation_url, "data:video/webm;base64,aaaa");
  assert.equal(meta.chainId, 46630);
  const attributes = meta.attributes as { trait_type: string; value: unknown }[];
  assert.deepEqual(
    attributes.map((item) => item.trait_type),
    [
      "Angular velocity",
      "Axis",
      "Damping",
      "Spin count",
      "Gravity",
      "Physics seed",
      "Bodies",
      "Transmission",
      "IOR",
      "Thickness",
      "Iridescence",
      "Emissive intensity",
      "Bloom",
      "Tone mapping",
      "Tier",
      "Rotation",
      "Scale",
      "Scale range",
      "Spill lip",
      "Body cap",
    ],
  );
  assert.equal(attributes[0].value, 1.25);
  assert.equal(attributes[2].value, 1.7);
  const motion = meta.properties as { motion: { scaleMin: number; scaleMax: number; spillLip: number } };
  assert.equal(motion.motion.scaleMin, SCALE_MIN);
  assert.equal(motion.motion.scaleMax, SCALE_MAX);
  assert.equal(motion.motion.spillLip, 1.05);
});

test("breathing scale stays inside its bounds while the pot tumbles", () => {
  resetSpin();
  resetTumble();
  let min = 10;
  let max = -1;
  let maxTilt = 0;
  let spun = false;
  for (let i = 0; i < 240; i += 1) {
    stepTumble(1 / 30, 1);
    assert.ok(tumble.scale >= SCALE_MIN - 1e-9);
    assert.ok(tumble.scale <= SCALE_MAX + 1e-9);
    min = Math.min(min, tumble.scale);
    max = Math.max(max, tumble.scale);
    maxTilt = Math.max(maxTilt, Math.abs(tumble.x), Math.abs(tumble.z));
    if (tumble.y > 0.2) spun = true;
  }
  assert.ok(max - min > 0.05, `scale span ${max - min}`);
  assert.ok(maxTilt > 0.02);
  assert.equal(spun, true);
  resetTumble();
  resetSpin();
});
