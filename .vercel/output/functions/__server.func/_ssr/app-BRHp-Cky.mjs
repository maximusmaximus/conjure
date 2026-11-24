import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime, P as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as resolveVotes, r as cleanName } from "./router-CoYPdMwM.mjs";
import { t as require_xeroemoji } from "../_libs/xeroemoji.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BRHp-Cky.js
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
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function hslToHex(h, s, l) {
	const hue = (h % 360 + 360) % 360;
	const sat = clamp(s, 0, 1);
	const lig = clamp(l, 0, 1);
	const a = sat * Math.min(lig, 1 - lig);
	const f = (n) => {
		const k = (n + hue / 30) % 12;
		const c = lig - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * clamp(c, 0, 1)).toString(16).padStart(2, "0");
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
		loudness: clamp(list.reduce((sum, item) => sum + item.loudness, 0) / n, 0, 1),
		pitch: clamp(list.reduce((sum, item) => sum + item.pitch, 0) / n, 0, 1),
		burst: clamp(Math.max(...list.map((s) => s.burst)), 0, 1),
		tiltX: clamp(list.reduce((sum, item) => sum + item.tiltX, 0) / n, -1, 1),
		tiltY: clamp(list.reduce((sum, item) => sum + item.tiltY, 0) / n, -1, 1),
		shake: clamp(Math.max(...list.map((s) => s.shake)), 0, 1),
		sampleHue: hues.length ? mixHue(hues) : null,
		wave: clamp(Math.max(...list.map((s) => s.wave)), 0, 1)
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
	const energy = clamp(.28 + energySum * .16 + loud * .85 + sensor.burst * .45 + sensor.shake * bias.shake * .35, .2, 1.85);
	const spikes = clamp(spikeAvg + sensor.burst * .35 + (vibe === "spooky" ? .08 : 0), 0, 1.25);
	const scale = clamp(.74 + Math.min(drops.filter((d) => !d.neutral).length, 8) * .055 + loud * .42 + sensor.burst * .18, .62, 1.85);
	const swirl = clamp(Math.hypot(sensor.tiltX, sensor.tiltY) * 1.5 + sensor.wave * 1.1 + (vibe === "calm" ? .22 : .55), 0, 2.6);
	const sat = clamp(bias.sat + (drops.length ? .16 : 0) + loud * .15, .18, .92);
	const light = clamp(bias.light + sensor.burst * .06, .2, .62);
	return {
		hue,
		saturation: sat,
		lightness: light,
		energy,
		spikes,
		scale,
		swirl,
		glow: clamp(.32 + energy * .38 + sensor.burst * .28, 0, 1.7),
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
	const selector = "0x40c10f19";
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
		const draw = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.clientWidth || 320;
			const height = canvas.clientHeight || 480;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "#110e0c";
			ctx.fillRect(0, 0, width, height);
			const brew = computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
			time += reduced ? .004 : .016;
			const cx = width / 2;
			const cy = height * .58;
			const radius = Math.min(width, height) * .22 * brew.scale;
			const glow = ctx.createRadialGradient(cx, cy - radius, radius * .2, cx, cy - radius, radius * 1.8);
			glow.addColorStop(0, brew.color);
			glow.addColorStop(1, "rgba(17,14,12,0)");
			ctx.fillStyle = glow;
			ctx.beginPath();
			ctx.arc(cx, cy - radius * .9, radius * 1.6, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = brew.color;
			ctx.beginPath();
			const wobble = reduced ? 0 : Math.sin(time * (2 + brew.swirl)) * 8 * brew.spikes;
			ctx.ellipse(cx, cy - radius * 1.15, radius * .72 + wobble, radius * .85, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#3a2c24";
			ctx.beginPath();
			ctx.ellipse(cx, cy, radius * 1.15, radius * .42, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = brew.color;
			ctx.globalAlpha = .9;
			ctx.beginPath();
			ctx.ellipse(cx, cy - radius * .18, radius * .82, radius * .22, 0, 0, Math.PI * 2);
			ctx.fill();
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
		webgl2
	};
	if (tier === "high") return {
		tier,
		dpr: [1, 1.75],
		particles: 420,
		detail: 5,
		webgpu,
		webgl2
	};
	return {
		tier,
		dpr: [1, 1.4],
		particles: 180,
		detail: 3,
		webgpu,
		webgl2
	};
}
async function probeQuality() {
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
	return qualityFromTier(tierFrom({
		webgpu,
		cores: navigator.hardwareConcurrency || 4,
		memory: nav.deviceMemory ?? 0,
		saveData: Boolean(nav.connection?.saveData)
	}), webgpu, webgl2);
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
		"sent": "Mint submitted."
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
	who: "Who is here"
};
function t(path) {
	let cur = en_default;
	for (const part of path.split(".")) {
		if (!cur || typeof cur !== "object" || !(part in cur)) return path;
		cur = cur[part];
	}
	return typeof cur === "string" ? cur : path;
}
var CauldronScene = (0, import_react.lazy)(() => import("./scene-Cxy5adLA.mjs").then((mod) => ({ default: mod.CauldronScene })));
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
function ConjureApp({ invite = "", watch = false, replay = null }) {
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
	const deviceRef = (0, import_react.useRef)("d_pending00");
	const loops = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const dragging = (0, import_react.useRef)(false);
	const sensors = useSensors(kind, (message) => {
		setKind(null);
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
				setReview(null);
			} catch {}
		}
		const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const applyReduced = () => setReduced(reducedQuery.matches);
		applyReduced();
		reducedQuery.addEventListener("change", applyReduced);
		probeQuality().then((next) => {
			setQuality(next);
			if (!next.webgl2) setGraphics("flat");
		});
		const nav = navigator;
		if (nav.xr) nav.xr.isSessionSupported("immersive-ar").then(setXr).catch(() => setXr(false));
		return () => reducedQuery.removeEventListener("change", applyReduced);
	}, []);
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
		const source = replay.drops;
		if (!source.length) {
			useBrew.getState().setDrops([]);
			return;
		}
		const start = Math.min(...source.map((drop) => drop.at));
		const span = Math.max(1, Math.max(...source.map((drop) => drop.at)) - start);
		let frame = 0;
		const begun = performance.now();
		const loop = (now) => {
			const cycle = (now - begun) % 6e3 / 6e3;
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
			if (event.key === "ArrowLeft") liveSensor.tiltX = Math.max(-1, liveSensor.tiltX - .2);
			if (event.key === "ArrowRight") liveSensor.tiltX = Math.min(1, liveSensor.tiltX + .2);
			if (event.key === "ArrowUp") liveSensor.tiltY = Math.max(-1, liveSensor.tiltY - .2);
			if (event.key === "ArrowDown") liveSensor.tiltY = Math.min(1, liveSensor.tiltY + .2);
			if (event.key === " ") {
				event.preventDefault();
				liveSensor.burst = 1;
				liveSensor.shake = 1;
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
	function say(message) {
		setLiveMsg("");
		setTimeout(() => setLiveMsg(message), 20);
	}
	async function drop(id) {
		if (!useBrew.getState().started || spectating) return;
		unlockAudio();
		const ing = ingredientById(id);
		pluck(ing.hue, ing.energy);
		const made = useBrew.getState().addDrop(id, deviceRef.current);
		patchFlags({
			usedIngredient: true,
			hintDrop: false
		});
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
		for (let second = 6; second > 0; second -= 1) {
			useBrew.getState().setRecording(second);
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
			still: takeStill() ?? void 0
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
			createdAt: Date.now()
		});
		setGallery(loadCreations());
		patchFlags({ savedRecipe: true });
		setNotice(t("saved"));
	}
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sr-only",
				"aria-live": "polite",
				children: liveMsg
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stage",
				onPointerDown: () => {
					dragging.current = true;
				},
				onPointerUp: () => {
					dragging.current = false;
				},
				onPointerLeave: () => {
					dragging.current = false;
				},
				onPointerMove: (event) => {
					if (!dragging.current || !started) return;
					liveSensor.tiltX = Math.max(-1, Math.min(1, liveSensor.tiltX + event.movementX / 180));
					liveSensor.tiltY = Math.max(-1, Math.min(1, liveSensor.tiltY + event.movementY / 180));
				},
				children: graphics === "flat" || !quality ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatBrew, {
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
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: {
						room: "",
						watch: false
					},
					className: "brand",
					"aria-label": t("app.title"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "🪄" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("app.title") })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "top-actions",
					children: [
						started && !replay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "chip",
							onClick: () => {
								if (roomCode && hostId !== deviceRef.current) return;
								const next = VIBES$1[(VIBES$1.indexOf(vibe) + 1) % VIBES$1.length];
								useBrew.getState().setVibe(next);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "rail",
				"aria-label": "Ingredients",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngredientBar, {
					disabled: !started || spectating,
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
								unlockAudio();
								useBrew.getState().start();
								say("The cauldron is open.");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, {
								emoji: "🫧",
								className: "xe-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("start") })]
						})
					}),
					showSensors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sensor-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "🎤",
								label: t("sensor.mic"),
								on: kind === "mic",
								onClick: () => setSheet("mic")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "📷",
								label: t("sensor.camera"),
								on: kind === "camera",
								onClick: () => setSheet("cam")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SensorButton, {
								emoji: "📱",
								label: t("sensor.motion"),
								on: kind === "motion",
								onClick: () => setSheet("motion")
							}),
							!flags.passedSensors && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: () => patchFlags({
									passedSensors: true,
									hintSensor: false
								}),
								children: t("quiet")
							}),
							showGather && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => setSheet("gather"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "👥" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("gather") })]
							}),
							kind === "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => sensors.sampleColor(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, { emoji: "💧" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("sensor.sample") })]
							}),
							kind && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip",
								onClick: () => setKind(null),
								children: t("sensor.stop")
							})
						]
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
								onChange: (event) => {
									setOptIn(event.target.checked);
									saveOptIn(event.target.checked);
								}
							}), t("optIn")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "thumb-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IngredientBar, {
							disabled: !started || spectating,
							onDrop: (id) => void drop(id)
						})
					}),
					started && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
			sheet === "mic" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionSheet, {
				emoji: "🎤",
				line1: t("mic.line1"),
				line2: t("mic.line2"),
				go: t("mic.go"),
				onGo: () => {
					setKind("mic");
					setSheet(null);
					patchFlags({
						passedSensors: true,
						hintSensor: false
					});
				},
				onClose: () => setSheet(null)
			}),
			sheet === "cam" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionSheet, {
				emoji: "📷",
				line1: t("cam.line1"),
				line2: t("cam.line2"),
				go: t("cam.go"),
				onGo: () => {
					setKind("camera");
					setSheet(null);
					patchFlags({
						passedSensors: true,
						hintSensor: false
					});
				},
				onClose: () => setSheet(null)
			}),
			sheet === "motion" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionSheet, {
				emoji: "📱",
				line1: t("motion.line1"),
				line2: t("motion.line2"),
				go: t("motion.go"),
				onGo: () => {
					setKind("motion");
					setSheet(null);
					patchFlags({
						passedSensors: true,
						hintSensor: false
					});
				},
				onClose: () => setSheet(null)
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
								const meta = {
									name: review.title,
									description: "A Conjure brew.",
									vibe: review.vibe,
									contributors: review.contributors,
									chainId: CHAIN.id,
									royaltyBps: CHAIN.royaltyBps
								};
								const blob = new Blob([JSON.stringify(meta, null, 2)], { type: "application/json" });
								const url = URL.createObjectURL(blob);
								const anchor = document.createElement("a");
								anchor.href = url;
								anchor.download = `${review.id}-metadata.json`;
								anchor.click();
								URL.revokeObjectURL(url);
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
									setNotice(`${t("mint.sent")} ${hash.slice(0, 10)}`);
								}).catch((error) => setNotice(error instanceof Error ? error.message : t("mint.cap")));
							},
							children: t("review.mint")
						})
					]
				})
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
function IngredientBar({ disabled, onDrop }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ings",
		children: INGREDIENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
function PermissionSheet({ emoji, line1, line2, go, onGo, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "sheet",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": line1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XeIcon, {
					emoji,
					className: "xe-lg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line1 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line2 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "emphasis",
						onClick: onGo,
						children: go
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						children: t("close")
					})]
				})
			]
		})
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
					watch: false
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
						watch: false
					},
					children: t("back")
				}) })
			]
		})]
	});
}
//#endregion
export { decaySensor as a, remoteSensor as c, setGrabStill as d, t as f, computeBrew as i, setEnterAR as l, PageFrame as n, liveSensor as o, blendSensors as r, loadReplay as s, ConjureApp as t, setExportGlb as u };
