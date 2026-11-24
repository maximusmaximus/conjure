import { N as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Route$4 } from "./router-Bb66oXw6.mjs";
import { t as ConjureApp } from "./app-JLROx8KU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BI4gU5bm.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { room, watch } = Route$4.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConjureApp, {
		invite: room,
		watch
	});
}
//#endregion
export { Home as component };
