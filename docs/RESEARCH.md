# Research

Checked before choosing the stack that ships in this app. Dates refer to sources as published, read November 2026.

## Graphics

- three.js `WebGPURenderer` is the WebGPU path, with WebGL2 fallback inside three itself, and TSL is the node shading language. Shipped renderer here is WebGL2 `ShaderMaterial`, with a `navigator.gpu.requestAdapter()` probe used only to pick a quality tier. Sources: [three.js WebGPURenderer](https://threejs.org/docs/#api/en/renderers/WebGPURenderer), [Three.js Shading Language](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language), [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API).
- React Three Fiber renders three.js as React components and fits this TanStack Start app. Source: [R3F docs](https://r3f.docs.pmnd.rs/).
- Spark 2.0 renders Gaussian splats on WebGL2 with level-of-detail streaming. No splat asset is shipped, so Spark is not in the bundle. Source: [sparkjs.dev](https://sparkjs.dev/).
- MediaPipe Tasks can run hand, face, and pose models in the browser. This app does not download those models. Stirring uses pointer drag, device motion, and frame-difference of the local camera. Source: [MediaPipe hand landmarker for web](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js).
- Web Audio `AnalyserNode` supplies loudness and a rough pitch. Source: [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode).
- glTF binary export uses three's `GLTFExporter`. Source: [GLTFExporter](https://threejs.org/docs/#examples/en/exporters/GLTFExporter).
- WebXR AR is offered only when `navigator.xr.isSessionSupported("immersive-ar")` resolves true. Source: [WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).

## Open image and 3D sources

Evaluated and not bundled. The brew is procedural geometry plus a self-hosted Xero Emoji subset.

| Source | License notes | Link |
| --- | --- | --- |
| Poly Haven | CC0 | https://polyhaven.com/license |
| Smithsonian 3D | CC0 items exist; filter per object | https://3d.si.edu/ |
| The Met | Open Access CC0 images | https://www.metmuseum.org/about-the-met/policies-and-documents/open-access |
| Art Institute of Chicago | CC0 images | https://www.artic.edu/open-access/open-access-images |
| Rijksmuseum | CC0 images | https://www.rijksmuseum.nl/en/research/conduct-research/data |
| Cleveland Museum of Art | Open Access | https://www.clevelandart.org/open-access |
| Objaverse | Dataset ODC-By; each object keeps its own license | https://objaverse.allenai.org/ |
| Google Scanned Objects | CC BY 4.0 | https://research.google/blog/scanned-objects-by-google-research-a-dataset-of-3d-scanned-common-household-items/ |
| Kenney | CC0 | https://www.kenney.nl/assets |
| Quaternius | CC0 | https://quaternius.com/ |
| ambientCG | CC0 | https://ambientcg.com/about |
| Openverse | Mixed; filter to CC0, public domain, or CC BY | https://openverse.org/ |

NC, ND, and unknown licenses are excluded. Shipped files are listed in `assets/MANIFEST.json`. `scripts/check-manifest.mjs` fails if a bundled Xero SVG has no allowed license entry.

## Chain

- Robinhood Chain testnet chain id **46630**, public RPC `https://rpc.testnet.chain.robinhood.com`, explorer `https://explorer.testnet.chain.robinhood.com`. Mainnet is chain id 4663 and is not used. Sources: [Chainlist 46630](https://chainid.network/chain/46630/), [Robinhood Chain docs](https://docs.robinhood.com/chain/), [testnet comparison](https://triport.io/learn/robinhood-chain-testnet).
- ERC-2981 is the royalty standard used by the contract sketch (5%). Source: [EIP-2981](https://eips.ethereum.org/EIPS/eip-2981).

## Icons

- Xero Emoji artwork is CC BY 4.0. The npm package `xeroemoji@1.0.2` looks up SVG paths. `setBase("/xeroemoji/")` points at the self-hosted subset in `public/xeroemoji/svg/`. The color font is not used. Sources: [GitHub](https://github.com/maximusmaximus/xeroemoji), [npm](https://www.npmjs.com/package/xeroemoji), [usage note](https://dev.to/xerographerfonts/use-xero-emoji-from-npm-and-jsdelivr-36j7).
