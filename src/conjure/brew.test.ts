import assert from "node:assert/strict";
import test from "node:test";
import {
  blendSensors,
  computeBrew,
  emptySensor,
  holdDeviceTilt,
  hslToHex,
  mixHue,
  springTilt,
  titleFromDrops,
  type Drop,
} from "./brew.ts";

test("hue mix is circular", () => {
  const hue = mixHue([
    { hue: 10, w: 1 },
    { hue: 350, w: 1 },
  ]);
  assert.ok(hue < 30 || hue > 340);
});

test("empty cauldron stays calm", () => {
  const brew = computeBrew([], emptySensor(), "calm");
  assert.equal(brew.color, hslToHex(brew.hue, brew.saturation, brew.lightness));
  assert.ok(brew.scale < 1);
  assert.ok(brew.energy < 0.6);
});

test("loudness grows the brew and ember shifts hue", () => {
  const drops: Drop[] = [
    { id: "a", ingredient: "ember", by: "me", at: 0 },
    { id: "b", ingredient: "ember", by: "me", at: 1 },
  ];
  const quiet = computeBrew(drops, emptySensor(), "calm");
  const loud = computeBrew(drops, { ...emptySensor(), loudness: 1 }, "calm");
  assert.ok(loud.scale > quiet.scale);
  assert.ok(loud.energy > quiet.energy);
});

test("pitch moves hue", () => {
  const low = computeBrew([], { ...emptySensor(), pitch: 0 }, "chaotic");
  const high = computeBrew([], { ...emptySensor(), pitch: 1 }, "chaotic");
  assert.notEqual(Math.round(low.hue), Math.round(high.hue));
});

test("neutral drops barely change the brew", () => {
  const vivid = computeBrew([{ id: "a", ingredient: "spark", by: "x", at: 0 }], emptySensor(), "calm");
  const muted = computeBrew(
    [{ id: "a", ingredient: "spark", by: "x", at: 0, neutral: true }],
    emptySensor(),
    "calm",
  );
  assert.ok(muted.energy < vivid.energy);
});

test("spooky stays darker than chaotic", () => {
  const spooky = computeBrew([], emptySensor(), "spooky");
  const chaotic = computeBrew([], emptySensor(), "chaotic");
  assert.ok(spooky.lightness < chaotic.lightness);
});

test("sensor blend takes the loudest burst", () => {
  const mixed = blendSensors([
    { ...emptySensor(), burst: 0.2, loudness: 0.2 },
    { ...emptySensor(), burst: 0.9, loudness: 0.4, sampleHue: 200 },
  ]);
  assert.equal(mixed.burst, 0.9);
  assert.ok(Math.abs(mixed.loudness - 0.3) < 0.001);
  assert.ok(Math.abs((mixed.sampleHue ?? 0) - 200) < 0.001);
});

test("titles skip neutral drops", () => {
  const title = titleFromDrops([
    { id: "a", ingredient: "moss", by: "x", at: 0 },
    { id: "b", ingredient: "spark", by: "y", at: 1, neutral: true },
  ]);
  assert.equal(title, "Moss brew");
});

test("a knocked tilt springs back to rest", () => {
  const sensor = emptySensor();
  sensor.tiltX = 0.82;
  sensor.tiltY = -0.58;
  sensor.burst = 1;
  for (let i = 0; i < 150; i += 1) springTilt(sensor, 1 / 30);
  assert.ok(Math.abs(sensor.tiltX) < 0.02);
  assert.ok(Math.abs(sensor.tiltY) < 0.02);
  assert.equal(sensor.burst, 1);
});

test("device motion holds tilt while it is reporting", () => {
  const sensor = emptySensor();
  sensor.tiltX = 0.44;
  sensor.tiltY = -0.2;
  holdDeviceTilt(1);
  springTilt(sensor, 0.2);
  assert.equal(sensor.tiltX, 0.44);
  assert.equal(sensor.tiltY, -0.2);
  springTilt(sensor, 1);
  for (let i = 0; i < 150; i += 1) springTilt(sensor, 1 / 30);
  assert.ok(Math.abs(sensor.tiltX) < 0.02);
  assert.ok(Math.abs(sensor.tiltY) < 0.02);
});
