import { o as __toESM } from "../_runtime.mjs";
import { I as require_jsx_runtime, L as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { n as Route } from "./router-DdzyY9hZ.mjs";
import { C as t, n as PageFrame, t as ConjureApp, u as loadReplay } from "./app-CUQQBAqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._id-Ci6dDLu8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReplayPage() {
	const { id } = Route.useParams();
	const { d } = Route.useSearch();
	const [creation, setCreation] = (0, import_react.useState)("wait");
	(0, import_react.useEffect)(() => {
		setCreation(loadReplay(id, d));
	}, [id, d]);
	if (creation === "wait") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, {
		title: t("app.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("replay") })
	});
	if (!creation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, {
		title: t("notFound"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("empty") })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConjureApp, { replay: creation });
}
//#endregion
export { ReplayPage as component };
