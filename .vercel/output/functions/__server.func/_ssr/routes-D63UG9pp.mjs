import { ot as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { y as Route$4 } from "./router-CIsnqhEA.mjs";
import { t as ConjureApp } from "./app-BzIaw2Tf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D63UG9pp.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { room, watch, debug } = Route$4.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConjureApp, {
		invite: room,
		watch,
		debug: debug === 1
	});
}
//#endregion
export { Home as component };
