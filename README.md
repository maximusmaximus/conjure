# Conjure

Friends share one cauldron. Each phone drops an ingredient. Together they shape a living brew, then capture it, share a link that replays it, and mint it on Robinhood Chain testnet when a collection contract is configured.

## Try it

1. Open the cauldron and tap **Start**.
2. Tap an ingredient. It drops in.
3. Tap **Capture**, then **Share**. The link replays the brew.

A circle opens from **Gather** after you have used, or declined, a sensor. The host shows a four-character code. Other phones join that code. Raw audio and camera frames stay on the device.

## Chain

Robinhood Chain testnet only (chain id 46630, public RPC `https://rpc.testnet.chain.robinhood.com`). No keys are stored in the repo. See `src/conjure/chain.ts`.

## Tests

- `npm test` runs unit tests, including brew mapping, consent, and mint cap.
- `node scripts/check-manifest.mjs` checks shipped artwork against `assets/MANIFEST.json`.

## License

Code in this app is MIT (`LICENSE`). Third-party artwork is listed in `assets/MANIFEST.json`.

Xero Emoji by Max Infeld, CC BY 4.0 — https://github.com/maximusmaximus/xeroemoji
