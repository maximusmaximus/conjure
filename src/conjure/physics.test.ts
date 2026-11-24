import assert from "node:assert/strict";
import { test } from "node:test";
import { effectsFor, materialNote } from "./fx.ts";
import { masterQuality, qualityFromTier } from "./quality.ts";
import {
  BOUNCE_KICK,
  GRAVITY,
  RESTITUTION,
  liveBodies,
  localGravity,
  pushBody,
  resetPhysics,
  stepBodies,
  wallRadius,
  type PhysBody,
} from "./physics.ts";
import { brewMetadata } from "./spin.ts";

function body(partial: Partial<PhysBody> & Pick<PhysBody, "id">): PhysBody {
  return {
    kind: "charm",
    x: 0,
    y: 1,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    r: 0.1,
    age: 0,
    life: 10,
    held: false,
    impact: 0,
    color: "#ffffff",
    hue: 0,
    ...partial,
  };
}

test("upright gravity points down in local space", () => {
  const g = localGravity(0, 0, 0);
  assert.ok(Math.abs(g[0]) < 1e-6);
  assert.ok(Math.abs(g[1] + GRAVITY) < 1e-6);
  assert.ok(Math.abs(g[2]) < 1e-6);
  const tilted = localGravity(0.4, 0, 0);
  assert.ok(Math.abs(tilted[2]) > 0.5);
});

test("bounce restitution off the floor, the wall, and another body", () => {
  resetPhysics(9);
  pushBody(body({ id: "floor", y: 0.2, vy: -4, r: 0.1 }));
  stepBodies(0.016, [0, 0, 0]);
  const floorHit = liveBodies()[0];
  assert.ok(floorHit.vy >= BOUNCE_KICK - 0.001);
  assert.ok(floorHit.vy <= Math.max(4 * RESTITUTION, BOUNCE_KICK) + 0.05);
  assert.equal(floorHit.impact, 1);

  resetPhysics(10);
  pushBody(body({ id: "wall", x: 2, y: 0.9, vx: 4, r: 0.1 }));
  stepBodies(0.016, [0, 0, 0]);
  const wallHit = liveBodies()[0];
  assert.ok(wallHit.vx < 0);
  assert.ok(Math.abs(wallHit.vx) >= 4 * RESTITUTION - 0.15);
  assert.equal(wallHit.impact, 1);

  resetPhysics(11);
  pushBody(body({ id: "a", x: 0, y: 1, vx: 2, r: 0.2 }));
  pushBody(body({ id: "b", x: 0.3, y: 1, vx: -2, r: 0.2 }));
  stepBodies(0.016, [0, 0, 0]);
  const [left, right] = liveBodies();
  const apart = right.vx - left.vx;
  assert.ok(apart > 0.5);
  assert.equal(left.impact, 1);
  assert.equal(right.impact, 1);
});

test("a body falls, hits the floor, and bounces", () => {
  resetPhysics(3);
  pushBody(body({ id: "a", y: 2, vy: 0 }));
  stepBodies(0.1, [0, -GRAVITY, 0]);
  const falling = liveBodies()[0];
  assert.ok(falling.y < 2);
  assert.ok(falling.vy < 0);
  falling.y = 0.2;
  falling.vy = -3;
  stepBodies(0.016, [0, -GRAVITY, 0]);
  const landed = liveBodies()[0];
  assert.ok(landed.y >= 0.74 + landed.r - 0.001);
  assert.ok(landed.y <= 0.74 + landed.r + 0.05);
  assert.ok(landed.vy > 0);
});

test("overlapping charms separate and the bowl wall holds them in", () => {
  resetPhysics(5);
  pushBody(body({ id: "a", x: 0, y: 0.8, r: 0.12 }));
  pushBody(body({ id: "b", x: 0.08, y: 0.8, r: 0.12 }));
  stepBodies(0.016, [0, 0, 0]);
  const [a, b] = liveBodies();
  assert.ok(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) >= a.r + b.r - 0.02);
  pushBody(body({ id: "out", x: 3, y: 0.7, z: 0, r: 0.1 }));
  stepBodies(0.016, [0, 0, 0]);
  const out = liveBodies().find((item) => item.id === "out");
  assert.ok(out);
  const limit = wallRadius(out.y) - out.r + 0.02;
  assert.ok(Math.hypot(out.x, out.z) <= limit);
});

test("tier effects: low is cheap, master is the full glass path", () => {
  const low = effectsFor(qualityFromTier("low", false, true));
  const mid = effectsFor(qualityFromTier("mid", false, true));
  const high = effectsFor(qualityFromTier("high", true, true));
  const master = effectsFor(
    masterQuality(qualityFromTier("mid", true, true), { dpr: 2, maxTexture: 8192, width: 1280, height: 800 }),
  );
  assert.equal(low.transmission, 0);
  assert.equal(low.charmTransmission, 0);
  assert.equal(low.dof, false);
  assert.equal(low.bloom, 0);
  assert.equal(low.shadows, false);
  assert.equal(low.toneMapping, "ACES");
  assert.equal(low.adaptiveDpr, true);
  assert.ok(low.sparkBodies < mid.sparkBodies);
  assert.ok(mid.bloom > 0 && mid.bloom < high.bloom);
  assert.equal(mid.dof, false);
  assert.ok(mid.transmission > 0);
  assert.equal(high.dof, false);
  assert.ok(master.sparkBodies > high.sparkBodies);
  assert.ok(master.bodies >= high.bodies);
  assert.ok(master.particles >= high.particles);
  assert.ok(master.bloom > high.bloom);
  assert.ok(master.transmission > high.transmission);
  assert.equal(master.dof, true);
  assert.equal(master.shadows, true);
  assert.equal(master.toneMapping, "AgX");
  assert.equal(master.adaptiveDpr, true);
  assert.ok(master.slosh > low.slosh);
});

test("mint metadata records the physics snapshot and the material", () => {
  const fx = effectsFor(
    masterQuality(qualityFromTier("high", true, true), { dpr: 2, maxTexture: 8192, width: 1440, height: 900 }),
  );
  const material = materialNote(fx);
  const meta = brewMetadata({
    title: "Ember brew",
    animationUrl: "data:video/webm;base64,aaaa",
    spin: null,
    vibe: "calm",
    chainId: 46630,
    royaltyBps: 500,
    physics: {
      seed: 42,
      gravity: GRAVITY,
      bodies: [
        {
          id: "c1",
          kind: "charm",
          position: [0.1, 0.6, -0.2],
          velocity: [0, -1.2, 0.3],
        },
      ],
    },
    material,
  });
  const properties = meta.properties as {
    physics: { seed: number; gravity: number; bodies: { velocity: number[] }[] };
    material: { transmission: number; toneMapping: string; tier: string; bloom: number };
  };
  assert.equal(properties.physics.seed, 42);
  assert.equal(properties.physics.gravity, GRAVITY);
  assert.equal(properties.physics.bodies[0].velocity[1], -1.2);
  assert.equal(properties.material.toneMapping, "AgX");
  assert.equal(properties.material.tier, "master");
  assert.ok(properties.material.transmission > 0);
  assert.ok(properties.material.bloom > 0);
  const attributes = meta.attributes as { trait_type: string; value: unknown }[];
  const byName = Object.fromEntries(attributes.map((item) => [item.trait_type, item.value]));
  assert.equal(byName["Physics seed"], 42);
  assert.equal(byName.Bodies, 1);
  assert.equal(byName["Tone mapping"], "AgX");
  assert.equal(byName.Tier, "master");
  assert.equal(byName.IOR, material.ior);
  assert.equal(byName.Bloom, material.bloom);
});
