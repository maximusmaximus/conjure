import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { cleanName, makeRoomCode, roomCodeOk, withinDailyCap } from "./consent";
import { cleanHandle } from "./progress";
import type { Vibe, IngredientId, Drop } from "./brew";
import type { ConsentView, Member, Seat } from "./store";

const DEVICE = z.string().regex(/^d_[a-zA-Z0-9]{8,32}$/);
const CODE = z.string().regex(/^[A-HJ-NP-Z2-9]{4}$/);
const ING = z.enum(["ember", "moss", "moon", "salt", "honey", "frost", "ink", "spark"]);
const VIBE = z.enum(["calm", "chaotic", "spooky"]);
const SEAT = z.enum(["stirrer", "singer", "spark", "seer"]);

const COLORS = [
  "#e27a3a",
  "#6ea86a",
  "#7aa2ff",
  "#e6a322",
  "#c47cff",
  "#7ec8d6",
  "#f0719a",
  "#f3ead7",
  "#8fd18a",
  "#d98b6c",
  "#6ec8b0",
  "#e8d27a",
];
const SEATS: Seat[] = ["stirrer", "singer", "spark", "seer"];

const sensorSchema = z.object({
  loudness: z.number().min(0).max(1).default(0),
  pitch: z.number().min(0).max(1).default(0.5),
  burst: z.number().min(0).max(1).default(0),
  tiltX: z.number().min(-1).max(1).default(0),
  tiltY: z.number().min(-1).max(1).default(0),
  shake: z.number().min(0).max(1).default(0),
  sampleHue: z.number().min(0).max(360).nullable().default(null),
  wave: z.number().min(0).max(1).default(0),
  mic: z.boolean().default(false),
  camera: z.boolean().default(false),
  motion: z.boolean().default(false),
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

type RoomRow = { code: string; host_id: string; vibe: string; locked: boolean; consent: string | null };
type MemberRow = {
  device_id: string;
  name: string;
  role: string;
  seat: string;
  color: string;
  sensors: string;
};
type DropRow = {
  id: string;
  ingredient: string;
  by_device: string;
  at_ms: number | string;
  neutral: boolean;
};

function parseConsent(raw: string | null): ConsentView | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as ConsentView;
    if (!value || typeof value.creationId !== "string") return null;
    return value;
  } catch {
    return null;
  }
}

async function prune(sql: Sql) {
  await sql.query(
    `delete from conjure_members where last_seen < now() - interval '45 seconds'`,
  );
  const lonely = await sql.query<{ code: string; host_id: string }>(
    `select r.code, r.host_id from conjure_rooms r
     where not exists (select 1 from conjure_members m where m.code = r.code and m.device_id = r.host_id)`,
  );
  for (const room of lonely) {
    const next = await sql.query<{ device_id: string }>(
      `select device_id from conjure_members where code = $1 and role <> 'spectator'
       order by last_seen desc limit 1`,
      [room.code],
    );
    if (!next[0]) {
      await sql.query(`delete from conjure_rooms where code = $1`, [room.code]);
    } else {
      await sql.query(`update conjure_rooms set host_id = $2 where code = $1`, [room.code, next[0].device_id]);
      await sql.query(
        `update conjure_members set role = 'player' where code = $1 and role = 'host'`,
        [room.code],
      );
      await sql.query(
        `update conjure_members set role = 'host' where code = $1 and device_id = $2`,
        [room.code, next[0].device_id],
      );
    }
  }
}

async function snapshot(sql: Sql, code: string): Promise<Response> {
  const rooms = await sql.query<RoomRow>(
    `select code, host_id, vibe, locked, consent from conjure_rooms where code = $1`,
    [code],
  );
  const room = rooms[0];
  if (!room) return json({ error: "That circle is gone." }, 404);
  const members = await sql.query<MemberRow>(
    `select device_id, name, role, seat, color, sensors from conjure_members
     where code = $1 order by last_seen asc`,
    [code],
  );
  const drops = await sql.query<DropRow>(
    `select id, ingredient, by_device, at_ms, neutral from conjure_drops
     where code = $1 order by at_ms asc limit 80`,
    [code],
  );
  const body = {
    code: room.code,
    hostId: room.host_id,
    vibe: room.vibe as Vibe,
    locked: Boolean(room.locked),
    consent: parseConsent(room.consent),
    members: members.map(toMember),
    drops: drops.map(toDrop),
  };
  return json(body);
}

function toMember(row: MemberRow): Member {
  let sensors: z.infer<typeof sensorSchema> = {
    loudness: 0,
    pitch: 0.5,
    burst: 0,
    tiltX: 0,
    tiltY: 0,
    shake: 0,
    sampleHue: null,
    wave: 0,
    mic: false,
    camera: false,
    motion: false,
  };
  try {
    const parsed = sensorSchema.safeParse({ ...sensors, ...JSON.parse(row.sensors || "{}") });
    if (parsed.success) sensors = parsed.data;
  } catch {
    /* keep defaults */
  }
  return {
    id: row.device_id,
    name: row.name,
    role: row.role === "host" || row.role === "spectator" ? row.role : "player",
    seat: (SEATS.includes(row.seat as Seat) ? row.seat : "stirrer") as Seat,
    color: row.color,
    ...sensors,
  };
}

function toDrop(row: DropRow): Drop {
  return {
    id: row.id,
    ingredient: row.ingredient as IngredientId,
    by: row.by_device,
    at: Number(row.at_ms),
    neutral: Boolean(row.neutral),
  };
}

async function isHost(sql: Sql, code: string, device: string): Promise<boolean> {
  const rows = await sql.query<{ host_id: string }>(
    `select host_id from conjure_rooms where code = $1`,
    [code],
  );
  return rows[0]?.host_id === device;
}

async function touch(sql: Sql, code: string, device: string) {
  await sql.query(
    `update conjure_members set last_seen = now() where code = $1 and device_id = $2`,
    [code, device],
  );
}

export async function handleConjure(request: Request): Promise<Response> {
  try {
    const sql = await getSql();
    if (request.method === "GET") {
      const url = new URL(request.url);
      const code = (url.searchParams.get("code") || "").toUpperCase();
      const device = url.searchParams.get("device") || "";
      if (!roomCodeOk(code)) return json({ error: "That code is not valid." }, 400);
      await prune(sql);
      if (DEVICE.safeParse(device).success) await touch(sql, code, device);
      return snapshot(sql, code);
    }
    if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON." }, 400);
    }
    const op = z.object({ op: z.string() }).safeParse(body);
    if (!op.success) return json({ error: "Missing op." }, 400);
    await prune(sql);
    switch (op.data.op) {
      case "create":
        return createRoom(sql, body);
      case "join":
        return joinRoom(sql, body);
      case "leave":
        return leaveRoom(sql, body);
      case "drop":
        return addDrop(sql, body);
      case "sensor":
        return setSensor(sql, body);
      case "vibe":
        return setVibe(sql, body);
      case "lock":
        return setLock(sql, body);
      case "kick":
        return kick(sql, body);
      case "handoff":
        return handoff(sql, body);
      case "seat":
        return setSeat(sql, body);
      case "consent-open":
        return consentOpen(sql, body);
      case "consent-vote":
        return consentVote(sql, body);
      case "neutralize":
        return neutralize(sql, body);
      case "report":
        return report(sql, body);
      case "event":
        return event(sql, body);
      case "mint-touch":
        return mintTouch(sql, body);
      case "board-list":
        return listBoard(sql);
      case "board-publish":
        return publishBoard(sql, body);
      case "board-hide":
        return hideBoard(sql, body);
      default:
        return json({ error: "Unknown request." }, 400);
    }
  } catch (error) {
    console.error("[conjure]", error);
    return json({ error: "The circle stalled." }, 500);
  }
}

async function createRoom(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, name: z.string(), vibe: VIBE }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not open a circle." }, 400);
  const name = cleanName(parsed.data.name);
  if (!name) return json({ error: "Pick another name." }, 400);
  const used = await sql.query<{ n: number }>(
    `select count(*)::int as n from conjure_room_creates
     where device_id = $1 and created_at > now() - interval '1 hour'`,
    [parsed.data.device],
  );
  if ((used[0]?.n ?? 0) >= 8) return json({ error: "Too many new circles this hour." }, 429);
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    const next = makeRoomCode();
    const hit = await sql.query<{ code: string }>(`select code from conjure_rooms where code = $1`, [next]);
    if (!hit[0]) {
      code = next;
      break;
    }
  }
  if (!code) return json({ error: "Could not open a circle." }, 503);
  await sql.query(
    `insert into conjure_rooms (code, host_id, vibe) values ($1, $2, $3)`,
    [code, parsed.data.device, parsed.data.vibe],
  );
  await sql.query(
    `insert into conjure_members (code, device_id, name, role, seat, color)
     values ($1, $2, $3, 'host', 'stirrer', $4)`,
    [code, parsed.data.device, name, COLORS[0]],
  );
  await sql.query(`insert into conjure_room_creates (device_id) values ($1)`, [parsed.data.device]);
  return snapshot(sql, code);
}

async function joinRoom(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({
      device: DEVICE,
      code: CODE,
      name: z.string(),
      watch: z.boolean().default(false),
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Could not join." }, 400);
  const name = cleanName(parsed.data.name);
  if (!name) return json({ error: "Pick another name." }, 400);
  const rooms = await sql.query<{ locked: boolean }>(
    `select locked from conjure_rooms where code = $1`,
    [parsed.data.code],
  );
  if (!rooms[0]) return json({ error: "That circle is gone." }, 404);
  const existing = await sql.query<{ device_id: string }>(
    `select device_id from conjure_members where code = $1 and device_id = $2`,
    [parsed.data.code, parsed.data.device],
  );
  if (!existing[0] && rooms[0].locked) return json({ error: "The host locked this circle." }, 403);
  const members = await sql.query<{ role: string }>(
    `select role from conjure_members where code = $1`,
    [parsed.data.code],
  );
  const players = members.filter((m) => m.role !== "spectator").length;
  const specs = members.filter((m) => m.role === "spectator").length;
  if (!existing[0] && parsed.data.watch && specs >= 40) {
    return json({ error: "The wall is full." }, 403);
  }
  if (!existing[0] && !parsed.data.watch && players >= 12) {
    return json({ error: "This circle is full." }, 403);
  }
  const color = COLORS[members.length % COLORS.length] ?? COLORS[0];
  const seat = SEATS[members.length % SEATS.length] ?? "stirrer";
  const role = parsed.data.watch ? "spectator" : "player";
  await sql.query(
    `insert into conjure_members (code, device_id, name, role, seat, color)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (code, device_id) do update set name = excluded.name, last_seen = now()`,
    [parsed.data.code, parsed.data.device, name, role, seat, color],
  );
  return snapshot(sql, parsed.data.code);
}

async function leaveRoom(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not leave." }, 400);
  await sql.query(`delete from conjure_members where code = $1 and device_id = $2`, [
    parsed.data.code,
    parsed.data.device,
  ]);
  await prune(sql);
  return json({ ok: true });
}

async function addDrop(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({
      device: DEVICE,
      code: CODE,
      id: z.string().regex(/^[a-z0-9]{4,16}$/),
      ingredient: ING,
      at: z.number().int(),
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "That drop did not land." }, 400);
  const member = await sql.query<{ role: string }>(
    `select role from conjure_members where code = $1 and device_id = $2`,
    [parsed.data.code, parsed.data.device],
  );
  if (!member[0]) return json({ error: "Join the circle first." }, 403);
  if (member[0].role === "spectator") return json({ error: "Spectators watch." }, 403);
  const count = await sql.query<{ n: number }>(
    `select count(*)::int as n from conjure_drops where code = $1`,
    [parsed.data.code],
  );
  if ((count[0]?.n ?? 0) >= 80) return json({ error: "The cauldron is full." }, 403);
  await sql.query(
    `insert into conjure_drops (id, code, ingredient, by_device, at_ms)
     values ($1, $2, $3, $4, $5) on conflict (id) do nothing`,
    [parsed.data.id, parsed.data.code, parsed.data.ingredient, parsed.data.device, parsed.data.at],
  );
  await touch(sql, parsed.data.code, parsed.data.device);
  return snapshot(sql, parsed.data.code);
}

async function setSensor(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({ device: DEVICE, code: CODE, sensors: sensorSchema })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Levels were rejected." }, 400);
  await sql.query(
    `update conjure_members set sensors = $3, last_seen = now()
     where code = $1 and device_id = $2`,
    [parsed.data.code, parsed.data.device, JSON.stringify(parsed.data.sensors)],
  );
  return snapshot(sql, parsed.data.code);
}

async function setVibe(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, vibe: VIBE }).safeParse(body);
  if (!parsed.success) return json({ error: "Vibe rejected." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host sets the vibe." }, 403);
  }
  await sql.query(`update conjure_rooms set vibe = $2, updated_at = now() where code = $1`, [
    parsed.data.code,
    parsed.data.vibe,
  ]);
  return snapshot(sql, parsed.data.code);
}

async function setLock(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, locked: z.boolean() }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not lock." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host locks the circle." }, 403);
  }
  await sql.query(`update conjure_rooms set locked = $2 where code = $1`, [
    parsed.data.code,
    parsed.data.locked,
  ]);
  return snapshot(sql, parsed.data.code);
}

async function kick(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, target: DEVICE }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not remove them." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host removes people." }, 403);
  }
  if (parsed.data.target === parsed.data.device) return json({ error: "Hand the circle off first." }, 400);
  await sql.query(`delete from conjure_members where code = $1 and device_id = $2`, [
    parsed.data.code,
    parsed.data.target,
  ]);
  return snapshot(sql, parsed.data.code);
}

async function handoff(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, target: DEVICE }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not hand off." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host hands off." }, 403);
  }
  await sql.query(
    `update conjure_members set role = 'player' where code = $1 and device_id = $2`,
    [parsed.data.code, parsed.data.device],
  );
  await sql.query(
    `update conjure_members set role = 'host' where code = $1 and device_id = $2`,
    [parsed.data.code, parsed.data.target],
  );
  await sql.query(`update conjure_rooms set host_id = $2 where code = $1`, [
    parsed.data.code,
    parsed.data.target,
  ]);
  return snapshot(sql, parsed.data.code);
}

async function setSeat(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, seat: SEAT }).safeParse(body);
  if (!parsed.success) return json({ error: "Role rejected." }, 400);
  await sql.query(`update conjure_members set seat = $3 where code = $1 and device_id = $2`, [
    parsed.data.code,
    parsed.data.device,
    parsed.data.seat,
  ]);
  return snapshot(sql, parsed.data.code);
}

async function consentOpen(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, code: CODE, creationId: z.string().max(16) }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not ask the circle." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host captures." }, 403);
  }
  const consent: ConsentView = {
    creationId: parsed.data.creationId,
    openedAt: Date.now(),
    votes: { [parsed.data.device]: "in" },
  };
  await sql.query(`update conjure_rooms set consent = $2 where code = $1`, [
    parsed.data.code,
    JSON.stringify(consent),
  ]);
  return snapshot(sql, parsed.data.code);
}

async function consentVote(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({ device: DEVICE, code: CODE, choice: z.enum(["in", "out"]) })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Vote rejected." }, 400);
  const rooms = await sql.query<{ consent: string | null }>(
    `select consent from conjure_rooms where code = $1`,
    [parsed.data.code],
  );
  const consent = parseConsent(rooms[0]?.consent ?? null);
  if (!consent) return json({ error: "Nothing to answer." }, 400);
  consent.votes[parsed.data.device] = parsed.data.choice;
  await sql.query(`update conjure_rooms set consent = $2 where code = $1`, [
    parsed.data.code,
    JSON.stringify(consent),
  ]);
  return snapshot(sql, parsed.data.code);
}

async function neutralize(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({ device: DEVICE, code: CODE, ids: z.array(z.string()).max(80) })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Could not update credit." }, 400);
  if (!(await isHost(sql, parsed.data.code, parsed.data.device))) {
    return json({ error: "Only the host finalizes." }, 403);
  }
  if (parsed.data.ids.length) {
    await sql.query(
      `update conjure_drops set neutral = true where code = $1 and id = any($2::text[])`,
      [parsed.data.code, parsed.data.ids],
    );
  }
  await sql.query(`update conjure_rooms set consent = null where code = $1`, [parsed.data.code]);
  return snapshot(sql, parsed.data.code);
}

async function report(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({ creationId: z.string().max(32), reason: z.enum(["spam", "unsafe", "other"]) })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Report rejected." }, 400);
  await sql.query(`insert into conjure_reports (creation_id, reason) values ($1, $2)`, [
    parsed.data.creationId,
    parsed.data.reason,
  ]);
  return json({ ok: true });
}

async function event(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ name: z.enum(["share", "remix", "capture", "mint"]) }).safeParse(body);
  if (!parsed.success) return json({ error: "Event rejected." }, 400);
  await sql.query(`insert into conjure_events (name) values ($1)`, [parsed.data.name]);
  return json({ ok: true });
}

async function mintTouch(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE, creationId: z.string().max(32) }).safeParse(body);
  if (!parsed.success) return json({ error: "Mint check failed." }, 400);
  const rows = await sql.query<{ n: number }>(
    `select count(*)::int as n from conjure_mints
     where device_id = $1 and created_at > now() - interval '1 day'`,
    [parsed.data.device],
  );
  const used = rows[0]?.n ?? 0;
  if (!withinDailyCap(used, 5)) return json({ error: "Daily mint cap reached.", used }, 429);
  await sql.query(
    `insert into conjure_mints (device_id, creation_id) values ($1, $2)
     on conflict (device_id, creation_id) do nothing`,
    [parsed.data.device, parsed.data.creationId],
  );
  return json({ ok: true, used });
}

const LEVEL = z.enum(["spark", "stir", "circle", "keep", "master"]);

async function listBoard(sql: Sql): Promise<Response> {
  const rows = await sql.query<{ handle: string; xp: number; streak: number; level: string }>(
    `select handle, xp, streak, level from conjure_board order by xp desc, updated_at asc limit 20`,
  );
  return json({
    rows: rows.map((row) => ({
      handle: row.handle,
      xp: Number(row.xp) || 0,
      streak: Number(row.streak) || 0,
      level: row.level,
    })),
  });
}

async function publishBoard(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z
    .object({
      device: DEVICE,
      handle: z.string().max(32),
      xp: z.number().int().min(0).max(100000),
      streak: z.number().int().min(0).max(9999),
      level: LEVEL,
    })
    .safeParse(body);
  if (!parsed.success) return json({ error: "Could not post a score." }, 400);
  const handle = cleanHandle(parsed.data.handle);
  if (!handle) return json({ error: "Pick a handle. No email or wallet address." }, 400);
  await sql.query(
    `insert into conjure_board (device_id, handle, xp, streak, level)
     values ($1, $2, $3, $4, $5)
     on conflict (device_id) do update
       set handle = excluded.handle, xp = excluded.xp, streak = excluded.streak,
           level = excluded.level, updated_at = now()`,
    [parsed.data.device, handle, parsed.data.xp, parsed.data.streak, parsed.data.level],
  );
  return listBoard(sql);
}

async function hideBoard(sql: Sql, body: unknown): Promise<Response> {
  const parsed = z.object({ device: DEVICE }).safeParse(body);
  if (!parsed.success) return json({ error: "Could not hide the score." }, 400);
  await sql.query(`delete from conjure_board where device_id = $1`, [parsed.data.device]);
  return listBoard(sql);
}
