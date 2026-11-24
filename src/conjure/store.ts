import { create } from "zustand";
import type { IngredientId, Vibe, FormId, Drop } from "./brew";
import { newId } from "./storage";

export type Seat = "stirrer" | "singer" | "spark" | "seer";
export type MemberRole = "host" | "player" | "spectator";

export type Member = {
  id: string;
  name: string;
  role: MemberRole;
  seat: Seat;
  color: string;
  mic: boolean;
  camera: boolean;
  motion: boolean;
  loudness: number;
  pitch: number;
  burst: number;
  tiltX: number;
  tiltY: number;
  shake: number;
  sampleHue: number | null;
  wave: number;
};

export type ConsentView = {
  creationId: string;
  openedAt: number;
  votes: Record<string, "in" | "out">;
};

type State = {
  started: boolean;
  vibe: Vibe;
  form: FormId;
  drops: Drop[];
  name: string;
  roomCode: string;
  members: Member[];
  hostId: string;
  locked: boolean;
  consent: ConsentView | null;
  notice: string;
  recording: number;
  start: () => void;
  setVibe: (vibe: Vibe) => void;
  cycleVibe: () => void;
  setForm: (form: FormId) => void;
  setName: (name: string) => void;
  addDrop: (ingredient: IngredientId, by: string) => Drop;
  setDrops: (drops: Drop[]) => void;
  applyRoom: (room: {
    code: string;
    hostId: string;
    vibe: Vibe;
    locked: boolean;
    drops: Drop[];
    members: Member[];
    consent: ConsentView | null;
  }) => void;
  clearRoom: () => void;
  setNotice: (notice: string) => void;
  setRecording: (seconds: number) => void;
};

const VIBES: Vibe[] = ["calm", "chaotic", "spooky"];

export const useBrew = create<State>((set, get) => ({
  started: false,
  vibe: "calm",
  form: "orb",
  drops: [],
  name: "",
  roomCode: "",
  members: [],
  hostId: "",
  locked: false,
  consent: null,
  notice: "",
  recording: 0,
  start: () => set({ started: true }),
  setVibe: (vibe) => set({ vibe }),
  cycleVibe: () => {
    const i = VIBES.indexOf(get().vibe);
    set({ vibe: VIBES[(i + 1) % VIBES.length] });
  },
  setForm: (form) => set({ form }),
  setName: (name) => set({ name }),
  addDrop: (ingredient, by) => {
    const drop: Drop = { id: newId(), ingredient, by, at: Date.now() };
    set({ drops: [...get().drops, drop].slice(-80) });
    return drop;
  },
  setDrops: (drops) => set({ drops }),
  applyRoom: (room) =>
    set({
      roomCode: room.code,
      hostId: room.hostId,
      vibe: room.vibe,
      locked: room.locked,
      drops: room.drops,
      members: room.members,
      consent: room.consent,
    }),
  clearRoom: () =>
    set({
      roomCode: "",
      members: [],
      hostId: "",
      locked: false,
      consent: null,
    }),
  setNotice: (notice) => set({ notice }),
  setRecording: (recording) => set({ recording }),
}));
