import assert from "node:assert/strict";
import { test } from "node:test";
import { BREW_BOUNDS, DESKTOP_FRAME, frameFor, isPhonePortrait, projectFrame, viewportForFrame } from "./frame.ts";

const phones = [
  [320, 568],
  [390, 844],
  [430, 932],
] as const;

const desktops = [
  [1280, 800],
  [1920, 1080],
] as const;

test("desktop framing is unchanged at laptop and wide sizes", () => {
  for (const [width, height] of desktops) {
    assert.equal(isPhonePortrait(width, height), false);
    const frame = frameFor(width, height);
    assert.deepEqual(frame.position, DESKTOP_FRAME.position);
    assert.deepEqual(frame.lookAt, DESKTOP_FRAME.lookAt);
    assert.equal(frame.fov, DESKTOP_FRAME.fov);
  }
  assert.deepEqual(frameFor(1280, 800), frameFor(1920, 1080));
});

test("portrait phones pull back, widen, and clear the bottom chrome", () => {
  const seen: string[] = [];
  for (const [width, height] of phones) {
    assert.equal(isPhonePortrait(width, height), true);
    const frame = frameFor(width, height);
    seen.push(frame.position.join(",") + frame.fov);
    assert.ok(frame.position[2] > DESKTOP_FRAME.position[2]);
    assert.ok(frame.fov > DESKTOP_FRAME.fov);
    assert.ok(frame.lookAt[1] < DESKTOP_FRAME.lookAt[1]);
    const aspect = width / height;
    let minY = 1;
    let maxY = -1;
    let maxX = 0;
    for (const point of BREW_BOUNDS) {
      const ndc = projectFrame(frame, point, aspect);
      minY = Math.min(minY, ndc.y);
      maxY = Math.max(maxY, ndc.y);
      maxX = Math.max(maxX, Math.abs(ndc.x));
    }
    assert.ok(minY > -0.42, `${width}x${height} feet ndc ${minY}`);
    assert.ok(maxY < 0.92, `${width}x${height} top ndc ${maxY}`);
    assert.ok(maxX < 0.92, `${width}x${height} side ndc ${maxX}`);
  }
  assert.equal(new Set(seen).size, phones.length);
});

test("a wide canvas does not hide a portrait window", () => {
  const view = viewportForFrame(980, 1600, 980, 1600, 390, 844);
  assert.deepEqual(view, { width: 390, height: 844 });
  assert.equal(isPhonePortrait(view.width, view.height), true);
  assert.ok(frameFor(view.width, view.height).position[2] > DESKTOP_FRAME.position[2]);
  const desktop = viewportForFrame(1280, 800, 1280, 800, 1280, 800);
  assert.deepEqual(desktop, { width: 1280, height: 800 });
  assert.deepEqual(frameFor(desktop.width, desktop.height).position, DESKTOP_FRAME.position);
});
