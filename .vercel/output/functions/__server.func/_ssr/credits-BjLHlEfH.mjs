import { N as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as PageFrame } from "./app-BRHp-Cky.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credits-BjLHlEfH.js
var import_jsx_runtime = require_jsx_runtime();
function CreditsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageFrame, {
		title: "Credits",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://github.com/maximusmaximus/xeroemoji",
				children: "Xero Emoji by Max Infeld, CC BY 4.0"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The cauldron, brew, and forms are drawn in the browser. No external meshes are shipped." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Robinhood Chain testnet is chain id 46630. This build does not include a relayer key or a collection contract address." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Graphics use three.js with a WebGL2 stage. A WebGPU adapter, when present, only picks the quality tier." })
		]
	});
}
//#endregion
export { CreditsPage as component };
