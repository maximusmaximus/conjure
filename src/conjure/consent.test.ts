import assert from "node:assert/strict";
import test from "node:test";
import {
  cleanName,
  defaultIncluded,
  makeRoomCode,
  resolveVotes,
  roomCodeOk,
  withinDailyCap,
} from "./consent.ts";

test("default include requires sign-in and opt-in", () => {
  assert.equal(defaultIncluded(false, true), false);
  assert.equal(defaultIncluded(true, false), false);
  assert.equal(defaultIncluded(true, true), true);
});

test("host is included when they do not vote; guests default out", () => {
  const included = resolveVotes(
    [
      { id: "host", isHost: true },
      { id: "guest", isHost: false },
    ],
    {},
    { guest: false },
    { guest: true },
  );
  assert.equal(included.host, true);
  assert.equal(included.guest, false);
});

test("an explicit vote beats the default", () => {
  const included = resolveVotes(
    [{ id: "guest", isHost: false }],
    { guest: "in" },
    {},
    {},
  );
  assert.equal(included.guest, true);
});

test("daily mint cap", () => {
  assert.equal(withinDailyCap(0, 5), true);
  assert.equal(withinDailyCap(4, 5), true);
  assert.equal(withinDailyCap(5, 5), false);
});

test("names are filtered and trimmed", () => {
  assert.equal(cleanName("  Ada  "), "Ada");
  assert.equal(cleanName("a"), null);
  assert.equal(cleanName("oh shit"), null);
  assert.equal(cleanName("x".repeat(40))?.length, 18);
});

test("room codes are four unambiguous characters", () => {
  const code = makeRoomCode(() => 0);
  assert.equal(roomCodeOk(code), true);
  assert.equal(roomCodeOk("0OIL"), false);
  assert.equal(code.includes("0"), false);
  assert.equal(code.includes("O"), false);
});
