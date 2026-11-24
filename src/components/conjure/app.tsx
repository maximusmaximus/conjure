import { BoardSheet, LevelSheet, NextStep, TipCard, ToolDock, WalletSheet, type BoardRow } from "@/components/conjure/layers";
import { Link } from "@tanstack/react-router";
import { Component, lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { burstSound, isMuted, pluck, setMuted, unlockAudio } from "@/conjure/audio";
import { roomCall, roomGet, RoomError } from "@/conjure/api";
import {
  FORMS,
  INGREDIENTS,
  VIBES,
  blendSensors,
  computeBrew,
  hslToHex,
  ingredientById,
  titleFromDrops,
  type Drop,
  type FormId,
  type IngredientId,
  type Vibe,
} from "@/conjure/brew";
import { CHAIN, connectWallet, mintWithWallet, walletAvailable, type WalletState } from "@/conjure/chain";
import { resolveVotes } from "@/conjure/consent";
import { decayFling, flingVel, haptic, isFling, pointerDown, pointerMove, pointerUp, sceneMoving } from "@/conjure/fling";
import { FlatBrew } from "@/conjure/flat";
import { XeIcon } from "@/conjure/icons";
import { burstSparks, downloadGlb, flashPulse, liveSensor, masterMix, punchColor, remoteSensor, shownColor, startAR, takeStill, toolTouch, pulse } from "@/conjure/live";
import { probeQuality, type Quality } from "@/conjure/quality";
import { brewMetadata, impulse, rememberMotion, restoreSpin, spin, spinSnapshot, stepSpin } from "@/conjure/spin";
import {
  award,
  cleanHandle,
  currentTip,
  dismissTip,
  emptyProgress,
  loadBoardPrefs,
  loadDismissedTips,
  loadProgress,
  nextStepId,
  saveBoardPrefs,
  saveProgress,
  walletUnlocked,
  type Action,
  type BoardPrefs,
  type Progress,
  type TipId,
} from "@/conjure/progress";
import { useSensors, type SensorKind } from "@/conjure/sensors";
import {
  creationById,
  decodeCreation,
  deviceId,
  encodeCreation,
  loadCreations,
  loadFlags,
  loadName,
  loadOptIn,
  newId,
  saveCreation,
  saveFlags,
  saveMint,
  saveName,
  saveOptIn,
  trackLocal,
  type Creation,
  type Flags,
  defaultFlags,
} from "@/conjure/storage";
import { useBrew, type Seat } from "@/conjure/store";
import { cleanName } from "@/conjure/consent";
import { t } from "@/i18n";

const CauldronScene = lazy(() =>
  import("@/conjure/scene").then((mod) => ({ default: mod.CauldronScene })),
);

class StageBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { bad: boolean }> {
  state = { bad: false };
  static getDerivedStateFromError(): { bad: boolean } {
    return { bad: true };
  }
  render() {
    return this.state.bad ? this.props.fallback : this.props.children;
  }
}

const SEAT_EMOJI: Record<Seat, string> = {
  stirrer: "🥄",
  singer: "🎵",
  spark: "⚡",
  seer: "👁️",
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ConjureApp({
  invite = "",
  watch = false,
  replay = null,
}: {
  invite?: string;
  watch?: boolean;
  replay?: Creation | null;
}) {
  const started = useBrew((s) => s.started);
  const vibe = useBrew((s) => s.vibe);
  const form = useBrew((s) => s.form);
  const drops = useBrew((s) => s.drops);
  const name = useBrew((s) => s.name);
  const roomCode = useBrew((s) => s.roomCode);
  const members = useBrew((s) => s.members);
  const hostId = useBrew((s) => s.hostId);
  const locked = useBrew((s) => s.locked);
  const consent = useBrew((s) => s.consent);
  const notice = useBrew((s) => s.notice);
  const recording = useBrew((s) => s.recording);
  const setNotice = useBrew((s) => s.setNotice);

  const [flags, setFlags] = useState<Flags>(defaultFlags);
  const [kind, setKind] = useState<SensorKind>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [joinCode, setJoinCode] = useState(invite);
  const [quality, setQuality] = useState<Quality | null>(null);
  const [reduced, setReduced] = useState(false);
  const [xr, setXr] = useState(false);
  const [review, setReview] = useState<Creation | null>(null);
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [gallery, setGallery] = useState<Creation[]>([]);
  const [qr, setQr] = useState("");
  const [muted, setMutedState] = useState(false);
  const [liveMsg, setLiveMsg] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [graphics, setGraphics] = useState<"3d" | "flat">("3d");
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [dismissed, setDismissed] = useState<TipId[]>([]);
  const [boardPrefs, setBoardPrefs] = useState<BoardPrefs>({ optIn: false, handle: "", hidden: false });
  const [boardRows, setBoardRows] = useState<BoardRow[]>([]);
  const [tray, setTray] = useState(true);
  const [retired, setRetired] = useState<string[]>([]);
  const deviceRef = useRef("d_pending00");
  const loops = useRef(new Map<string, Blob>());
  const dragging = useRef(false);
  const sparkAt = useRef(0);
  const kindRef = useRef<SensorKind>(null);

  const sensors = useSensors(kind, (message) => {
    setRetired((list) => list.filter((id) => id !== `sensor:${kindRef.current}`));
    setTray(true);
    setKind(null);
    kindRef.current = null;
    setNotice(`${message} ${t("denied")}`);
  });

  useEffect(() => {
    const id = deviceId();
    deviceRef.current = id;
    const storedName = loadName();
    const picked =
      storedName ||
      `${["amber", "quiet", "moss", "brass", "ink"][Math.floor(Math.random() * 5)]}-${["ladle", "moon", "well"][Math.floor(Math.random() * 3)]}`;
    if (!storedName) saveName(picked);
    useBrew.getState().setName(picked);
    setDraftName(picked);
    setFlags(loadFlags());
    setOptIn(loadOptIn());
    setGallery(loadCreations());
    setProgress(loadProgress());
    setDismissed(loadDismissedTips());
    setBoardPrefs(loadBoardPrefs());
    const remixRaw = sessionStorage.getItem("conjure.remix");
    if (remixRaw) {
      sessionStorage.removeItem("conjure.remix");
      try {
        const creation = JSON.parse(remixRaw) as Creation;
        useBrew.setState({
          started: true,
          drops: creation.drops.map((drop) => ({ ...drop, neutral: false })),
          vibe: creation.vibe,
          form: creation.form,
        });
        if (creation.spin) restoreSpin(creation.spin);
        setReview(null);
      } catch {
        /* ignore a bad stash */
      }
    }
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => setReduced(reducedQuery.matches);
    applyReduced();
    reducedQuery.addEventListener("change", applyReduced);
    const nav = navigator as Navigator & { xr?: { isSessionSupported: (mode: string) => Promise<boolean> } };
    if (nav.xr) {
      void nav.xr.isSessionSupported("immersive-ar").then(setXr).catch(() => setXr(false));
    }
    return () => reducedQuery.removeEventListener("change", applyReduced);
  }, []);

  useEffect(() => {
    let stop = false;
    const run = () => {
      void probeQuality({ master: progress.level === "master" }).then((next) => {
        if (stop) return;
        setQuality(next);
        if (!next.webgl2) setGraphics("flat");
      });
    };
    run();
    window.addEventListener("resize", run);
    return () => {
      stop = true;
      window.removeEventListener("resize", run);
    };
  }, [progress.level]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    let last = performance.now();
    let prevTiltX = liveSensor.tiltX;
    let prevTiltY = liveSensor.tiltY;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (masterMix.freeze) {
        spin.vx = 0;
        spin.vy = 0;
        spin.vz = 0;
      } else {
        if (!reduced) {
          decayFling(dt);
          liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + flingVel.x * dt * 8));
          liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + flingVel.y * dt * 8));
        }
        const tiltDx = liveSensor.tiltX - prevTiltX;
        const tiltDy = liveSensor.tiltY - prevTiltY;
        prevTiltX = liveSensor.tiltX;
        prevTiltY = liveSensor.tiltY;
        const scale = reduced ? 0.35 : 1;
        impulse(tiltDy * 3.1 * scale, tiltDx * 3.1 * scale, 0);
        impulse(flingVel.y * dt * 5 * scale, flingVel.x * dt * 6 * scale, 0);
        if (liveSensor.loudness > 0.08) impulse(0, liveSensor.loudness * dt * 3.4 * scale, 0);
        if (liveSensor.wave > 0.05) impulse(0, 0, liveSensor.wave * dt * 2.8 * scale);
        if (toolTouch.stir) impulse(0, masterMix.stir * dt * 2.4 * scale, 0);
        if (toolTouch.swirl) impulse(0, 0, masterMix.swirl * dt * 2.2 * scale);
        stepSpin(dt * scale);
      }
      const stage = document.querySelector(".stage");
      if (stage instanceof HTMLElement) {
        const shown = shownColor(useBrew.getState().drops, useBrew.getState().vibe);
        stage.dataset.hue = String(Math.round(shown.hue));
        stage.dataset.spin = Math.hypot(spin.vx, spin.vy, spin.vz).toFixed(3);
        stage.dataset.drops = String(useBrew.getState().drops.length);
        stage.style.setProperty("--brew", shown.hex);
        const ring = stage.querySelector(".brew-pulse");
        if (ring instanceof HTMLElement) {
          const left = pulse.until - Date.now();
          if (left > 0) {
            const t = 1 - left / Math.max(1, pulse.ms);
            ring.style.opacity = String(Math.max(0, (1 - t) * 0.95));
            ring.style.transform = `translate(-50%, -54%) scale(${0.65 + t * 2.5})`;
            ring.style.borderColor = pulse.hex;
          } else if (ring.style.opacity !== "0") {
            ring.style.opacity = "0";
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, reduced]);

  function grant(action: Action) {
    setProgress((current) => {
      const result = award(current, action);
      saveProgress(result.progress);
      if (result.leveledUp) {
        setNotice(`${t("levelUp")}: ${t(`level.${result.progress.level}`)}`);
      }
      return result.progress;
    });
  }

  useEffect(() => {
    if (!boardPrefs.optIn) return;
    const handle = cleanHandle(boardPrefs.handle);
    if (!handle) return;
    const timer = window.setTimeout(() => {
      void roomCall({
        op: "board-publish",
        device: deviceRef.current,
        handle,
        xp: progress.xp,
        streak: progress.streak,
        level: progress.level,
      })
        .then((data) => {
          const rows = (data as { rows?: BoardRow[] }).rows;
          if (rows) setBoardRows(rows);
        })
        .catch(() => undefined);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [boardPrefs.optIn, boardPrefs.handle, progress.xp, progress.streak, progress.level]);

  useEffect(() => {
    if (!roomCode) return;
    let stop = false;
    const tick = async () => {
      try {
        const snap = await roomGet(roomCode, deviceRef.current);
        if (stop) return;
        useBrew.getState().applyRoom(snap);
        const others = snap.members.filter((member) => member.id !== deviceRef.current);
        Object.assign(
          remoteSensor,
          blendSensors(
            others.map((member) => ({
              loudness: member.loudness,
              pitch: member.pitch,
              burst: member.burst,
              tiltX: member.tiltX,
              tiltY: member.tiltY,
              shake: member.shake,
              sampleHue: member.sampleHue,
              wave: member.wave,
            })),
          ),
        );
      } catch (error) {
        if (!stop) setNotice(error instanceof Error ? error.message : t("full"));
      }
    };
    void tick();
    const id = window.setInterval(() => void tick(), 900);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [roomCode, setNotice]);

  useEffect(() => {
    if (!roomCode) return;
    const id = window.setInterval(() => {
      void roomCall({
        op: "sensor",
        device: deviceRef.current,
        code: roomCode,
        sensors: {
          ...liveSensor,
          mic: kind === "mic",
          camera: kind === "camera",
          motion: kind === "motion",
        },
      }).catch(() => undefined);
    }, 700);
    return () => window.clearInterval(id);
  }, [roomCode, kind]);

  useEffect(() => {
    if (!replay) return;
    useBrew.setState({ started: true, vibe: replay.vibe, form: replay.form, drops: [] });
    if (replay.spin) restoreSpin(replay.spin);
    const source = replay.drops;
    if (!source.length) {
      useBrew.getState().setDrops([]);
      return;
    }
    const start = Math.min(...source.map((drop) => drop.at));
    const span = Math.max(1, Math.max(...source.map((drop) => drop.at)) - start);
    let frame = 0;
    let prevCycle = 0;
    const begun = performance.now();
    const loop = (now: number) => {
      const cycle = ((now - begun) % 6000) / 6000;
      if (cycle < prevCycle && replay.spin) restoreSpin(replay.spin);
      prevCycle = cycle;
      const visible = source
        .filter((drop) => (drop.at - start) / span <= cycle / 0.8)
        .map((drop) => ({ ...drop, at: Date.now() - 2000 }));
      useBrew.getState().setDrops(visible);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [replay]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "Escape") {
        setSheet(null);
        return;
      }
      if (!useBrew.getState().started || replay) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < INGREDIENTS.length) {
        event.preventDefault();
        void drop(INGREDIENTS[index].id);
      }
      if (event.key === "c") void capture();
      if (event.key === "ArrowLeft") {
        liveSensor.tiltX = Math.max(-1, liveSensor.tiltX - 0.35);
        impulse(0, -1.1, 0);
      }
      if (event.key === "ArrowRight") {
        liveSensor.tiltX = Math.min(1, liveSensor.tiltX + 0.35);
        impulse(0, 1.1, 0);
      }
      if (event.key === "ArrowUp") {
        liveSensor.tiltY = Math.max(-1, liveSensor.tiltY - 0.35);
        impulse(-1.1, 0, 0);
      }
      if (event.key === "ArrowDown") {
        liveSensor.tiltY = Math.min(1, liveSensor.tiltY + 0.35);
        impulse(1.1, 0, 0);
      }
      if (event.key === " ") {
        event.preventDefault();
        liveSensor.burst = 1;
        liveSensor.shake = 1;
        impulse(0.4, 1.6, 0.5);
        burstSparks("#f6efe4", 8);
        burstSound();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [replay]);

  const me = members.find((member) => member.id === deviceRef.current);
  const spectating = me?.role === "spectator" || Boolean(replay);
  const isHost = !roomCode || hostId === deviceRef.current;
  const brew = useMemo(() => computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe), [drops, vibe, notice, recording]);

  function patchFlags(partial: Partial<Flags>) {
    setFlags((current) => {
      const next = { ...current, ...partial };
      saveFlags(next);
      return next;
    });
  }

  function ensureLive() {
    if (useBrew.getState().started) return;
    unlockAudio();
    useBrew.getState().start();
    grant("start");
  }

  function hideControl(id: string) {
    setRetired((list) => (list.includes(id) ? list : [...list, id]));
    setTray(false);
  }

  function sparksOnce(color: string) {
    const now = performance.now();
    if (now - sparkAt.current < 140) return;
    sparkAt.current = now;
    burstSparks(color, 8);
  }

  function armSensor(next: "mic" | "camera" | "motion") {
    ensureLive();
    kindRef.current = next;
    setKind(next);
    grant("sensor");
    patchFlags({ passedSensors: true, hintSensor: false });
    if (next === "mic") {
      liveSensor.loudness = 1;
      liveSensor.burst = 1;
      liveSensor.shake = 1;
      burstSound();
      punchColor("#f0b429", 42);
      burstSparks("#f0b429", 12);
      impulse(0.25, 2.9, 0.45);
      window.setTimeout(() => {
        if (liveSensor.loudness > 0.92) liveSensor.loudness = 0;
      }, 900);
      setNotice(t("mic.line2"));
    }
    if (next === "camera") {
      liveSensor.wave = 1;
      liveSensor.sampleHue = 196;
      liveSensor.burst = 0.85;
      const hex = hslToHex(196, 0.78, 0.52);
      punchColor(hex, 196);
      burstSparks(hex, 12);
      impulse(0.35, 0.45, 2.5);
      setNotice(t("cam.line2"));
    }
    if (next === "motion") {
      liveSensor.tiltX = 0.82;
      liveSensor.tiltY = -0.58;
      liveSensor.shake = 1;
      liveSensor.burst = 1;
      punchColor("#c9b6ff", 268);
      burstSparks("#c9b6ff", 12);
      impulse(2.1, 2.2, 0.8);
      setNotice(t("motion.line1"));
    }
    hideControl(`sensor:${next}`);
  }

  function onTool(id: "stir" | "hue" | "swirl" | "bloom" | "freeze", value: number) {
    ensureLive();
    if (id === "stir") {
      toolTouch.stir = true;
      impulse(0, 0.45 + value * 1.4, 0);
      liveSensor.burst = Math.min(1, 0.35 + value);
      sparksOnce("#e27a3a");
    }
    if (id === "hue") {
      toolTouch.hue = true;
      const hue = ((value % 360) + 360) % 360;
      const hex = hslToHex(hue, 0.82, 0.52);
      punchColor(hex, hue);
      sparksOnce(hex);
      impulse(0, 0.2, value / 90);
    }
    if (id === "swirl") {
      toolTouch.swirl = true;
      impulse(0, 0.25, 0.7 + value * 2.2);
      sparksOnce("#7ee0d0");
    }
    if (id === "bloom") {
      toolTouch.bloom = true;
      liveSensor.burst = Math.min(1, 0.25 + value);
      impulse(0.25, 0.45 + value * 0.8, 0.2);
      sparksOnce("#fff1c9");
    }
    if (id === "freeze") {
      toolTouch.freeze = true;
      if (value) {
        spin.vx = 0;
        spin.vy = 0;
        spin.vz = 0;
        punchColor("#d5e6f2", 200);
      } else {
        impulse(0.45, 1.5, 0.35);
        burstSparks("#f6efe4", 8);
      }
    }
  }

  function say(message: string) {
    setLiveMsg("");
    setTimeout(() => setLiveMsg(message), 20);
  }

  async function drop(id: IngredientId) {
    if (spectating) return;
    ensureLive();
    const ing = ingredientById(id);
    const hex = hslToHex(ing.hue, 0.84, 0.52);
    punchColor(hex, ing.hue);
    burstSparks(hex, 12);
    liveSensor.burst = 1;
    liveSensor.shake = 0.9;
    impulse((ing.spikes - 0.3) * 2.6, 1.15 + ing.energy * 1.7, (ing.hue / 180 - 1) * 1.6);
    pluck(ing.hue, ing.energy);
    const made = useBrew.getState().addDrop(id, deviceRef.current);
    patchFlags({ usedIngredient: true, hintDrop: false });
    grant("drop");
    hideControl(`ing:${id}`);
    say(`${ing.label} dropped in.`);
    if (roomCode) {
      try {
        const snap = await roomCall({
          op: "drop",
          device: deviceRef.current,
          code: roomCode,
          id: made.id,
          ingredient: id,
          at: made.at,
        });
        if ("drops" in snap) useBrew.getState().applyRoom(snap);
      } catch (error) {
        setNotice(error instanceof RoomError ? error.message : t("full"));
      }
    }
  }

  async function capture() {
    const state = useBrew.getState();
    if (!state.started || replay || state.recording) return;
    if (state.roomCode && state.hostId !== deviceRef.current) {
      setNotice(t("hostOnly"));
      return;
    }
    if (state.roomCode) {
      const others = state.members.filter(
        (member) => member.id !== deviceRef.current && member.role !== "spectator",
      );
      if (others.length) {
        try {
          await roomCall({
            op: "consent-open",
            device: deviceRef.current,
            code: state.roomCode,
            creationId: newId(),
          });
          await sleep(5200);
          const snap = await roomGet(state.roomCode, deviceRef.current);
          const votes = resolveVotes(
            snap.members
              .filter((member) => member.role !== "spectator")
              .map((member) => ({ id: member.id, isHost: member.id === snap.hostId })),
            snap.consent?.votes ?? {},
            {},
            {},
          );
          const excluded = Object.entries(votes)
            .filter(([, included]) => !included)
            .map(([id]) => id);
          const ids = snap.drops.filter((item) => excluded.includes(item.by)).map((item) => item.id);
          const done = await roomCall({
            op: "neutralize",
            device: deviceRef.current,
            code: state.roomCode,
            ids,
          });
          if ("drops" in done) useBrew.getState().applyRoom(done);
        } catch (error) {
          setNotice(error instanceof Error ? error.message : t("hostOnly"));
          return;
        }
      }
    }
    await recordLoop();
  }

  async function recordLoop() {
    const chunks: Blob[] = [];
    const canvas = document.querySelector(".stage canvas");
    let recorder: MediaRecorder | null = null;
    if (canvas instanceof HTMLCanvasElement && typeof canvas.captureStream === "function") {
      try {
        const stream = canvas.captureStream(24);
        const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
        const mime = types.find((type) => MediaRecorder.isTypeSupported(type));
        if (mime) {
          recorder = new MediaRecorder(stream, { mimeType: mime });
          recorder.ondataavailable = (event) => {
            if (event.data.size) chunks.push(event.data);
          };
          recorder.start();
        }
      } catch {
        recorder = null;
      }
    }
    const motion = spinSnapshot();
    rememberMotion(motion);
    let earlyStill: string | null = null;
    for (let second = 6; second > 0; second -= 1) {
      useBrew.getState().setRecording(second);
      if (second === 6) {
        await sleep(350);
        earlyStill = takeStill();
        await sleep(650);
        continue;
      }
      await sleep(1000);
    }
    if (recorder && recorder.state !== "inactive") {
      await new Promise<void>((resolve) => {
        recorder!.addEventListener("stop", () => resolve(), { once: true });
        recorder!.stop();
      });
    }
    useBrew.getState().setRecording(0);
    const state = useBrew.getState();
    const credited = roomCode
      ? state.members
          .filter((member) => state.drops.some((item) => item.by === member.id && !item.neutral))
          .map((member) => ({ id: member.id, name: member.name, included: true }))
      : [{ id: deviceRef.current, name: state.name || "You", included: true }];
    const creation: Creation = {
      id: newId(),
      title: titleFromDrops(state.drops),
      vibe: state.vibe,
      form: state.form,
      drops: state.drops,
      contributors: credited,
      createdAt: Date.now(),
      still: earlyStill ?? takeStill() ?? undefined,
      spin: motion,
    };
    const prior = sessionStorage.getItem("conjure.lineage");
    if (prior) {
      try {
        const lineage = JSON.parse(prior) as { id: string; title: string };
        creation.remixOf = lineage.id;
        creation.remixTitle = lineage.title;
      } catch {
        /* ignore */
      }
    }
    saveCreation(creation);
    setGallery(loadCreations());
    if (chunks.length) loops.current.set(creation.id, new Blob(chunks, { type: "video/webm" }));
    trackLocal("capture");
    grant("capture");
    void roomCall({ op: "event", name: "capture" }).catch(() => undefined);
    setReview(creation);
    setSheet("review");
    say(`${creation.title} saved.`);
  }

  async function openCircle() {
    const cleaned = cleanName(draftName);
    if (!cleaned) {
      setNotice("Pick another name.");
      return;
    }
    saveName(cleaned);
    useBrew.getState().setName(cleaned);
    try {
      const snap = await roomCall({
        op: "create",
        device: deviceRef.current,
        name: cleaned,
        vibe: useBrew.getState().vibe,
      });
      if ("code" in snap && snap.code) {
        useBrew.getState().applyRoom(snap);
        patchFlags({ usedGroup: true });
        grant("gather");
        setSheet("gather");
        say(`Circle ${snap.code} is open.`);
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t("full"));
    }
  }

  async function join(asWatch: boolean) {
    const cleaned = cleanName(draftName);
    const code = joinCode.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
    if (!cleaned) {
      setNotice("Pick another name.");
      return;
    }
    saveName(cleaned);
    useBrew.getState().setName(cleaned);
    useBrew.getState().start();
    try {
      const snap = await roomCall({
        op: "join",
        device: deviceRef.current,
        code,
        name: cleaned,
        watch: asWatch,
      });
      if ("members" in snap) {
        useBrew.getState().applyRoom(snap);
        patchFlags({ usedGroup: true, passedSensors: true });
        grant("gather");
        setSheet("gather");
        say(asWatch ? t("watching") : `Joined ${code}.`);
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : t("full"));
    }
  }

  async function shareCreation(creation: Creation) {
    const encoded = encodeCreation(creation);
    const url = `${window.location.origin}/c/${creation.id}?d=${encoded}`;
    trackLocal("share");
    grant("share");
    void roomCall({ op: "event", name: "share" }).catch(() => undefined);
    const payload: ShareData = { title: creation.title, text: "Remix this brew.", url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch {
      /* fall through to copy */
    }
    await navigator.clipboard.writeText(url);
    setNotice(t("copied"));
  }

  function remix(creation: Creation) {
    sessionStorage.setItem("conjure.remix", JSON.stringify(creation));
    sessionStorage.setItem("conjure.lineage", JSON.stringify({ id: creation.id, title: creation.title }));
    trackLocal("remix");
    grant("remix");
    void roomCall({ op: "event", name: "remix" }).catch(() => undefined);
    window.location.assign("/");
  }

  async function saveRecipe() {
    const state = useBrew.getState();
    const creation: Creation = {
      id: newId(),
      title: titleFromDrops(state.drops),
      vibe: state.vibe,
      form: state.form,
      drops: state.drops,
      contributors: [{ id: deviceRef.current, name: state.name || "You", included: true }],
      createdAt: Date.now(),
      spin: spinSnapshot(),
    };
    saveCreation(creation);
    setGallery(loadCreations());
    patchFlags({ savedRecipe: true });
    grant("recipe");
    setNotice(t("saved"));
  }

  useEffect(() => {
    if (sheet !== "board") return;
    void roomCall({ op: "board-list" })
      .then((data) => {
        const rows = (data as { rows?: BoardRow[] }).rows;
        if (rows) setBoardRows(rows);
      })
      .catch(() => undefined);
  }, [sheet]);

  useEffect(() => {
    if (sheet !== "gather" || !roomCode) return;
    const url = `${window.location.origin}/?room=${roomCode}`;
    void import("qrcode").then((mod) =>
      mod.toDataURL(url, {
        margin: 1,
        width: 280,
        color: { dark: "#110e0c", light: "#f6efe4" },
      }),
    ).then(setQr).catch(() => setQr(""));
  }, [sheet, roomCode]);

  const showSensors = flags.usedIngredient && !replay;
  const showGather = flags.passedSensors && !replay;
  const showRecipeSave = flags.usedGroup && !replay;
  const showDeep = flags.savedRecipe && !replay;

  return (
    <main className="conjure">
      <div className="sr-only" aria-live="polite">
        {liveMsg}
      </div>
      <div
        className="stage"
        onPointerDown={(event) => {
          if (sceneMoving({ started, reduced, frozen: masterMix.freeze })) {
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              /* synthetic pointers still stir */
            }
            pointerDown(event.pointerId, event.clientX, event.clientY);
            haptic(8);
            return;
          }
          dragging.current = true;
        }}
        onPointerUp={(event) => {
          if (sceneMoving({ started, reduced, frozen: masterMix.freeze })) {
            try {
              if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            } catch {
              /* ignore */
            }
            const speed = pointerUp(event.pointerId);
            if (isFling(speed)) {
              haptic([12, 28, 18]);
              impulse(flingVel.y * 1.8, flingVel.x * 2.2, 0);
              flashPulse("#fff6df", 700);
              burstSparks("#f6efe4", 10);
              grant("fling");
            }
            return;
          }
          dragging.current = false;
        }}
        onPointerCancel={(event) => {
          pointerUp(event.pointerId);
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
        }}
        onPointerMove={(event) => {
          if (sceneMoving({ started, reduced, frozen: masterMix.freeze })) {
            const delta = pointerMove(event.pointerId, event.clientX, event.clientY);
            if (!delta) return;
            liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + delta.dx / 160));
            liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + delta.dy / 160));
            impulse(delta.dy / 140, delta.dx / 120, 0);
            return;
          }
          if (!dragging.current || !started) return;
          liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + event.movementX / 180));
          liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + event.movementY / 180));
        }}
      >
        {graphics === "flat" || !quality ? (
          <FlatBrew drops={drops} vibe={vibe} reduced={reduced} />
        ) : (
          <StageBoundary fallback={<FlatBrew drops={drops} vibe={vibe} reduced={reduced} />}>
            <Suspense fallback={<FlatBrew drops={drops} vibe={vibe} reduced={reduced} />}>
              <CauldronScene drops={drops} vibe={vibe} form={form} quality={quality} reduced={reduced} />
            </Suspense>
          </StageBoundary>
        )}
        <div className="brew-pulse" aria-hidden="true" />
      </div>

      <header className="topbar">
        <Link to="/" search={{ room: "", watch: false }} className="brand" aria-label={t("app.title")}>
          <XeIcon emoji="🪄" />
          <span>{t("app.title")}</span>
        </Link>
        <div className="top-actions">
          <button type="button" className="chip" onClick={() => setSheet("level")}>
            <XeIcon emoji="⭐" />
            <span>
              {t(`level.${progress.level}`)} · {progress.xp}
            </span>
          </button>
          {started && !replay && (
            <button
              type="button"
              className="chip"
              onClick={() => {
                if (roomCode && hostId !== deviceRef.current) return;
                const next = VIBES[(VIBES.indexOf(vibe) + 1) % VIBES.length];
                useBrew.getState().setVibe(next);
                const preview = computeBrew(useBrew.getState().drops, blendSensors([liveSensor, remoteSensor]), next);
                punchColor(preview.color, preview.hue);
                burstSparks(preview.color, 10);
                impulse(next === "spooky" ? 1.4 : 0.3, next === "chaotic" ? 2.4 : 1.1, 0.4);
                if (roomCode) {
                  void roomCall({ op: "vibe", device: deviceRef.current, code: roomCode, vibe: next }).then((snap) => {
                    if ("members" in snap) useBrew.getState().applyRoom(snap);
                  });
                }
              }}
            >
              <XeIcon emoji="🌀" />
              <span>
                {t("vibe.label")} · {t(`vibe.${vibe}`)}
              </span>
            </button>
          )}
          {started && !replay && !spectating && (
            <button type="button" className="chip emphasis" onClick={() => void capture()}>
              <XeIcon emoji="📸" />
              <span>{t("capture")}</span>
            </button>
          )}
          <Link to="/credits" className="icon-btn" aria-label={t("credits")}>
            <XeIcon emoji="📜" />
          </Link>
          <Link to="/privacy" className="icon-btn" aria-label={t("privacy")}>
            <XeIcon emoji="🛡️" />
          </Link>
        </div>
      </header>

      {!replay && <NextStep id={nextStepId(progress)} />}
      {!replay &&
        currentTip(dismissed, {
          fling: started && !reduced && !masterMix.freeze,
          capture: flags.usedIngredient,
          gather: flags.passedSensors,
          share: gallery.length > 0,
          master: progress.level === "master",
          wallet: walletUnlocked(progress),
          board: progress.xp >= 40 && !boardPrefs.hidden,
        }) && (
          <TipCard
            id={
              currentTip(dismissed, {
                fling: started && !reduced && !masterMix.freeze,
                capture: flags.usedIngredient,
                gather: flags.passedSensors,
                share: gallery.length > 0,
                master: progress.level === "master",
                wallet: walletUnlocked(progress),
                board: progress.xp >= 40 && !boardPrefs.hidden,
              }) as TipId
            }
            onDismiss={() => {
              const id = currentTip(dismissed, {
                fling: started && !reduced && !masterMix.freeze,
                capture: flags.usedIngredient,
                gather: flags.passedSensors,
                share: gallery.length > 0,
                master: progress.level === "master",
                wallet: walletUnlocked(progress),
                board: progress.xp >= 40 && !boardPrefs.hidden,
              });
              if (!id) return;
              setDismissed(dismissTip(id));
            }}
          />
        )}

      {notice && (
        <p className="notice" role="status">
          {notice}
          <button type="button" className="text-btn" onClick={() => setNotice("")} aria-label={t("close")}>
            <XeIcon emoji="✖️" />
          </button>
        </p>
      )}

      {recording > 0 && (
        <p className="record-banner">
          {t("record")} · {recording}
        </p>
      )}

      {replay && (
        <p className="record-banner">
          {t("replay")} · {replay.title}
        </p>
      )}

      {started && flags.hintDrop && !replay && <p className="hint">{t("hint.drop")}</p>}
      {showSensors && flags.hintSensor && kind == null && <p className="hint">{t("hint.sensor")}</p>}
      {started && flags.hintKeys && !replay && (
        <p className="hint keys-hint">
          {t("hint.keys")}
          <button type="button" className="text-btn" onClick={() => patchFlags({ hintKeys: false })} aria-label={t("close")}>
            <XeIcon emoji="✖️" />
          </button>
        </p>
      )}

      {invite && !roomCode && !replay && (
        <section className="sheet invite">
          <p>{t("room.invite")}</p>
          <p className="code">{invite}</p>
          <div className="row">
            <button type="button" className="emphasis" onClick={() => void join(false)}>
              <XeIcon emoji="🧪" />
              <span>{t("room.join")}</span>
            </button>
            <button type="button" onClick={() => void join(true)}>
              <XeIcon emoji="👀" />
              <span>{t("room.watch")}</span>
            </button>
          </div>
        </section>
      )}

      {started && !replay && (
        <button
          type="button"
          className="tray-toggle"
          aria-pressed={tray}
          aria-label={tray ? t("controls.hide") : t("controls.show")}
          onClick={() => {
            if (tray) setTray(false);
            else {
              setRetired([]);
              setTray(true);
            }
          }}
        >
          <XeIcon emoji="👁️" />
        </button>
      )}

      <aside className="rail" aria-label="Ingredients">
        {tray && (
          <IngredientBar
            disabled={spectating}
            hidden={retired}
            onDrop={(id) => void drop(id)}
          />
        )}
      </aside>

      <footer className="thumb">
        {!started && !replay && (
          <div className="start-wrap">
            <button
              type="button"
              className="start-btn"
              onClick={() => {
                unlockAudio();
                useBrew.getState().start();
                grant("start");
                say("The cauldron is open.");
              }}
            >
              <XeIcon emoji="🫧" className="xe-lg" />
              <span>{t("start")}</span>
            </button>
          </div>
        )}
        {tray && showSensors && (
          <div className="sensor-row">
            {!retired.includes("sensor:mic") && (
              <SensorButton emoji="🎤" label={t("sensor.mic")} on={kind === "mic"} onClick={() => armSensor("mic")} />
            )}
            {!retired.includes("sensor:camera") && (
              <SensorButton emoji="📷" label={t("sensor.camera")} on={kind === "camera"} onClick={() => armSensor("camera")} />
            )}
            {!retired.includes("sensor:motion") && (
              <SensorButton emoji="📱" label={t("sensor.motion")} on={kind === "motion"} onClick={() => armSensor("motion")} />
            )}
            {!flags.passedSensors && !retired.includes("sensor:quiet") && (
              <button
                type="button"
                className="chip"
                onClick={() => {
                  ensureLive();
                  liveSensor.loudness = 0;
                  liveSensor.burst = 0;
                  liveSensor.wave = 0;
                  impulse(0.35, 1.1, 0.4);
                  spin.damping = 4.2;
                  punchColor("#6f8f78", 150);
                  burstSparks("#6f8f78", 6);
                  window.setTimeout(() => {
                    spin.damping = 1.7;
                  }, 1200);
                  patchFlags({ passedSensors: true, hintSensor: false });
                  hideControl("sensor:quiet");
                }}
              >
                {t("quiet")}
              </button>
            )}
            {showGather && (
              <button type="button" className="chip" onClick={() => setSheet("gather")}>
                <XeIcon emoji="👥" />
                <span>{t("gather")}</span>
              </button>
            )}
            {kind === "camera" && !retired.includes("sensor:sample") && (
              <button
                type="button"
                className="chip"
                onClick={() => {
                  sensors.sampleColor();
                  const hue = liveSensor.sampleHue ?? 196;
                  const hex = hslToHex(hue, 0.8, 0.5);
                  punchColor(hex, hue);
                  burstSparks(hex, 10);
                  impulse(0.2, 0.4, 1.6);
                  liveSensor.burst = 1;
                  hideControl("sensor:sample");
                }}
              >
                <XeIcon emoji="💧" />
                <span>{t("sensor.sample")}</span>
              </button>
            )}
            {kind && !retired.includes("sensor:stop") && (
              <button
                type="button"
                className="chip"
                onClick={() => {
                  setKind(null);
                  kindRef.current = null;
                  liveSensor.loudness = 0;
                  liveSensor.wave = 0;
                  spin.damping = 3.2;
                  window.setTimeout(() => {
                    spin.damping = 1.7;
                  }, 1000);
                  hideControl("sensor:stop");
                }}
              >
                {t("sensor.stop")}
              </button>
            )}
          </div>
        )}
        {tray && progress.level === "master" && !replay && (
          <ToolDock hidden={retired} onLive={onTool} onRetire={hideControl} />
        )}
        <div className="legal">
          <button
            type="button"
            className="text-btn"
            aria-pressed={muted}
            onClick={() => {
              const next = !isMuted();
              setMuted(next);
              setMutedState(next);
            }}
          >
            <XeIcon emoji={muted ? "🔇" : "🎵"} />
            <span>{muted ? t("soundOff") : t("soundOn")}</span>
          </button>
          <label className="opt">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(event) => {
                setOptIn(event.target.checked);
                saveOptIn(event.target.checked);
              }}
            />
            {t("optIn")}
          </label>
        </div>
        {tray && (
          <div className="thumb-row">
            <IngredientBar disabled={!started || spectating} hidden={retired} onDrop={(id) => void drop(id)} />
          </div>
        )}
        {started && tray && (
          <p className="pot-count">
            {drops.length} {t("inPot")}
          </p>
        )}
      </footer>

      <aside className="panel">
        <h2>{replay ? replay.title : titleFromDrops(drops)}</h2>
        <p className="muted">
          {t(`vibe.${vibe}`)} · {brew.color}
        </p>
        {replay?.remixTitle && (
          <p className="muted">
            {t("lineage")} {replay.remixTitle}
          </p>
        )}
        <ol className="drops">
          {drops.map((dropItem, index) => (
            <li key={dropItem.id}>
              <XeIcon emoji={ingredientById(dropItem.ingredient).emoji} />
              <span>{ingredientById(dropItem.ingredient).label}</span>
              {dropItem.neutral && <em>neutral</em>}
              {showDeep && (
                <span className="row">
                  <button type="button" aria-label={t("up")} onClick={() => moveDrop(index, -1)}>
                    <XeIcon emoji="⬆️" />
                  </button>
                  <button type="button" aria-label={t("down")} onClick={() => moveDrop(index, 1)}>
                    <XeIcon emoji="⬇️" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = drops.map((item) =>
                        item.id === dropItem.id ? { ...item, neutral: !item.neutral } : item,
                      );
                      useBrew.getState().setDrops(next);
                    }}
                  >
                    {dropItem.neutral ? t("unmute") : t("mute")}
                  </button>
                </span>
              )}
            </li>
          ))}
        </ol>
        {showDeep && (
          <>
            <p className="muted">{t("deep")}</p>
            <div className="row wrap">
              {FORMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={form === item.id ? "chip on" : "chip"}
                  onClick={() => useBrew.getState().setForm(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
        {showRecipeSave && (
          <button type="button" onClick={() => void saveRecipe()}>
            <XeIcon emoji="📖" />
            <span>{t("saveRecipe")}</span>
          </button>
        )}
        {members.length > 0 && (
          <>
            <h3>{t("who")}</h3>
            <MemberList
              selfId={deviceRef.current}
              isHost={isHost && Boolean(roomCode)}
              onKick={(id) =>
                void roomCall({ op: "kick", device: deviceRef.current, code: roomCode, target: id }).then((snap) => {
                  if ("members" in snap) useBrew.getState().applyRoom(snap);
                })
              }
              onHandoff={(id) =>
                void roomCall({ op: "handoff", device: deviceRef.current, code: roomCode, target: id }).then((snap) => {
                  if ("members" in snap) useBrew.getState().applyRoom(snap);
                })
              }
            />
          </>
        )}
        {replay && (
          <div className="row">
            <button type="button" className="emphasis" onClick={() => remix(replay)}>
              <XeIcon emoji="♻️" />
              <span>{t("remix")}</span>
            </button>
            <button type="button" onClick={() => setSheet("report")}>
              <XeIcon emoji="🚩" />
              <span>{t("report")}</span>
            </button>
          </div>
        )}
      </aside>

      <aside className="wall">
        {roomCode && (
          <div>
            <p className="code">{roomCode}</p>
            {qr && <img className="qr" src={qr} alt="" />}
          </div>
        )}
        <div className="ticker" aria-hidden="true">
          {(members.length ? members : gallery.slice(0, 6).map((item) => ({ id: item.id, name: item.title, color: "#e27a3a" }))).map(
            (item) => (
              <span key={item.id} style={{ color: "color" in item ? item.color : undefined }}>
                {item.name}
              </span>
            ),
          )}
        </div>
        <ul className="gallery">
          {gallery.slice(0, 4).map((item) => (
            <li key={item.id}>
              <Link to="/c/$id" params={{ id: item.id }} search={{ d: "" }}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {xr && quality && (
          <button
            type="button"
            onClick={() => {
              void startAR().catch(() => setNotice("AR did not start."));
            }}
          >
            <XeIcon emoji="🌕" />
            <span>{t("ar")}</span>
          </button>
        )}
        {quality && (
          <p className="muted">
            {t("tier")} · {quality.tier}
            {quality.webgpu ? " · WebGPU" : ""} · WebGL{quality.webgl2 ? "2" : ""}
          </p>
        )}
      </aside>

      {sheet === "gather" && (
        <section className="sheet" role="dialog" aria-modal="true" aria-label={t("room.title")}>
          <div className="sheet-card">
            <header className="row">
              <h2>{t("room.title")}</h2>
              <button type="button" className="icon-btn" aria-label={t("close")} onClick={() => setSheet(null)}>
                <XeIcon emoji="✖️" />
              </button>
            </header>
            <label>
              {t("room.name")}
              <input value={draftName} maxLength={18} onChange={(event) => setDraftName(event.target.value)} />
            </label>
            {roomCode ? (
              <>
                <p className="code" aria-label={t("room.code")}>
                  {roomCode}
                </p>
                {qr && <img className="qr" src={qr} alt="" />}
                <div className="row wrap">
                  {(["stirrer", "singer", "spark", "seer"] as Seat[]).map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      className={me?.seat === seat ? "chip on" : "chip"}
                      onClick={() =>
                        void roomCall({ op: "seat", device: deviceRef.current, code: roomCode, seat }).then((snap) => {
                          if ("members" in snap) useBrew.getState().applyRoom(snap);
                        })
                      }
                    >
                      <XeIcon emoji={SEAT_EMOJI[seat]} />
                      <span>{t(`seat.${seat}`)}</span>
                    </button>
                  ))}
                </div>
                <MemberList
                  selfId={deviceRef.current}
                  isHost={isHost}
                  onKick={(id) =>
                    void roomCall({ op: "kick", device: deviceRef.current, code: roomCode, target: id }).then((snap) => {
                      if ("members" in snap) useBrew.getState().applyRoom(snap);
                    })
                  }
                  onHandoff={(id) =>
                    void roomCall({ op: "handoff", device: deviceRef.current, code: roomCode, target: id }).then((snap) => {
                      if ("members" in snap) useBrew.getState().applyRoom(snap);
                    })
                  }
                />
                <div className="row">
                  {isHost && (
                    <button
                      type="button"
                      onClick={() =>
                        void roomCall({
                          op: "lock",
                          device: deviceRef.current,
                          code: roomCode,
                          locked: !locked,
                        }).then((snap) => {
                          if ("members" in snap) useBrew.getState().applyRoom(snap);
                        })
                      }
                    >
                      <XeIcon emoji="🔒" />
                      <span>{locked ? t("room.unlock") : t("room.lock")}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      void roomCall({ op: "leave", device: deviceRef.current, code: roomCode });
                      useBrew.getState().clearRoom();
                      setSheet(null);
                    }}
                  >
                    <XeIcon emoji="🚪" />
                    <span>{t("room.leave")}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button type="button" className="emphasis" onClick={() => void openCircle()}>
                  <XeIcon emoji="🧪" />
                  <span>{t("room.open")}</span>
                </button>
                <label>
                  {t("room.code")}
                  <input
                    value={joinCode}
                    maxLength={4}
                    onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
                  />
                </label>
                <div className="row">
                  <button type="button" onClick={() => void join(false)}>
                    <XeIcon emoji="👋" />
                    <span>{t("room.join")}</span>
                  </button>
                  <button type="button" onClick={() => void join(true)}>
                    <XeIcon emoji="👀" />
                    <span>{t("room.watch")}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {consent && hostId !== deviceRef.current && !consent.votes[deviceRef.current] && (
        <section className="sheet" role="dialog" aria-modal="true" aria-label={t("consent.line1")}>
          <div className="sheet-card">
            <p>{t("consent.line1")}</p>
            <p>{t("consent.line2")}</p>
            <div className="row">
              <button
                type="button"
                className="emphasis"
                onClick={() =>
                  void roomCall({
                    op: "consent-vote",
                    device: deviceRef.current,
                    code: roomCode,
                    choice: "in",
                  }).then((snap) => {
                    if ("members" in snap) useBrew.getState().applyRoom(snap);
                  })
                }
              >
                {t("consent.in")}
              </button>
              <button
                type="button"
                onClick={() =>
                  void roomCall({
                    op: "consent-vote",
                    device: deviceRef.current,
                    code: roomCode,
                    choice: "out",
                  }).then((snap) => {
                    if ("members" in snap) useBrew.getState().applyRoom(snap);
                  })
                }
              >
                {t("consent.out")}
              </button>
            </div>
          </div>
        </section>
      )}
      {consent && hostId === deviceRef.current && <p className="record-banner">{t("consent.wait")}</p>}

      {sheet === "review" && review && (
        <section className="sheet" role="dialog" aria-modal="true" aria-label={t("review.title")}>
          <div className="sheet-card">
            <header className="row">
              <h2>{review.title}</h2>
              <button type="button" className="icon-btn" aria-label={t("close")} onClick={() => setSheet(null)}>
                <XeIcon emoji="✖️" />
              </button>
            </header>
            {review.still && <img className="still" src={review.still} alt="" />}
            {review.spin && (
              <p className="muted">
                {t("mint.velocity")} {review.spin.angularVelocity} · {t("mint.axis")}{" "}
                {review.spin.axis.map((n) => n.toFixed(2)).join(", ")} · {t("mint.damping")} {review.spin.damping} ·{" "}
                {t("mint.spins")} {review.spin.spinCount}
              </p>
            )}
            <div className="row wrap">
              <button type="button" className="emphasis" onClick={() => void shareCreation(review)}>
                <XeIcon emoji="🔗" />
                <span>{t("share")}</span>
              </button>
              <button type="button" onClick={() => remix(review)}>
                <XeIcon emoji="♻️" />
                <span>{t("remix")}</span>
              </button>
              {review.still && (
                <a download={`${review.id}.jpg`} href={review.still}>
                  <XeIcon emoji="⬇️" />
                  <span>{t("review.still")}</span>
                </a>
              )}
              {loops.current.get(review.id) && (
                <a
                  download={`${review.id}.webm`}
                  href={URL.createObjectURL(loops.current.get(review.id)!)}
                >
                  <XeIcon emoji="▶️" />
                  <span>{t("review.loop")}</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(review, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = `${review.id}.json`;
                  anchor.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <XeIcon emoji="📋" />
                <span>{t("review.recipe")}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  void downloadGlb().then((blob) => {
                    if (!blob) {
                      setNotice("Could not pack a GLB.");
                      return;
                    }
                    const url = URL.createObjectURL(blob);
                    const anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = `${review.id}.glb`;
                    anchor.click();
                    URL.revokeObjectURL(url);
                  });
                }}
              >
                <XeIcon emoji="💎" />
                <span>{t("review.glb")}</span>
              </button>
              <button type="button" onClick={() => setSheet("mint")}>
                <XeIcon emoji="✨" />
                <span>{t("review.mint")}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {sheet === "mint" && review && (
        <section className="sheet" role="dialog" aria-modal="true" aria-label={t("mint.title")}>
          <div className="sheet-card">
            <header className="row">
              <h2>{t("mint.title")}</h2>
              <button type="button" className="icon-btn" aria-label={t("close")} onClick={() => setSheet("review")}>
                <XeIcon emoji="✖️" />
              </button>
            </header>
            <p>{t("mint.body")}</p>
            <p className="muted">
              {CHAIN.name} · {CHAIN.id}
            </p>
            {wallet && (
              <p className="muted">
                {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)} · {wallet.balanceEth} ETH · chain {wallet.chainId}
              </p>
            )}
            {!walletAvailable() && <p>{t("mint.noWallet")}</p>}
            {walletAvailable() && !wallet && (
              <button
                type="button"
                className="emphasis"
                onClick={() => {
                  void connectWallet()
                    .then(setWallet)
                    .catch((error: unknown) => setNotice(error instanceof Error ? error.message : t("mint.noWallet")));
                }}
              >
                <XeIcon emoji="🔗" />
                <span>{t("mint.connect")}</span>
              </button>
            )}
            {!CHAIN.contract && <p>{t("mint.noContract")}</p>}
            <button
              type="button"
              onClick={() => {
                void (async () => {
                  const blob = loops.current.get(review.id);
                  let animationUrl = `${window.location.origin}/c/${review.id}`;
                  if (blob) animationUrl = await blobToDataUrl(blob);
                  else if (review.spin) animationUrl = `${window.location.origin}/c/${review.id}?d=${encodeCreation(review)}`;
                  const meta = brewMetadata({
                    title: review.title,
                    animationUrl,
                    image: review.still,
                    spin: review.spin ?? null,
                    vibe: review.vibe,
                    chainId: CHAIN.id,
                    royaltyBps: CHAIN.royaltyBps,
                  });
                  const file = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(file);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = `${review.id}-metadata.json`;
                  anchor.click();
                  URL.revokeObjectURL(url);
                })();
              }}
            >
              <XeIcon emoji="📋" />
              <span>{t("mint.meta")}</span>
            </button>
            {CHAIN.contract && wallet && (
              <button
                type="button"
                className="emphasis"
                onClick={() => {
                  void roomCall({ op: "mint-touch", device: deviceRef.current, creationId: review.id })
                    .then(() => mintWithWallet(wallet.address, `${window.location.origin}/c/${review.id}`))
                    .then((hash) => {
                      trackLocal("mint");
                      grant("mint");
                      saveMint({ hash, uri: `${window.location.origin}/c/${review.id}`, at: Date.now() });
                      setNotice(`${t("mint.sent")} ${hash.slice(0, 10)}`);
                    })
                    .catch((error: unknown) => setNotice(error instanceof Error ? error.message : t("mint.cap")));
                }}
              >
                {t("review.mint")}
              </button>
            )}
          </div>
        </section>
      )}

      {sheet === "level" && (
        <LevelSheet
          progress={progress}
          onClose={() => setSheet(null)}
          onWallet={() => setSheet("wallet")}
          onBoard={() => setSheet("board")}
          onTools={() => {
            setRetired((list) => list.filter((id) => !id.startsWith("tool:")));
            setTray(true);
            setSheet(null);
          }}
        />
      )}
      {sheet === "wallet" && (
        <WalletSheet
          wallet={wallet}
          onWallet={setWallet}
          onClose={() => setSheet(null)}
          onNotice={setNotice}
        />
      )}
      {sheet === "board" && (
        <BoardSheet
          rows={boardRows}
          handle={boardPrefs.handle}
          optIn={boardPrefs.optIn && !boardPrefs.hidden}
          onHandle={(value) => {
            const next = { ...boardPrefs, handle: value };
            setBoardPrefs(next);
            saveBoardPrefs(next);
          }}
          onOptIn={() => {
            const handle = cleanHandle(boardPrefs.handle);
            if (!handle) {
              setNotice(t("board.need"));
              return;
            }
            const next = { optIn: true, handle, hidden: false };
            setBoardPrefs(next);
            saveBoardPrefs(next);
          }}
          onHide={() => {
            const next = { ...boardPrefs, optIn: false, hidden: true };
            setBoardPrefs(next);
            saveBoardPrefs(next);
            setBoardRows([]);
            void roomCall({ op: "board-hide", device: deviceRef.current }).catch(() => undefined);
          }}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet === "report" && replay && (
        <section className="sheet" role="dialog" aria-modal="true" aria-label={t("report")}>
          <div className="sheet-card">
            <div className="row">
              {(["spam", "unsafe", "other"] as const).map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => {
                    void roomCall({ op: "report", creationId: replay.id, reason }).then(() => {
                      setNotice(t("reportSent"));
                      setSheet(null);
                    });
                  }}
                >
                  {t(`reason.${reason}`)}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );

  function moveDrop(index: number, delta: number) {
    const next = [...useBrew.getState().drops];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    useBrew.getState().setDrops(next);
  }
}

function IngredientBar({
  disabled,
  hidden,
  onDrop,
}: {
  disabled: boolean;
  hidden: string[];
  onDrop: (id: IngredientId) => void;
}) {
  const items = INGREDIENTS.filter((item) => !hidden.includes(`ing:${item.id}`));
  if (!items.length) return null;
  return (
    <div className="ings">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="ing"
          disabled={disabled}
          onClick={() => onDrop(item.id)}
        >
          <XeIcon emoji={item.emoji} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function SensorButton({
  emoji,
  label,
  on,
  onClick,
}: {
  emoji: string;
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={on ? "chip on" : "chip"} aria-pressed={on} onClick={onClick}>
      <XeIcon emoji={emoji} />
      <span>{label}</span>
    </button>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return blob.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer);
    let bin = "";
    const size = 0x8000;
    for (let i = 0; i < bytes.length; i += size) {
      bin += String.fromCharCode(...bytes.subarray(i, i + size));
    }
    return `data:${blob.type || "video/webm"};base64,${btoa(bin)}`;
  });
}

function MemberList({
  selfId,
  isHost,
  onKick,
  onHandoff,
}: {
  selfId: string;
  isHost: boolean;
  onKick: (id: string) => void;
  onHandoff: (id: string) => void;
}) {
  const members = useBrew((s) => s.members);
  return (
    <ul className="members">
      {members.map((member) => (
        <li key={member.id}>
          <i style={{ background: member.color }} />
          <span>{member.name}</span>
          <em>{member.role === "host" ? "Host" : member.role === "spectator" ? "Watching" : t(`seat.${member.seat}`)}</em>
          <span className="meters" aria-hidden="true">
            {member.mic && <XeIcon emoji="🎤" />}
            {member.camera && <XeIcon emoji="📷" />}
            {member.motion && <XeIcon emoji="📱" />}
          </span>
          {isHost && member.id !== selfId && (
            <span className="row">
              <button type="button" onClick={() => onKick(member.id)}>
                {t("room.kick")}
              </button>
              {member.role !== "spectator" && (
                <button type="button" onClick={() => onHandoff(member.id)}>
                  {t("room.handoff")}
                </button>
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function loadReplay(id: string, payload: string): Creation | null {
  if (payload) return decodeCreation(payload);
  return creationById(id);
}

export function PageFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="conjure page">
      <header className="topbar">
        <Link to="/" search={{ room: "", watch: false }} className="brand">
          <XeIcon emoji="🪄" />
          <span>{t("app.title")}</span>
        </Link>
      </header>
      <article className="prose">
        <h1>{title}</h1>
        {children}
        <p>
          <Link to="/" search={{ room: "", watch: false }}>{t("back")}</Link>
        </p>
      </article>
    </main>
  );
}
