# Grok Build brief: CONJURE

You are building a production-grade, mobile-first creative app. Read the whole brief before you write any code. Where the brief and your judgment differ, follow the brief and note the difference in `docs/DECISIONS.md`.

---

## 0. One-line pitch

**Conjure:** friends gather around one shared 3D "cauldron". Each phone adds an ingredient — a color from its camera, a sound from its mic, a stir from its tilt — and together they conjure a living 3D creation that can be replayed, shared and minted.

---

## 1. Research first (do this before choosing the stack)

Spend your first pass researching. Write the results to `docs/RESEARCH.md` with a link for every claim. Pick, justify and cite what you use.

### 1a. Graphics (current as of late 2026; verify each)
Evaluate and choose from:
- **three.js `WebGPURenderer` + TSL** (three.js shading language). WebGPU first, automatic WebGL2 fallback. WebGPU now ships in Chrome/Edge (desktop + Android 12+), Firefox 141+ (Windows) / 145+ (Apple Silicon macOS), and Safari on iOS/iPadOS/macOS 26+.
- **React Three Fiber v9+** with the WebGPU renderer, `@react-three/drei` helpers.
- **Gaussian splats:** Spark 2.0 (sparkjs.dev, WebGL2, LoD streaming, runs on mobile). Use it for any splat content.
- GPU compute particles and node-based post-processing (bloom, DoF, SSGI) via TSL.
- **On-device perception:** MediaPipe Tasks for Web (hands, face, pose, image segmentation). Use the Web Audio API `AnalyserNode` for loudness, pitch and onset.
- Asset formats: glTF/GLB with Meshopt + KTX2 (Basis) compression, and `.spz` for splats.

Use a capability probe at startup and set a quality tier (`low`, `mid`, `high`). Never block a user because WebGPU is missing.

### 1b. Open image and 3D sources (licenses safe for commercial use only)
Only ship assets whose license allows commercial use. Record every asset with its source, URL, license and author in `assets/MANIFEST.json`. The app's Credits screen is generated from that file. Candidates to evaluate:
- **Poly Haven:** HDRIs, textures, models (CC0).
- **Smithsonian Open Access 3D** (CC0 items only).
- **The Met Open Access** images (CC0).
- **Art Institute of Chicago, Rijksmuseum, Cleveland Museum of Art** open access (CC0 items).
- **Objaverse-XL / Objaverse 1.0:** the dataset is ODC-By, but each object keeps its own license. Filter to CC0 and CC-BY only, and store the attribution for each.
- **Google Scanned Objects** (CC BY 4.0), **Kenney** and **Quaternius** (CC0), **ambientCG** (CC0).
- **Openverse** and **Wikimedia Commons**, filtered to CC0, PD or CC BY.

Exclude NC, ND and unknown licenses. Add a CI check that fails the build if any asset in the bundle or in R2 lacks a manifest entry with an allowed license.

---

## 2. Product concept

### 2a. Core loop (it has to work in 10 seconds with zero reading)
1. Open the link. A cauldron is already bubbling. One button: **🫧 Start** (Xero Emoji).
2. Tap an ingredient (an emoji) and it drops in. The creation reacts instantly.
3. **📸 Capture**: a 6-second loop, a still and a GLB are saved.
4. **🔗 Share**: a link that replays the exact creation.

### 2b. Layers that unlock as people play (simple first, deep later)
Each layer appears only after the user has used the one before it, or once the device supports it. Never show a locked feature as "coming soon".
1. **Solo tap:** emoji ingredients, presets, instant feedback.
2. **Sensors (opt-in, one at a time):**
   - 🎤 Mic: loudness makes it grow, pitch sets its hue, a clap makes a burst.
   - 📷 Camera: tap to sample a real-world color or texture. Hand pose lets you "stir" in the air.
   - 📱 Motion: tilting stirs, shaking erupts. On iOS, ask for permission with `DeviceMotionEvent.requestPermission`.
   - 💡 Ambient light and 🧭 compass where supported, used as subtle modifiers.
3. **Group play:** other phones join the same cauldron. Each person owns a color and a role (Stirrer, Singer, Spark, Seer), and their contributions are visibly theirs.
4. **Recipes:** save a sequence of ingredients and sensor moves as a recipe that others can remix. Remix lineage is shown.
5. **Deep mode:** a node-style recipe editor (TSL-driven), splat capture or import, custom asset picks from the open-source library, timeline editing of the 6-second loop.

### 2c. Viewport progression (features are added as space grows)
Design every breakpoint on purpose. Test each one.
- **Phone, portrait (≤ 480px):** the core loop, a bottom thumb bar, one action at a time.
- **Phone, landscape / small foldable:** a side ingredient rail and a larger stage.
- **Tablet / unfolded foldable (≥ 768px):** a persistent recipe panel and a contributor list with live meters.
- **Laptop / desktop (≥ 1200px):** **Stage mode**. This screen can be the shared "big cauldron" that phones join by QR. Keyboard shortcuts.
- **Large display / TV (≥ 1920px):** **Spectator wall**, showing the live creation, a QR to join, a contributor ticker and a gallery of recent creations. Readable at 3 m.
- **XR-capable devices (WebXR):** view the creation in AR and place it in the room. Show this only when `navigator.xr` supports it.
Also support safe areas, notches, dynamic viewport units (`dvh`), `prefers-reduced-motion`, `prefers-color-scheme` and `prefers-contrast`, foldable posture (`@media (horizontal-viewport-segments)`), and both orientations.

---

## 3. Pairing and multi-device (no login on every device)

- **Pair by QR or a 4-character code.** The host device shows a QR and a short code; others scan it or type the code. No account is needed to join.
- Each device gets an anonymous, signed device token (stored in an HttpOnly cookie, or IndexedDB for PWA). Re-joining the same room is one tap.
- **Link your devices:** a signed-in user can scan a QR from a second device to link it to their account. One Google sign-in covers all of their devices.
- **Transport:** a Cloudflare **Durable Object per room**, with WebSocket hibernation, for the room state. WebRTC data channels for low-latency sensor streams, with the Durable Object as the signaling server and Cloudflare Realtime TURN as the fallback.
- Only derived features cross the network (for example a hue value, a loudness level or a hand-pose vector). **Raw camera frames and raw audio never leave the device.**
- Rooms expire after inactivity. A room holds up to 12 active players plus unlimited spectators.

---

## 4. Multi-user alignment and consent model

Write this up in `docs/ALIGNMENT.md` and implement it.
- **Roles:** Host (owns the room, can remove people, decides when to capture and mint), Player, Spectator. The host role can be handed off.
- **Per-person, per-sensor consent.** Each person turns on their own mic, camera or motion. Nobody can turn on someone else's sensors. Indicators on every screen show who has which sensor live.
- **Capture consent.** Before a capture is saved, everyone who contributed gets a 5-second "Include me / Leave me out" prompt. The default is *include* only for signed-in users who have opted in; everyone else defaults to *leave out* (their contributions are re-rendered neutral).
- **Credit and ownership.** Every contributor is credited in the creation's metadata (by display name or an anonymous handle). The mint goes to the host's wallet. Each signed-in contributor can mint their own free edition of the same creation.
- **Shared intent.** Before a session starts, the host picks a "vibe" (for example calm, chaotic, spooky). Everyone sees it, and sensor mappings adapt to it so the group is playing toward the same thing.
- **Safety:** room codes are rate-limited, the host can kick and lock the room, display names are filtered, and there is a report button on any shared creation. No free-text chat in v1.

---

## 5. Minting on Robinhood Chain (every saved creation is minted)

- **Chain:** Robinhood Chain (Arbitrum Orbit L2, gas in ETH). Mainnet chain ID **4663**, RPC `https://rpc.mainnet.chain.robinhood.com`, explorer `robinhoodchain.blockscout.com`. Testnet chain ID **46630**, RPC `https://rpc.testnet.chain.robinhood.com`. For production, use a provider RPC such as Alchemy, kept as a secret.
- **Contract:** ERC-721 with ERC-2981 royalties (5% to a royalty receiver set by config), a `MINTER_ROLE` for the relayer, a per-account mint cap, pausable, and immutable `tokenURI` after reveal. Foundry tests at 100% branch coverage on the contract.
- **Every saved creation is minted.** The flow is: capture, then pin the media and metadata (R2 as the source of truth, with IPFS pinning via Pinata), then mint.
- **Free (sponsored) minting with Google sign-in:** users who sign in with Google (Google Identity Services, verified server-side by ID-token audience and issuer) get gasless mints. The Worker's relayer key pays gas and mints to that user's wallet. The wallet is either one they connect, or a custodial wallet created for them (key encrypted with a Worker secret) that they can export later.
- **Without sign-in:** the user connects a wallet (Robinhood Wallet or any EVM wallet via WalletConnect/EIP-6963) and pays their own gas. The creation can still be shared before it is minted.
- **Abuse controls:** daily free-mint quota per Google account and per device; Turnstile on mint; a mint job queue (Cloudflare Queues) with idempotency keys; and a relayer balance alarm that pauses free mints below a threshold.
- **Config, never code:** `CHAIN_ID`, `RPC_URL`, `CONTRACT_ADDRESS`, `RELAYER_PRIVATE_KEY`, `ROYALTY_RECEIVER`, `PINATA_JWT` and `GOOGLE_CLIENT_ID` come from secrets. Default to **testnet**. Switching to mainnet is a config change made only by the owner.

---

## 6. Viral share

- Every creation has a short URL (`/c/<id>`) that **replays it live** in the browser, not just as a video.
- Dynamic Open Graph and Twitter/X cards: an animated preview (MP4/WebP), the title, the contributors and a "Remix this" call to action.
- Web Share API on mobile (with files where supported, so the loop video goes straight into stories). Copy link, download MP4/GIF/PNG/GLB.
- **Remix:** opening a shared creation offers "Remix" in one tap, and lineage is shown ("remixed from …").
- **Invite-to-play:** sharing a live room creates a join link with a QR. Spectator links work on any screen.
- Track share and remix events with privacy-friendly, first-party analytics only.

---

## 7. Icons: Xero Emoji only

- Every icon in the UI is a **Xero Emoji** SVG. No other icon sets, and no system emoji as icons.
- Source: npm package **`xeroemoji`** (v1.0.2+, lookup API + browser replacer) and repo **github.com/maximusmaximus/xeroemoji** (`svg/`, `png/`, release zips). Use `xe.setBase()` to serve a **self-hosted subset** from the app bundle or R2, rather than hotlinking a CDN at runtime.
- Use the **SVG/PNG artwork only** (CC BY 4.0). Do **not** use the Xero Emoji color font, which has a different license.
- Credit line, shown on the Credits screen and in the README: **"Xero Emoji by Max Infeld, CC BY 4.0"** linking to https://github.com/maximusmaximus/xeroemoji.
- Every icon button has a text label or an `aria-label`. Emoji are never the only signal.

---

## 8. UX writing: minimal and chunked

- The user only gets the information they need to take the next step.
- Copy comes in **chunks**: one idea per line, max ~8 words for a button or hint, max 2 short lines per tooltip.
- Onboarding is a single screen: the live cauldron plus one button. Teach by doing with just-in-time hints (each shown once, dismissible).
- Every interaction states *what you are doing*, *who sees it*, and *what happens next*. Example for the mic: "🎤 Your voice shapes the brew" / "Only levels are shared, not audio" / "Tap to stop".
- Permission prompts are pre-explained with one line *before* the browser prompt, and there's a graceful path if the user says no.
- Keep all strings in `src/i18n/en.json`, ready for localization.

---

## 9. Privacy, permissions and security

- Ask for every sensor permission only on user intent, never on load. Show live indicators and one-tap off.
- Processing happens on the device. There is no audio or video recording unless the user explicitly captures, and captures render the creation, not the camera feed (unless the user picks a "photo ingredient").
- Strict CSP, Permissions-Policy, COOP/COEP where needed, SRI for third-party scripts, cookies set `Secure; HttpOnly; SameSite=Lax`.
- The server verifies Google tokens. There are no secrets in the client bundle; CI scans for them.
- `docs/PRIVACY.md` and a plain-language privacy screen in the app.
- WCAG 2.2 AA: full keyboard play on desktop, screen-reader announcements for room events, reduced-motion mode that keeps the app usable.

---

## 10. Architecture and repo (target: Cloudflare)

Build so it deploys to **Cloudflare Workers** without rework:
- **Frontend:** Vite + React + TypeScript (strict), R3F + three.js WebGPU/TSL, Spark for splats, installable PWA (offline shell, Workbox or a hand-written service worker).
- **Backend:** one Worker (Hono or plain fetch router) serving static assets (Workers Static Assets) and `/api/*`.
  - **Durable Objects:** `Room` (state, presence, signaling) and `MintCoordinator` (per-user quotas, idempotency).
  - **R2:** creations (loop MP4/WebP, PNG, GLB, metadata JSON) and the curated open-asset library.
  - **D1:** users, devices, creations, contributors, mints, remix lineage.
  - **Queues:** mint and pin jobs. **KV:** feature config and share-card cache.
  - **Turnstile** on sign-in and on mint.
- `wrangler.jsonc` with `dev`, `preview` and `production` environments. **No secrets in the file**; use `wrangler secret put` and GitHub Actions secrets.
- Repo layout: `apps/web`, `apps/worker`, `packages/shared` (types, schemas with Zod), `contracts/` (Foundry), `assets/` (manifest + scripts), `e2e/`, `docs/`.

---

## 11. Testing (all of it runs in CI)

- **Unit:** Vitest for UI logic, sensor-to-parameter mappings, consent logic, quota logic. Worker tests with `@cloudflare/vitest-pool-workers` (Durable Objects, D1, R2 bindings).
- **Contract:** Foundry tests (fuzz + invariants) for the mint, roles, caps, pause and royalties.
- **E2E:** Playwright on Chromium, WebKit and Firefox, and on mobile emulation (iPhone, Pixel, iPad, desktop, 4K). Use fake media streams (`--use-fake-device-for-media-stream`) and mocked DeviceMotion. Include a **multi-device test** with 3 browser contexts pairing into one room, consenting, capturing and sharing.
- **Accessibility:** `@axe-core/playwright` on every screen at every breakpoint; zero serious or critical violations.
- **Visual regression:** Playwright screenshots per breakpoint, with the WebGL canvas masked or seeded deterministically.
- **Performance:** Lighthouse CI budgets (mobile LCP < 2.5s, INP < 200ms, CLS < 0.1, initial JS < 200 KB gz) and an FPS smoke test on the `low` tier.
- **Security:** CodeQL, `npm audit`, gitleaks, dependency review, license check for npm deps and the asset manifest.

---

## 12. CI/CD (GitHub Actions)

- On PR: lint (ESLint + Prettier), typecheck, unit, worker tests, contract tests, build, E2E, a11y, visual, Lighthouse, security scans. Deploy a **preview** Worker version and comment the URL on the PR.
- On merge to `main`: run the same gates, then deploy to **production** with `cloudflare/wrangler-action`, apply D1 migrations, and run a post-deploy smoke test that rolls back on failure.
- Secrets live only in **GitHub Actions environment secrets** (`CLOUDFLARE_API_TOKEN` scoped to this account's Workers/R2/D1/Queues, `CLOUDFLARE_ACCOUNT_ID`) and in **Wrangler secrets** for runtime values. Protect the production environment with required reviewers. Pin actions by SHA. Use Dependabot or Renovate.
- Conventional commits, a changelog generated from merged PRs, branch protection on `main`.

---

## 13. Public repo rules

- Only describe what is live. **No roadmap, "coming soon", future plans or upcoming platforms** in the README, docs or UI.
- README: what it is, a live link, a 3-step quick start, an architecture diagram, how to run tests, licenses and credits (including the Xero Emoji credit line).
- `LICENSE` for the code. Third-party asset licenses are listed from `assets/MANIFEST.json`.
- `.env.example` with names only. `.gitignore` covers `.env*`, `.dev.vars`, keys.

---

## 14. Definition of done

- [ ] The core loop works on a mid-range Android and an iPhone with WebGL2 only, and with WebGPU.
- [ ] Every breakpoint in §2c is implemented and covered by a visual test.
- [ ] 3 devices can pair by QR/code, play, consent, capture and share in under 60 seconds.
- [ ] A Google-signed-in user can mint for free on testnet; a wallet user can mint by paying gas.
- [ ] Every UI icon is a Xero Emoji SVG; the credit line is present.
- [ ] Every shipped asset is in the manifest with an allowed license.
- [ ] All CI gates are green; no secrets in the repo or bundle.
- [ ] `docs/RESEARCH.md`, `docs/ALIGNMENT.md`, `docs/PRIVACY.md`, `docs/DECISIONS.md` are complete.

When you finish, push to GitHub and report: the repo URL, the commit SHA, test results per suite, Lighthouse scores, and any requirement you could not meet and why.
