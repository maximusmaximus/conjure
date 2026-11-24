# Decisions

Where this build differs from the Conjure brief, and why.

1. **Host app, not a Cloudflare Worker.** The workspace deploys as a TanStack Start app. Durable Objects, Queues, R2, D1, KV, Turnstile, and Workers Static Assets are not the runtime here. Shared circles use Postgres (embedded in preview, Neon when `DATABASE_URL` is set). Tables are unowned: the code is the secret.

2. **WebGL2 stage, WebGPU probe.** `navigator.gpu` selects the quality tier (particle count, pixel ratio). The picture is a WebGL2 shader so a missing WebGPU adapter never blocks anyone. TSL is not the material used on screen.

3. **No Spark splats.** No commercially licensed splat file is in the bundle, so Spark is not loaded.

4. **No MediaPipe model.** Hand stirring is pointer drag, device tilt, and camera frame-difference. The MediaPipe wasm bundle is not downloaded.

5. **No relayer, no collection contract, testnet only.** Chain id is fixed at 46630. The public RPC is in `src/conjure/chain.ts`. `CHAIN.contract` is an empty public constant. A wallet can be asked to switch to Robinhood Chain testnet and to read a balance. A mint transaction is sent only if that constant is a contract address. There is no Google ID token check and no sponsored gas, because a relayer private key cannot live in the client. Daily mint attempts are capped per device id.

6. **Anonymous device id in localStorage.** It is not a signed cookie. Signing would need a server secret.

7. **Room transport is polling, not WebRTC.** Derived sensor numbers post to `/api/conjure`. Raw media stays put. A full mesh plus TURN is not used.

8. **Loop file is WebM, not MP4.** `MediaRecorder` writes WebM when the browser supports it. The share link replays the recipe live. A JPEG still and a GLB download are offered from the same capture.

9. **Icons.** Product UI uses Xero Emoji SVGs only. The platform error screen keeps its own icon.

10. **No extra Content-Security-Policy.** The preview injector loads scripts from grok.com. A strict CSP would block that.

11. **Contract tests.** `contracts/Conjure.sol` is the minting shape (ERC-721-style, royalty, minter, pause, cap, one token URI). Foundry is not installed in this environment, so those tests were not executed.

12. **JavaScript weight.** three.js is larger than a 200 KB initial budget. The canvas is a lazy import. The budget is not met.

13. **Search params.** `room` and `watch` are stripped when empty so the cauldron URL stays `/`.
