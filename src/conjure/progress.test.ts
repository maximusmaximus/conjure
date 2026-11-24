import assert from "node:assert/strict";
import { test } from "node:test";
import { decayFling, flingVel, isFling, pointerDown, pointerMove, pointerUp, resetFling } from "./fling.ts";
import { award, cleanHandle, currentTip, emptyProgress, levelFor, localDay, walletUnlocked } from "./progress.ts";
import { capDpr } from "./quality.ts";

test("levels rise with use and master is the top", () => {
  assert.equal(levelFor(0), "spark");
  assert.equal(levelFor(24), "stir");
  assert.equal(levelFor(120), "keep");
  assert.equal(levelFor(180), "master");
  assert.equal(levelFor(9000), "master");
});

test("daily caps stop farming and a new day continues the streak", () => {
  const day = new Date(2026, 10, 24, 12, 0, 0);
  let progress = emptyProgress();
  let gained = 0;
  for (let i = 0; i < 3; i += 1) {
    const result = award(progress, "start", day);
    progress = result.progress;
    gained += result.gained;
  }
  assert.equal(gained, 8);
  assert.equal(progress.streak, 1);
  const next = award(progress, "start", new Date(2026, 10, 25, 9, 0, 0));
  assert.equal(next.progress.streak, 2);
  assert.equal(next.gained, 8);
  const skipped = award(next.progress, "drop", new Date(2026, 10, 28, 9, 0, 0));
  assert.equal(skipped.progress.streak, 1);
});

test("wallet opens at Keep and a dismissed tip never returns", () => {
  let progress = emptyProgress();
  assert.equal(walletUnlocked(progress), false);
  progress = { ...progress, xp: 120, level: "keep" };
  assert.equal(walletUnlocked(progress), true);
  assert.equal(currentTip(["fling"], { fling: true, capture: true }), "capture");
  assert.equal(currentTip(["fling", "capture"], { fling: true, capture: true }), null);
});

test("handles reject emails and wallet strings", () => {
  assert.equal(cleanHandle("  ember cat  "), "ember cat");
  assert.equal(cleanHandle("a@b.co"), "");
  assert.equal(cleanHandle("0xabc123def456"), "");
  assert.equal(cleanHandle("🫧"), "🫧");
});

test("fling keeps momentum then decays", () => {
  resetFling();
  pointerDown(1, 0, 0, 1000);
  pointerMove(1, 40, 0, 1020);
  const speed = pointerUp(1);
  assert.equal(isFling(speed), true);
  const before = flingVel.x;
  decayFling(0.4);
  assert.ok(flingVel.x < before);
  assert.ok(flingVel.x > 0);
  resetFling();
});

test("master pixel ratio follows the screen and stays inside the GPU", () => {
  assert.equal(capDpr(3, 8192, 390, 844), 3);
  assert.ok(capDpr(4, 2048, 1920, 1080) <= 2048 / 1920);
  assert.ok(capDpr(3, 1024, 800, 800) <= 1024 / 800);
  assert.equal(capDpr(0.5, 4096, 800, 600), 1);
  assert.equal(localDay(new Date(2026, 0, 2)), "2026-01-02");
});
