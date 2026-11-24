import type { Vibe, IngredientId, Drop } from "./brew";
import type { ConsentView, Member, Seat } from "./store";

export type RoomSnapshot = {
  code: string;
  hostId: string;
  vibe: Vibe;
  locked: boolean;
  drops: Drop[];
  members: Member[];
  consent: ConsentView | null;
};

export class RoomError extends Error {}

export async function roomCall(body: Record<string, unknown>): Promise<RoomSnapshot | { ok: true; used?: number }> {
  const res = await fetch("/api/conjure", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { error?: string; used?: number; code?: string };
  if (!res.ok) throw new RoomError(data.error || "The circle did not answer.");
  return data as RoomSnapshot | { ok: true; used?: number };
}

export async function roomGet(code: string, deviceId: string): Promise<RoomSnapshot> {
  const res = await fetch(
    `/api/conjure?code=${encodeURIComponent(code)}&device=${encodeURIComponent(deviceId)}`,
  );
  const data = (await res.json()) as RoomSnapshot & { error?: string };
  if (!res.ok) throw new RoomError(data.error || "That circle is gone.");
  return data;
}

export type { Seat, IngredientId };
