import { useEffect, useRef, useState } from "react";
import { CHAIN, connectWallet, walletAvailable, type WalletState } from "@/conjure/chain";
import { XeIcon } from "@/conjure/icons";
import { masterMix } from "@/conjure/live";
import {
  LEVELS,
  cleanHandle,
  walletUnlocked,
  xpToNext,
  type LevelId,
  type Progress,
  type TipId,
} from "@/conjure/progress";
import { loadMints, type MintNote } from "@/conjure/storage";
import { listOwnedTokens, transferToken, type OwnedToken } from "@/conjure/wallet";
import { t } from "@/i18n";

export function NextStep({ id }: { id: string }) {
  return (
    <p className="next-step">
      <span>{t("next.label")}</span> {t(`next.${id}`)}
    </p>
  );
}

export function TipCard({ id, onDismiss }: { id: TipId; onDismiss: () => void }) {
  const startX = useRef(0);
  return (
    <p
      className="tip"
      onPointerDown={(event) => {
        startX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (Math.abs(event.clientX - startX.current) > 48) onDismiss();
      }}
    >
      <span>{t(`tip.${id}`)}</span>
      <button type="button" className="text-btn" aria-label={t("close")} onClick={onDismiss}>
        <XeIcon emoji="✖️" />
      </button>
    </p>
  );
}

export function LevelSheet({
  progress,
  onClose,
  onWallet,
  onBoard,
  onTools,
}: {
  progress: Progress;
  onClose: () => void;
  onWallet: () => void;
  onBoard: () => void;
  onTools: () => void;
}) {
  const climb = xpToNext(progress.xp);
  const pct = climb.next ? Math.round((climb.into / climb.span) * 100) : 100;
  return (
    <section className="sheet" role="dialog" aria-modal="true" aria-label={t(`level.${progress.level}`)}>
      <div className="sheet-card">
        <div className="row">
          <h2>
            {t(`level.${progress.level}`)} · {progress.xp} XP
          </h2>
          <button type="button" className="icon-btn" aria-label={t("close")} onClick={onClose}>
            <XeIcon emoji="✖️" />
          </button>
        </div>
        <div className="xp-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="muted">
          {t("streak")} {progress.streak}
          {climb.next ? ` · ${climb.need} XP → ${t(`level.${climb.next}`)}` : ` · ${t("level.max")}`}
        </p>
        <ul className="badges">
          {progress.badges.length === 0 && <li className="muted">{t("badges.empty")}</li>}
          {progress.badges.map((badge) => (
            <li key={badge}>
              <XeIcon emoji="⭐" />
              <span>{t(`badge.${badge}`)}</span>
            </li>
          ))}
        </ul>
        <div className="row wrap">
          {progress.level === "master" && (
            <button type="button" className="chip emphasis" onClick={onTools}>
              <XeIcon emoji="🪄" />
              <span>{t("tools.title")}</span>
            </button>
          )}
          {walletUnlocked(progress) && (
            <button type="button" className="chip" onClick={onWallet}>
              <XeIcon emoji="🔗" />
              <span>{t("wallet.open")}</span>
            </button>
          )}
          <button type="button" className="chip" onClick={onBoard}>
            <XeIcon emoji="⭐" />
            <span>{t("board.open")}</span>
          </button>
        </div>
        <ol className="levels">
          {LEVELS.map((level) => (
            <li key={level.id} className={level.id === progress.level ? "on" : undefined}>
              {t(`level.${level.id}`)} · {level.xp} XP
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function MasterSheet({ onClose }: { onClose: () => void }) {
  const [stir, setStir] = useState(masterMix.stir);
  const [hue, setHue] = useState(masterMix.hue);
  const [swirl, setSwirl] = useState(masterMix.swirl);
  const [bloom, setBloom] = useState(masterMix.bloom);
  const [freeze, setFreeze] = useState(masterMix.freeze);
  return (
    <section className="sheet" role="dialog" aria-modal="true" aria-label={t("tools.title")}>
      <div className="sheet-card">
        <div className="row">
          <h2>{t("tools.title")}</h2>
          <button type="button" className="icon-btn" aria-label={t("close")} onClick={onClose}>
            <XeIcon emoji="✖️" />
          </button>
        </div>
        <p className="muted">{t("tools.body")}</p>
        <label>
          {t("tools.stir")}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={stir}
            onChange={(event) => {
              const value = Number(event.target.value);
              setStir(value);
              masterMix.stir = value;
            }}
          />
        </label>
        <label>
          {t("tools.hue")}
          <input
            type="range"
            min={-40}
            max={40}
            step={1}
            value={hue}
            onChange={(event) => {
              const value = Number(event.target.value);
              setHue(value);
              masterMix.hue = value;
            }}
          />
        </label>
        <label>
          {t("tools.swirl")}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={swirl}
            onChange={(event) => {
              const value = Number(event.target.value);
              setSwirl(value);
              masterMix.swirl = value;
            }}
          />
        </label>
        <label>
          {t("tools.bloom")}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={bloom}
            onChange={(event) => {
              const value = Number(event.target.value);
              setBloom(value);
              masterMix.bloom = value;
            }}
          />
        </label>
        <button
          type="button"
          className={freeze ? "chip on" : "chip"}
          onClick={() => {
            const next = !freeze;
            setFreeze(next);
            masterMix.freeze = next;
          }}
        >
          <XeIcon emoji="❄️" />
          <span>{freeze ? t("tools.thaw") : t("tools.freeze")}</span>
        </button>
      </div>
    </section>
  );
}

export function WalletSheet({
  wallet,
  onWallet,
  onClose,
  onNotice,
}: {
  wallet: WalletState | null;
  onWallet: (next: WalletState) => void;
  onClose: () => void;
  onNotice: (message: string) => void;
}) {
  const [owned, setOwned] = useState<OwnedToken[]>([]);
  const [notes, setNotes] = useState<MintNote[]>([]);
  const [tokenId, setTokenId] = useState("");
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setNotes(loadMints());
    if (!wallet || !CHAIN.contract) return;
    let stop = false;
    void listOwnedTokens(wallet.address)
      .then((rows) => {
        if (!stop) setOwned(rows);
      })
      .catch(() => {
        if (!stop) setOwned([]);
      });
    return () => {
      stop = true;
    };
  }, [wallet]);

  return (
    <section className="sheet" role="dialog" aria-modal="true" aria-label={t("wallet.open")}>
      <div className="sheet-card">
        <div className="row">
          <h2>{t("wallet.open")}</h2>
          <button type="button" className="icon-btn" aria-label={t("close")} onClick={onClose}>
            <XeIcon emoji="✖️" />
          </button>
        </div>
        <p className="muted">
          {CHAIN.name} · {CHAIN.id}
        </p>
        {!walletAvailable() && <p>{t("mint.noWallet")}</p>}
        {walletAvailable() && !wallet && (
          <button
            type="button"
            className="emphasis"
            onClick={() => {
              void connectWallet()
                .then(onWallet)
                .catch((error: unknown) => onNotice(error instanceof Error ? error.message : t("mint.noWallet")));
            }}
          >
            <XeIcon emoji="🔗" />
            <span>{t("mint.connect")}</span>
          </button>
        )}
        {wallet && (
          <p className="muted">
            {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)} · {wallet.balanceEth} ETH
            {wallet.chainId === CHAIN.id ? "" : ` · ${t("wallet.wrongChain")}`}
          </p>
        )}
        {!CHAIN.contract && <p>{t("mint.noContract")}</p>}
        <h3>{t("wallet.mints")}</h3>
        <ul className="drops">
          {owned.length === 0 && notes.length === 0 && <li className="muted">{t("wallet.empty")}</li>}
          {owned.map((token) => (
            <li key={token.id}>
              <XeIcon emoji="✨" />
              <span>
                #{token.id}
              </span>
              <button type="button" className="chip" onClick={() => setTokenId(token.id)}>
                {t("wallet.use")}
              </button>
            </li>
          ))}
          {notes.map((note) => (
            <li key={note.hash}>
              <XeIcon emoji="📸" />
              <span>
                {note.hash.slice(0, 10)} · {note.uri.replace(/^https?:\/\//, "").slice(0, 28)}
              </span>
            </li>
          ))}
        </ul>
        <label>
          {t("wallet.token")}
          <input value={tokenId} inputMode="numeric" onChange={(event) => setTokenId(event.target.value)} />
        </label>
        <label>
          {t("wallet.to")}
          <input value={to} spellCheck={false} onChange={(event) => setTo(event.target.value.trim())} />
        </label>
        <button
          type="button"
          className="emphasis"
          disabled={!wallet || !CHAIN.contract || busy}
          onClick={() => {
            if (!wallet) return;
            setBusy(true);
            void transferToken(wallet.address, to, tokenId)
              .then((hash) => {
                onNotice(`${t("wallet.sent")} ${hash.slice(0, 10)}`);
                return listOwnedTokens(wallet.address).then(setOwned).catch(() => undefined);
              })
              .catch((error: unknown) => onNotice(error instanceof Error ? error.message : t("wallet.fail")))
              .finally(() => setBusy(false));
          }}
        >
          {t("wallet.transfer")}
        </button>
      </div>
    </section>
  );
}

export type BoardRow = { handle: string; xp: number; streak: number; level: string };

export function BoardSheet({
  rows,
  handle,
  optIn,
  onHandle,
  onOptIn,
  onHide,
  onClose,
}: {
  rows: BoardRow[];
  handle: string;
  optIn: boolean;
  onHandle: (value: string) => void;
  onOptIn: () => void;
  onHide: () => void;
  onClose: () => void;
}) {
  const picks = ["🫧", "🔥", "🌿", "🌙", "🍯", "❄️", "✨"];
  return (
    <section className="sheet" role="dialog" aria-modal="true" aria-label={t("board.open")}>
      <div className="sheet-card">
        <div className="row">
          <h2>{t("board.open")}</h2>
          <button type="button" className="icon-btn" aria-label={t("close")} onClick={onClose}>
            <XeIcon emoji="✖️" />
          </button>
        </div>
        <p className="muted">{t("board.body")}</p>
        <label>
          {t("board.handle")}
          <input value={handle} maxLength={16} onChange={(event) => onHandle(event.target.value)} />
        </label>
        <div className="row wrap">
          {picks.map((emoji) => (
            <button key={emoji} type="button" className="icon-btn" onClick={() => onHandle(cleanHandle(emoji) || emoji)}>
              <XeIcon emoji={emoji} />
            </button>
          ))}
        </div>
        {!optIn && (
          <button type="button" className="emphasis" onClick={onOptIn}>
            {t("board.join")}
          </button>
        )}
        {optIn && (
          <button type="button" onClick={onHide}>
            {t("board.hide")}
          </button>
        )}
        <ol className="board">
          {rows.length === 0 && <li className="muted">{t("board.empty")}</li>}
          {rows.map((row, index) => (
            <li key={`${row.handle}-${index}`}>
              <span>
                {index + 1}. {row.handle}
              </span>
              <span className="muted">
                {row.xp} XP · {t(`level.${row.level as LevelId}`)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
