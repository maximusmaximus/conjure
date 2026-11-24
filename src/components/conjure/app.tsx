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
  ingredientById,
  titleFromDrops,
  type Drop,
  type FormId,
  type IngredientId,
  type Vibe,
} from "@/conjure/brew";
import { CHAIN, connectWallet, mintWithWallet, walletAvailable, type WalletState } from "@/conjure/chain";
import { resolveVotes } from "@/conjure/consent";
import { FlatBrew } from "@/conjure/flat";
import { XeIcon } from "@/conjure/icons";
import { downloadGlb, liveSensor, remoteSensor, startAR, takeStill } from "@/conjure/live";
import { probeQuality, type Quality } from "@/conjure/quality";
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
  const deviceRef = useRef("d_pending00");
  const loops = useRef(new Map<string, Blob>());
  const dragging = useRef(false);

  const sensors = useSensors(kind, (message) => {
    setKind(null);
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
        setReview(null);
      } catch {
        /* ignore a bad stash */
      }
    }
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => setReduced(reducedQuery.matches);
    applyReduced();
    reducedQuery.addEventListener("change", applyReduced);
    void probeQuality().then((next) => {
      setQuality(next);
      if (!next.webgl2) setGraphics("flat");
    });
    const nav = navigator as Navigator & { xr?: { isSessionSupported: (mode: string) => Promise<boolean> } };
    if (nav.xr) {
      void nav.xr.isSessionSupported("immersive-ar").then(setXr).catch(() => setXr(false));
    }
    return () => reducedQuery.removeEventListener("change", applyReduced);
  }, []);

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
    const source = replay.drops;
    if (!source.length) {
      useBrew.getState().setDrops([]);
      return;
    }
    const start = Math.min(...source.map((drop) => drop.at));
    const span = Math.max(1, Math.max(...source.map((drop) => drop.at)) - start);
    let frame = 0;
    const begun = performance.now();
    const loop = (now: number) => {
      const cycle = ((now - begun) % 6000) / 6000;
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
      if (event.key === "ArrowLeft") liveSensor.tiltX = Math.max(-1, liveSensor.tiltX - 0.2);
      if (event.key === "ArrowRight") liveSensor.tiltX = Math.min(1, liveSensor.tiltX + 0.2);
      if (event.key === "ArrowUp") liveSensor.tiltY = Math.max(-1, liveSensor.tiltY - 0.2);
      if (event.key === "ArrowDown") liveSensor.tiltY = Math.min(1, liveSensor.tiltY + 0.2);
      if (event.key === " ") {
        event.preventDefault();
        liveSensor.burst = 1;
        liveSensor.shake = 1;
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

  function say(message: string) {
    setLiveMsg("");
    setTimeout(() => setLiveMsg(message), 20);
  }

  async function drop(id: IngredientId) {
    if (!useBrew.getState().started || spectating) return;
    unlockAudio();
    const ing = ingredientById(id);
    pluck(ing.hue, ing.energy);
    const made = useBrew.getState().addDrop(id, deviceRef.current);
    patchFlags({ usedIngredient: true, hintDrop: false });
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
    for (let second = 6; second > 0; second -= 1) {
      useBrew.getState().setRecording(second);
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
      still: takeStill() ?? undefined,
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
    };
    saveCreation(creation);
    setGallery(loadCreations());
    patchFlags({ savedRecipe: true });
    setNotice(t("saved"));
  }

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
        onPointerDown={() => {
          dragging.current = true;
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
        }}
        onPointerMove={(event) => {
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
      </div>

      <header className="topbar">
        <Link to="/" search={{ room: "", watch: false }} className="brand" aria-label={t("app.title")}>
          <XeIcon emoji="🪄" />
          <span>{t("app.title")}</span>
        </Link>
        <div className="top-actions">
          {started && !replay && (
            <button
              type="button"
              className="chip"
              onClick={() => {
                if (roomCode && hostId !== deviceRef.current) return;
                const next = VIBES[(VIBES.indexOf(vibe) + 1) % VIBES.length];
                useBrew.getState().setVibe(next);
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

      <aside className="rail" aria-label="Ingredients">
        <IngredientBar disabled={!started || spectating} onDrop={(id) => void drop(id)} />
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
                say("The cauldron is open.");
              }}
            >
              <XeIcon emoji="🫧" className="xe-lg" />
              <span>{t("start")}</span>
            </button>
          </div>
        )}
        {showSensors && (
          <div className="sensor-row">
            <SensorButton emoji="🎤" label={t("sensor.mic")} on={kind === "mic"} onClick={() => setSheet("mic")} />
            <SensorButton emoji="📷" label={t("sensor.camera")} on={kind === "camera"} onClick={() => setSheet("cam")} />
            <SensorButton emoji="📱" label={t("sensor.motion")} on={kind === "motion"} onClick={() => setSheet("motion")} />
            {!flags.passedSensors && (
              <button type="button" className="chip" onClick={() => patchFlags({ passedSensors: true, hintSensor: false })}>
                {t("quiet")}
              </button>
            )}
            {showGather && (
              <button type="button" className="chip" onClick={() => setSheet("gather")}>
                <XeIcon emoji="👥" />
                <span>{t("gather")}</span>
              </button>
            )}
            {kind === "camera" && (
              <button type="button" className="chip" onClick={() => sensors.sampleColor()}>
                <XeIcon emoji="💧" />
                <span>{t("sensor.sample")}</span>
              </button>
            )}
            {kind && (
              <button type="button" className="chip" onClick={() => setKind(null)}>
                {t("sensor.stop")}
              </button>
            )}
          </div>
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
        <div className="thumb-row">
          <IngredientBar disabled={!started || spectating} onDrop={(id) => void drop(id)} />
        </div>
        {started && <p className="pot-count">{drops.length} {t("inPot")}</p>}
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

      {sheet === "mic" && (
        <PermissionSheet
          emoji="🎤"
          line1={t("mic.line1")}
          line2={t("mic.line2")}
          go={t("mic.go")}
          onGo={() => {
            setKind("mic");
            setSheet(null);
            patchFlags({ passedSensors: true, hintSensor: false });
          }}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "cam" && (
        <PermissionSheet
          emoji="📷"
          line1={t("cam.line1")}
          line2={t("cam.line2")}
          go={t("cam.go")}
          onGo={() => {
            setKind("camera");
            setSheet(null);
            patchFlags({ passedSensors: true, hintSensor: false });
          }}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === "motion" && (
        <PermissionSheet
          emoji="📱"
          line1={t("motion.line1")}
          line2={t("motion.line2")}
          go={t("motion.go")}
          onGo={() => {
            setKind("motion");
            setSheet(null);
            patchFlags({ passedSensors: true, hintSensor: false });
          }}
          onClose={() => setSheet(null)}
        />
      )}

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
                const meta = {
                  name: review.title,
                  description: "A Conjure brew.",
                  vibe: review.vibe,
                  contributors: review.contributors,
                  chainId: CHAIN.id,
                  royaltyBps: CHAIN.royaltyBps,
                };
                const blob = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = `${review.id}-metadata.json`;
                anchor.click();
                URL.revokeObjectURL(url);
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
  onDrop,
}: {
  disabled: boolean;
  onDrop: (id: IngredientId) => void;
}) {
  return (
    <div className="ings">
      {INGREDIENTS.map((item) => (
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

function PermissionSheet({
  emoji,
  line1,
  line2,
  go,
  onGo,
  onClose,
}: {
  emoji: string;
  line1: string;
  line2: string;
  go: string;
  onGo: () => void;
  onClose: () => void;
}) {
  return (
    <section className="sheet" role="dialog" aria-modal="true" aria-label={line1}>
      <div className="sheet-card">
        <XeIcon emoji={emoji} className="xe-lg" />
        <p>{line1}</p>
        <p>{line2}</p>
        <div className="row">
          <button type="button" className="emphasis" onClick={onGo}>
            {go}
          </button>
          <button type="button" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    </section>
  );
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
