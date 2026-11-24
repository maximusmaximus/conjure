import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DESKTOP_FRAME,
  frameFor,
  frameMargin,
  frameMode,
  isPhonePortrait,
  projectFrame,
  spillFramePoints,
  viewportForFrame,
} from "./frame.ts";

const sizes = [
  [360, 780],
  [390, 844],
  [430, 932],
  [500, 1030],
  [768, 1024],
  [1280, 800],
  [1920, 1080],
] as const;

test("portrait is any view taller than it is wide", () => {
  assert.equal(isPhonePortrait(500, 1030), true);
  assert.equal(frameMode(500, 1030), "portrait");
  assert.equal(frameMode(768, 1024), "portrait");
  assert.equal(frameMode(360, 780), "portrait");
  assert.equal(frameMode(1280, 800), "desktop");
  assert.equal(frameMode(1920, 1080), "desktop");
  assert.equal(frameMode(1920, 1072), "desktop");
  const phone = frameFor(500, 1030);
  assert.ok(phone.position[2] > DESKTOP_FRAME.position[2]);
  const desk = frameFor(1920, 1080);
  assert.ok(desk.position[2] > DESKTOP_FRAME.position[2]);
  assert.notDeepEqual(desk.position, DESKTOP_FRAME.position);
});

test("scaled pot and spill stay inside the view at every checked size", () => {
  const seen = new Set<string>();
  for (const [width, height] of sizes) {
    const portrait = height > width;
    assert.equal(frameMode(width, height), portrait ? "portrait" : "desktop");
    const frame = frameFor(width, height);
    const aspect = width / height;
    const margin = frameMargin(frame, aspect);
    seen.add(frame.position[2].toFixed(2));
    let maxX = 0;
    let minY = 1;
    let maxY = -1;
    for (const point of spillFramePoints()) {
      const ndc = projectFrame(frame, point, aspect);
      maxX = Math.max(maxX, Math.abs(ndc.x));
      minY = Math.min(minY, ndc.y);
      maxY = Math.max(maxY, ndc.y);
    }
    assert.ok(maxX <= 0.94, `${width}x${height} side ${maxX}`);
    assert.ok(minY >= -0.94, `${width}x${height} feet ${minY}`);
    assert.ok(maxY <= 0.94, `${width}x${height} top ${maxY}`);
    assert.ok(margin >= 0.06, `${width}x${height} margin ${margin}`);
    assert.ok(margin < 0.2, `${width}x${height} margin too loose ${margin}`);
  }
  assert.ok(seen.size >= 4);
});

test("a wide canvas does not hide a portrait window", () => {
  const view = viewportForFrame(980, 1600, 980, 1600, 390, 844);
  assert.deepEqual(view, { width: 390, height: 1600 });
  assert.equal(frameMode(view.width, view.height), "portrait");
  assert.ok(frameMargin(frameFor(view.width, view.height), view.width / view.height) >= 0.06);
  const collapsed = viewportForFrame(390, 100, 390, 100, 390, 844);
  assert.deepEqual(collapsed, { width: 390, height: 844 });
  assert.equal(frameMode(collapsed.width, collapsed.height), "portrait");
  const desktop = viewportForFrame(1280, 800, 1280, 800, 1280, 800);
  assert.deepEqual(desktop, { width: 1280, height: 800 });
  assert.equal(frameMode(desktop.width, desktop.height), "desktop");
  const fitted = frameFor(desktop.width, desktop.height);
  assert.ok(fitted.position[2] > DESKTOP_FRAME.position[2]);
  assert.ok(frameMargin(fitted, desktop.width / desktop.height) >= 0.06);
});
