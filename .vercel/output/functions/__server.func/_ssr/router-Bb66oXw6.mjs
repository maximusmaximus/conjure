import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime, P as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stripSearchParams } from "../_libs/@tanstack/router-core+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as number, c as union, i as literal, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bb66oXw6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-OUU3OIsi.css";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Conjure" },
			{
				name: "theme-color",
				content: "#110e0c"
			},
			{
				name: "description",
				content: "A shared cauldron. Drop an ingredient. Capture the brew."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Outfit:wght@380;520;650&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "made-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "made-in-git",
						href: "https://github.com/maximusmaximus/conjure",
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "GitHub",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/xeroemoji/svg/1f4bb.svg",
							alt: "",
							width: "16",
							height: "16"
						})
					}),
					"made with ❤️ in SF by",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://maxi.grok.me",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "maxi.grok.me"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-BI4gU5bm.mjs");
var Route$4 = createFileRoute("/")({
	validateSearch: (search) => ({
		room: typeof search.room === "string" ? search.room.toUpperCase().slice(0, 4) : "",
		watch: search.watch === "1" || search.watch === "true" || search.watch === true
	}),
	search: { middlewares: [stripSearchParams({
		room: "",
		watch: false
	})] },
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./credits-CVANFqor.mjs");
var Route$3 = createFileRoute("/credits")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./privacy-BFROSqLL.mjs");
var Route$2 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var _0002_conjure_default = "-- Shared cauldrons. Rows are unowned: anyone with the room code can play.\n-- No emails, no raw audio, no camera frames.\n\ncreate table if not exists conjure_rooms (\n  code text primary key,\n  host_id text not null,\n  vibe text not null,\n  locked boolean not null default false,\n  consent text,\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists conjure_members (\n  code text not null references conjure_rooms (code) on delete cascade,\n  device_id text not null,\n  name text not null,\n  role text not null,\n  seat text not null,\n  color text not null,\n  sensors text not null default '{}',\n  last_seen timestamptz not null default now(),\n  primary key (code, device_id)\n);\n\ncreate table if not exists conjure_drops (\n  id text primary key,\n  code text not null references conjure_rooms (code) on delete cascade,\n  ingredient text not null,\n  by_device text not null,\n  at_ms bigint not null,\n  neutral boolean not null default false\n);\n\ncreate index if not exists conjure_drops_code on conjure_drops (code, at_ms);\n\ncreate table if not exists conjure_room_creates (\n  id bigserial primary key,\n  device_id text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists conjure_reports (\n  id bigserial primary key,\n  creation_id text not null,\n  reason text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists conjure_events (\n  id bigserial primary key,\n  name text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists conjure_mints (\n  id bigserial primary key,\n  device_id text not null,\n  creation_id text not null,\n  created_at timestamptz not null default now(),\n  unique (device_id, creation_id)\n);\n";
var _0003_board_default = "-- Opt-in scoreboard. Handle, score, and streak only. No wallet, no email.\n\ncreate table if not exists conjure_board (\n  device_id text primary key,\n  handle text not null,\n  xp integer not null,\n  streak integer not null,\n  level text not null,\n  updated_at timestamptz not null default now()\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_conjure.sql": _0002_conjure_default,
			"/migrations/0003_board.sql": _0003_board_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
/** Include by default only when the person is signed in and has opted in. */
function defaultIncluded(signedIn, optedIn) {
	return signedIn && optedIn;
}
function withinDailyCap(used, cap = 5) {
	return Number.isFinite(used) && used < cap;
}
/**
* Host capture counts as include for the host.
* Everyone else who does not vote in time uses the signed-in opt-in default.
*/
function resolveVotes(voters, votes, signedIn, optedIn) {
	const result = {};
	for (const voter of voters) {
		const vote = votes[voter.id];
		if (vote === "in") result[voter.id] = true;
		else if (vote === "out") result[voter.id] = false;
		else if (voter.isHost) result[voter.id] = true;
		else result[voter.id] = defaultIncluded(Boolean(signedIn[voter.id]), Boolean(optedIn[voter.id]));
	}
	return result;
}
var BLOCK = /\b(fuck|shit|cunt|nigger|nigga|faggot|fag|bitch|asshole|slut|retard)\b/i;
/** Display names are short and filtered. Null means "pick another". */
function cleanName(raw) {
	const name = raw.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 18);
	if (name.length < 2) return null;
	if (BLOCK.test(name)) return null;
	return name;
}
function roomCodeOk(code) {
	return /^[A-HJ-NP-Z2-9]{4}$/.test(code);
}
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeRoomCode(random = Math.random) {
	let code = "";
	for (let i = 0; i < 4; i += 1) code += ALPHABET[Math.floor(random() * 32)];
	return code;
}
var LEVELS = [
	{
		id: "spark",
		xp: 0
	},
	{
		id: "stir",
		xp: 24
	},
	{
		id: "circle",
		xp: 70
	},
	{
		id: "keep",
		xp: 120
	},
	{
		id: "master",
		xp: 180
	}
];
var ACTIONS = {
	start: 8,
	drop: 6,
	sensor: 18,
	gather: 22,
	capture: 36,
	share: 20,
	remix: 16,
	recipe: 14,
	mint: 40,
	fling: 4
};
var DAILY_CAP = {
	start: 1,
	drop: 12,
	sensor: 3,
	fling: 6,
	share: 4
};
var BADGE_FOR = {
	start: "spark",
	drop: "drop",
	sensor: "sensor",
	gather: "circle",
	capture: "keep",
	share: "share",
	fling: "fling",
	mint: "mint"
};
function emptyProgress() {
	return {
		xp: 0,
		level: "spark",
		streak: 0,
		lastDay: "",
		badges: [],
		day: "",
		dayCounts: {}
	};
}
function localDay(now) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function levelFor(xp) {
	let id = "spark";
	for (const level of LEVELS) if (xp >= level.xp) id = level.id;
	return id;
}
function xpToNext(xp) {
	const current = levelFor(xp);
	const index = LEVELS.findIndex((level) => level.id === current);
	const upcoming = LEVELS[index + 1];
	if (!upcoming) return {
		next: null,
		need: 0,
		span: 1,
		into: 1
	};
	const floor = LEVELS[index].xp;
	return {
		next: upcoming.id,
		need: upcoming.xp - xp,
		span: upcoming.xp - floor,
		into: xp - floor
	};
}
function walletUnlocked(progress) {
	return LEVELS.findIndex((level) => level.id === progress.level) >= 3 || progress.badges.includes("mint");
}
function nextStepId(progress) {
	if (!progress.badges.includes("drop")) return "drop";
	if (!progress.badges.includes("sensor")) return "sensor";
	if (!progress.badges.includes("keep")) return "capture";
	if (!progress.badges.includes("circle")) return "gather";
	if (!progress.badges.includes("share")) return "share";
	if (!progress.badges.includes("fling")) return "fling";
	if (progress.level !== "master") return "master";
	if (!progress.badges.includes("mint")) return "wallet";
	return "board";
}
function award(progress, action, now = /* @__PURE__ */ new Date()) {
	const day = localDay(now);
	let streak = progress.streak;
	let dayCounts = progress.day === day ? { ...progress.dayCounts } : {};
	if (progress.lastDay !== day) {
		const yesterday = localDay(/* @__PURE__ */ new Date(now.getTime() - 864e5));
		streak = progress.lastDay === yesterday ? Math.max(1, progress.streak) + 1 : 1;
		dayCounts = {};
	}
	const cap = DAILY_CAP[action];
	const used = dayCounts[action] ?? 0;
	const gained = cap != null && used >= cap ? 0 : ACTIONS[action];
	if (gained > 0) dayCounts[action] = used + 1;
	const xp = progress.xp + gained;
	const level = levelFor(xp);
	const badges = new Set(progress.badges);
	const badge = BADGE_FOR[action];
	if (badge && gained > 0) badges.add(badge);
	if (streak >= 3) badges.add("streak");
	if (level === "master") badges.add("master");
	return {
		progress: {
			xp,
			level,
			streak,
			lastDay: day,
			badges: [...badges],
			day,
			dayCounts
		},
		gained,
		leveledUp: level !== progress.level && gained > 0
	};
}
var PROGRESS_KEY = "conjure.progress.v1";
function loadProgress() {
	if (typeof window === "undefined") return emptyProgress();
	try {
		const raw = localStorage.getItem(PROGRESS_KEY);
		if (!raw) return emptyProgress();
		const parsed = JSON.parse(raw);
		return {
			...emptyProgress(),
			...parsed,
			level: levelFor(parsed.xp ?? 0),
			badges: Array.isArray(parsed.badges) ? parsed.badges.filter((item) => typeof item === "string") : [],
			dayCounts: parsed.dayCounts && typeof parsed.dayCounts === "object" ? parsed.dayCounts : {}
		};
	} catch {
		return emptyProgress();
	}
}
function saveProgress(progress) {
	if (typeof window === "undefined") return;
	localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
var TIPS_KEY = "conjure.tips.v1";
var TIP_ORDER = [
	"fling",
	"capture",
	"gather",
	"share",
	"master",
	"wallet",
	"board"
];
function loadDismissedTips() {
	if (typeof window === "undefined") return [];
	try {
		const raw = JSON.parse(localStorage.getItem(TIPS_KEY) || "[]");
		if (!Array.isArray(raw)) return [];
		return raw.filter((item) => TIP_ORDER.includes(item));
	} catch {
		return [];
	}
}
function dismissTip(id) {
	const next = [.../* @__PURE__ */ new Set([...loadDismissedTips(), id])];
	localStorage.setItem(TIPS_KEY, JSON.stringify(next));
	return next;
}
function currentTip(dismissed, gates) {
	for (const id of TIP_ORDER) if (gates[id] && !dismissed.includes(id)) return id;
	return null;
}
var BOARD_KEY = "conjure.board.v1";
function loadBoardPrefs() {
	if (typeof window === "undefined") return {
		optIn: false,
		handle: "",
		hidden: false
	};
	try {
		const parsed = JSON.parse(localStorage.getItem(BOARD_KEY) || "{}");
		return {
			optIn: Boolean(parsed.optIn),
			handle: typeof parsed.handle === "string" ? parsed.handle : "",
			hidden: Boolean(parsed.hidden)
		};
	} catch {
		return {
			optIn: false,
			handle: "",
			hidden: false
		};
	}
}
function saveBoardPrefs(prefs) {
	if (typeof window === "undefined") return;
	localStorage.setItem(BOARD_KEY, JSON.stringify(prefs));
}
function cleanHandle(raw) {
	const text = raw.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 16);
	if (!text) return "";
	if (text.includes("@")) return "";
	if (/^0x[a-fA-F0-9]{6,}$/.test(text)) return "";
	return text;
}
var DEVICE = string().regex(/^d_[a-zA-Z0-9]{8,32}$/);
var CODE = string().regex(/^[A-HJ-NP-Z2-9]{4}$/);
var ING = _enum([
	"ember",
	"moss",
	"moon",
	"salt",
	"honey",
	"frost",
	"ink",
	"spark"
]);
var VIBE = _enum([
	"calm",
	"chaotic",
	"spooky"
]);
var SEAT = _enum([
	"stirrer",
	"singer",
	"spark",
	"seer"
]);
var COLORS = [
	"#e27a3a",
	"#6ea86a",
	"#7aa2ff",
	"#e6a322",
	"#c47cff",
	"#7ec8d6",
	"#f0719a",
	"#f3ead7",
	"#8fd18a",
	"#d98b6c",
	"#6ec8b0",
	"#e8d27a"
];
var SEATS = [
	"stirrer",
	"singer",
	"spark",
	"seer"
];
var sensorSchema = object({
	loudness: number().min(0).max(1).default(0),
	pitch: number().min(0).max(1).default(.5),
	burst: number().min(0).max(1).default(0),
	tiltX: number().min(-1).max(1).default(0),
	tiltY: number().min(-1).max(1).default(0),
	shake: number().min(0).max(1).default(0),
	sampleHue: number().min(0).max(360).nullable().default(null),
	wave: number().min(0).max(1).default(0),
	mic: boolean().default(false),
	camera: boolean().default(false),
	motion: boolean().default(false)
});
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
function parseConsent(raw) {
	if (!raw) return null;
	try {
		const value = JSON.parse(raw);
		if (!value || typeof value.creationId !== "string") return null;
		return value;
	} catch {
		return null;
	}
}
async function prune(sql) {
	await sql.query(`delete from conjure_members where last_seen < now() - interval '45 seconds'`);
	const lonely = await sql.query(`select r.code, r.host_id from conjure_rooms r
     where not exists (select 1 from conjure_members m where m.code = r.code and m.device_id = r.host_id)`);
	for (const room of lonely) {
		const next = await sql.query(`select device_id from conjure_members where code = $1 and role <> 'spectator'
       order by last_seen desc limit 1`, [room.code]);
		if (!next[0]) await sql.query(`delete from conjure_rooms where code = $1`, [room.code]);
		else {
			await sql.query(`update conjure_rooms set host_id = $2 where code = $1`, [room.code, next[0].device_id]);
			await sql.query(`update conjure_members set role = 'player' where code = $1 and role = 'host'`, [room.code]);
			await sql.query(`update conjure_members set role = 'host' where code = $1 and device_id = $2`, [room.code, next[0].device_id]);
		}
	}
}
async function snapshot(sql, code) {
	const room = (await sql.query(`select code, host_id, vibe, locked, consent from conjure_rooms where code = $1`, [code]))[0];
	if (!room) return json({ error: "That circle is gone." }, 404);
	const members = await sql.query(`select device_id, name, role, seat, color, sensors from conjure_members
     where code = $1 order by last_seen asc`, [code]);
	const drops = await sql.query(`select id, ingredient, by_device, at_ms, neutral from conjure_drops
     where code = $1 order by at_ms asc limit 80`, [code]);
	return json({
		code: room.code,
		hostId: room.host_id,
		vibe: room.vibe,
		locked: Boolean(room.locked),
		consent: parseConsent(room.consent),
		members: members.map(toMember),
		drops: drops.map(toDrop)
	});
}
function toMember(row) {
	let sensors = {
		loudness: 0,
		pitch: .5,
		burst: 0,
		tiltX: 0,
		tiltY: 0,
		shake: 0,
		sampleHue: null,
		wave: 0,
		mic: false,
		camera: false,
		motion: false
	};
	try {
		const parsed = sensorSchema.safeParse({
			...sensors,
			...JSON.parse(row.sensors || "{}")
		});
		if (parsed.success) sensors = parsed.data;
	} catch {}
	return {
		id: row.device_id,
		name: row.name,
		role: row.role === "host" || row.role === "spectator" ? row.role : "player",
		seat: SEATS.includes(row.seat) ? row.seat : "stirrer",
		color: row.color,
		...sensors
	};
}
function toDrop(row) {
	return {
		id: row.id,
		ingredient: row.ingredient,
		by: row.by_device,
		at: Number(row.at_ms),
		neutral: Boolean(row.neutral)
	};
}
async function isHost(sql, code, device) {
	return (await sql.query(`select host_id from conjure_rooms where code = $1`, [code]))[0]?.host_id === device;
}
async function touch(sql, code, device) {
	await sql.query(`update conjure_members set last_seen = now() where code = $1 and device_id = $2`, [code, device]);
}
async function handleConjure(request) {
	try {
		const sql = await getSql();
		if (request.method === "GET") {
			const url = new URL(request.url);
			const code = (url.searchParams.get("code") || "").toUpperCase();
			const device = url.searchParams.get("device") || "";
			if (!roomCodeOk(code)) return json({ error: "That code is not valid." }, 400);
			await prune(sql);
			if (DEVICE.safeParse(device).success) await touch(sql, code, device);
			return snapshot(sql, code);
		}
		if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
		let body;
		try {
			body = await request.json();
		} catch {
			return json({ error: "Invalid JSON." }, 400);
		}
		const op = object({ op: string() }).safeParse(body);
		if (!op.success) return json({ error: "Missing op." }, 400);
		await prune(sql);
		switch (op.data.op) {
			case "create": return createRoom(sql, body);
			case "join": return joinRoom(sql, body);
			case "leave": return leaveRoom(sql, body);
			case "drop": return addDrop(sql, body);
			case "sensor": return setSensor(sql, body);
			case "vibe": return setVibe(sql, body);
			case "lock": return setLock(sql, body);
			case "kick": return kick(sql, body);
			case "handoff": return handoff(sql, body);
			case "seat": return setSeat(sql, body);
			case "consent-open": return consentOpen(sql, body);
			case "consent-vote": return consentVote(sql, body);
			case "neutralize": return neutralize(sql, body);
			case "report": return report(sql, body);
			case "event": return event(sql, body);
			case "mint-touch": return mintTouch(sql, body);
			case "board-list": return listBoard(sql);
			case "board-publish": return publishBoard(sql, body);
			case "board-hide": return hideBoard(sql, body);
			default: return json({ error: "Unknown request." }, 400);
		}
	} catch (error) {
		console.error("[conjure]", error);
		return json({ error: "The circle stalled." }, 500);
	}
}
async function createRoom(sql, body) {
	const parsed = object({
		device: DEVICE,
		name: string(),
		vibe: VIBE
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not open a circle." }, 400);
	const name = cleanName(parsed.data.name);
	if (!name) return json({ error: "Pick another name." }, 400);
	if (((await sql.query(`select count(*)::int as n from conjure_room_creates
     where device_id = $1 and created_at > now() - interval '1 hour'`, [parsed.data.device]))[0]?.n ?? 0) >= 8) return json({ error: "Too many new circles this hour." }, 429);
	let code = "";
	for (let i = 0; i < 6; i += 1) {
		const next = makeRoomCode();
		if (!(await sql.query(`select code from conjure_rooms where code = $1`, [next]))[0]) {
			code = next;
			break;
		}
	}
	if (!code) return json({ error: "Could not open a circle." }, 503);
	await sql.query(`insert into conjure_rooms (code, host_id, vibe) values ($1, $2, $3)`, [
		code,
		parsed.data.device,
		parsed.data.vibe
	]);
	await sql.query(`insert into conjure_members (code, device_id, name, role, seat, color)
     values ($1, $2, $3, 'host', 'stirrer', $4)`, [
		code,
		parsed.data.device,
		name,
		COLORS[0]
	]);
	await sql.query(`insert into conjure_room_creates (device_id) values ($1)`, [parsed.data.device]);
	return snapshot(sql, code);
}
async function joinRoom(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		name: string(),
		watch: boolean().default(false)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not join." }, 400);
	const name = cleanName(parsed.data.name);
	if (!name) return json({ error: "Pick another name." }, 400);
	const rooms = await sql.query(`select locked from conjure_rooms where code = $1`, [parsed.data.code]);
	if (!rooms[0]) return json({ error: "That circle is gone." }, 404);
	const existing = await sql.query(`select device_id from conjure_members where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.device]);
	if (!existing[0] && rooms[0].locked) return json({ error: "The host locked this circle." }, 403);
	const members = await sql.query(`select role from conjure_members where code = $1`, [parsed.data.code]);
	const players = members.filter((m) => m.role !== "spectator").length;
	const specs = members.filter((m) => m.role === "spectator").length;
	if (!existing[0] && parsed.data.watch && specs >= 40) return json({ error: "The wall is full." }, 403);
	if (!existing[0] && !parsed.data.watch && players >= 12) return json({ error: "This circle is full." }, 403);
	const color = COLORS[members.length % COLORS.length] ?? COLORS[0];
	const seat = SEATS[members.length % SEATS.length] ?? "stirrer";
	const role = parsed.data.watch ? "spectator" : "player";
	await sql.query(`insert into conjure_members (code, device_id, name, role, seat, color)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (code, device_id) do update set name = excluded.name, last_seen = now()`, [
		parsed.data.code,
		parsed.data.device,
		name,
		role,
		seat,
		color
	]);
	return snapshot(sql, parsed.data.code);
}
async function leaveRoom(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not leave." }, 400);
	await sql.query(`delete from conjure_members where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.device]);
	await prune(sql);
	return json({ ok: true });
}
async function addDrop(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		id: string().regex(/^[a-z0-9]{4,16}$/),
		ingredient: ING,
		at: number().int()
	}).safeParse(body);
	if (!parsed.success) return json({ error: "That drop did not land." }, 400);
	const member = await sql.query(`select role from conjure_members where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.device]);
	if (!member[0]) return json({ error: "Join the circle first." }, 403);
	if (member[0].role === "spectator") return json({ error: "Spectators watch." }, 403);
	if (((await sql.query(`select count(*)::int as n from conjure_drops where code = $1`, [parsed.data.code]))[0]?.n ?? 0) >= 80) return json({ error: "The cauldron is full." }, 403);
	await sql.query(`insert into conjure_drops (id, code, ingredient, by_device, at_ms)
     values ($1, $2, $3, $4, $5) on conflict (id) do nothing`, [
		parsed.data.id,
		parsed.data.code,
		parsed.data.ingredient,
		parsed.data.device,
		parsed.data.at
	]);
	await touch(sql, parsed.data.code, parsed.data.device);
	return snapshot(sql, parsed.data.code);
}
async function setSensor(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		sensors: sensorSchema
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Levels were rejected." }, 400);
	await sql.query(`update conjure_members set sensors = $3, last_seen = now()
     where code = $1 and device_id = $2`, [
		parsed.data.code,
		parsed.data.device,
		JSON.stringify(parsed.data.sensors)
	]);
	return snapshot(sql, parsed.data.code);
}
async function setVibe(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		vibe: VIBE
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Vibe rejected." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host sets the vibe." }, 403);
	await sql.query(`update conjure_rooms set vibe = $2, updated_at = now() where code = $1`, [parsed.data.code, parsed.data.vibe]);
	return snapshot(sql, parsed.data.code);
}
async function setLock(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		locked: boolean()
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not lock." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host locks the circle." }, 403);
	await sql.query(`update conjure_rooms set locked = $2 where code = $1`, [parsed.data.code, parsed.data.locked]);
	return snapshot(sql, parsed.data.code);
}
async function kick(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		target: DEVICE
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not remove them." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host removes people." }, 403);
	if (parsed.data.target === parsed.data.device) return json({ error: "Hand the circle off first." }, 400);
	await sql.query(`delete from conjure_members where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.target]);
	return snapshot(sql, parsed.data.code);
}
async function handoff(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		target: DEVICE
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not hand off." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host hands off." }, 403);
	await sql.query(`update conjure_members set role = 'player' where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.device]);
	await sql.query(`update conjure_members set role = 'host' where code = $1 and device_id = $2`, [parsed.data.code, parsed.data.target]);
	await sql.query(`update conjure_rooms set host_id = $2 where code = $1`, [parsed.data.code, parsed.data.target]);
	return snapshot(sql, parsed.data.code);
}
async function setSeat(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		seat: SEAT
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Role rejected." }, 400);
	await sql.query(`update conjure_members set seat = $3 where code = $1 and device_id = $2`, [
		parsed.data.code,
		parsed.data.device,
		parsed.data.seat
	]);
	return snapshot(sql, parsed.data.code);
}
async function consentOpen(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		creationId: string().max(16)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not ask the circle." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host captures." }, 403);
	const consent = {
		creationId: parsed.data.creationId,
		openedAt: Date.now(),
		votes: { [parsed.data.device]: "in" }
	};
	await sql.query(`update conjure_rooms set consent = $2 where code = $1`, [parsed.data.code, JSON.stringify(consent)]);
	return snapshot(sql, parsed.data.code);
}
async function consentVote(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		choice: _enum(["in", "out"])
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Vote rejected." }, 400);
	const consent = parseConsent((await sql.query(`select consent from conjure_rooms where code = $1`, [parsed.data.code]))[0]?.consent ?? null);
	if (!consent) return json({ error: "Nothing to answer." }, 400);
	consent.votes[parsed.data.device] = parsed.data.choice;
	await sql.query(`update conjure_rooms set consent = $2 where code = $1`, [parsed.data.code, JSON.stringify(consent)]);
	return snapshot(sql, parsed.data.code);
}
async function neutralize(sql, body) {
	const parsed = object({
		device: DEVICE,
		code: CODE,
		ids: array(string()).max(80)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not update credit." }, 400);
	if (!await isHost(sql, parsed.data.code, parsed.data.device)) return json({ error: "Only the host finalizes." }, 403);
	if (parsed.data.ids.length) await sql.query(`update conjure_drops set neutral = true where code = $1 and id = any($2::text[])`, [parsed.data.code, parsed.data.ids]);
	await sql.query(`update conjure_rooms set consent = null where code = $1`, [parsed.data.code]);
	return snapshot(sql, parsed.data.code);
}
async function report(sql, body) {
	const parsed = object({
		creationId: string().max(32),
		reason: _enum([
			"spam",
			"unsafe",
			"other"
		])
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Report rejected." }, 400);
	await sql.query(`insert into conjure_reports (creation_id, reason) values ($1, $2)`, [parsed.data.creationId, parsed.data.reason]);
	return json({ ok: true });
}
async function event(sql, body) {
	const parsed = object({ name: _enum([
		"share",
		"remix",
		"capture",
		"mint"
	]) }).safeParse(body);
	if (!parsed.success) return json({ error: "Event rejected." }, 400);
	await sql.query(`insert into conjure_events (name) values ($1)`, [parsed.data.name]);
	return json({ ok: true });
}
async function mintTouch(sql, body) {
	const parsed = object({
		device: DEVICE,
		creationId: string().max(32)
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Mint check failed." }, 400);
	const used = (await sql.query(`select count(*)::int as n from conjure_mints
     where device_id = $1 and created_at > now() - interval '1 day'`, [parsed.data.device]))[0]?.n ?? 0;
	if (!withinDailyCap(used, 5)) return json({
		error: "Daily mint cap reached.",
		used
	}, 429);
	await sql.query(`insert into conjure_mints (device_id, creation_id) values ($1, $2)
     on conflict (device_id, creation_id) do nothing`, [parsed.data.device, parsed.data.creationId]);
	return json({
		ok: true,
		used
	});
}
var LEVEL = _enum([
	"spark",
	"stir",
	"circle",
	"keep",
	"master"
]);
async function listBoard(sql) {
	return json({ rows: (await sql.query(`select handle, xp, streak, level from conjure_board order by xp desc, updated_at asc limit 20`)).map((row) => ({
		handle: row.handle,
		xp: Number(row.xp) || 0,
		streak: Number(row.streak) || 0,
		level: row.level
	})) });
}
async function publishBoard(sql, body) {
	const parsed = object({
		device: DEVICE,
		handle: string().max(32),
		xp: number().int().min(0).max(1e5),
		streak: number().int().min(0).max(9999),
		level: LEVEL
	}).safeParse(body);
	if (!parsed.success) return json({ error: "Could not post a score." }, 400);
	const handle = cleanHandle(parsed.data.handle);
	if (!handle) return json({ error: "Pick a handle. No email or wallet address." }, 400);
	await sql.query(`insert into conjure_board (device_id, handle, xp, streak, level)
     values ($1, $2, $3, $4, $5)
     on conflict (device_id) do update
       set handle = excluded.handle, xp = excluded.xp, streak = excluded.streak,
           level = excluded.level, updated_at = now()`, [
		parsed.data.device,
		handle,
		parsed.data.xp,
		parsed.data.streak,
		parsed.data.level
	]);
	return listBoard(sql);
}
async function hideBoard(sql, body) {
	const parsed = object({ device: DEVICE }).safeParse(body);
	if (!parsed.success) return json({ error: "Could not hide the score." }, 400);
	await sql.query(`delete from conjure_board where device_id = $1`, [parsed.data.device]);
	return listBoard(sql);
}
var handle = ({ request }) => handleConjure(request);
var Route$1 = createFileRoute("/api/conjure")({ server: { handlers: {
	GET: handle,
	POST: handle
} } });
var $$splitComponentImporter = () => import("./c._id-CM71QveQ.mjs");
var Route = createFileRoute("/c/$id")({
	validateSearch: (search) => ({ d: typeof search.d === "string" ? search.d : "" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	CreditsRoute: Route$3.update({
		id: "/credits",
		path: "/credits",
		getParentRoute: () => Route$5
	}),
	PrivacyRoute: Route$2.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$5
	}),
	ApiConjureRoute: Route$1.update({
		id: "/api/conjure",
		path: "/api/conjure",
		getParentRoute: () => Route$5
	}),
	CIdRoute: Route.update({
		id: "/c/$id",
		path: "/c/$id",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { cleanName as _, cleanHandle as a, emptyProgress as c, loadProgress as d, nextStepId as f, xpToNext as g, walletUnlocked as h, award as i, loadBoardPrefs as l, saveProgress as m, Route as n, currentTip as o, saveBoardPrefs as p, LEVELS as r, dismissTip as s, router_exports as t, loadDismissedTips as u, resolveVotes as v, Route$4 as y };
