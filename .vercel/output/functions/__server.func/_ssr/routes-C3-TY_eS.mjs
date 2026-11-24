import { at as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { y as Route$4 } from "./router-BTLI5VI2.mjs";
import { t as ConjureApp } from "./app-36nkK2us.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C3-TY_eS.js
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
