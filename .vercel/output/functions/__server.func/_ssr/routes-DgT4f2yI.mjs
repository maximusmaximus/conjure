import { N as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { a as Route$4 } from "./router-CoYPdMwM.mjs";
import { t as ConjureApp } from "./app-BRHp-Cky.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgT4f2yI.js
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
