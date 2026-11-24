export type Vote = "in" | "out";

/** Include by default only when the person is signed in and has opted in. */
export function defaultIncluded(signedIn: boolean, optedIn: boolean): boolean {
  return signedIn && optedIn;
}

export function withinDailyCap(used: number, cap = 5): boolean {
  return Number.isFinite(used) && used < cap;
}

/**
 * Host capture counts as include for the host.
 * Everyone else who does not vote in time uses the signed-in opt-in default.
 */
export function resolveVotes(
  voters: { id: string; isHost: boolean }[],
  votes: Record<string, Vote | undefined>,
  signedIn: Record<string, boolean>,
  optedIn: Record<string, boolean>,
): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const voter of voters) {
    const vote = votes[voter.id];
    if (vote === "in") result[voter.id] = true;
    else if (vote === "out") result[voter.id] = false;
    else if (voter.isHost) result[voter.id] = true;
    else result[voter.id] = defaultIncluded(Boolean(signedIn[voter.id]), Boolean(optedIn[voter.id]));
  }
  return result;
}

const BLOCK =
  /\b(fuck|shit|cunt|nigger|nigga|faggot|fag|bitch|asshole|slut|retard)\b/i;

/** Display names are short and filtered. Null means "pick another". */
export function cleanName(raw: string): string | null {
  const name = raw.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 18);
  if (name.length < 2) return null;
  if (BLOCK.test(name)) return null;
  return name;
}

export function roomCodeOk(code: string): boolean {
  return /^[A-HJ-NP-Z2-9]{4}$/.test(code);
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeRoomCode(random: () => number = Math.random): string {
  let code = "";
  for (let i = 0; i < 4; i += 1) code += ALPHABET[Math.floor(random() * ALPHABET.length)];
  return code;
}
