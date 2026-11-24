import { o as __toESM } from "../_runtime.mjs";
import { ot as require_jsx_runtime, st as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as cleanName, a as cleanHandle, c as emptyProgress, d as loadProgress, f as nextStepId, g as xpToNext, h as walletUnlocked, i as award, l as loadBoardPrefs, m as saveProgress, o as currentTip, p as saveBoardPrefs, r as LEVELS, s as dismissTip, u as loadDismissedTips, v as resolveVotes } from "./router-CyDp3qr4.mjs";
import { t as require_xeroemoji } from "../_libs/xeroemoji.mjs";
import { Ht as parseAbiItem, n as getPublicClient, pn as erc721Abi, t as createConfig } from "../_libs/@wagmi/core+[...].mjs";
import { i as defineChain, n as custom, r as createWalletClient, t as http } from "../_libs/viem.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BbvnbAT-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_xeroemoji = require_xeroemoji();
var INGREDIENTS = [
	{
		id: "ember",
		emoji: "🔥",
		label: "Ember",
		hue: 16,
		energy: .85,
		spikes: .45
	},
	{
		id: "moss",
		emoji: "🌿",
		label: "Moss",
		hue: 132,
		energy: .4,
		spikes: .15
	},
	{
		id: "moon",
		emoji: "🌙",
		label: "Moon",
		hue: 252,
		energy: .35,
		spikes: .2
	},
	{
		id: "salt",
		emoji: "🧂",
		label: "Salt",
		hue: 40,
		energy: .25,
		spikes: .55
	},
	{
		id: "honey",
		emoji: "🍯",
		label: "Honey",
		hue: 42,
		energy: .55,
		spikes: .12
	},
	{
		id: "frost",
		emoji: "❄️",
		label: "Frost",
		hue: 196,
		energy: .45,
		spikes: .7
	},
	{
		id: "ink",
		emoji: "🖤",
		label: "Ink",
		hue: 275,
		energy: .5,
		spikes: .3
	},
	{
		id: "spark",
		emoji: "⚡",
		label: "Spark",
		hue: 52,
		energy: .95,
		spikes: .85
	}
];
var VIBES$1 = [
	"calm",
	"chaotic",
	"spooky"
];
var FORMS = [
	{
		id: "orb",
		label: "Orb"
	},
	{
		id: "spire",
		label: "Spire"
	},
	{
		id: "bloom",
		label: "Bloom"
	},
	{
		id: "ribbon",
		label: "Ribbon"
	}
];
var VIBE_BIAS = {
	calm: {
		hue: 152,
		sat: .42,
		light: .46,
		energy: .72,
		shake: .35
	},
	chaotic: {
		hue: 18,
		sat: .82,
		light: .52,
		energy: 1.35,
		shake: 1
	},
	spooky: {
		hue: 278,
		sat: .38,
		light: .3,
		energy: .9,
		shake: .7
	}
};
function clamp$1(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function hslToHex(h, s, l) {
	const hue = (h % 360 + 360) % 360;
	const sat = clamp$1(s, 0, 1);
	const lig = clamp$1(l, 0, 1);
	const a = sat * Math.min(lig, 1 - lig);
	const f = (n) => {
		const k = (n + hue / 30) % 12;
		const c = lig - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * clamp$1(c, 0, 1)).toString(16).padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
function mixHue(weights) {
	let x = 0;
	let y = 0;
	for (const { hue, w } of weights) {
		if (w <= 0) continue;
		const r = hue * Math.PI / 180;
		x += Math.cos(r) * w;
		y += Math.sin(r) * w;
	}
	if (x === 0 && y === 0) return 28;
	return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
function ingredientById(id) {
	const found = INGREDIENTS.find((item) => item.id === id);
	if (!found) throw new Error(`unknown ingredient ${id}`);
	return found;
}
function emptySensor() {
	return {
		loudness: 0,
		pitch: .5,
		burst: 0,
		tiltX: 0,
		tiltY: 0,
		shake: 0,
		sampleHue: null,
		wave: 0
	};
}
function blendSensors(list) {
	if (!list.length) return emptySensor();
	const n = list.length;
	const hues = list.filter((s) => s.sampleHue != null).map((s) => ({
		hue: s.sampleHue,
		w: 1
	}));
	return {
		loudness: clamp$1(list.reduce((sum, item) => sum + item.loudness, 0) / n, 0, 1),
		pitch: clamp$1(list.reduce((sum, item) => sum + item.pitch, 0) / n, 0, 1),
		burst: clamp$1(Math.max(...list.map((s) => s.burst)), 0, 1),
		tiltX: clamp$1(list.reduce((sum, item) => sum + item.tiltX, 0) / n, -1, 1),
		tiltY: clamp$1(list.reduce((sum, item) => sum + item.tiltY, 0) / n, -1, 1),
		shake: clamp$1(Math.max(...list.map((s) => s.shake)), 0, 1),
		sampleHue: hues.length ? mixHue(hues) : null,
		wave: clamp$1(Math.max(...list.map((s) => s.wave)), 0, 1)
	};
}
function computeBrew(drops, sensor, vibe) {
	const bias = VIBE_BIAS[vibe];
	const weights = drops.map((drop) => {
		const ing = ingredientById(drop.ingredient);
		const energy = drop.neutral ? .12 : ing.energy;
		return {
			hue: drop.neutral ? 32 : ing.hue,
			w: energy,
			spikes: drop.neutral ? .05 : ing.spikes,
			energy
		};
	});
	if (sensor.sampleHue != null) weights.push({
		hue: sensor.sampleHue,
		w: 1.35,
		spikes: .2,
		energy: .35
	});
	const baseHue = weights.length ? mixHue(weights) : bias.hue;
	const pitchShift = (sensor.pitch - .5) * (vibe === "spooky" ? -48 : 72);
	const wild = vibe === "chaotic" ? sensor.loudness * 36 : 0;
	const hue = (baseHue + pitchShift + wild + 360) % 360;
	const weightSum = weights.reduce((sum, item) => sum + item.w, 0) || 1;
	const energySum = weights.reduce((sum, item) => sum + item.energy, 0);
	const spikeAvg = weights.reduce((sum, item) => sum + item.spikes * item.w, 0) / weightSum;
	const loud = sensor.loudness * bias.energy;
	const energy = clamp$1(.28 + energySum * .16 + loud * .85 + sensor.burst * .45 + sensor.shake * bias.shake * .35, .2, 1.85);
	const spikes = clamp$1(spikeAvg + sensor.burst * .35 + (vibe === "spooky" ? .08 : 0), 0, 1.25);
	const scale = clamp$1(.74 + Math.min(drops.filter((d) => !d.neutral).length, 8) * .055 + loud * .42 + sensor.burst * .18, .62, 1.85);
	const swirl = clamp$1(Math.hypot(sensor.tiltX, sensor.tiltY) * 1.5 + sensor.wave * 1.1 + (vibe === "calm" ? .22 : .55), 0, 2.6);
	const sat = clamp$1(bias.sat + (drops.length ? .16 : 0) + loud * .15, .18, .92);
	const light = clamp$1(bias.light + sensor.burst * .06, .2, .62);
	return {
		hue,
		saturation: sat,
		lightness: light,
		energy,
		spikes,
		scale,
		swirl,
		glow: clamp$1(.32 + energy * .38 + sensor.burst * .28, 0, 1.7),
		color: hslToHex(hue, sat, light)
	};
}
function titleFromDrops(drops) {
	const counts = /* @__PURE__ */ new Map();
	for (const drop of drops) {
		if (drop.neutral) continue;
		counts.set(drop.ingredient, (counts.get(drop.ingredient) ?? 0) + 1);
	}
	const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2);
	if (!top.length) return "Quiet brew";
	return `${top.map(([id]) => ingredientById(id).label).join(" ")} brew`;
}
function decaySensor(sensor, dt) {
	const burstK = Math.exp(-dt * 2.4);
	const shakeK = Math.exp(-dt * 1.8);
	const waveK = Math.exp(-dt * 1.6);
	sensor.burst *= burstK;
	sensor.shake *= shakeK;
	sensor.wave *= waveK;
	if (sensor.burst < .01) sensor.burst = 0;
	if (sensor.shake < .01) sensor.shake = 0;
	if (sensor.wave < .01) sensor.wave = 0;
}
/** While device motion is writing absolute tilt, don't fight it. */
var tiltHold = 0;
function holdDeviceTilt(seconds = .45) {
	if (seconds > tiltHold) tiltHold = seconds;
}
/** Finger leans and throw leans return to upright. Device tilt is left alone while it reports. */
function springTilt(sensor, dt) {
	const step = Math.min(Math.max(dt, 0), .1);
	if (tiltHold > 0) {
		tiltHold = Math.max(0, tiltHold - step);
		return;
	}
	const tiltK = Math.exp(-step * 3.1);
	sensor.tiltX *= tiltK;
	sensor.tiltY *= tiltK;
	if (Math.abs(sensor.tiltX) < .01) sensor.tiltX = 0;
	if (Math.abs(sensor.tiltY) < .01) sensor.tiltY = 0;
}
/** Frame-rate sensor values. Mutated in place so the canvas does not re-render. */
var liveSensor = emptySensor();
var remoteSensor = emptySensor();
var grabStill = null;
var exportGlb = null;
var enterAR = null;
function setEnterAR(fn) {
	enterAR = fn;
}
function startAR() {
	if (!enterAR) return Promise.reject(/* @__PURE__ */ new Error("AR is not on this stage."));
	return enterAR();
}
function setGrabStill(fn) {
	grabStill = fn;
}
function takeStill() {
	return grabStill ? grabStill() : null;
}
function setExportGlb(fn) {
	exportGlb = fn;
}
function downloadGlb() {
	return exportGlb ? exportGlb() : Promise.resolve(null);
}
/** Master tools. Mutated in place, same as the sensors. */
var masterMix = {
	stir: .35,
	hue: 0,
	swirl: .45,
	bloom: .55,
	freeze: false
};
/** Which tools the brewer has actually moved. Defaults stay quiet until then. */
var toolTouch = {
	stir: false,
	hue: false,
	swirl: false,
	bloom: false,
	freeze: false
};
var punch = {
	hex: "",
	hue: 0,
	until: 0
};
/** Screen-space ring. Mutated in place so a frame can show it without a re-render. */
var pulse = {
	hex: "#e27a3a",
	until: 0,
	ms: 900
};
function flashPulse(hex, ms = 900) {
	pulse.hex = hex;
	pulse.ms = ms;
	pulse.until = Date.now() + ms;
}
function punchColor(hex, hue, ms = 1500) {
	punch.hex = hex;
	punch.hue = hue;
	punch.until = Date.now() + ms;
	flashPulse(hex, Math.min(ms, 1e3));
}
function punchStrength() {
	const left = punch.until - Date.now();
	if (left <= 0 || !punch.hex) return 0;
	return Math.min(1, left / 900);
}
var sparks = [];
function burstSparks(color, count = 8) {
	const at = Date.now();
	for (let i = 0; i < count; i += 1) sparks.push({
		color,
		at,
		angle: i / count * Math.PI * 2 + Math.random() * .2
	});
	if (sparks.length > 32) sparks.splice(0, sparks.length - 32);
}
/** Hue and hex the stage should show right now, including the last drop and any punch. */
function shownColor(drops, vibe) {
	const hueShift = toolTouch.hue ? masterMix.hue : 0;
	if (punch.until > Date.now() && punch.hex) return {
		hue: (punch.hue + 360) % 360,
		hex: punch.hex
	};
	const last = [...drops].reverse().find((drop) => !drop.neutral);
	if (last) {
		const hue = (ingredientById(last.ingredient).hue + hueShift + 360) % 360;
		return {
			hue,
			hex: hslToHex(hue, .8, .52)
		};
	}
	const brew = computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
	const hue = (brew.hue + hueShift + 360) % 360;
	return {
		hue,
		hex: hslToHex(hue, Math.max(brew.saturation, .55), Math.max(brew.lightness, .42))
	};
}
var pointers = /* @__PURE__ */ new Map();
/** Latest fling velocity in pixels per millisecond. Decays after release. */
var flingVel = {
	x: 0,
	y: 0
};
function sceneMoving(opts) {
	return opts.started && !opts.reduced && !opts.frozen;
}
function pointerDown(id, x, y, now = 0) {
	pointers.set(id, {
		x,
		y,
		t: now || (typeof performance !== "undefined" ? performance.now() : 0)
	});
}
function pointerMove(id, x, y, now = 0) {
	const prev = pointers.get(id);
	if (!prev) return null;
	const t = now || (typeof performance !== "undefined" ? performance.now() : prev.t + 16);
	const dx = x - prev.x;
	const dy = y - prev.y;
	const dt = Math.max(8, t - prev.t);
	pointers.set(id, {
		x,
		y,
		t
	});
	flingVel.x = dx / dt;
	flingVel.y = dy / dt;
	return {
		dx,
		dy
	};
}
function pointerUp(id) {
	pointers.delete(id);
	const speed = Math.hypot(flingVel.x, flingVel.y);
	if (pointers.size > 0) return speed;
	if (speed < .12) {
		flingVel.x = 0;
		flingVel.y = 0;
		return 0;
	}
	return speed;
}
function decayFling(dt) {
	const keep = Math.exp(-dt * 2.6);
	flingVel.x *= keep;
	flingVel.y *= keep;
	if (Math.hypot(flingVel.x, flingVel.y) < .008) {
		flingVel.x = 0;
		flingVel.y = 0;
	}
}
function isFling(speedPxPerMs) {
	return speedPxPerMs >= .45;
}
function haptic(pattern) {
	try {
		if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(pattern);
	} catch {}
}
/** Points that must stay on screen: feet, rim, ladle, and a high spark. */
var BREW_BOUNDS = [
	[
		0,
		.02,
		0
	],
	[
		1.22,
		.28,
		0
	],
	[
		-1.22,
		.28,
		0
	],
	[
		0,
		.28,
		1.18
	],
	[
		0,
		.28,
		-1.18
	],
	[
		1.12,
		1.08,
		0
	],
	[
		-1.12,
		1.08,
		0
	],
	[
		1.58,
		1.92,
		0
	],
	[
		0,
		2.62,
		0
	],
	[
		1.05,
		2.28,
		.35
	]
];
var POT_SCALE_MIN = .9;
var POT_SCALE_MAX = 1.22;
/** Largest lean the frame must still contain, tumble plus a throw. */
var POT_TILT_MAX = .75;
/** Ground spill around the pot, in rest pose before scale and tilt. */
var SPILL_POINTS = [
	[
		1.95,
		.08,
		0
	],
	[
		-1.95,
		.08,
		0
	],
	[
		0,
		.08,
		1.95
	],
	[
		0,
		.08,
		-1.95
	],
	[
		1.4,
		.4,
		1.25
	],
	[
		-1.4,
		1.2,
		0
	],
	[
		1.25,
		1.85,
		0
	],
	[
		0,
		2.75,
		0
	]
];
function applyTiltScale(point, tilt, scale) {
	const [x, y, z] = point;
	const c = Math.cos(tilt);
	const s = Math.sin(tilt);
	const yx = y * c - z * s;
	const zx = y * s + z * c;
	const x2 = x * c - yx * s;
	const y2 = x * s + yx * c;
	return [
		x2 * scale,
		y2 * scale,
		zx * scale
	];
}
var fitCache = null;
/** Rim, ladle, and spill after the pot's largest breath and tilt. */
function spillFramePoints() {
	if (fitCache) return fitCache;
	const out = [];
	for (const point of [...BREW_BOUNDS, ...SPILL_POINTS]) {
		out.push(applyTiltScale(point, POT_TILT_MAX, POT_SCALE_MAX));
		out.push(applyTiltScale(point, -.75, POT_SCALE_MAX));
	}
	fitCache = out;
	return out;
}
/** Any viewport taller than it is wide. Width is not a cutoff. */
function isPhonePortrait(width, height) {
	return height > width;
}
function clamp01(n) {
	return Math.max(0, Math.min(1, n));
}
function norm(v) {
	const len = Math.hypot(v[0], v[1], v[2]) || 1;
	return [
		v[0] / len,
		v[1] / len,
		v[2] / len
	];
}
function cross(a, b) {
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	];
}
function dot(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function projectFrame(frame, point, aspect) {
	const eye = frame.position;
	const zAxis = norm([
		eye[0] - frame.lookAt[0],
		eye[1] - frame.lookAt[1],
		eye[2] - frame.lookAt[2]
	]);
	const xAxis = norm(cross([
		0,
		1,
		0
	], zAxis));
	const yAxis = cross(zAxis, xAxis);
	const rel = [
		point[0] - eye[0],
		point[1] - eye[1],
		point[2] - eye[2]
	];
	const vx = dot(rel, xAxis);
	const vy = dot(rel, yAxis);
	const depth = -dot(rel, zAxis) || 1e-4;
	const tan = Math.tan(frame.fov * Math.PI / 360);
	return {
		x: vx / depth * (1 / (aspect * tan)),
		y: vy / depth * (1 / tan)
	};
}
function covers(frame, aspect, limit) {
	const eye = frame.position;
	const zAxis = norm([
		eye[0] - frame.lookAt[0],
		eye[1] - frame.lookAt[1],
		eye[2] - frame.lookAt[2]
	]);
	const xAxis = norm(cross([
		0,
		1,
		0
	], zAxis));
	const yAxis = cross(zAxis, xAxis);
	const tan = Math.tan(frame.fov * Math.PI / 360);
	for (const point of spillFramePoints()) {
		const rel = [
			point[0] - eye[0],
			point[1] - eye[1],
			point[2] - eye[2]
		];
		const depth = -dot(rel, zAxis);
		if (depth < .25) return false;
		const x = dot(rel, xAxis) / depth * (1 / (aspect * tan));
		const y = dot(rel, yAxis) / depth * (1 / tan);
		if (Math.abs(x) > limit || Math.abs(y) > limit) return false;
	}
	return true;
}
/** Smallest distance whose horizontal and vertical fov still hold the scaled pot and the spill. */
function frameFor(width, height) {
	const w = Math.max(width, 1);
	const h = Math.max(height, 1);
	const aspect = w / h;
	const portrait = h > w;
	const tall = clamp01((.82 - aspect) / .46);
	const wide = clamp01((aspect - 1.05) / 1.1);
	const fov = portrait ? 50 + tall * 10 : 36 + wide * 6;
	const lookY = portrait ? .66 - tall * .08 : 1;
	const eyeY = portrait ? 2.15 + tall * .2 : 2.62;
	let lo = 2.4;
	let hi = 42;
	let best = hi;
	for (let i = 0; i < 24; i += 1) {
		const z = (lo + hi) * .5;
		if (covers({
			position: [
				0,
				eyeY,
				z
			],
			lookAt: [
				0,
				lookY,
				0
			],
			fov
		}, aspect, .92)) {
			best = z;
			hi = z;
		} else lo = z;
	}
	return {
		position: [
			0,
			eyeY,
			best
		],
		lookAt: [
			0,
			lookY,
			0
		],
		fov
	};
}
/** How much NDC is left outside the scaled pot and the spill. Positive means it fits. */
function frameMargin(frame, aspect) {
	let peak = 0;
	for (const point of spillFramePoints()) {
		const ndc = projectFrame(frame, point, aspect);
		peak = Math.max(peak, Math.abs(ndc.x), Math.abs(ndc.y));
	}
	return 1 - peak;
}
/** CSS pixels the live view should trust.
* A canvas or parent wider than the window must not hide a portrait window. */
function viewportForFrame(r3fWidth, r3fHeight, clientWidth, clientHeight, innerWidth, innerHeight) {
	const usable = (n) => Number.isFinite(n) && n >= 32;
	const widths = [
		r3fWidth,
		clientWidth,
		innerWidth
	].filter(usable);
	const heights = [
		r3fHeight,
		clientHeight,
		innerHeight
	].filter(usable);
	return {
		width: widths.length ? Math.min(...widths) : 1280,
		height: heights.length ? Math.max(...heights) : 800
	};
}
function frameMode(width, height) {
	return isPhonePortrait(width, height) ? "portrait" : "desktop";
}
var frameDebug = {
	innerWidth: 0,
	innerHeight: 0,
	canvasWidth: 0,
	canvasHeight: 0,
	dpr: 1,
	position: [
		0,
		2.55,
		4.05
	],
	fov: 34,
	mode: "desktop",
	margin: 0
};
function publishFrameDebug(next) {
	frameDebug.innerWidth = next.innerWidth;
	frameDebug.innerHeight = next.innerHeight;
	frameDebug.canvasWidth = next.canvasWidth;
	frameDebug.canvasHeight = next.canvasHeight;
	frameDebug.dpr = next.dpr;
	frameDebug.position = next.position;
	frameDebug.fov = next.fov;
	frameDebug.mode = next.mode;
	frameDebug.margin = next.margin;
}
var spin = {
	x: 0,
	y: 0,
	z: 0,
	vx: 0,
	vy: 0,
	vz: 0,
	damping: 1.7,
	spins: 0
};
var MAX = 8;
/** Pulls the pot and ladle back to an upright rest. */
var SPRING = 1.15;
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function round$1(n) {
	return Math.round(n * 1e3) / 1e3;
}
/** Add angular velocity in radians per second. */
function impulse(x, y, z) {
	spin.vx = clamp(spin.vx + x, -8, MAX);
	spin.vy = clamp(spin.vy + y, -8, MAX);
	spin.vz = clamp(spin.vz + z, -8, MAX);
}
/** One eased step. A spring returns the pose to rest so a knock cannot stick. */
function integrateSpin(pose, damp, dt) {
	const d = Math.min(Math.max(dt, 0), .1);
	pose.vx += -pose.x * SPRING * d;
	pose.vy += -pose.y * SPRING * d;
	pose.vz += -pose.z * SPRING * d;
	pose.vx = clamp(pose.vx, -8, MAX);
	pose.vy = clamp(pose.vy, -8, MAX);
	pose.vz = clamp(pose.vz, -8, MAX);
	pose.x += pose.vx * d;
	pose.y += pose.vy * d;
	pose.z += pose.vz * d;
	pose.x = clamp(pose.x, -Math.PI * 2, Math.PI * 2);
	pose.y = clamp(pose.y, -Math.PI * 2, Math.PI * 2);
	pose.z = clamp(pose.z, -Math.PI * 2, Math.PI * 2);
	const before = Math.hypot(pose.vx, pose.vy, pose.vz);
	const keep = Math.exp(-d * damp);
	pose.vx *= keep;
	pose.vy *= keep;
	pose.vz *= keep;
	const after = Math.hypot(pose.vx, pose.vy, pose.vz);
	const settled = Math.hypot(pose.x, pose.y, pose.z) < .03 && after < .05;
	if (settled) {
		pose.x = 0;
		pose.y = 0;
		pose.z = 0;
		pose.vx = 0;
		pose.vy = 0;
		pose.vz = 0;
	}
	return {
		before,
		after: settled ? 0 : after
	};
}
function stepSpin(dt) {
	const moved = integrateSpin(spin, spin.damping, dt);
	spin.spins += (moved.before + moved.after) * .5 * Math.min(Math.max(dt, 0), .1) / (Math.PI * 2);
}
var SCALE_MIN = POT_SCALE_MIN;
var SCALE_MAX = POT_SCALE_MAX;
/** Idle tumble. User spin damps back onto this, it does not replace it. */
var tumble = {
	x: 0,
	y: 0,
	z: 0,
	scale: 1,
	energy: 0,
	time: 0
};
/** Continuous multi-axis turn and a breathing scale. Energy speeds both up. */
function stepTumble(dt, energy, opts) {
	const d = Math.min(.05, Math.max(0, dt));
	if (opts?.frozen || d === 0) return;
	const reduced = Boolean(opts?.reduced);
	tumble.energy += (Math.max(0, Math.min(1, energy)) - tumble.energy) * Math.min(1, d * 4);
	const drive = reduced ? .28 : .62 + tumble.energy * .85;
	tumble.time += d * (reduced ? .35 : .62 + tumble.energy * 1.35);
	const t = tumble.time;
	tumble.x = Math.sin(t * .41) * .42 * drive;
	tumble.z = Math.sin(t * .27 + .8) * .42 * drive;
	tumble.y += d * (reduced ? .22 : .48 + tumble.energy * 1.25);
	if (tumble.y > Math.PI * 2) tumble.y -= Math.PI * 2;
	const breath = Math.sin(t * (1.15 + tumble.energy * 2.1));
	const span = (SCALE_MAX - SCALE_MIN) * .5;
	const mid = (SCALE_MAX + SCALE_MIN) * .5;
	const amp = reduced ? .4 : .62 + tumble.energy * .38;
	tumble.scale = mid + breath * span * amp;
	if (tumble.scale < SCALE_MIN) tumble.scale = SCALE_MIN;
	if (tumble.scale > SCALE_MAX) tumble.scale = SCALE_MAX;
}
function poseNow(leanX, leanZ, frozen) {
	if (frozen) return {
		x: 0,
		y: tumble.y,
		z: 0,
		scale: tumble.scale
	};
	return {
		x: tumble.x + spin.x + leanX,
		y: tumble.y + spin.y,
		z: tumble.z + spin.z + leanZ,
		scale: tumble.scale
	};
}
function motionSnapshot(spill) {
	return {
		rotation: [
			round$1(tumble.x + spin.x),
			round$1(tumble.y + spin.y),
			round$1(tumble.z + spin.z)
		],
		scale: round$1(tumble.scale),
		scaleMin: SCALE_MIN,
		scaleMax: SCALE_MAX,
		energy: round$1(tumble.energy),
		spillLip: spill.lip,
		spillMouth: spill.mouth,
		spillGround: spill.ground,
		bodyCap: spill.bodyCap
	};
}
function spinSnapshot() {
	const speed = Math.hypot(spin.vx, spin.vy, spin.vz);
	const axis = speed < 1e-4 ? [
		0,
		1,
		0
	] : [
		spin.vx / speed,
		spin.vy / speed,
		spin.vz / speed
	];
	return {
		angularVelocity: round$1(speed),
		axis: [
			round$1(axis[0]),
			round$1(axis[1]),
			round$1(axis[2])
		],
		damping: round$1(spin.damping),
		spinCount: round$1(spin.spins),
		velocity: [
			round$1(spin.vx),
			round$1(spin.vy),
			round$1(spin.vz)
		],
		angle: [
			round$1(spin.x),
			round$1(spin.y),
			round$1(spin.z)
		]
	};
}
function restoreSpin(note) {
	spin.x = note.angle[0];
	spin.y = note.angle[1];
	spin.z = note.angle[2];
	spin.vx = note.velocity[0];
	spin.vy = note.velocity[1];
	spin.vz = note.velocity[2];
	spin.damping = note.damping || 1.7;
	spin.spins = note.spinCount;
}
var captured = null;
function rememberMotion(note) {
	captured = note;
}
function rememberedMotion() {
	return captured;
}
/** Pose samples of a captured spin as it eases out. Used by the GLB clip. */
function spinFrames(note, seconds = 6, steps = 24) {
	const frames = [];
	const pose = {
		x: note.angle[0],
		y: note.angle[1],
		z: note.angle[2],
		vx: note.velocity[0],
		vy: note.velocity[1],
		vz: note.velocity[2]
	};
	const damp = note.damping || 1.7;
	const dt = seconds / steps;
	for (let i = 0; i <= steps; i += 1) {
		frames.push({
			t: i * dt,
			x: pose.x,
			y: pose.y,
			z: pose.z,
			speed: Math.hypot(pose.vx, pose.vy, pose.vz)
		});
		integrateSpin(pose, damp, dt);
	}
	return frames;
}
function brewMetadata(input) {
	const note = input.spin;
	const axis = note?.axis ?? [
		0,
		1,
		0
	];
	const physics = input.physics ?? {
		seed: 0,
		gravity: 9.8,
		bodies: []
	};
	const material = input.material ?? {
		transmission: 0,
		ior: 1.4,
		thickness: 0,
		iridescence: 0,
		clearcoat: 0,
		sheen: 0,
		emissiveIntensity: 0,
		bloom: 0,
		toneMapping: "ACES",
		tier: "mid",
		dof: false,
		shadows: false
	};
	const motion = input.motion ?? {
		rotation: [
			0,
			0,
			0
		],
		scale: 1,
		scaleMin: SCALE_MIN,
		scaleMax: SCALE_MAX,
		energy: 0,
		spillLip: 1.05,
		spillMouth: .98,
		spillGround: .05,
		bodyCap: 0
	};
	return {
		name: input.title,
		description: "A Conjure brew.",
		image: input.image ?? "",
		animation_url: input.animationUrl,
		attributes: [
			{
				trait_type: "Angular velocity",
				value: note?.angularVelocity ?? 0
			},
			{
				trait_type: "Axis",
				value: axis.map((n) => n.toFixed(3)).join(", ")
			},
			{
				trait_type: "Damping",
				value: note?.damping ?? 0
			},
			{
				trait_type: "Spin count",
				value: note?.spinCount ?? 0
			},
			{
				trait_type: "Gravity",
				value: physics.gravity
			},
			{
				trait_type: "Physics seed",
				value: physics.seed
			},
			{
				trait_type: "Bodies",
				value: physics.bodies.length
			},
			{
				trait_type: "Transmission",
				value: material.transmission
			},
			{
				trait_type: "IOR",
				value: material.ior
			},
			{
				trait_type: "Thickness",
				value: material.thickness
			},
			{
				trait_type: "Iridescence",
				value: material.iridescence
			},
			{
				trait_type: "Emissive intensity",
				value: material.emissiveIntensity
			},
			{
				trait_type: "Bloom",
				value: material.bloom
			},
			{
				trait_type: "Tone mapping",
				value: material.toneMapping
			},
			{
				trait_type: "Tier",
				value: material.tier
			},
			{
				trait_type: "Rotation",
				value: motion.rotation.map((n) => n.toFixed(3)).join(", ")
			},
			{
				trait_type: "Scale",
				value: motion.scale
			},
			{
				trait_type: "Scale range",
				value: `${motion.scaleMin}–${motion.scaleMax}`
			},
			{
				trait_type: "Spill lip",
				value: motion.spillLip
			},
			{
				trait_type: "Body cap",
				value: motion.bodyCap
			}
		],
		properties: {
			physics,
			material,
			motion
		},
		vibe: input.vibe,
		chainId: input.chainId,
		royaltyBps: input.royaltyBps
	};
}
function effectsFor(quality) {
	const particles = quality.particles;
	if (quality.master) return {
		tier: "high",
		master: true,
		bodies: 8,
		sparkBodies: 28,
		drops: 22,
		particles: Math.max(particles, 640),
		slosh: 24,
		transmission: .94,
		charmTransmission: .9,
		thickness: 1.45,
		ior: 1.48,
		iridescence: .85,
		clearcoat: 1,
		sheen: .4,
		emissiveIntensity: .72,
		bloom: .62,
		dof: true,
		shadows: true,
		adaptiveDpr: true,
		toneMapping: "AgX"
	};
	if (quality.tier === "low") return {
		tier: "low",
		master: false,
		bodies: 4,
		sparkBodies: 8,
		drops: 6,
		particles: Math.min(particles, 70),
		slosh: 12,
		transmission: 0,
		charmTransmission: 0,
		thickness: 0,
		ior: 1.4,
		iridescence: 0,
		clearcoat: .15,
		sheen: 0,
		emissiveIntensity: .35,
		bloom: 0,
		dof: false,
		shadows: false,
		adaptiveDpr: true,
		toneMapping: "ACES"
	};
	if (quality.tier === "high") return {
		tier: "high",
		master: false,
		bodies: 8,
		sparkBodies: 20,
		drops: 14,
		particles,
		slosh: 20,
		transmission: .72,
		charmTransmission: .55,
		thickness: 1.1,
		ior: 1.45,
		iridescence: .55,
		clearcoat: .8,
		sheen: .25,
		emissiveIntensity: .55,
		bloom: .32,
		dof: false,
		shadows: true,
		adaptiveDpr: true,
		toneMapping: "ACES"
	};
	return {
		tier: "mid",
		master: false,
		bodies: 6,
		sparkBodies: 14,
		drops: 10,
		particles,
		slosh: 16,
		transmission: .48,
		charmTransmission: .32,
		thickness: .7,
		ior: 1.42,
		iridescence: .28,
		clearcoat: .55,
		sheen: .15,
		emissiveIntensity: .45,
		bloom: .16,
		dof: false,
		shadows: true,
		adaptiveDpr: true,
		toneMapping: "ACES"
	};
}
function materialNote(fx) {
	return {
		transmission: fx.transmission,
		ior: fx.ior,
		thickness: fx.thickness,
		iridescence: fx.iridescence,
		clearcoat: fx.clearcoat,
		sheen: fx.sheen,
		emissiveIntensity: fx.emissiveIntensity,
		bloom: fx.bloom,
		toneMapping: fx.toneMapping,
		tier: fx.master ? "master" : fx.tier,
		dof: fx.dof,
		shadows: fx.shadows
	};
}
/** Tuned rigid bodies for charms and sparks. No WASM. Deterministic from a seed. */
var GRAVITY = 9.8;
/** Outgoing speed over incoming speed. High enough that a hit reads. */
var RESTITUTION = .72;
/** Slowest upward speed that still looks like a bounce. */
var BOUNCE_KICK = 1.35;
/** Height clamp for the liquid grid. The surface stays inside the bowl. */
var SLOSH_AMP = .92;
/** World-down gravity, expressed in the brew's local axes (Euler XYZ). */
function localGravity(rx, ry, rz, g = GRAVITY) {
	const c1 = Math.cos(rx / 2);
	const s1 = Math.sin(rx / 2);
	const c2 = Math.cos(ry / 2);
	const s2 = Math.sin(ry / 2);
	const c3 = Math.cos(rz / 2);
	const s3 = Math.sin(rz / 2);
	const ix = -(s1 * c2 * c3 + c1 * s2 * s3);
	const iy = -(c1 * s2 * c3 - s1 * c2 * s3);
	const iz = -(c1 * c2 * s3 + s1 * s2 * c3);
	const iw = c1 * c2 * c3 - s1 * s2 * s3;
	const vy = -g;
	const tx = -2 * iz * vy;
	const tz = 2 * ix * vy;
	return [
		iw * tx + iy * tz,
		vy + iz * tx - ix * tz,
		iw * tz - iy * tx
	];
}
var FLOOR = .74;
var RIM = 1.18;
/** Where a tilted pot lets a body leave, and where the ground sends it back. */
var SPILL = {
	lip: 1.05,
	mouth: .98,
	ground: .05
};
function bodyCap(parts) {
	return parts.bodies + parts.sparkBodies + parts.drops;
}
var bodies = [];
var seed = 1;
var rngState = 1;
var maxCharms = 8;
var maxSparks = 16;
var maxDrops = 0;
var dropSerial = 0;
var slosh = createSlosh(16);
var heldId = null;
var rayView = null;
var seenBurst = -1;
var lastTick = 0;
function tickImpact() {
	const now = typeof performance !== "undefined" ? performance.now() : 0;
	if (now - lastTick < 80) return;
	lastTick = now;
	try {
		if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(12);
	} catch {}
}
function mulberry() {
	rngState = rngState + 1831565813 >>> 0;
	let t = rngState;
	t = Math.imul(t ^ t >>> 15, t | 1);
	t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function round(n) {
	return Math.round(n * 1e3) / 1e3;
}
function wallRadius(y) {
	const t = Math.max(0, Math.min(1, (y - .28) / .95));
	return .22 + Math.sin(t * Math.PI) * .62;
}
function createSlosh(n) {
	return {
		n,
		h: new Float32Array(n * n),
		v: new Float32Array(n * n)
	};
}
function resetPhysics(nextSeed = 1) {
	bodies.length = 0;
	seed = nextSeed >>> 0 || 1;
	rngState = seed;
	heldId = null;
	seenBurst = -1;
	dropSerial = 0;
	slosh = createSlosh(slosh.n);
}
function configurePhysics(opts) {
	maxCharms = opts.charms;
	maxSparks = opts.sparks;
	maxDrops = opts.drops ?? 0;
	if (slosh.n !== opts.slosh) slosh = createSlosh(opts.slosh);
	trim();
}
function sloshGrid() {
	return slosh;
}
function liveBodies() {
	return bodies;
}
function setRayView(fn) {
	rayView = fn;
}
function trim() {
	let charms = 0;
	let sparks = 0;
	let drops = 0;
	for (let i = bodies.length - 1; i >= 0; i -= 1) {
		const body = bodies[i];
		if (body.kind === "charm") {
			charms += 1;
			if (charms > maxCharms) bodies.splice(i, 1);
		} else if (body.kind === "drop") {
			drops += 1;
			if (drops > maxDrops) bodies.splice(i, 1);
		} else {
			sparks += 1;
			if (sparks > maxSparks) bodies.splice(i, 1);
		}
	}
}
function syncCharms(drops) {
	const live = drops.slice(-maxCharms);
	const ids = new Set(live.map((drop) => drop.id));
	for (let i = bodies.length - 1; i >= 0; i -= 1) if (bodies[i].kind === "charm" && !ids.has(bodies[i].id)) bodies.splice(i, 1);
	for (const drop of live) {
		if (bodies.some((body) => body.id === drop.id)) continue;
		bodies.push({
			id: drop.id,
			kind: "charm",
			x: (mulberry() - .5) * .28,
			y: 2.35,
			z: (mulberry() - .5) * .28,
			vx: (mulberry() - .5) * .9,
			vy: .35,
			vz: (mulberry() - .5) * .9,
			r: .1 + mulberry() * .05,
			age: 0,
			life: 1e6,
			held: false,
			impact: 0,
			color: drop.color,
			hue: drop.hue
		});
	}
	trim();
}
function noteBurst(at, color, count) {
	if (at === seenBurst) return;
	seenBurst = at;
	const room = maxSparks - bodies.filter((body) => body.kind === "spark").length;
	const n = Math.max(0, Math.min(count, room, maxSparks));
	for (let i = 0; i < n; i += 1) {
		const angle = mulberry() * Math.PI * 2;
		const speed = 1.3 + mulberry() * 2.2;
		bodies.push({
			id: `spark-${seed}-${at}-${i}`,
			kind: "spark",
			x: Math.cos(angle) * .12,
			y: 1.28 + mulberry() * .18,
			z: Math.sin(angle) * .12,
			vx: Math.cos(angle) * speed,
			vy: 1.8 + mulberry() * 2.1,
			vz: Math.sin(angle) * speed,
			r: .045,
			age: 0,
			life: 1.5 + mulberry() * .7,
			held: false,
			impact: 0,
			color,
			hue: 40
		});
	}
}
function stepBodies(dt, gravity) {
	const d = Math.min(.033, Math.max(0, dt));
	if (d === 0) return;
	for (const body of bodies) {
		if (body.held) {
			body.vx = 0;
			body.vy = 0;
			body.vz = 0;
			continue;
		}
		body.vx += gravity[0] * d;
		body.vy += gravity[1] * d;
		body.vz += gravity[2] * d;
		body.x += body.vx * d;
		body.y += body.vy * d;
		body.z += body.vz * d;
		body.age += d;
		body.impact = Math.max(0, (body.impact || 0) - d * 3.4);
		const horiz = Math.hypot(body.x, body.z);
		const nx = horiz > .001 ? body.x / horiz : 0;
		const nz = horiz > .001 ? body.z / horiz : 0;
		const gOut = gravity[0] * nx + gravity[2] * nz;
		const limit = Math.max(.05, wallRadius(body.y) - body.r);
		const onGround = horiz > SPILL.mouth && body.y < .55;
		const crest = body.y > .96 && horiz > limit * .88 && (gOut > 1.4 || body.vx * nx + body.vz * nz > .85);
		const floor = (onGround ? SPILL.ground : FLOOR) + body.r;
		if (body.y < floor) {
			body.y = floor;
			if (body.vy < -.55) {
				body.vy = Math.max(-body.vy * RESTITUTION, BOUNCE_KICK);
				body.impact = 1;
				tickImpact();
			} else if (body.vy < 0) body.vy = 0;
			body.vx *= .8;
			body.vz *= .8;
		}
		if (!crest && !onGround && body.y < RIM && horiz > limit) {
			body.x = nx * limit;
			body.z = nz * limit;
			const vn = body.vx * nx + body.vz * nz;
			if (vn > .35) {
				body.vx -= 1.72 * vn * nx;
				body.vz -= 1.72 * vn * nz;
				if (Math.hypot(body.vx, body.vz) < .9) {
					body.vx = -nx * .9;
					body.vz = -nz * .9;
				}
				body.impact = 1;
				tickImpact();
				pokeSlosh(body.x / 1.5 + .5, body.z / 1.5 + .5, Math.min(1.4, vn * .55));
			} else if (vn > 0) {
				body.vx -= 1.72 * vn * nx;
				body.vz -= 1.72 * vn * nz;
			}
		} else if (!body.held && body.y > .82 && body.y < RIM && horiz > limit * .7 && horiz < SPILL.mouth * 1.2 && gOut > 2.2) {
			body.vy += 6.5 * d;
			body.vx += nx * 4.2 * d;
			body.vz += nz * 4.2 * d;
		}
		const spilledH = Math.hypot(body.x, body.z);
		if (spilledH > SPILL.mouth && !body.held) {
			const ox = body.x / spilledH;
			const oz = body.z / spilledH;
			const vn = body.vx * ox + body.vz * oz;
			if (vn > .35) {
				const damp = Math.min(1, 10 * d);
				body.vx -= vn * ox * damp;
				body.vz -= vn * oz * damp;
			}
			const pull = spilledH > 1.7 ? 26 : 14;
			body.vx -= ox * pull * d;
			body.vz -= oz * pull * d;
			if (body.y < SPILL.lip) body.vy += 14 * d;
			if (spilledH > 3.1) {
				body.x = ox * 3.1;
				body.z = oz * 3.1;
			}
		}
	}
	for (let i = 0; i < bodies.length; i += 1) for (let j = i + 1; j < bodies.length; j += 1) {
		const a = bodies[i];
		const b = bodies[j];
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const dz = b.z - a.z;
		const dist = Math.hypot(dx, dy, dz) || 1e-4;
		const min = a.r + b.r;
		if (dist >= min) continue;
		const nx = dx / dist;
		const ny = dy / dist;
		const nz = dz / dist;
		const overlap = min - dist;
		if (!a.held) {
			a.x -= nx * overlap * .5;
			a.y -= ny * overlap * .5;
			a.z -= nz * overlap * .5;
		}
		if (!b.held) {
			b.x += nx * overlap * .5;
			b.y += ny * overlap * .5;
			b.z += nz * overlap * .5;
		}
		const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny + (b.vz - a.vz) * nz;
		if (rel >= 0) continue;
		const impulse = -(1.72 * rel) * .5;
		if (!a.held) {
			a.vx -= impulse * nx;
			a.vy -= impulse * ny;
			a.vz -= impulse * nz;
		}
		if (!b.held) {
			b.vx += impulse * nx;
			b.vy += impulse * ny;
			b.vz += impulse * nz;
		}
		if (rel < -.45) {
			a.impact = 1;
			b.impact = 1;
			tickImpact();
			pokeSlosh((a.x + b.x) * .5 / 1.5 + .5, (a.z + b.z) * .5 / 1.5 + .5, Math.min(1.2, -rel * .4));
		}
	}
	for (let i = bodies.length - 1; i >= 0; i -= 1) {
		const body = bodies[i];
		if (body.kind === "spark" && body.age > body.life) bodies.splice(i, 1);
		else if (body.y < -2 || Math.hypot(body.x, body.z) > 6) bodies.splice(i, 1);
	}
}
function stepSlosh(dt, tiltX, tiltZ, shake) {
	const n = slosh.n;
	const d = Math.min(.033, Math.max(0, dt));
	const spring = 16;
	for (let y = 0; y < n; y += 1) for (let x = 0; x < n; x += 1) {
		const i = y * n + x;
		let sum = 0;
		let count = 0;
		if (x > 0) {
			sum += slosh.h[i - 1];
			count += 1;
		}
		if (x < n - 1) {
			sum += slosh.h[i + 1];
			count += 1;
		}
		if (y > 0) {
			sum += slosh.h[i - n];
			count += 1;
		}
		if (y < n - 1) {
			sum += slosh.h[i + n];
			count += 1;
		}
		const avg = count ? sum / count : 0;
		const tilt = (x / (n - 1) - .5) * tiltZ * 1.15 + (y / (n - 1) - .5) * tiltX * 1.15;
		const noise = shake > .2 ? (mulberry() - .5) * shake * .28 : 0;
		slosh.v[i] += (avg - slosh.h[i] + tilt + noise) * spring * d;
		slosh.v[i] *= Math.exp(-1.7 * d);
	}
	const tiltMag = Math.hypot(tiltX, tiltZ);
	if (tiltMag > .06) pokeSlosh(.5 + Math.max(-.34, Math.min(.34, tiltZ * .5)), .5 + Math.max(-.34, Math.min(.34, tiltX * .5)), tiltMag * .34);
	if (shake > .12) pokeSlosh(.5, .5, shake * .48);
	for (let i = 0; i < slosh.h.length; i += 1) slosh.h[i] = Math.max(-.92, Math.min(SLOSH_AMP, slosh.h[i] + slosh.v[i] * d));
}
function pokeSlosh(u, v, amount) {
	const n = slosh.n;
	const cx = u * (n - 1);
	const cy = v * (n - 1);
	const radius = Math.max(2.4, n * .22);
	for (let y = 0; y < n; y += 1) for (let x = 0; x < n; x += 1) {
		const dist = Math.hypot(x - cx, y - cy);
		if (dist > radius) continue;
		const fall = Math.cos(dist / radius * Math.PI * .5);
		slosh.v[y * n + x] += amount * fall;
	}
}
function splashBodies() {
	for (const body of bodies) {
		if (body.held) continue;
		const floor = FLOOR + body.r;
		if (body.y <= floor + .04 && body.vy > .8 && body.impact > .6) pokeSlosh(body.x / 1.5 + .5, body.z / 1.5 + .5, Math.min(1.6, body.vy * .7));
	}
}
function maintainDrops() {
	if (maxDrops <= 0) return;
	let count = 0;
	for (const body of bodies) if (body.kind === "drop") count += 1;
	if (count >= maxDrops) return;
	if (mulberry() > .55) return;
	const angle = mulberry() * Math.PI * 2;
	const radius = .12 + mulberry() * .22;
	bodies.push({
		id: `drop-${seed}-${dropSerial}`,
		kind: "drop",
		x: Math.cos(angle) * radius,
		y: .92 + mulberry() * .12,
		z: Math.sin(angle) * radius,
		vx: Math.cos(angle) * .35,
		vy: .15 + mulberry() * .4,
		vz: Math.sin(angle) * .35,
		r: .04,
		age: 0,
		life: 1e6,
		held: false,
		impact: 0,
		color: "#f0b56a",
		hue: 28
	});
	dropSerial += 1;
}
function stepBrewPhysics(dt, env) {
	maintainDrops();
	stepBodies(dt, env.gravity);
	stepSlosh(dt, env.tiltX, env.tiltZ, env.shake);
	splashBodies();
}
function knockAll(ix, iy, iz) {
	for (const body of bodies) {
		if (body.held) continue;
		const spread = .45 + mulberry() * .4;
		body.vx += ix * spread;
		body.vy += iy;
		body.vz += iz * spread;
	}
	pokeSlosh(.5, .5, Math.min(1.2, Math.hypot(ix, iy, iz) * .15));
}
function rayHit(ray) {
	let best = null;
	let bestT = 1e9;
	const [ox, oy, oz] = ray.origin;
	const [dx, dy, dz] = ray.dir;
	for (const body of bodies) {
		const lx = ox - body.x;
		const ly = oy - body.y;
		const lz = oz - body.z;
		const b = lx * dx + ly * dy + lz * dz;
		const rad = body.r + .08;
		const c = lx * lx + ly * ly + lz * lz - rad * rad;
		const disc = b * b - c;
		if (disc < 0) continue;
		const t = -b - Math.sqrt(disc);
		if (t < bestT && t > -.15) {
			bestT = t;
			best = body;
		}
	}
	return best;
}
function holdingPhysics() {
	return heldId != null;
}
function grabPhysics(clientX, clientY) {
	const ray = rayView?.(clientX, clientY);
	if (!ray) return false;
	const hit = rayHit(ray);
	if (!hit) return false;
	if (heldId && heldId !== hit.id) {
		const prev = bodies.find((body) => body.id === heldId);
		if (prev) prev.held = false;
	}
	heldId = hit.id;
	hit.held = true;
	hit.vx = 0;
	hit.vy = 0;
	hit.vz = 0;
	return true;
}
function dragPhysics(clientX, clientY) {
	const held = bodies.find((body) => body.id === heldId);
	const ray = rayView?.(clientX, clientY);
	if (!held || !ray) return;
	const [ox, oy, oz] = ray.origin;
	const [dx, dy, dz] = ray.dir;
	if (Math.abs(dy) < 1e-4) return;
	const t = (held.y - oy) / dy;
	if (t < 0 || t > 12) return;
	held.x = ox + dx * t;
	held.z = oz + dz * t;
	const limit = wallRadius(held.y) + .35;
	const horiz = Math.hypot(held.x, held.z);
	if (horiz > limit) {
		held.x = held.x / horiz * limit;
		held.z = held.z / horiz * limit;
	}
}
function releasePhysics(vx, vy, vz) {
	const held = bodies.find((body) => body.id === heldId);
	if (!held) return false;
	held.held = false;
	held.vx = vx;
	held.vy = vy;
	held.vz = vz;
	heldId = null;
	pokeSlosh(held.x / 1.5 + .5, held.z / 1.5 + .5, .45);
	return true;
}
function physicsSnapshot() {
	return {
		seed,
		gravity: GRAVITY,
		bodies: bodies.slice(0, 16).map((body) => ({
			id: body.id,
			kind: body.kind,
			position: [
				round(body.x),
				round(body.y),
				round(body.z)
			],
			velocity: [
				round(body.vx),
				round(body.vy),
				round(body.vz)
			]
		}))
	};
}
/** Robinhood Chain testnet only. No keys, no mainnet switch in this build. */
var CHAIN = {
	id: 46630,
	hex: "0xb626",
	name: "Robinhood Chain Testnet",
	rpc: "https://rpc.testnet.chain.robinhood.com",
	explorer: "https://explorer.testnet.chain.robinhood.com",
	currency: "ETH",
	/**
	* Public collection address. Empty means this deployment has no contract
	* to call. Not a secret.
	*/
	contract: "",
	royaltyBps: 500,
	dailyCap: 5
};
function provider() {
	if (typeof window === "undefined") return null;
	const eth = window.ethereum;
	return eth && typeof eth.request === "function" ? eth : null;
}
function walletAvailable() {
	return provider() != null;
}
function hexToEth(hex) {
	const wei = BigInt(hex);
	return `${wei / 10n ** 18n}.${(wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 4)}`;
}
async function connectWallet() {
	const eth = provider();
	if (!eth) throw new Error("No wallet in this browser.");
	const address = (await eth.request({ method: "eth_requestAccounts" }))[0];
	if (!address) throw new Error("The wallet shared no account.");
	try {
		await eth.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: CHAIN.hex }]
		});
	} catch (error) {
		if (error.code === 4902) await eth.request({
			method: "wallet_addEthereumChain",
			params: [{
				chainId: CHAIN.hex,
				chainName: CHAIN.name,
				nativeCurrency: {
					name: "Ether",
					symbol: "ETH",
					decimals: 18
				},
				rpcUrls: [CHAIN.rpc],
				blockExplorerUrls: [CHAIN.explorer]
			}]
		});
		else throw error;
	}
	const chainHex = await eth.request({ method: "eth_chainId" });
	return {
		address,
		chainId: Number.parseInt(chainHex, 16),
		balanceEth: hexToEth(await eth.request({
			method: "eth_getBalance",
			params: [address, "latest"]
		}))
	};
}
async function mintWithWallet(to, tokenUri) {
	const eth = provider();
	if (!eth) throw new Error("No wallet in this browser.");
	if (!CHAIN.contract) throw new Error("No collection contract is configured.");
	const chainHex = await eth.request({ method: "eth_chainId" });
	if (Number.parseInt(chainHex, 16) !== CHAIN.id) throw new Error("Switch the wallet to Robinhood Chain testnet.");
	const data = encodeMint(to, tokenUri);
	return await eth.request({
		method: "eth_sendTransaction",
		params: [{
			from: to,
			to: CHAIN.contract,
			data
		}]
	});
}
function encodeMint(to, tokenUri) {
	const selector = "0xd0def521";
	const addr = to.toLowerCase().replace(/^0x/, "").padStart(64, "0");
	const offset = 64 .toString(16).padStart(64, "0");
	const bytes = new TextEncoder().encode(tokenUri);
	const len = bytes.length.toString(16).padStart(64, "0");
	let hex = "";
	bytes.forEach((b) => {
		hex += b.toString(16).padStart(2, "0");
	});
	return `${selector}${addr}${offset}${len}${hex.padEnd(Math.ceil(hex.length / 64) * 64, "0")}`;
}
var based = false;
/** Self-hosted subset. Never hotlink the CDN at runtime. */
function xeSrc(emoji) {
	if (!based) {
		(0, import_xeroemoji.setBase)("/xeroemoji/");
		based = true;
	}
	return (0, import_xeroemoji.get)(emoji)?.svgUrl ?? "";
}
function XeIcon({ emoji, className }) {
	const src = xeSrc(emoji);
	if (!src) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		"aria-hidden": "true",
		draggable: false,
		className: className ? `xe ${className}` : "xe"
	});
}
var KEY = "conjure.creations.v1";
var FLAGS = "conjure.flags.v1";
var DEVICE = "conjure.device";
var NAME = "conjure.name";
var OPT = "conjure.optIn";
var defaultFlags = () => ({
	usedIngredient: false,
	passedSensors: false,
	usedGroup: false,
	savedRecipe: false,
	hintDrop: true,
	hintSensor: true,
	hintKeys: true
});
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function deviceId() {
	if (typeof window === "undefined") return "server";
	let id = localStorage.getItem(DEVICE);
	if (!id || !/^d_[a-zA-Z0-9]{8,32}$/.test(id)) {
		id = `d_${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "").slice(0, 16) : Math.random().toString(36).slice(2, 12)}`;
		localStorage.setItem(DEVICE, id);
	}
	return id;
}
function loadName() {
	return readJson(NAME, "");
}
function saveName(name) {
	localStorage.setItem(NAME, JSON.stringify(name));
}
function loadOptIn() {
	return readJson(OPT, false);
}
function saveOptIn(value) {
	localStorage.setItem(OPT, JSON.stringify(value));
}
function loadFlags() {
	return {
		...defaultFlags(),
		...readJson(FLAGS, {})
	};
}
function saveFlags(flags) {
	localStorage.setItem(FLAGS, JSON.stringify(flags));
}
function loadCreations() {
	const list = readJson(KEY, []);
	return Array.isArray(list) ? list : [];
}
function saveCreation(creation) {
	const list = loadCreations().filter((item) => item.id !== creation.id);
	list.unshift(creation);
	localStorage.setItem(KEY, JSON.stringify(list.slice(0, 24)));
}
function creationById(id) {
	return loadCreations().find((item) => item.id === id) ?? null;
}
function encodeCreation(creation) {
	const copy = {
		...creation,
		still: void 0
	};
	const json = JSON.stringify(copy);
	const bytes = new TextEncoder().encode(json);
	let bin = "";
	bytes.forEach((b) => {
		bin += String.fromCharCode(b);
	});
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decodeCreation(payload) {
	try {
		const pad = payload.length % 4 === 0 ? "" : "=".repeat(4 - payload.length % 4);
		const b64 = payload.replace(/-/g, "+").replace(/_/g, "/") + pad;
		const bin = atob(b64);
		const bytes = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
		const parsed = JSON.parse(new TextDecoder().decode(bytes));
		if (!parsed || typeof parsed.id !== "string" || !Array.isArray(parsed.drops)) return null;
		return parsed;
	} catch {
		return null;
	}
}
function newId() {
	return Math.random().toString(36).slice(2, 10);
}
var EVENTS = "conjure.events.v1";
function trackLocal(name) {
	if (typeof window === "undefined") return;
	const cur = readJson(EVENTS, {});
	cur[name] = (cur[name] ?? 0) + 1;
	localStorage.setItem(EVENTS, JSON.stringify(cur));
}
var MINTS = "conjure.mints.v1";
function loadMints() {
	const list = readJson(MINTS, []);
	return Array.isArray(list) ? list : [];
}
function saveMint(note) {
	const list = loadMints().filter((item) => item.hash !== note.hash);
	list.unshift(note);
	localStorage.setItem(MINTS, JSON.stringify(list.slice(0, 40)));
}
/** Robinhood Chain testnet only. This module has no mainnet chain. */
var robinhoodTestnet = defineChain({
	id: CHAIN.id,
	name: CHAIN.name,
	nativeCurrency: {
		name: "Ether",
		symbol: "ETH",
		decimals: 18
	},
	rpcUrls: { default: { http: [CHAIN.rpc] } },
	blockExplorers: { default: {
		name: "Explorer",
		url: CHAIN.explorer
	} },
	testnet: true
});
var wagmiConfig = createConfig({
	chains: [robinhoodTestnet],
	transports: { [robinhoodTestnet.id]: http(CHAIN.rpc) },
	ssr: true
});
var transferEvent = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)");
function asAddress(value) {
	if (!/^0x[a-fA-F0-9]{40}$/.test(value)) throw new Error("That address is not valid.");
	return value;
}
async function listOwnedTokens(owner) {
	if (!CHAIN.contract) return [];
	const client = getPublicClient(wagmiConfig);
	const account = asAddress(owner);
	const logs = await client.getLogs({
		address: CHAIN.contract,
		event: transferEvent,
		fromBlock: 0n,
		toBlock: "latest"
	});
	const holder = /* @__PURE__ */ new Map();
	for (const log of logs) {
		const id = log.args.tokenId?.toString();
		if (!id || !log.args.to) continue;
		holder.set(id, log.args.to);
	}
	return [...holder.entries()].filter(([, who]) => who.toLowerCase() === account.toLowerCase()).map(([id]) => ({ id })).sort((a, b) => Number(a.id) - Number(b.id));
}
async function transferToken(from, to, tokenId) {
	if (!CHAIN.contract) throw new Error("No collection contract is configured.");
	if (typeof window === "undefined") throw new Error("No wallet in this browser.");
	const eth = window.ethereum;
	if (!eth) throw new Error("No wallet in this browser.");
	const fromAddr = asAddress(from);
	const toAddr = asAddress(to);
	if (!/^\d+$/.test(tokenId)) throw new Error("Token id must be a number.");
	const wallet = createWalletClient({
		account: fromAddr,
		chain: robinhoodTestnet,
		transport: custom(eth)
	});
	if (await wallet.getChainId() !== CHAIN.id) throw new Error("Switch the wallet to Robinhood Chain testnet.");
	return wallet.writeContract({
		address: CHAIN.contract,
		abi: erc721Abi,
		functionName: "transferFrom",
		args: [
			fromAddr,
			toAddr,
			BigInt(tokenId)
		],
		account: fromAddr,
		chain: robinhoodTestnet
	});
}
var en_default = {
	app: { "title": "Conjure" },
	start: "Start",
	soundOn: "Sound on",
	soundOff: "Sound off",
	optIn: "Include me when I am signed in",
	hint: {
		"drop": "Tap an ingredient. It drops in.",
		"sensor": "A sensor can stir the brew.",
		"keys": "Keys 1–8 drop ingredients."
	},
	vibe: {
		"label": "Vibe",
		"calm": "Calm",
		"chaotic": "Chaotic",
		"spooky": "Spooky"
	},
	quiet: "Keep it quiet",
	controls: {
		"show": "Show controls",
		"hide": "Hide controls"
	},
	gather: "Gather",
	capture: "Capture",
	share: "Share",
	remix: "Remix",
	close: "Close",
	back: "Back to the cauldron",
	credits: "Credits",
	privacy: "Privacy",
	copy: "Copy link",
	copied: "Link copied.",
	watching: "You are watching.",
	inPot: "in the pot",
	hostOnly: "The host captures.",
	full: "The circle is full.",
	sensor: {
		"mic": "Mic",
		"camera": "Camera",
		"motion": "Motion",
		"sample": "Sample color",
		"stop": "Tap to stop"
	},
	mic: {
		"line1": "Your voice shapes the brew.",
		"line2": "Only levels are shared, not audio.",
		"go": "Use microphone"
	},
	cam: {
		"line1": "Sample a color, or wave to stir.",
		"line2": "The picture stays on this phone.",
		"go": "Use camera"
	},
	motion: {
		"line1": "Tilt to stir. Shake for a burst.",
		"line2": "The phone may ask for motion.",
		"go": "Use motion"
	},
	denied: "You can still tap ingredients.",
	consent: {
		"line1": "Include you in this capture?",
		"line2": "No answer leaves you out.",
		"in": "Include me",
		"out": "Leave me out",
		"wait": "The circle is choosing."
	},
	record: "Saving the loop",
	review: {
		"title": "Captured",
		"still": "Save still",
		"loop": "Save loop",
		"recipe": "Save recipe",
		"glb": "Save GLB",
		"mint": "Mint"
	},
	mint: {
		"title": "Mint on testnet",
		"body": "You pay gas on Robinhood Chain testnet.",
		"connect": "Connect wallet",
		"noWallet": "No wallet in this browser.",
		"noContract": "No collection contract is configured.",
		"meta": "Download metadata",
		"cap": "Daily mint cap reached.",
		"sent": "Mint submitted.",
		"velocity": "Angular velocity",
		"axis": "Axis",
		"damping": "Damping",
		"spins": "Spin count",
		"gravity": "Gravity",
		"tier": "Tier",
		"bodies": "Bodies",
		"rotation": "Rotation",
		"scale": "Scale",
		"spill": "Spill lip",
		"bodyCap": "Body cap"
	},
	room: {
		"title": "One cauldron",
		"host": "You host this circle.",
		"code": "Code",
		"join": "Join",
		"watch": "Watch",
		"leave": "Leave",
		"lock": "Lock",
		"unlock": "Unlock",
		"kick": "Remove",
		"handoff": "Make host",
		"name": "Your name",
		"open": "Open a circle",
		"invite": "A cauldron invited you."
	},
	seat: {
		"stirrer": "Stirrer",
		"singer": "Singer",
		"spark": "Spark",
		"seer": "Seer"
	},
	form: { "label": "Form" },
	deep: "Reorder the drops. Mute one to keep it neutral.",
	up: "Earlier",
	down: "Later",
	mute: "Mute",
	unmute: "Restore",
	saveRecipe: "Save recipe",
	saved: "Recipe saved.",
	lineage: "Remixed from",
	report: "Report",
	reportSent: "Report sent.",
	reason: {
		"spam": "Spam",
		"unsafe": "Unsafe",
		"other": "Other"
	},
	ar: "Place in room",
	tier: "Graphics",
	empty: "The cauldron is waiting.",
	replay: "Replaying",
	notFound: "This brew is not on this device.",
	who: "Who is here",
	next: {
		"label": "Next",
		"drop": "Drop an ingredient.",
		"sensor": "Open a sensor and stir.",
		"capture": "Capture a 6 second loop.",
		"gather": "Open a circle.",
		"share": "Share the replay link.",
		"fling": "Drag the brew and let go.",
		"master": "Keep brewing to reach Master.",
		"wallet": "Open Wallet and connect on testnet.",
		"board": "The board is opt-in. Hide it any time."
	},
	tip: {
		"fling": "The brew is moving. Drag it, then let go.",
		"capture": "Tap Capture to keep a still, a loop, and a recipe.",
		"gather": "Tap Gather. Friends join with the code.",
		"share": "Share copies a link that replays this brew.",
		"master": "Master is on. Open Tools for stir, hue, swirl, bloom, and freeze.",
		"wallet": "Wallet lists testnet mints. You sign each transfer.",
		"board": "The board stores a handle and a score. Hide removes yours."
	},
	level: {
		"spark": "Spark",
		"stir": "Stir",
		"circle": "Circle",
		"keep": "Keep",
		"master": "Master",
		"max": "Master is the top."
	},
	levelUp: "Level up",
	streak: "Streak",
	badges: { "empty": "Badges show up as you brew." },
	badge: {
		"spark": "Opened",
		"drop": "First drop",
		"sensor": "Sensor",
		"circle": "Circle",
		"keep": "Capture",
		"share": "Shared",
		"streak": "Three-day streak",
		"fling": "Fling",
		"mint": "Mint",
		"master": "Master"
	},
	tools: {
		"title": "Tools",
		"body": "Full device resolution, within what this GPU can draw.",
		"stir": "Stir",
		"hue": "Hue",
		"swirl": "Swirl",
		"bloom": "Bloom",
		"freeze": "Freeze",
		"thaw": "Thaw"
	},
	wallet: {
		"open": "Wallet",
		"mints": "Mints",
		"empty": "No testnet mint on this device yet.",
		"token": "Token id",
		"to": "Send to",
		"transfer": "Transfer",
		"use": "Use",
		"sent": "Transfer submitted.",
		"fail": "The wallet did not send it.",
		"wrongChain": "Switch to Robinhood Chain testnet."
	},
	board: {
		"open": "Board",
		"body": "Opt in with a pseudonym or an emoji. No name, email, or wallet is stored. Hide deletes your row.",
		"handle": "Handle",
		"need": "Pick a handle first. An emoji is enough.",
		"join": "Show me on the board",
		"hide": "Hide me and delete my row",
		"empty": "No one is on the board yet."
	}
};
function t(path) {
	let cur = en_default;
	for (const part of path.split(".")) {
		if (!cur || typeof cur !== "object" || !(part in cur)) return path;
		cur = cur[part];
	}
	return typeof cur === "string" ? cur : path;
}
function NextStep({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "next-step",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("next.label") }),
			" ",
			t(`next.${id}`)
		]
	});
}
function TipCard({ id, onDismiss }) {
	const startX = (0, import_react.useRef)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "tip",
		onPointerDown: (event) => {
			startX.current = event.clientX;
		},
		onPointerUp: (event) => {
			if (Math.abs(event.clientX - startX.current) > 48) onDismiss();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(`tip.${id}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-btn",
			"aria-label": t("close"),
			onClick: onDismiss,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
		})]
	});
}
function LevelSheet({ progress, onClose, onWallet, onBoard, onTools }) {
	const climb = xpToNext(progress.xp);
	const pct = climb.next ? Math.round(climb.into / climb.span * 100) : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "sheet",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t(`level.${progress.level}`),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						t(`level.${progress.level}`),
						" · ",
						progress.xp,
						" XP"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": t("close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "xp-bar",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${pct}%` } })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						t("streak"),
						" ",
						progress.streak,
						climb.next ? ` · ${climb.need} XP → ${t(`level.${climb.next}`)}` : ` · ${t("level.max")}`
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "badges",
					children: [progress.badges.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "muted",
						children: t("badges.empty")
					}), progress.badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⭐" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(`badge.${badge}`) })] }, badge))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row wrap",
					children: [
						progress.level === "master" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip emphasis",
							onClick: onTools,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🪄" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("tools.title") })]
						}),
						walletUnlocked(progress) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip",
							onClick: onWallet,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🔗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("wallet.open") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip",
							onClick: onBoard,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⭐" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("board.open") })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "levels",
					children: LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: level.id === progress.level ? "on" : void 0,
						children: [
							t(`level.${level.id}`),
							" · ",
							level.xp,
							" XP"
						]
					}, level.id))
				})
			]
		})
	});
}
function ToolDock({ hidden, onLive, onRetire }) {
	const [stir, setStir] = (0, import_react.useState)(masterMix.stir);
	const [hue, setHue] = (0, import_react.useState)(masterMix.hue);
	const [swirl, setSwirl] = (0, import_react.useState)(masterMix.swirl);
	const [bloom, setBloom] = (0, import_react.useState)(masterMix.bloom);
	const [freeze, setFreeze] = (0, import_react.useState)(masterMix.freeze);
	const tools = [
		{
			id: "tool:stir",
			label: t("tools.stir")
		},
		{
			id: "tool:hue",
			label: t("tools.hue")
		},
		{
			id: "tool:swirl",
			label: t("tools.swirl")
		},
		{
			id: "tool:bloom",
			label: t("tools.bloom")
		},
		{
			id: "tool:freeze",
			label: t("tools.freeze")
		}
	].filter((tool) => !hidden.includes(tool.id));
	if (!tools.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-dock",
		children: [
			tools.some((tool) => tool.id === "tool:stir") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("tools.stir"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"data-tool": "stir",
				type: "range",
				min: 0,
				max: 1,
				step: .05,
				value: stir,
				onInput: (event) => {
					const value = Number(event.target.value);
					setStir(value);
					masterMix.stir = value;
					onLive("stir", value);
				},
				onPointerUp: () => onRetire("tool:stir")
			})] }),
			tools.some((tool) => tool.id === "tool:hue") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("tools.hue"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"data-tool": "hue",
				type: "range",
				min: -160,
				max: 160,
				step: 2,
				value: hue,
				onInput: (event) => {
					const value = Number(event.target.value);
					setHue(value);
					masterMix.hue = value;
					onLive("hue", value);
				},
				onPointerUp: () => onRetire("tool:hue")
			})] }),
			tools.some((tool) => tool.id === "tool:swirl") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("tools.swirl"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"data-tool": "swirl",
				type: "range",
				min: 0,
				max: 1,
				step: .05,
				value: swirl,
				onInput: (event) => {
					const value = Number(event.target.value);
					setSwirl(value);
					masterMix.swirl = value;
					onLive("swirl", value);
				},
				onPointerUp: () => onRetire("tool:swirl")
			})] }),
			tools.some((tool) => tool.id === "tool:bloom") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("tools.bloom"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"data-tool": "bloom",
				type: "range",
				min: 0,
				max: 1,
				step: .05,
				value: bloom,
				onInput: (event) => {
					const value = Number(event.target.value);
					setBloom(value);
					masterMix.bloom = value;
					onLive("bloom", value);
				},
				onPointerUp: () => onRetire("tool:bloom")
			})] }),
			tools.some((tool) => tool.id === "tool:freeze") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-tool": "freeze",
				className: freeze ? "chip on" : "chip",
				onClick: () => {
					const next = !freeze;
					setFreeze(next);
					masterMix.freeze = next;
					onLive("freeze", next ? 1 : 0);
					onRetire("tool:freeze");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "❄️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: freeze ? t("tools.thaw") : t("tools.freeze") })]
			})
		]
	});
}
function WalletSheet({ wallet, onWallet, onClose, onNotice }) {
	const [owned, setOwned] = (0, import_react.useState)([]);
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [tokenId, setTokenId] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setNotes(loadMints());
		if (!wallet || !CHAIN.contract) return;
		let stop = false;
		listOwnedTokens(wallet.address).then((rows) => {
			if (!stop) setOwned(rows);
		}).catch(() => {
			if (!stop) setOwned([]);
		});
		return () => {
			stop = true;
		};
	}, [wallet]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "sheet",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("wallet.open"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("wallet.open") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": t("close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						CHAIN.name,
						" · ",
						CHAIN.id
					]
				}),
				!walletAvailable() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mint.noWallet") }),
				walletAvailable() && !wallet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "emphasis",
					onClick: () => {
						connectWallet().then(onWallet).catch((error) => onNotice(error instanceof Error ? error.message : t("mint.noWallet")));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🔗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("mint.connect") })]
				}),
				wallet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: [
						wallet.address.slice(0, 6),
						"…",
						wallet.address.slice(-4),
						" · ",
						wallet.balanceEth,
						" ETH",
						wallet.chainId === CHAIN.id ? "" : ` · ${t("wallet.wrongChain")}`
					]
				}),
				!CHAIN.contract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mint.noContract") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("wallet.mints") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "drops",
					children: [
						owned.length === 0 && notes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "muted",
							children: t("wallet.empty")
						}),
						owned.map((token) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✨" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["#", token.id] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: () => setTokenId(token.id),
								children: t("wallet.use")
							})
						] }, token.id)),
						notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📸" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							note.hash.slice(0, 10),
							" · ",
							note.uri.replace(/^https?:\/\//, "").slice(0, 28)
						] })] }, note.hash))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("wallet.token"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: tokenId,
					inputMode: "numeric",
					onChange: (event) => setTokenId(event.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("wallet.to"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: to,
					spellCheck: false,
					onChange: (event) => setTo(event.target.value.trim())
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "emphasis",
					disabled: !wallet || !CHAIN.contract || busy,
					onClick: () => {
						if (!wallet) return;
						setBusy(true);
						transferToken(wallet.address, to, tokenId).then((hash) => {
							onNotice(`${t("wallet.sent")} ${hash.slice(0, 10)}`);
							return listOwnedTokens(wallet.address).then(setOwned).catch(() => void 0);
						}).catch((error) => onNotice(error instanceof Error ? error.message : t("wallet.fail"))).finally(() => setBusy(false));
					},
					children: t("wallet.transfer")
				})
			]
		})
	});
}
function BoardSheet({ rows, handle, optIn, onHandle, onOptIn, onHide, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "sheet",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("board.open"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("board.open") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": t("close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("board.body")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("board.handle"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: handle,
					maxLength: 16,
					onChange: (event) => onHandle(event.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row wrap",
					children: [
						"🫧",
						"🔥",
						"🌿",
						"🌙",
						"🍯",
						"❄️",
						"✨"
					].map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						onClick: () => onHandle(cleanHandle(emoji) || emoji),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji })
					}, emoji))
				}),
				!optIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "emphasis",
					onClick: onOptIn,
					children: t("board.join")
				}),
				optIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onHide,
					children: t("board.hide")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "board",
					children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "muted",
						children: t("board.empty")
					}), rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						index + 1,
						". ",
						row.handle
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "muted",
						children: [
							row.xp,
							" XP · ",
							t(`level.${row.level}`)
						]
					})] }, `${row.handle}-${index}`))]
				})
			]
		})
	});
}
var ctx = null;
var muted = false;
function unlockAudio() {
	if (typeof window === "undefined") return;
	try {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return;
		ctx ??= new AC();
		if (ctx.state === "suspended") ctx.resume();
	} catch {
		ctx = null;
	}
}
function setMuted(next) {
	muted = next;
}
function isMuted() {
	return muted;
}
function pluck(hue, energy = .4) {
	if (!ctx || muted) return;
	const now = ctx.currentTime;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = energy > .8 ? "sawtooth" : "triangle";
	osc.frequency.value = 160 + hue % 360 * 1.4;
	gain.gain.setValueAtTime(1e-4, now);
	gain.gain.exponentialRampToValueAtTime(.06, now + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + .45);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(now);
	osc.stop(now + .48);
}
function burstSound() {
	if (!ctx || muted) return;
	const now = ctx.currentTime;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(240, now);
	osc.frequency.exponentialRampToValueAtTime(90, now + .3);
	gain.gain.setValueAtTime(.07, now);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + .32);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(now);
	osc.stop(now + .34);
}
var RoomError = class extends Error {};
async function roomCall(body) {
	const res = await fetch("/api/conjure", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body)
	});
	const data = await res.json();
	if (!res.ok) throw new RoomError(data.error || "The circle did not answer.");
	return data;
}
async function roomGet(code, deviceId) {
	const res = await fetch(`/api/conjure?code=${encodeURIComponent(code)}&device=${encodeURIComponent(deviceId)}`);
	const data = await res.json();
	if (!res.ok) throw new RoomError(data.error || "That circle is gone.");
	return data;
}
/** Drawn cauldron used when WebGL is missing. Same brew math as the 3D stage. */
function FlatBrew({ drops, vibe, reduced }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let frame = 0;
		let time = 0;
		let stamp = performance.now();
		const draw = () => {
			const now = performance.now();
			const dt = Math.min(.05, (now - stamp) / 1e3);
			stamp = now;
			const leanX = masterMix.freeze ? 0 : liveSensor.tiltY * .7 + remoteSensor.tiltY * .2;
			const leanZ = masterMix.freeze ? 0 : liveSensor.tiltX * .7 + remoteSensor.tiltX * .2;
			stepTumble(dt, Math.min(1, liveSensor.loudness * .85 + liveSensor.burst * .7 + liveSensor.shake * .55 + Math.min(1, Math.hypot(spin.vx, spin.vy, spin.vz) / 3) + Math.min(1, Math.hypot(flingVel.x, flingVel.y))), {
				reduced,
				frozen: masterMix.freeze
			});
			const pose = poseNow(leanX, leanZ, masterMix.freeze);
			stepBrewPhysics(dt, {
				gravity: localGravity(pose.x, pose.y, pose.z),
				tiltX: reduced ? pose.x * .35 : pose.x,
				tiltZ: reduced ? pose.z * .35 : pose.z,
				shake: masterMix.freeze || reduced ? 0 : liveSensor.shake + tumble.energy * .35
			});
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.clientWidth || 320;
			const height = canvas.clientHeight || 480;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "#110e0c";
			ctx.fillRect(0, 0, width, height);
			const brew = computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
			const last = [...drops].reverse().find((drop) => !drop.neutral);
			const shown = last ? hslToHex(ingredientById(last.ingredient).hue, .8, .52) : brew.color;
			const color = punchStrength() > .2 ? punch.hex : shown;
			const stir = toolTouch.stir ? masterMix.stir : .1;
			time += masterMix.freeze ? 0 : reduced ? .004 : .016 * (.7 + stir);
			const cx = width / 2 + liveSensor.tiltX * width * .12;
			const cy = height * .52 + liveSensor.tiltY * height * .06;
			const bloom = toolTouch.bloom ? masterMix.bloom : .3;
			const radius = Math.min(width, height) * .22 * brew.scale * pose.scale * (1 + liveSensor.burst * .35) * (.75 + bloom);
			ctx.save();
			ctx.translate(cx, cy);
			ctx.rotate(pose.y);
			const glow = ctx.createRadialGradient(0, -radius, radius * .2, 0, -radius, radius * 1.8);
			glow.addColorStop(0, color);
			glow.addColorStop(1, "rgba(17,14,12,0)");
			ctx.fillStyle = glow;
			ctx.beginPath();
			ctx.arc(0, -radius * .9, radius * 1.6, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = color;
			ctx.beginPath();
			const wobble = reduced || masterMix.freeze ? 0 : Math.sin(time * (2 + brew.swirl + Math.abs(spin.vy))) * 14 * (.4 + brew.spikes);
			ctx.ellipse(0, -radius * 1.15, radius * .72 + wobble, radius * .85, pose.z * .25, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
			ctx.fillStyle = "#3a2c24";
			ctx.beginPath();
			ctx.ellipse(cx, cy + radius * .15, radius * 1.15, radius * .42, spin.y * .15, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = color;
			ctx.globalAlpha = .95;
			ctx.beginPath();
			const grid = sloshGrid();
			let wave = 0;
			for (let i = 0; i < grid.h.length; i += 1) wave += Math.abs(grid.h[i]);
			wave = grid.h.length ? wave / grid.h.length : 0;
			ctx.ellipse(cx, cy - radius * .05, radius * (.82 + wave * .35), radius * (.22 + wave * .5), spin.y, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
			ctx.save();
			ctx.translate(cx, cy - radius * .05);
			ctx.rotate(pose.y);
			ctx.strokeStyle = "rgba(255,246,223,0.9)";
			ctx.lineWidth = Math.max(2, radius * .035);
			for (let ring = 1; ring <= 3; ring += 1) {
				const wob = Math.sin(time * 5.5 - ring) * (.04 + wave * .35);
				const rx = Math.max(2, radius * (.22 * ring + wob));
				const ry = Math.max(1, radius * (.07 * ring + wob * .35));
				ctx.beginPath();
				ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.restore();
			ctx.save();
			ctx.translate(cx, cy - radius * .15);
			ctx.rotate(pose.y);
			ctx.strokeStyle = "#fff6df";
			ctx.lineWidth = Math.max(3, radius * .08);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(radius * 1.35, -radius * .95);
			ctx.stroke();
			ctx.fillStyle = "#fff8e8";
			ctx.beginPath();
			ctx.arc(radius * 1.35, -radius * .95, Math.max(8, radius * .16), 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
			for (const body of liveBodies()) {
				const fade = body.kind === "spark" ? Math.max(0, 1 - body.age / body.life) : .95;
				ctx.globalAlpha = fade;
				ctx.fillStyle = body.color;
				const squash = body.impact || 0;
				const rad = Math.max(4, body.r * radius * 1.6);
				ctx.beginPath();
				ctx.ellipse(cx + body.x * radius * 1.15, cy - body.y * radius * .48, rad * (1 + squash * .35), rad * (1 - squash * .4), 0, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
			frame = requestAnimationFrame(draw);
		};
		frame = requestAnimationFrame(draw);
		setGrabStill(() => {
			try {
				return canvas.toDataURL("image/jpeg", .72);
			} catch {
				return null;
			}
		});
		return () => {
			cancelAnimationFrame(frame);
			setGrabStill(null);
		};
	}, [
		drops,
		vibe,
		reduced
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "flat-brew",
		"aria-hidden": "true"
	});
}
function tierFrom(signals) {
	if (signals.saveData || signals.memory > 0 && signals.memory <= 2 || signals.cores <= 2) return "low";
	if (signals.webgpu && signals.cores >= 8 && (signals.memory === 0 || signals.memory >= 8)) return "high";
	if (signals.cores <= 4) return "low";
	return "mid";
}
function qualityFromTier(tier, webgpu, webgl2) {
	if (tier === "low") return {
		tier,
		dpr: [1, 1],
		particles: 70,
		detail: 2,
		webgpu,
		webgl2,
		master: false
	};
	if (tier === "high") return {
		tier,
		dpr: [1, 1.75],
		particles: 420,
		detail: 5,
		webgpu,
		webgl2,
		master: false
	};
	return {
		tier,
		dpr: [1, 1.4],
		particles: 180,
		detail: 3,
		webgpu,
		webgl2,
		master: false
	};
}
/** Device pixel ratio, never above the GPU's max texture or an 8 megapixel budget. */
function capDpr(dpr, maxTexture, width, height) {
	const byTexture = Math.max(1, maxTexture) / Math.max(1, width, height);
	const pixels = Math.max(1, width * height);
	const byBudget = Math.sqrt(8e6 / pixels);
	return Math.max(1, Math.floor(Math.min(Math.max(dpr, 1), byTexture, byBudget, 3) * 100) / 100);
}
function masterQuality(base, gpu) {
	const dpr = capDpr(gpu.dpr, gpu.maxTexture, gpu.width, gpu.height);
	return {
		...base,
		tier: "high",
		master: true,
		dpr: [1, dpr],
		particles: Math.min(800, Math.max(base.particles, 640)),
		detail: 5,
		webgpu: base.webgpu,
		webgl2: base.webgl2
	};
}
function readGpu() {
	const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
	const width = typeof window === "undefined" ? 1280 : window.innerWidth || 1280;
	const height = typeof window === "undefined" ? 800 : window.innerHeight || 800;
	let maxTexture = 4096;
	if (typeof document !== "undefined") try {
		const gl = document.createElement("canvas").getContext("webgl2");
		const size = gl?.getParameter(gl.MAX_TEXTURE_SIZE);
		if (typeof size === "number" && size >= 1024) maxTexture = size;
	} catch {}
	return {
		dpr,
		maxTexture,
		width,
		height
	};
}
async function probeQuality(opts) {
	const nav = navigator;
	let webgpu = false;
	if (nav.gpu?.requestAdapter) try {
		webgpu = await nav.gpu.requestAdapter() != null;
	} catch {
		webgpu = false;
	}
	let webgl2 = false;
	try {
		webgl2 = document.createElement("canvas").getContext("webgl2") != null;
	} catch {
		webgl2 = false;
	}
	const base = qualityFromTier(tierFrom({
		webgpu,
		cores: navigator.hardwareConcurrency || 4,
		memory: nav.deviceMemory ?? 0,
		saveData: Boolean(nav.connection?.saveData)
	}), webgpu, webgl2);
	if (!opts?.master) return base;
	return masterQuality(base, readGpu());
}
function hueFromRgb(r, g, b) {
	const max = Math.max(r, g, b);
	const d = max - Math.min(r, g, b);
	if (d === 0) return 30;
	let h = 0;
	if (max === r) h = (g - b) / d % 6;
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	return (h * 60 + 360) % 360;
}
function estimatePitch(time, sampleRate) {
	let best = 0;
	let bestLag = 0;
	for (let lag = 32; lag < 420; lag += 2) {
		let corr = 0;
		for (let i = 0; i < time.length - lag; i += 8) corr += (time[i] - 128) / 128 * ((time[i + lag] - 128) / 128);
		if (corr > best) {
			best = corr;
			bestLag = lag;
		}
	}
	if (!bestLag || best < 6) return .5;
	const freq = sampleRate / bestLag;
	return Math.max(0, Math.min(1, (freq - 80) / 640));
}
function useSensors(kind, onError) {
	const onErrorRef = (0, import_react.useRef)(onError);
	onErrorRef.current = onError;
	const sampleRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		sampleRef.current = null;
		if (!kind) {
			liveSensor.loudness = 0;
			liveSensor.wave = 0;
			return;
		}
		let stop = false;
		const bucket = [];
		const fail = (message) => {
			if (!stop) onErrorRef.current(message);
		};
		if (kind === "mic") (async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false
				});
				if (stop) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}
				const ctx = new (window.AudioContext || window.webkitAudioContext)();
				const source = ctx.createMediaStreamSource(stream);
				const analyser = ctx.createAnalyser();
				analyser.fftSize = 2048;
				source.connect(analyser);
				const time = new Uint8Array(analyser.fftSize);
				let previous = 0;
				let frame = 0;
				const loop = () => {
					analyser.getByteTimeDomainData(time);
					let sum = 0;
					for (let i = 0; i < time.length; i += 1) {
						const v = (time[i] - 128) / 128;
						sum += v * v;
					}
					const rms = Math.min(1, Math.sqrt(sum / time.length) * 3.4);
					liveSensor.loudness = rms;
					if (rms - previous > .28 && rms > .42) {
						liveSensor.burst = 1;
						burstSound();
					}
					previous = previous * .65 + rms * .35;
					liveSensor.pitch = estimatePitch(time, ctx.sampleRate);
					frame = requestAnimationFrame(loop);
				};
				frame = requestAnimationFrame(loop);
				bucket.push(() => {
					cancelAnimationFrame(frame);
					stream.getTracks().forEach((track) => track.stop());
					ctx.close();
					liveSensor.loudness = 0;
				});
			} catch {
				fail("Microphone stayed off.");
			}
		})();
		if (kind === "camera") (async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						facingMode: "environment",
						width: { ideal: 160 },
						height: { ideal: 120 }
					}
				});
				if (stop) {
					stream.getTracks().forEach((track) => track.stop());
					return;
				}
				const video = document.createElement("video");
				video.playsInline = true;
				video.muted = true;
				video.srcObject = stream;
				await video.play();
				const canvas = document.createElement("canvas");
				canvas.width = 32;
				canvas.height = 24;
				const ctx = canvas.getContext("2d", { willReadFrequently: true });
				let prev = null;
				let frame = 0;
				const loop = () => {
					if (ctx && video.readyState >= 2) {
						ctx.drawImage(video, 0, 0, 32, 24);
						const data = ctx.getImageData(0, 0, 32, 24).data;
						if (prev) {
							let diff = 0;
							for (let i = 0; i < data.length; i += 16) diff += Math.abs(data[i] - prev[i]);
							const wave = Math.min(1, diff / 3500);
							if (wave > .08) liveSensor.wave = Math.max(liveSensor.wave, wave);
						}
						prev = new Uint8ClampedArray(data);
					}
					frame = requestAnimationFrame(loop);
				};
				frame = requestAnimationFrame(loop);
				sampleRef.current = () => {
					if (!ctx) return;
					ctx.drawImage(video, 0, 0, 32, 24);
					const pixel = ctx.getImageData(16, 12, 1, 1).data;
					liveSensor.sampleHue = hueFromRgb(pixel[0], pixel[1], pixel[2]);
				};
				bucket.push(() => {
					cancelAnimationFrame(frame);
					stream.getTracks().forEach((track) => track.stop());
					sampleRef.current = null;
					liveSensor.wave = 0;
				});
			} catch {
				fail("Camera stayed off.");
			}
		})();
		if (kind === "motion") (async () => {
			try {
				const motionEvent = DeviceMotionEvent;
				if (typeof motionEvent.requestPermission === "function") {
					if (await motionEvent.requestPermission() !== "granted") {
						fail("Motion stayed off.");
						return;
					}
				}
				if (stop) return;
				const onMotion = (event) => {
					const gravity = event.accelerationIncludingGravity;
					if (gravity) {
						liveSensor.tiltX = Math.max(-1, Math.min(1, (gravity.x ?? 0) / 9));
						liveSensor.tiltY = Math.max(-1, Math.min(1, (gravity.y ?? 0) / 12));
						holdDeviceTilt();
					}
					const acc = event.acceleration;
					if (Math.hypot(acc?.x ?? 0, acc?.y ?? 0, acc?.z ?? 0) > 16) liveSensor.shake = 1;
				};
				const onOri = (event) => {
					liveSensor.pitch = ((event.webkitCompassHeading ?? event.alpha ?? 0) % 360 + 360) % 360 / 360;
				};
				window.addEventListener("devicemotion", onMotion);
				window.addEventListener("deviceorientation", onOri);
				bucket.push(() => {
					window.removeEventListener("devicemotion", onMotion);
					window.removeEventListener("deviceorientation", onOri);
					liveSensor.tiltX = 0;
					liveSensor.tiltY = 0;
				});
				const Ambient = window.AmbientLightSensor;
				if (Ambient) try {
					const sensor = new Ambient();
					sensor.addEventListener("reading", () => {
						liveSensor.loudness = Math.min(1, (sensor.illuminance || 0) / 700) * .4;
					});
					sensor.start();
					bucket.push(() => sensor.stop());
				} catch {}
			} catch {
				fail("Motion stayed off.");
			}
		})();
		return () => {
			stop = true;
			bucket.forEach((fn) => fn());
		};
	}, [kind]);
	return { sampleColor: () => sampleRef.current?.() };
}
var VIBES = [
	"calm",
	"chaotic",
	"spooky"
];
var useBrew = create((set, get) => ({
	started: false,
	vibe: "calm",
	form: "orb",
	drops: [],
	name: "",
	roomCode: "",
	members: [],
	hostId: "",
	locked: false,
	consent: null,
	notice: "",
	recording: 0,
	start: () => set({ started: true }),
	setVibe: (vibe) => set({ vibe }),
	cycleVibe: () => {
		set({ vibe: VIBES[(VIBES.indexOf(get().vibe) + 1) % VIBES.length] });
	},
	setForm: (form) => set({ form }),
	setName: (name) => set({ name }),
	addDrop: (ingredient, by) => {
		const drop = {
			id: newId(),
			ingredient,
			by,
			at: Date.now()
		};
		set({ drops: [...get().drops, drop].slice(-80) });
		return drop;
	},
	setDrops: (drops) => set({ drops }),
	applyRoom: (room) => set({
		roomCode: room.code,
		hostId: room.hostId,
		vibe: room.vibe,
		locked: room.locked,
		drops: room.drops,
		members: room.members,
		consent: room.consent
	}),
	clearRoom: () => set({
		roomCode: "",
		members: [],
		hostId: "",
		locked: false,
		consent: null
	}),
	setNotice: (notice) => set({ notice }),
	setRecording: (recording) => set({ recording })
}));
var CauldronScene = (0, import_react.lazy)(() => import("./scene-B9oOaNEY.mjs").then((mod) => ({ default: mod.CauldronScene })));
var StageBoundary = class extends import_react.Component {
	state = { bad: false };
	static getDerivedStateFromError() {
		return { bad: true };
	}
	render() {
		return this.state.bad ? this.props.fallback : this.props.children;
	}
};
var SEAT_EMOJI = {
	stirrer: "🥄",
	singer: "🎵",
	spark: "⚡",
	seer: "👁️"
};
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function FrameReadout() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const tick = () => {
			const el = ref.current;
			if (el) {
				const d = frameDebug;
				el.textContent = [
					`window ${d.innerWidth}×${d.innerHeight}`,
					`canvas ${d.canvasWidth}×${d.canvasHeight}`,
					`dpr ${d.dpr.toFixed(2)}`,
					`camera ${d.position.map((n) => n.toFixed(2)).join(" ")}`,
					`fov ${d.fov.toFixed(1)}`,
					`mode ${d.mode}`,
					`margin ${d.margin.toFixed(2)}`
				].join("\n");
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		ref,
		className: "frame-debug",
		"aria-hidden": "true"
	});
}
function captureMotion(quality) {
	const fx = effectsFor(quality ?? qualityFromTier("mid", false, true));
	return motionSnapshot({
		lip: SPILL.lip,
		mouth: SPILL.mouth,
		ground: SPILL.ground,
		bodyCap: bodyCap(fx)
	});
}
function ConjureApp({ invite = "", watch = false, replay = null, debug = false }) {
	const started = useBrew((s) => s.started);
	const vibe = useBrew((s) => s.vibe);
	const form = useBrew((s) => s.form);
	const drops = useBrew((s) => s.drops);
	useBrew((s) => s.name);
	const roomCode = useBrew((s) => s.roomCode);
	const members = useBrew((s) => s.members);
	const hostId = useBrew((s) => s.hostId);
	const locked = useBrew((s) => s.locked);
	const consent = useBrew((s) => s.consent);
	const notice = useBrew((s) => s.notice);
	const recording = useBrew((s) => s.recording);
	const setNotice = useBrew((s) => s.setNotice);
	const [flags, setFlags] = (0, import_react.useState)(defaultFlags);
	const [kind, setKind] = (0, import_react.useState)(null);
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [draftName, setDraftName] = (0, import_react.useState)("");
	const [joinCode, setJoinCode] = (0, import_react.useState)(invite);
	const [quality, setQuality] = (0, import_react.useState)(null);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	const [xr, setXr] = (0, import_react.useState)(false);
	const [review, setReview] = (0, import_react.useState)(null);
	const [wallet, setWallet] = (0, import_react.useState)(null);
	const [gallery, setGallery] = (0, import_react.useState)([]);
	const [qr, setQr] = (0, import_react.useState)("");
	const [muted, setMutedState] = (0, import_react.useState)(false);
	const [liveMsg, setLiveMsg] = (0, import_react.useState)("");
	const [optIn, setOptIn] = (0, import_react.useState)(false);
	const [graphics, setGraphics] = (0, import_react.useState)("3d");
	const [progress, setProgress] = (0, import_react.useState)(emptyProgress);
	const [dismissed, setDismissed] = (0, import_react.useState)([]);
	const [boardPrefs, setBoardPrefs] = (0, import_react.useState)({
		optIn: false,
		handle: "",
		hidden: false
	});
	const [boardRows, setBoardRows] = (0, import_react.useState)([]);
	const [tray, setTray] = (0, import_react.useState)(true);
	const [retired, setRetired] = (0, import_react.useState)([]);
	const deviceRef = (0, import_react.useRef)("d_pending00");
	const loops = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const dragging = (0, import_react.useRef)(false);
	const sparkAt = (0, import_react.useRef)(0);
	const kindRef = (0, import_react.useRef)(null);
	const sensors = useSensors(kind, (message) => {
		setRetired((list) => list.filter((id) => id !== `sensor:${kindRef.current}`));
		setTray(true);
		setKind(null);
		kindRef.current = null;
		setNotice(`${message} ${t("denied")}`);
	});
	(0, import_react.useEffect)(() => {
		const id = deviceId();
		deviceRef.current = id;
		const storedName = loadName();
		const picked = storedName || `${[
			"amber",
			"quiet",
			"moss",
			"brass",
			"ink"
		][Math.floor(Math.random() * 5)]}-${[
			"ladle",
			"moon",
			"well"
		][Math.floor(Math.random() * 3)]}`;
		if (!storedName) saveName(picked);
		useBrew.getState().setName(picked);
		setDraftName(picked);
		setFlags(loadFlags());
		setOptIn(loadOptIn());
		setGallery(loadCreations());
		setProgress(loadProgress());
		setDismissed(loadDismissedTips());
		setBoardPrefs(loadBoardPrefs());
		const remixRaw = sessionStorage.getItem("conjure.remix");
		if (remixRaw) {
			sessionStorage.removeItem("conjure.remix");
			try {
				const creation = JSON.parse(remixRaw);
				useBrew.setState({
					started: true,
					drops: creation.drops.map((drop) => ({
						...drop,
						neutral: false
					})),
					vibe: creation.vibe,
					form: creation.form
				});
				if (creation.spin) restoreSpin(creation.spin);
				setReview(null);
			} catch {}
		}
		const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const applyReduced = () => setReduced(reducedQuery.matches);
		applyReduced();
		reducedQuery.addEventListener("change", applyReduced);
		const nav = navigator;
		if (nav.xr) nav.xr.isSessionSupported("immersive-ar").then(setXr).catch(() => setXr(false));
		return () => reducedQuery.removeEventListener("change", applyReduced);
	}, []);
	(0, import_react.useEffect)(() => {
		let stop = false;
		const run = () => {
			probeQuality({ master: progress.level === "master" }).then((next) => {
				if (stop) return;
				setQuality(next);
				if (!next.webgl2) setGraphics("flat");
			});
		};
		run();
		window.addEventListener("resize", run);
		return () => {
			stop = true;
			window.removeEventListener("resize", run);
		};
	}, [progress.level]);
	(0, import_react.useEffect)(() => {
		if (!quality) return;
		const fx = effectsFor(quality);
		configurePhysics({
			charms: fx.bodies,
			sparks: fx.sparkBodies,
			slosh: fx.slosh,
			drops: fx.drops
		});
	}, [quality]);
	(0, import_react.useEffect)(() => {
		syncCharms(drops.filter((drop) => !drop.neutral).map((drop) => {
			const hue = ingredientById(drop.ingredient).hue;
			return {
				id: drop.id,
				hue,
				color: hslToHex(hue, .9, .58)
			};
		}));
	}, [drops]);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		let frame = 0;
		let last = performance.now();
		let prevTiltX = liveSensor.tiltX;
		let prevTiltY = liveSensor.tiltY;
		const tick = (now) => {
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			if (masterMix.freeze) {
				spin.vx = 0;
				spin.vy = 0;
				spin.vz = 0;
			} else {
				if (!reduced) {
					decayFling(dt);
					liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + flingVel.x * dt * 8));
					liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + flingVel.y * dt * 8));
				}
				const tiltDx = liveSensor.tiltX - prevTiltX;
				const tiltDy = liveSensor.tiltY - prevTiltY;
				prevTiltX = liveSensor.tiltX;
				prevTiltY = liveSensor.tiltY;
				const scale = reduced ? .35 : 1;
				impulse(tiltDy * 3.1 * scale, tiltDx * 3.1 * scale, 0);
				impulse(flingVel.y * dt * 5 * scale, flingVel.x * dt * 6 * scale, 0);
				if (liveSensor.loudness > .08) impulse(0, liveSensor.loudness * dt * 3.4 * scale, 0);
				if (liveSensor.wave > .05) impulse(0, 0, liveSensor.wave * dt * 2.8 * scale);
				if (toolTouch.stir) impulse(0, masterMix.stir * dt * 2.4 * scale, 0);
				if (toolTouch.swirl) impulse(0, 0, masterMix.swirl * dt * 2.2 * scale);
				stepSpin(dt * scale);
			}
			springTilt(liveSensor, dt);
			prevTiltX = liveSensor.tiltX;
			prevTiltY = liveSensor.tiltY;
			const stage = document.querySelector(".stage");
			if (stage instanceof HTMLElement) {
				const shown = shownColor(useBrew.getState().drops, useBrew.getState().vibe);
				stage.dataset.hue = String(Math.round(shown.hue));
				stage.dataset.spin = Math.hypot(spin.vx, spin.vy, spin.vz).toFixed(3);
				stage.dataset.drops = String(useBrew.getState().drops.length);
				stage.style.setProperty("--brew", shown.hex);
				const spark = sparks[sparks.length - 1];
				if (spark) {
					let count = 0;
					for (let i = sparks.length - 1; i >= 0 && sparks[i].at === spark.at; i -= 1) count += 1;
					noteBurst(spark.at, spark.color, count);
				}
				const ring = stage.querySelector(".brew-pulse");
				if (ring instanceof HTMLElement) {
					const left = pulse.until - Date.now();
					if (left > 0) {
						const t = 1 - left / Math.max(1, pulse.ms);
						ring.style.opacity = String(Math.max(0, (1 - t) * .95));
						ring.style.transform = `translate(-50%, -54%) scale(${.65 + t * 2.5})`;
						ring.style.borderColor = pulse.hex;
					} else if (ring.style.opacity !== "0") ring.style.opacity = "0";
				}
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [started, reduced]);
	function grant(action) {
		setProgress((current) => {
			const result = award(current, action);
			saveProgress(result.progress);
			if (result.leveledUp) setNotice(`${t("levelUp")}: ${t(`level.${result.progress.level}`)}`);
			return result.progress;
		});
	}
	(0, import_react.useEffect)(() => {
		if (!boardPrefs.optIn) return;
		const handle = cleanHandle(boardPrefs.handle);
		if (!handle) return;
		const timer = window.setTimeout(() => {
			roomCall({
				op: "board-publish",
				device: deviceRef.current,
				handle,
				xp: progress.xp,
				streak: progress.streak,
				level: progress.level
			}).then((data) => {
				const rows = data.rows;
				if (rows) setBoardRows(rows);
			}).catch(() => void 0);
		}, 450);
		return () => window.clearTimeout(timer);
	}, [
		boardPrefs.optIn,
		boardPrefs.handle,
		progress.xp,
		progress.streak,
		progress.level
	]);
	(0, import_react.useEffect)(() => {
		if (!roomCode) return;
		let stop = false;
		const tick = async () => {
			try {
				const snap = await roomGet(roomCode, deviceRef.current);
				if (stop) return;
				useBrew.getState().applyRoom(snap);
				const others = snap.members.filter((member) => member.id !== deviceRef.current);
				Object.assign(remoteSensor, blendSensors(others.map((member) => ({
					loudness: member.loudness,
					pitch: member.pitch,
					burst: member.burst,
					tiltX: member.tiltX,
					tiltY: member.tiltY,
					shake: member.shake,
					sampleHue: member.sampleHue,
					wave: member.wave
				}))));
			} catch (error) {
				if (!stop) setNotice(error instanceof Error ? error.message : t("full"));
			}
		};
		tick();
		const id = window.setInterval(() => void tick(), 900);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [roomCode, setNotice]);
	(0, import_react.useEffect)(() => {
		if (!roomCode) return;
		const id = window.setInterval(() => {
			roomCall({
				op: "sensor",
				device: deviceRef.current,
				code: roomCode,
				sensors: {
					...liveSensor,
					mic: kind === "mic",
					camera: kind === "camera",
					motion: kind === "motion"
				}
			}).catch(() => void 0);
		}, 700);
		return () => window.clearInterval(id);
	}, [roomCode, kind]);
	(0, import_react.useEffect)(() => {
		if (!replay) return;
		useBrew.setState({
			started: true,
			vibe: replay.vibe,
			form: replay.form,
			drops: []
		});
		if (replay.spin) restoreSpin(replay.spin);
		const source = replay.drops;
		if (!source.length) {
			useBrew.getState().setDrops([]);
			return;
		}
		const start = Math.min(...source.map((drop) => drop.at));
		const span = Math.max(1, Math.max(...source.map((drop) => drop.at)) - start);
		let frame = 0;
		let prevCycle = 0;
		const begun = performance.now();
		const loop = (now) => {
			const cycle = (now - begun) % 6e3 / 6e3;
			if (cycle < prevCycle && replay.spin) restoreSpin(replay.spin);
			prevCycle = cycle;
			const visible = source.filter((drop) => (drop.at - start) / span <= cycle / .8).map((drop) => ({
				...drop,
				at: Date.now() - 2e3
			}));
			useBrew.getState().setDrops(visible);
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(frame);
	}, [replay]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
			if (event.key === "Escape") {
				setSheet(null);
				return;
			}
			if (!useBrew.getState().started || replay) return;
			const index = Number(event.key) - 1;
			if (index >= 0 && index < INGREDIENTS.length) {
				event.preventDefault();
				drop(INGREDIENTS[index].id);
			}
			if (event.key === "c") capture();
			if (event.key === "ArrowLeft") {
				liveSensor.tiltX = Math.max(-1, liveSensor.tiltX - .35);
				impulse(0, -1.1, 0);
				knockAll(-1.6, .35, 0);
			}
			if (event.key === "ArrowRight") {
				liveSensor.tiltX = Math.min(1, liveSensor.tiltX + .35);
				impulse(0, 1.1, 0);
				knockAll(1.6, .35, 0);
			}
			if (event.key === "ArrowUp") {
				liveSensor.tiltY = Math.max(-1, liveSensor.tiltY - .35);
				impulse(-1.1, 0, 0);
				knockAll(0, .45, -1.4);
			}
			if (event.key === "ArrowDown") {
				liveSensor.tiltY = Math.min(1, liveSensor.tiltY + .35);
				impulse(1.1, 0, 0);
				knockAll(0, .45, 1.4);
			}
			if (event.key === " ") {
				event.preventDefault();
				liveSensor.burst = 1;
				liveSensor.shake = 1;
				impulse(.4, 1.6, .5);
				knockAll(.15, 2.4, -.1);
				pokeSlosh(.5, .5, 1);
				burstSparks("#f6efe4", 8);
				burstSound();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [replay]);
	const me = members.find((member) => member.id === deviceRef.current);
	const spectating = me?.role === "spectator" || Boolean(replay);
	const isHost = !roomCode || hostId === deviceRef.current;
	const brew = (0, import_react.useMemo)(() => computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe), [
		drops,
		vibe,
		notice,
		recording
	]);
	function patchFlags(partial) {
		setFlags((current) => {
			const next = {
				...current,
				...partial
			};
			saveFlags(next);
			return next;
		});
	}
	function ensureLive() {
		if (useBrew.getState().started) return;
		unlockAudio();
		useBrew.getState().start();
		resetPhysics(Date.now() & 2147483647 || 1);
		grant("start");
	}
	function hideControl(id) {
		setRetired((list) => list.includes(id) ? list : [...list, id]);
		setTray(false);
	}
	function sparksOnce(color) {
		const now = performance.now();
		if (now - sparkAt.current < 140) return;
		sparkAt.current = now;
		burstSparks(color, 8);
	}
	function armSensor(next) {
		ensureLive();
		kindRef.current = next;
		setKind(next);
		grant("sensor");
		patchFlags({
			passedSensors: true,
			hintSensor: false
		});
		if (next === "mic") {
			liveSensor.loudness = 1;
			liveSensor.burst = 1;
			liveSensor.shake = 1;
			burstSound();
			punchColor("#f0b429", 42);
			burstSparks("#f0b429", 12);
			impulse(.25, 2.9, .45);
			window.setTimeout(() => {
				if (liveSensor.loudness > .92) liveSensor.loudness = 0;
			}, 900);
			setNotice(t("mic.line2"));
		}
		if (next === "camera") {
			liveSensor.wave = 1;
			liveSensor.sampleHue = 196;
			liveSensor.burst = .85;
			const hex = hslToHex(196, .78, .52);
			punchColor(hex, 196);
			burstSparks(hex, 12);
			impulse(.35, .45, 2.5);
			setNotice(t("cam.line2"));
		}
		if (next === "motion") {
			liveSensor.tiltX = .82;
			liveSensor.tiltY = -.58;
			liveSensor.shake = 1;
			liveSensor.burst = 1;
			punchColor("#c9b6ff", 268);
			burstSparks("#c9b6ff", 12);
			impulse(2.1, 2.2, .8);
			setNotice(t("motion.line1"));
		}
		hideControl(`sensor:${next}`);
	}
	function onTool(id, value) {
		ensureLive();
		if (id === "stir") {
			toolTouch.stir = true;
			impulse(0, .45 + value * 1.4, 0);
			liveSensor.burst = Math.min(1, .35 + value);
			sparksOnce("#e27a3a");
		}
		if (id === "hue") {
			toolTouch.hue = true;
			const hue = (value % 360 + 360) % 360;
			const hex = hslToHex(hue, .82, .52);
			punchColor(hex, hue);
			sparksOnce(hex);
			impulse(0, .2, value / 90);
		}
		if (id === "swirl") {
			toolTouch.swirl = true;
			impulse(0, .25, .7 + value * 2.2);
			sparksOnce("#7ee0d0");
		}
		if (id === "bloom") {
			toolTouch.bloom = true;
			liveSensor.burst = Math.min(1, .25 + value);
			impulse(.25, .45 + value * .8, .2);
			sparksOnce("#fff1c9");
		}
		if (id === "freeze") {
			toolTouch.freeze = true;
			if (value) {
				spin.vx = 0;
				spin.vy = 0;
				spin.vz = 0;
				punchColor("#d5e6f2", 200);
			} else {
				impulse(.45, 1.5, .35);
				burstSparks("#f6efe4", 8);
			}
		}
	}
	function say(message) {
		setLiveMsg("");
		setTimeout(() => setLiveMsg(message), 20);
	}
	async function drop(id) {
		if (spectating) return;
		ensureLive();
		const ing = ingredientById(id);
		const hex = hslToHex(ing.hue, .84, .52);
		punchColor(hex, ing.hue);
		burstSparks(hex, 12);
		pokeSlosh(.35 + ing.hue % 20 / 50, .5, .85);
		liveSensor.burst = 1;
		liveSensor.shake = .9;
		impulse((ing.spikes - .3) * 2.6, 1.15 + ing.energy * 1.7, (ing.hue / 180 - 1) * 1.6);
		pluck(ing.hue, ing.energy);
		const made = useBrew.getState().addDrop(id, deviceRef.current);
		patchFlags({
			usedIngredient: true,
			hintDrop: false
		});
		grant("drop");
		hideControl(`ing:${id}`);
		say(`${ing.label} dropped in.`);
		if (roomCode) try {
			const snap = await roomCall({
				op: "drop",
				device: deviceRef.current,
				code: roomCode,
				id: made.id,
				ingredient: id,
				at: made.at
			});
			if ("drops" in snap) useBrew.getState().applyRoom(snap);
		} catch (error) {
			setNotice(error instanceof RoomError ? error.message : t("full"));
		}
	}
	async function capture() {
		const state = useBrew.getState();
		if (!state.started || replay || state.recording) return;
		if (state.roomCode && state.hostId !== deviceRef.current) {
			setNotice(t("hostOnly"));
			return;
		}
		if (state.roomCode) {
			if (state.members.filter((member) => member.id !== deviceRef.current && member.role !== "spectator").length) try {
				await roomCall({
					op: "consent-open",
					device: deviceRef.current,
					code: state.roomCode,
					creationId: newId()
				});
				await sleep(5200);
				const snap = await roomGet(state.roomCode, deviceRef.current);
				const votes = resolveVotes(snap.members.filter((member) => member.role !== "spectator").map((member) => ({
					id: member.id,
					isHost: member.id === snap.hostId
				})), snap.consent?.votes ?? {}, {}, {});
				const excluded = Object.entries(votes).filter(([, included]) => !included).map(([id]) => id);
				const ids = snap.drops.filter((item) => excluded.includes(item.by)).map((item) => item.id);
				const done = await roomCall({
					op: "neutralize",
					device: deviceRef.current,
					code: state.roomCode,
					ids
				});
				if ("drops" in done) useBrew.getState().applyRoom(done);
			} catch (error) {
				setNotice(error instanceof Error ? error.message : t("hostOnly"));
				return;
			}
		}
		await recordLoop();
	}
	async function recordLoop() {
		const chunks = [];
		const canvas = document.querySelector(".stage canvas");
		let recorder = null;
		if (canvas instanceof HTMLCanvasElement && typeof canvas.captureStream === "function") try {
			const stream = canvas.captureStream(24);
			const mime = [
				"video/webm;codecs=vp9",
				"video/webm;codecs=vp8",
				"video/webm"
			].find((type) => MediaRecorder.isTypeSupported(type));
			if (mime) {
				recorder = new MediaRecorder(stream, { mimeType: mime });
				recorder.ondataavailable = (event) => {
					if (event.data.size) chunks.push(event.data);
				};
				recorder.start();
			}
		} catch {
			recorder = null;
		}
		const motion = spinSnapshot();
		rememberMotion(motion);
		const physicsShot = physicsSnapshot();
		const materialShot = materialNote(effectsFor(quality ?? qualityFromTier("mid", false, true)));
		let earlyStill = null;
		for (let second = 6; second > 0; second -= 1) {
			useBrew.getState().setRecording(second);
			if (second === 6) {
				await sleep(350);
				earlyStill = takeStill();
				await sleep(650);
				continue;
			}
			await sleep(1e3);
		}
		if (recorder && recorder.state !== "inactive") await new Promise((resolve) => {
			recorder.addEventListener("stop", () => resolve(), { once: true });
			recorder.stop();
		});
		useBrew.getState().setRecording(0);
		const state = useBrew.getState();
		const credited = roomCode ? state.members.filter((member) => state.drops.some((item) => item.by === member.id && !item.neutral)).map((member) => ({
			id: member.id,
			name: member.name,
			included: true
		})) : [{
			id: deviceRef.current,
			name: state.name || "You",
			included: true
		}];
		const creation = {
			id: newId(),
			title: titleFromDrops(state.drops),
			vibe: state.vibe,
			form: state.form,
			drops: state.drops,
			contributors: credited,
			createdAt: Date.now(),
			still: earlyStill ?? takeStill() ?? void 0,
			spin: motion,
			motion: captureMotion(quality),
			physics: physicsShot,
			material: materialShot
		};
		const prior = sessionStorage.getItem("conjure.lineage");
		if (prior) try {
			const lineage = JSON.parse(prior);
			creation.remixOf = lineage.id;
			creation.remixTitle = lineage.title;
		} catch {}
		saveCreation(creation);
		setGallery(loadCreations());
		if (chunks.length) loops.current.set(creation.id, new Blob(chunks, { type: "video/webm" }));
		trackLocal("capture");
		grant("capture");
		roomCall({
			op: "event",
			name: "capture"
		}).catch(() => void 0);
		setReview(creation);
		setSheet("review");
		say(`${creation.title} saved.`);
	}
	async function openCircle() {
		const cleaned = cleanName(draftName);
		if (!cleaned) {
			setNotice("Pick another name.");
			return;
		}
		saveName(cleaned);
		useBrew.getState().setName(cleaned);
		try {
			const snap = await roomCall({
				op: "create",
				device: deviceRef.current,
				name: cleaned,
				vibe: useBrew.getState().vibe
			});
			if ("code" in snap && snap.code) {
				useBrew.getState().applyRoom(snap);
				patchFlags({ usedGroup: true });
				grant("gather");
				setSheet("gather");
				say(`Circle ${snap.code} is open.`);
			}
		} catch (error) {
			setNotice(error instanceof Error ? error.message : t("full"));
		}
	}
	async function join(asWatch) {
		const cleaned = cleanName(draftName);
		const code = joinCode.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
		if (!cleaned) {
			setNotice("Pick another name.");
			return;
		}
		saveName(cleaned);
		useBrew.getState().setName(cleaned);
		if (!useBrew.getState().started) resetPhysics(Date.now() & 2147483647 || 1);
		useBrew.getState().start();
		try {
			const snap = await roomCall({
				op: "join",
				device: deviceRef.current,
				code,
				name: cleaned,
				watch: asWatch
			});
			if ("members" in snap) {
				useBrew.getState().applyRoom(snap);
				patchFlags({
					usedGroup: true,
					passedSensors: true
				});
				grant("gather");
				setSheet("gather");
				say(asWatch ? t("watching") : `Joined ${code}.`);
			}
		} catch (error) {
			setNotice(error instanceof Error ? error.message : t("full"));
		}
	}
	async function shareCreation(creation) {
		const encoded = encodeCreation(creation);
		const url = `${window.location.origin}/c/${creation.id}?d=${encoded}`;
		trackLocal("share");
		grant("share");
		roomCall({
			op: "event",
			name: "share"
		}).catch(() => void 0);
		const payload = {
			title: creation.title,
			text: "Remix this brew.",
			url
		};
		try {
			if (navigator.share) {
				await navigator.share(payload);
				return;
			}
		} catch {}
		await navigator.clipboard.writeText(url);
		setNotice(t("copied"));
	}
	function remix(creation) {
		sessionStorage.setItem("conjure.remix", JSON.stringify(creation));
		sessionStorage.setItem("conjure.lineage", JSON.stringify({
			id: creation.id,
			title: creation.title
		}));
		trackLocal("remix");
		grant("remix");
		roomCall({
			op: "event",
			name: "remix"
		}).catch(() => void 0);
		window.location.assign("/");
	}
	async function saveRecipe() {
		const state = useBrew.getState();
		saveCreation({
			id: newId(),
			title: titleFromDrops(state.drops),
			vibe: state.vibe,
			form: state.form,
			drops: state.drops,
			contributors: [{
				id: deviceRef.current,
				name: state.name || "You",
				included: true
			}],
			createdAt: Date.now(),
			spin: spinSnapshot(),
			motion: captureMotion(quality),
			physics: physicsSnapshot(),
			material: materialNote(effectsFor(quality ?? qualityFromTier("mid", false, true)))
		});
		setGallery(loadCreations());
		patchFlags({ savedRecipe: true });
		grant("recipe");
		setNotice(t("saved"));
	}
	(0, import_react.useEffect)(() => {
		if (sheet !== "board") return;
		roomCall({ op: "board-list" }).then((data) => {
			const rows = data.rows;
			if (rows) setBoardRows(rows);
		}).catch(() => void 0);
	}, [sheet]);
	(0, import_react.useEffect)(() => {
		if (sheet !== "gather" || !roomCode) return;
		const url = `${window.location.origin}/?room=${roomCode}`;
		import("../_libs/qrcode.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((mod) => mod.toDataURL(url, {
			margin: 1,
			width: 280,
			color: {
				dark: "#110e0c",
				light: "#f6efe4"
			}
		})).then(setQr).catch(() => setQr(""));
	}, [sheet, roomCode]);
	const showSensors = flags.usedIngredient && !replay;
	const showGather = flags.passedSensors && !replay;
	const showRecipeSave = flags.usedGroup && !replay;
	const showDeep = flags.savedRecipe && !replay;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "conjure",
		children: [
			debug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameReadout, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sr-only",
				"aria-live": "polite",
				children: liveMsg
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage",
				onPointerDown: (event) => {
					const rect = event.currentTarget.getBoundingClientRect();
					const u = rect.width > 0 ? (event.clientX - rect.left) / rect.width : .5;
					const v = rect.height > 0 ? (event.clientY - rect.top) / rect.height : .5;
					pokeSlosh(.18 + u * .64, .18 + (1 - v) * .64, 1.35);
					if (grabPhysics(event.clientX, event.clientY)) {
						try {
							event.currentTarget.setPointerCapture(event.pointerId);
						} catch {}
						pointerDown(event.pointerId, event.clientX, event.clientY);
						haptic(12);
						return;
					}
					if (sceneMoving({
						started,
						reduced,
						frozen: masterMix.freeze
					})) {
						try {
							event.currentTarget.setPointerCapture(event.pointerId);
						} catch {}
						pointerDown(event.pointerId, event.clientX, event.clientY);
						haptic(8);
						return;
					}
					dragging.current = true;
				},
				onPointerUp: (event) => {
					if (holdingPhysics()) {
						try {
							if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
						} catch {}
						const speed = pointerUp(event.pointerId);
						releasePhysics(flingVel.x * 10, -flingVel.y * 8 + .4, flingVel.y * 4);
						if (isFling(speed)) {
							haptic([
								12,
								28,
								18
							]);
							impulse(flingVel.y * .45, flingVel.x * .55, 0);
							grant("fling");
						}
						return;
					}
					if (sceneMoving({
						started,
						reduced,
						frozen: masterMix.freeze
					})) {
						try {
							if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
						} catch {}
						if (isFling(pointerUp(event.pointerId))) {
							haptic([
								12,
								28,
								18
							]);
							impulse(flingVel.y * 1.8, flingVel.x * 2.2, 0);
							knockAll(flingVel.x * 5, 1.1, flingVel.y * 3);
							flashPulse("#fff6df", 700);
							burstSparks("#f6efe4", 10);
							grant("fling");
						}
						return;
					}
					dragging.current = false;
				},
				onPointerCancel: (event) => {
					if (holdingPhysics()) releasePhysics(0, .2, 0);
					pointerUp(event.pointerId);
					dragging.current = false;
				},
				onPointerLeave: () => {
					dragging.current = false;
				},
				onPointerMove: (event) => {
					if (holdingPhysics()) {
						dragPhysics(event.clientX, event.clientY);
						pointerMove(event.pointerId, event.clientX, event.clientY);
						return;
					}
					if (sceneMoving({
						started,
						reduced,
						frozen: masterMix.freeze
					})) {
						const delta = pointerMove(event.pointerId, event.clientX, event.clientY);
						if (!delta) return;
						liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + delta.dx / 160));
						liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + delta.dy / 160));
						impulse(delta.dy / 140, delta.dx / 120, 0);
						return;
					}
					if (!dragging.current || !started) return;
					liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + event.movementX / 180));
					liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + event.movementY / 180));
				},
				children: [graphics === "flat" || !quality ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatBrew, {
					drops,
					vibe,
					reduced
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBoundary, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatBrew, {
						drops,
						vibe,
						reduced
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatBrew, {
							drops,
							vibe,
							reduced
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CauldronScene, {
							drops,
							vibe,
							form,
							quality,
							reduced
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "brew-pulse",
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: {
						room: "",
						watch: false,
						debug: 0
					},
					className: "brand",
					"aria-label": t("app.title"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🪄" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("app.title") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "top-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip",
							onClick: () => setSheet("level"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⭐" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t(`level.${progress.level}`),
								" · ",
								progress.xp
							] })]
						}),
						started && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip",
							onClick: () => {
								if (roomCode && hostId !== deviceRef.current) return;
								const next = VIBES$1[(VIBES$1.indexOf(vibe) + 1) % VIBES$1.length];
								useBrew.getState().setVibe(next);
								const preview = computeBrew(useBrew.getState().drops, blendSensors([liveSensor, remoteSensor]), next);
								punchColor(preview.color, preview.hue);
								burstSparks(preview.color, 10);
								impulse(next === "spooky" ? 1.4 : .3, next === "chaotic" ? 2.4 : 1.1, .4);
								if (roomCode) roomCall({
									op: "vibe",
									device: deviceRef.current,
									code: roomCode,
									vibe: next
								}).then((snap) => {
									if ("members" in snap) useBrew.getState().applyRoom(snap);
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🌀" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								t("vibe.label"),
								" · ",
								t(`vibe.${vibe}`)
							] })]
						}),
						started && !replay && !spectating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip emphasis",
							onClick: () => void capture(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📸" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("capture") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/credits",
							className: "icon-btn",
							"aria-label": t("credits"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📜" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "icon-btn",
							"aria-label": t("privacy"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🛡️" })
						})
					]
				})]
			}),
			!replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextStep, { id: nextStepId(progress) }),
			!replay && currentTip(dismissed, {
				fling: started && !reduced && !masterMix.freeze,
				capture: flags.usedIngredient,
				gather: flags.passedSensors,
				share: gallery.length > 0,
				master: progress.level === "master",
				wallet: walletUnlocked(progress),
				board: progress.xp >= 40 && !boardPrefs.hidden
			}) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TipCard, {
				id: currentTip(dismissed, {
					fling: started && !reduced && !masterMix.freeze,
					capture: flags.usedIngredient,
					gather: flags.passedSensors,
					share: gallery.length > 0,
					master: progress.level === "master",
					wallet: walletUnlocked(progress),
					board: progress.xp >= 40 && !boardPrefs.hidden
				}),
				onDismiss: () => {
					const id = currentTip(dismissed, {
						fling: started && !reduced && !masterMix.freeze,
						capture: flags.usedIngredient,
						gather: flags.passedSensors,
						share: gallery.length > 0,
						master: progress.level === "master",
						wallet: walletUnlocked(progress),
						board: progress.xp >= 40 && !boardPrefs.hidden
					});
					if (!id) return;
					setDismissed(dismissTip(id));
				}
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "notice",
				role: "status",
				children: [notice, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-btn",
					onClick: () => setNotice(""),
					"aria-label": t("close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
				})]
			}),
			recording > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "record-banner",
				children: [
					t("record"),
					" · ",
					recording
				]
			}),
			replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "record-banner",
				children: [
					t("replay"),
					" · ",
					replay.title
				]
			}),
			started && flags.hintDrop && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: t("hint.drop")
			}),
			showSensors && flags.hintSensor && kind == null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: t("hint.sensor")
			}),
			started && flags.hintKeys && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hint keys-hint",
				children: [t("hint.keys"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-btn",
					onClick: () => patchFlags({ hintKeys: false }),
					"aria-label": t("close"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
				})]
			}),
			invite && !roomCode && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sheet invite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("room.invite") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "code",
						children: invite
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "emphasis",
							onClick: () => void join(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🧪" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.join") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void join(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👀" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.watch") })]
						})]
					})
				]
			}),
			started && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tray-toggle",
				"aria-pressed": tray,
				"aria-label": tray ? t("controls.hide") : t("controls.show"),
				onClick: () => {
					if (tray) setTray(false);
					else {
						setRetired([]);
						setTray(true);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👁️" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "rail",
				"aria-label": "Ingredients",
				children: tray && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngredientBar, {
					disabled: spectating,
					hidden: retired,
					onDrop: (id) => void drop(id)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "thumb",
				children: [
					!started && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "start-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "start-btn",
							onClick: () => {
								ensureLive();
								say("The cauldron is open.");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, {
								emoji: "🫧",
								className: "xe-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("start") })]
						})
					}),
					tray && showSensors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sensor-row",
						children: [
							!retired.includes("sensor:mic") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "🎤",
								label: t("sensor.mic"),
								on: kind === "mic",
								onClick: () => armSensor("mic")
							}),
							!retired.includes("sensor:camera") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "📷",
								label: t("sensor.camera"),
								on: kind === "camera",
								onClick: () => armSensor("camera")
							}),
							!retired.includes("sensor:motion") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "📱",
								label: t("sensor.motion"),
								on: kind === "motion",
								onClick: () => armSensor("motion")
							}),
							!flags.passedSensors && !retired.includes("sensor:quiet") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: () => {
									ensureLive();
									liveSensor.loudness = 0;
									liveSensor.burst = 0;
									liveSensor.wave = 0;
									impulse(.35, 1.1, .4);
									spin.damping = 4.2;
									punchColor("#6f8f78", 150);
									burstSparks("#6f8f78", 6);
									window.setTimeout(() => {
										spin.damping = 1.7;
									}, 1200);
									patchFlags({
										passedSensors: true,
										hintSensor: false
									});
									hideControl("sensor:quiet");
								},
								children: t("quiet")
							}),
							showGather && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => setSheet("gather"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👥" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("gather") })]
							}),
							kind === "camera" && !retired.includes("sensor:sample") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => {
									sensors.sampleColor();
									const hue = liveSensor.sampleHue ?? 196;
									const hex = hslToHex(hue, .8, .5);
									punchColor(hex, hue);
									burstSparks(hex, 10);
									impulse(.2, .4, 1.6);
									liveSensor.burst = 1;
									hideControl("sensor:sample");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "💧" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("sensor.sample") })]
							}),
							kind && !retired.includes("sensor:stop") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: () => {
									setKind(null);
									kindRef.current = null;
									liveSensor.loudness = 0;
									liveSensor.wave = 0;
									spin.damping = 3.2;
									window.setTimeout(() => {
										spin.damping = 1.7;
									}, 1e3);
									hideControl("sensor:stop");
								},
								children: t("sensor.stop")
							})
						]
					}),
					tray && progress.level === "master" && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDock, {
						hidden: retired,
						onLive: onTool,
						onRetire: hideControl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "legal",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "text-btn",
							"aria-pressed": muted,
							onClick: () => {
								const next = !isMuted();
								setMuted(next);
								setMutedState(next);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: muted ? "🔇" : "🎵" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: muted ? t("soundOff") : t("soundOn") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "opt",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: optIn,
								suppressHydrationWarning: true,
								onChange: (event) => {
									setOptIn(event.target.checked);
									saveOptIn(event.target.checked);
								}
							}), t("optIn")]
						})]
					}),
					tray && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "thumb-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngredientBar, {
							disabled: !started || spectating,
							hidden: retired,
							onDrop: (id) => void drop(id)
						})
					}),
					started && tray && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "pot-count",
						children: [
							drops.length,
							" ",
							t("inPot")
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: replay ? replay.title : titleFromDrops(drops) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "muted",
						children: [
							t(`vibe.${vibe}`),
							" · ",
							brew.color
						]
					}),
					replay?.remixTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "muted",
						children: [
							t("lineage"),
							" ",
							replay.remixTitle
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "drops",
						children: drops.map((dropItem, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: ingredientById(dropItem.ingredient).emoji }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ingredientById(dropItem.ingredient).label }),
							dropItem.neutral && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "neutral" }),
							showDeep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t("up"),
										onClick: () => moveDrop(index, -1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⬆️" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t("down"),
										onClick: () => moveDrop(index, 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⬇️" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											const next = drops.map((item) => item.id === dropItem.id ? {
												...item,
												neutral: !item.neutral
											} : item);
											useBrew.getState().setDrops(next);
										},
										children: dropItem.neutral ? t("unmute") : t("mute")
									})
								]
							})
						] }, dropItem.id))
					}),
					showDeep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("deep")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "row wrap",
						children: FORMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: form === item.id ? "chip on" : "chip",
							onClick: () => useBrew.getState().setForm(item.id),
							children: item.label
						}, item.id))
					})] }),
					showRecipeSave && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void saveRecipe(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📖" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("saveRecipe") })]
					}),
					members.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("who") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberList, {
						selfId: deviceRef.current,
						isHost: isHost && Boolean(roomCode),
						onKick: (id) => void roomCall({
							op: "kick",
							device: deviceRef.current,
							code: roomCode,
							target: id
						}).then((snap) => {
							if ("members" in snap) useBrew.getState().applyRoom(snap);
						}),
						onHandoff: (id) => void roomCall({
							op: "handoff",
							device: deviceRef.current,
							code: roomCode,
							target: id
						}).then((snap) => {
							if ("members" in snap) useBrew.getState().applyRoom(snap);
						})
					})] }),
					replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "emphasis",
							onClick: () => remix(replay),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "♻️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("remix") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSheet("report"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🚩" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("report") })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "wall",
				children: [
					roomCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "code",
						children: roomCode
					}), qr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "qr",
						src: qr,
						alt: ""
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ticker",
						"aria-hidden": "true",
						children: (members.length ? members : gallery.slice(0, 6).map((item) => ({
							id: item.id,
							name: item.title,
							color: "#e27a3a"
						}))).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "color" in item ? item.color : void 0 },
							children: item.name
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "gallery",
						children: gallery.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/c/$id",
							params: { id: item.id },
							search: { d: "" },
							children: item.title
						}) }, item.id))
					}),
					xr && quality && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							startAR().catch(() => setNotice("AR did not start."));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🌕" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("ar") })]
					}),
					quality && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "muted",
						children: [
							t("tier"),
							" · ",
							quality.tier,
							quality.webgpu ? " · WebGPU" : "",
							" · WebGL",
							quality.webgl2 ? "2" : ""
						]
					})
				]
			}),
			sheet === "gather" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("room.title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("room.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn",
								"aria-label": t("close"),
								onClick: () => setSheet(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("room.name"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draftName,
							maxLength: 18,
							onChange: (event) => setDraftName(event.target.value)
						})] }),
						roomCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "code",
								"aria-label": t("room.code"),
								children: roomCode
							}),
							qr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "qr",
								src: qr,
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "row wrap",
								children: [
									"stirrer",
									"singer",
									"spark",
									"seer"
								].map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: me?.seat === seat ? "chip on" : "chip",
									onClick: () => void roomCall({
										op: "seat",
										device: deviceRef.current,
										code: roomCode,
										seat
									}).then((snap) => {
										if ("members" in snap) useBrew.getState().applyRoom(snap);
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: SEAT_EMOJI[seat] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(`seat.${seat}`) })]
								}, seat))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberList, {
								selfId: deviceRef.current,
								isHost,
								onKick: (id) => void roomCall({
									op: "kick",
									device: deviceRef.current,
									code: roomCode,
									target: id
								}).then((snap) => {
									if ("members" in snap) useBrew.getState().applyRoom(snap);
								}),
								onHandoff: (id) => void roomCall({
									op: "handoff",
									device: deviceRef.current,
									code: roomCode,
									target: id
								}).then((snap) => {
									if ("members" in snap) useBrew.getState().applyRoom(snap);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [isHost && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void roomCall({
										op: "lock",
										device: deviceRef.current,
										code: roomCode,
										locked: !locked
									}).then((snap) => {
										if ("members" in snap) useBrew.getState().applyRoom(snap);
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🔒" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locked ? t("room.unlock") : t("room.lock") })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										roomCall({
											op: "leave",
											device: deviceRef.current,
											code: roomCode
										});
										useBrew.getState().clearRoom();
										setSheet(null);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🚪" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.leave") })]
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "emphasis",
								onClick: () => void openCircle(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🧪" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.open") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [t("room.code"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: joinCode,
								maxLength: 4,
								onChange: (event) => setJoinCode(event.target.value.toUpperCase())
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void join(false),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👋" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.join") })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void join(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👀" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("room.watch") })]
								})]
							})
						] })
					]
				})
			}),
			consent && hostId !== deviceRef.current && !consent.votes[deviceRef.current] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("consent.line1"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("consent.line1") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("consent.line2") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "emphasis",
								onClick: () => void roomCall({
									op: "consent-vote",
									device: deviceRef.current,
									code: roomCode,
									choice: "in"
								}).then((snap) => {
									if ("members" in snap) useBrew.getState().applyRoom(snap);
								}),
								children: t("consent.in")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void roomCall({
									op: "consent-vote",
									device: deviceRef.current,
									code: roomCode,
									choice: "out"
								}).then((snap) => {
									if ("members" in snap) useBrew.getState().applyRoom(snap);
								}),
								children: t("consent.out")
							})]
						})
					]
				})
			}),
			consent && hostId === deviceRef.current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "record-banner",
				children: t("consent.wait")
			}),
			sheet === "review" && review && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("review.title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: review.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn",
								"aria-label": t("close"),
								onClick: () => setSheet(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
							})]
						}),
						review.still && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "still",
							src: review.still,
							alt: ""
						}),
						review.spin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								t("mint.velocity"),
								" ",
								review.spin.angularVelocity,
								" · ",
								t("mint.axis"),
								" ",
								review.spin.axis.map((n) => n.toFixed(2)).join(", "),
								" · ",
								t("mint.damping"),
								" ",
								review.spin.damping,
								" ·",
								" ",
								t("mint.spins"),
								" ",
								review.spin.spinCount
							]
						}),
						review.motion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								t("mint.rotation"),
								" ",
								review.motion.rotation.map((n) => n.toFixed(2)).join(", "),
								" · ",
								t("mint.scale"),
								" ",
								review.motion.scale.toFixed(2),
								" · ",
								t("mint.spill"),
								" ",
								review.motion.spillLip,
								" · ",
								t("mint.bodyCap"),
								" ",
								review.motion.bodyCap
							]
						}),
						review.material && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								t("mint.tier"),
								" ",
								review.material.tier,
								" · ",
								t("mint.gravity"),
								" ",
								review.physics?.gravity ?? 9.8,
								" ·",
								" ",
								t("mint.bodies"),
								" ",
								review.physics?.bodies.length ?? 0,
								" · IOR ",
								review.material.ior,
								" · ",
								review.material.toneMapping
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "emphasis",
									onClick: () => void shareCreation(review),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🔗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("share") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => remix(review),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "♻️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("remix") })]
								}),
								review.still && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									download: `${review.id}.jpg`,
									href: review.still,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "⬇️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.still") })]
								}),
								loops.current.get(review.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									download: `${review.id}.webm`,
									href: URL.createObjectURL(loops.current.get(review.id)),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "▶️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.loop") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										const blob = new Blob([JSON.stringify(review, null, 2)], { type: "application/json" });
										const url = URL.createObjectURL(blob);
										const anchor = document.createElement("a");
										anchor.href = url;
										anchor.download = `${review.id}.json`;
										anchor.click();
										URL.revokeObjectURL(url);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📋" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.recipe") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										downloadGlb().then((blob) => {
											if (!blob) {
												setNotice("Could not pack a GLB.");
												return;
											}
											const url = URL.createObjectURL(blob);
											const anchor = document.createElement("a");
											anchor.href = url;
											anchor.download = `${review.id}.glb`;
											anchor.click();
											URL.revokeObjectURL(url);
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "💎" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.glb") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSheet("mint"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✨" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.mint") })]
								})
							]
						})
					]
				})
			}),
			sheet === "mint" && review && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("mint.title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("mint.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn",
								"aria-label": t("close"),
								onClick: () => setSheet("review"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "✖️" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mint.body") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								CHAIN.name,
								" · ",
								CHAIN.id
							]
						}),
						wallet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "muted",
							children: [
								wallet.address.slice(0, 6),
								"…",
								wallet.address.slice(-4),
								" · ",
								wallet.balanceEth,
								" ETH · chain ",
								wallet.chainId
							]
						}),
						!walletAvailable() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mint.noWallet") }),
						walletAvailable() && !wallet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "emphasis",
							onClick: () => {
								connectWallet().then(setWallet).catch((error) => setNotice(error instanceof Error ? error.message : t("mint.noWallet")));
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🔗" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("mint.connect") })]
						}),
						!CHAIN.contract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("mint.noContract") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								(async () => {
									const blob = loops.current.get(review.id);
									let animationUrl = `${window.location.origin}/c/${review.id}`;
									if (blob) animationUrl = await blobToDataUrl(blob);
									else if (review.spin) animationUrl = `${window.location.origin}/c/${review.id}?d=${encodeCreation(review)}`;
									const meta = brewMetadata({
										title: review.title,
										animationUrl,
										image: review.still,
										spin: review.spin ?? null,
										vibe: review.vibe,
										chainId: CHAIN.id,
										royaltyBps: CHAIN.royaltyBps,
										physics: review.physics ?? null,
										material: review.material ?? null,
										motion: review.motion ?? null
									});
									const file = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" });
									const url = URL.createObjectURL(file);
									const anchor = document.createElement("a");
									anchor.href = url;
									anchor.download = `${review.id}-metadata.json`;
									anchor.click();
									URL.revokeObjectURL(url);
								})();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📋" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("mint.meta") })]
						}),
						CHAIN.contract && wallet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "emphasis",
							onClick: () => {
								roomCall({
									op: "mint-touch",
									device: deviceRef.current,
									creationId: review.id
								}).then(() => mintWithWallet(wallet.address, `${window.location.origin}/c/${review.id}`)).then((hash) => {
									trackLocal("mint");
									grant("mint");
									saveMint({
										hash,
										uri: `${window.location.origin}/c/${review.id}`,
										at: Date.now()
									});
									setNotice(`${t("mint.sent")} ${hash.slice(0, 10)}`);
								}).catch((error) => setNotice(error instanceof Error ? error.message : t("mint.cap")));
							},
							children: t("review.mint")
						})
					]
				})
			}),
			sheet === "level" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelSheet, {
				progress,
				onClose: () => setSheet(null),
				onWallet: () => setSheet("wallet"),
				onBoard: () => setSheet("board"),
				onTools: () => {
					setRetired((list) => list.filter((id) => !id.startsWith("tool:")));
					setTray(true);
					setSheet(null);
				}
			}),
			sheet === "wallet" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletSheet, {
				wallet,
				onWallet: setWallet,
				onClose: () => setSheet(null),
				onNotice: setNotice
			}),
			sheet === "board" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardSheet, {
				rows: boardRows,
				handle: boardPrefs.handle,
				optIn: boardPrefs.optIn && !boardPrefs.hidden,
				onHandle: (value) => {
					const next = {
						...boardPrefs,
						handle: value
					};
					setBoardPrefs(next);
					saveBoardPrefs(next);
				},
				onOptIn: () => {
					const handle = cleanHandle(boardPrefs.handle);
					if (!handle) {
						setNotice(t("board.need"));
						return;
					}
					const next = {
						optIn: true,
						handle,
						hidden: false
					};
					setBoardPrefs(next);
					saveBoardPrefs(next);
				},
				onHide: () => {
					const next = {
						...boardPrefs,
						optIn: false,
						hidden: true
					};
					setBoardPrefs(next);
					saveBoardPrefs(next);
					setBoardRows([]);
					roomCall({
						op: "board-hide",
						device: deviceRef.current
					}).catch(() => void 0);
				},
				onClose: () => setSheet(null)
			}),
			sheet === "report" && replay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "sheet",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("report"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "row",
						children: [
							"spam",
							"unsafe",
							"other"
						].map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								roomCall({
									op: "report",
									creationId: replay.id,
									reason
								}).then(() => {
									setNotice(t("reportSent"));
									setSheet(null);
								});
							},
							children: t(`reason.${reason}`)
						}, reason))
					})
				})
			})
		]
	});
	function moveDrop(index, delta) {
		const next = [...useBrew.getState().drops];
		const target = index + delta;
		if (target < 0 || target >= next.length) return;
		const [item] = next.splice(index, 1);
		next.splice(target, 0, item);
		useBrew.getState().setDrops(next);
	}
}
function IngredientBar({ disabled, hidden, onDrop }) {
	const items = INGREDIENTS.filter((item) => !hidden.includes(`ing:${item.id}`));
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ings",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "ing",
			disabled,
			onClick: () => onDrop(item.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: item.emoji }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
		}, item.id))
	});
}
function SensorButton({ emoji, label, on, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: on ? "chip on" : "chip",
		"aria-pressed": on,
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function blobToDataUrl(blob) {
	return blob.arrayBuffer().then((buffer) => {
		const bytes = new Uint8Array(buffer);
		let bin = "";
		const size = 32768;
		for (let i = 0; i < bytes.length; i += size) bin += String.fromCharCode(...bytes.subarray(i, i + size));
		return `data:${blob.type || "video/webm"};base64,${btoa(bin)}`;
	});
}
function MemberList({ selfId, isHost, onKick, onHandoff }) {
	const members = useBrew((s) => s.members);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "members",
		children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: member.color } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: member.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: member.role === "host" ? "Host" : member.role === "spectator" ? "Watching" : t(`seat.${member.seat}`) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "meters",
				"aria-hidden": "true",
				children: [
					member.mic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🎤" }),
					member.camera && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📷" }),
					member.motion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "📱" })
				]
			}),
			isHost && member.id !== selfId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onKick(member.id),
					children: t("room.kick")
				}), member.role !== "spectator" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onHandoff(member.id),
					children: t("room.handoff")
				})]
			})
		] }, member.id))
	});
}
function loadReplay(id, payload) {
	if (payload) return decodeCreation(payload);
	return creationById(id);
}
function PageFrame({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "conjure page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "topbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				search: {
					room: "",
					watch: false,
					debug: 0
				},
				className: "brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🪄" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("app.title") })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "prose",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: {
						room: "",
						watch: false,
						debug: 0
					},
					children: t("back")
				}) })
			]
		})]
	});
}
//#endregion
export { sloshGrid as A, punchStrength as C, setExportGlb as D, setEnterAR as E, stepTumble as F, t as I, toolTouch as L, spinFrames as M, spinSnapshot as N, setGrabStill as O, stepBrewPhysics as P, tumble as R, punch as S, remoteSensor as T, localGravity as _, computeBrew as a, poseNow as b, flingVel as c, frameMode as d, hslToHex as f, loadReplay as g, liveSensor as h, blendSensors as i, spin as j, setRayView as k, frameFor as l, liveBodies as m, PageFrame as n, decaySensor as o, ingredientById as p, SLOSH_AMP as r, effectsFor as s, ConjureApp as t, frameMargin as u, masterMix as v, rememberedMotion as w, publishFrameDebug as x, physicsSnapshot as y, viewportForFrame as z };
