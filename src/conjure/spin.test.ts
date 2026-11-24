import assert from "node:assert/strict";
import { test } from "node:test";
import {
  brewMetadata,
  impulse,
  resetSpin,
  spin,
  spinFrames,
  spinSnapshot,
  stepSpin,
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
    ["Angular velocity", "Axis", "Damping", "Spin count"],
  );
  assert.equal(attributes[0].value, 1.25);
  assert.equal(attributes[2].value, 1.7);
});
