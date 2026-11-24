import { o as __toESM } from "../_runtime.mjs";
import { B as PerspectiveCamera, K as RGBAFormat, O as Matrix4, R as Object3D, U as Quaternion, W as QuaternionKeyframeTrack, Y as SRGBColorSpace, _ as Euler, a as useFrame, c as AnimationClip, f as CanvasTexture, g as DataTexture, i as Canvas, m as Color, n as AdaptiveDpr, nt as Vector3, o as useThree, ot as require_jsx_runtime, p as ClampToEdgeWrapping, q as Raycaster, r as ContactShadows, s as PMREMGenerator, st as require_react, t as PerformanceMonitor, tt as Vector2, w as LinearFilter } from "../_libs/@react-three/drei+[...].mjs";
import { C as setGrabStill, D as spinFrames, E as spin, O as spinSnapshot, S as setExportGlb, T as sloshGrid, _ as punch, a as computeBrew, b as remoteSensor, c as flingVel, d as liveBodies, f as liveSensor, g as physicsSnapshot, h as masterMix, i as blendSensors, j as toolTouch, k as stepBrewPhysics, l as hslToHex, m as localGravity, o as decaySensor, r as SLOSH_AMP, s as effectsFor, u as ingredientById, v as punchStrength, w as setRayView, x as setEnterAR, y as rememberedMotion } from "./app-wwd7ACR1.mjs";
import { a as RenderPass, i as UnrealBloomPass, n as RoomEnvironment, o as EffectComposer, r as BokehPass } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-nwoVXmFv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DESKTOP_FRAME = {
	position: [
		0,
		2.55,
		4.05
	],
	lookAt: [
		0,
		.95,
		0
	],
	fov: 34
};
function isPhonePortrait(width, height) {
	return width >= 280 && width <= 430 && height > width;
}
function clamp01(n) {
	return Math.max(0, Math.min(1, n));
}
/** Aspect-responsive frame. Recomputed by the scene on resize and orientation change. */
function frameFor(width, height) {
	if (!isPhonePortrait(width, height)) return {
		position: [
			DESKTOP_FRAME.position[0],
			DESKTOP_FRAME.position[1],
			DESKTOP_FRAME.position[2]
		],
		lookAt: [
			DESKTOP_FRAME.lookAt[0],
			DESKTOP_FRAME.lookAt[1],
			DESKTOP_FRAME.lookAt[2]
		],
		fov: DESKTOP_FRAME.fov
	};
	const short = clamp01((width / Math.max(height, 1) - .42) / .18);
	const tall = 1 - short;
	const narrow = clamp01((430 - width) / 150);
	return {
		position: [
			0,
			1.92 + short * .38 + tall * .12,
			6.35 + tall * 1.15 + short * .45 + narrow * .28
		],
		lookAt: [
			0,
			.38 - short * .1,
			0
		],
		fov: 52 + tall * 12 + narrow * 2
	};
}
/** CSS pixels the live view should trust.
* A canvas or parent wider than the window must not keep the desktop camera. */
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
		height: heights.length ? Math.min(...heights) : 800
	};
}
var potPoints = (() => {
	const pts = [];
	for (let i = 0; i <= 24; i += 1) {
		const t = i / 24;
		const y = t * 1.05;
		const r = .28 + Math.sin(t * Math.PI) * .72 + (t > .82 ? (t - .82) * .9 : 0);
		pts.push(new Vector2(Math.max(.16, r), y));
	}
	return pts;
})();
function mixNow(drops, vibe) {
	return computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
}
function Rig({ drops, vibe, form, reduced, particles, detail, fx }) {
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		if (!reduced && !masterMix.freeze) decaySensor(liveSensor, dt);
		else {
			liveSensor.burst = 0;
			liveSensor.shake = 0;
			liveSensor.wave *= .9;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrewMesh, {
		drops,
		vibe,
		form,
		reduced,
		particles,
		detail,
		fx
	});
}
function BrewMesh({ drops, vibe, form, reduced, particles, detail, fx }) {
	const liquid = (0, import_react.useRef)(null);
	const potion = (0, import_react.useRef)(null);
	(0, import_react.useRef)(null);
	const orb = (0, import_react.useRef)(null);
	const pot = (0, import_react.useRef)(null);
	const brewGroup = (0, import_react.useRef)(null);
	const glow = (0, import_react.useRef)(null);
	const flash = (0, import_react.useRef)(new Color("#e27a3a"));
	const formRef = form;
	const { camera, gl } = useThree();
	const sloshTex = (0, import_react.useMemo)(() => {
		const size = 32;
		const data = /* @__PURE__ */ new Uint8Array(4096);
		data.fill(128);
		const tex = new DataTexture(data, size, size, RGBAFormat);
		tex.colorSpace = "";
		tex.wrapS = ClampToEdgeWrapping;
		tex.wrapT = ClampToEdgeWrapping;
		tex.magFilter = LinearFilter;
		tex.minFilter = LinearFilter;
		tex.needsUpdate = true;
		return tex;
	}, []);
	const liquidUniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uColor: { value: new Color("#c46a32") },
		uEnergy: { value: .4 },
		uSlosh: { value: sloshTex }
	}), [sloshTex]);
	const compilePotion = (0, import_react.useCallback)((shader) => {
		shader.uniforms.uSlosh = liquidUniforms.uSlosh;
		shader.uniforms.uTime = liquidUniforms.uTime;
		shader.vertexShader = shader.vertexShader.replace("#include <uv_pars_vertex>", "#include <uv_pars_vertex>\nuniform sampler2D uSlosh;\nuniform float uTime;\nvarying vec2 vRingUv;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvRingUv = uv;\nfloat sloshH = texture2D(uSlosh, uv).r * 2.0 - 1.0;\nfloat rr = length(uv - 0.5);\nfloat rings = sin(rr * 34.0 - uTime * 5.6);\ntransformed.z += clamp(sloshH * 0.55 + rings * 0.28, -0.2, 0.5);");
		shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nuniform float uTime;\nvarying vec2 vRingUv;").replace("#include <opaque_fragment>", "#include <opaque_fragment>\nfloat rr = length(vRingUv - 0.5);\nfloat ring = pow(sin(rr * 34.0 - uTime * 5.6) * 0.5 + 0.5, 2.0);\ngl_FragColor.rgb += vec3(1.0, 0.94, 0.78) * ring * 0.85;");
	}, [liquidUniforms]);
	const skinUniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uColor: { value: new Color("#e27a3a") },
		uSpikes: { value: .3 },
		uGlow: { value: .5 }
	}), []);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		const brew = mixNow(drops, vibe);
		const stir = toolTouch.stir ? masterMix.stir : .12;
		const swirl = toolTouch.swirl ? masterMix.swirl : .15;
		const bloom = toolTouch.bloom ? masterMix.bloom : .28;
		const speed = masterMix.freeze ? 0 : reduced ? .12 : .3 + stir * 3.6;
		liquidUniforms.uTime.value += dt * speed;
		skinUniforms.uTime.value += dt * speed;
		const last = [...drops].reverse().find((drop) => !drop.neutral);
		const shift = toolTouch.hue ? masterMix.hue : 0;
		const baseHue = ((last ? ingredientById(last.ingredient).hue : brew.hue) + shift + 360) % 360;
		const baseHex = hslToHex(baseHue, last ? .82 : Math.max(brew.saturation, .55), last ? .52 : Math.max(brew.lightness, .42));
		liquidUniforms.uColor.value.set(baseHex);
		skinUniforms.uColor.value.set(baseHex);
		const flashT = punchStrength();
		if (flashT > 0) {
			flash.current.set(punch.hex);
			liquidUniforms.uColor.value.lerp(flash.current, flashT);
			skinUniforms.uColor.value.lerp(flash.current, flashT);
		}
		liquidUniforms.uEnergy.value = brew.energy * (masterMix.freeze ? .2 : .6 + stir);
		skinUniforms.uSpikes.value = brew.spikes * (.4 + swirl * 1.4);
		skinUniforms.uGlow.value = brew.glow * (.35 + bloom * 1.8);
		if (orb.current) {
			const bloomMul = toolTouch.bloom ? .5 + masterMix.bloom * 1.7 : .7 + bloom * .95;
			const s = brew.scale * (1 + liveSensor.burst * .55) * bloomMul;
			orb.current.scale.setScalar(masterMix.freeze ? s * .92 : s);
			const bob = Math.sin(skinUniforms.uTime.value * (1.2 + stir * 3)) * (reduced || masterMix.freeze ? .01 : .08 + stir * .05);
			orb.current.position.set(masterMix.freeze ? 0 : flingVel.x * .55, 1.62 + bob, masterMix.freeze ? 0 : flingVel.y * .32);
		}
		const leanX = masterMix.freeze ? 0 : liveSensor.tiltY * .7 + remoteSensor.tiltY * .2;
		const leanZ = masterMix.freeze ? 0 : liveSensor.tiltX * .7 + remoteSensor.tiltX * .2;
		if (glow.current) {
			glow.current.color.copy(liquidUniforms.uColor.value);
			glow.current.intensity = masterMix.freeze ? 3 : 7 + flashT * 20;
		}
		if (brewGroup.current) {
			brewGroup.current.position.set(0, 0, 0);
			brewGroup.current.rotation.set(spin.x + leanX, spin.y, spin.z + leanZ);
		}
		if (pot.current) {
			pot.current.position.set(0, 0, 0);
			if (!masterMix.freeze) {
				pot.current.rotation.y = spin.y;
				pot.current.rotation.z = Math.sin(spin.z) * .12 + leanZ * .25;
			}
		}
		stepBrewPhysics(dt, {
			gravity: localGravity(spin.x + leanX, spin.y, spin.z + leanZ),
			tiltX: reduced ? leanX * .25 : leanX,
			tiltZ: reduced ? leanZ * .25 : leanZ,
			shake: reduced || masterMix.freeze ? 0 : liveSensor.shake
		});
		const grid = sloshGrid();
		const data = sloshTex.image.data;
		const size = sloshTex.image.width;
		const n = grid.n;
		for (let y = 0; y < size; y += 1) {
			const gy = Math.min(n - 1, y * n / size) | 0;
			for (let x = 0; x < size; x += 1) {
				const gx = Math.min(n - 1, x * n / size) | 0;
				const h = grid.h[gy * n + gx] ?? 0;
				const byte = Math.max(0, Math.min(255, Math.round((h / SLOSH_AMP + 1) * .5 * 255)));
				const i = (y * size + x) * 4;
				data[i] = byte;
				data[i + 1] = byte;
				data[i + 2] = byte;
				data[i + 3] = 255;
			}
		}
		sloshTex.needsUpdate = true;
		if (potion.current) {
			potion.current.color.copy(liquidUniforms.uColor.value);
			potion.current.emissive.copy(liquidUniforms.uColor.value);
			potion.current.emissiveIntensity = fx.emissiveIntensity * (.22 + liquidUniforms.uEnergy.value);
		}
	});
	(0, import_react.useEffect)(() => {
		const raycaster = new Raycaster();
		const ndc = new Vector2();
		const inv = new Matrix4();
		const origin = new Vector3();
		const dir = new Vector3();
		setRayView((x, y) => {
			const group = brewGroup.current;
			const rect = gl.domElement.getBoundingClientRect();
			if (!group || rect.width < 1 || rect.height < 1) return null;
			ndc.x = (x - rect.left) / rect.width * 2 - 1;
			ndc.y = -((y - rect.top) / rect.height) * 2 + 1;
			raycaster.setFromCamera(ndc, camera);
			group.updateWorldMatrix(true, false);
			inv.copy(group.matrixWorld).invert();
			origin.copy(raycaster.ray.origin).applyMatrix4(inv);
			dir.copy(raycaster.ray.direction).transformDirection(inv).normalize();
			return {
				origin: [
					origin.x,
					origin.y,
					origin.z
				],
				dir: [
					dir.x,
					dir.y,
					dir.z
				]
			};
		});
		return () => setRayView(null);
	}, [camera, gl]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: glow,
			position: [
				0,
				1.7,
				.6
			],
			intensity: 16,
			distance: 9
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: pot,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.02,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.35, 40] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3a2e28",
						roughness: 1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					castShadow: fx.shadows,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("latheGeometry", { args: [potPoints, detail >= 5 ? 64 : 40] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#6b4c38",
						roughness: .72,
						metalness: .18
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.02,
						0
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					castShadow: fx.shadows,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.98,
						.055,
						12,
						40
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#c49255",
						roughness: .32,
						metalness: .64
					})]
				}),
				[
					0,
					2,
					4
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						Math.cos(k / 6 * Math.PI * 2) * .62,
						.16,
						Math.sin(k / 6 * Math.PI * 2) * .62
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.06,
						.08,
						.32,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#241910",
						roughness: .9
					})]
				}, k))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			name: "brew",
			ref: brewGroup,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.8,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					renderOrder: 2,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.78, 64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
						ref: liquid,
						transparent: true,
						depthWrite: false,
						uniforms: liquidUniforms,
						vertexShader: liquidVert,
						fragmentShader: liquidFrag
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceRings, {}),
				fx.transmission > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.74,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					renderOrder: 1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.76, 64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
						ref: potion,
						color: "#c46a32",
						transmission: fx.transmission,
						thickness: fx.thickness,
						ior: fx.ior,
						iridescence: fx.iridescence,
						iridescenceIOR: 1.3,
						clearcoat: fx.clearcoat,
						sheen: fx.sheen,
						sheenColor: "#fff1df",
						roughness: .04,
						metalness: 0,
						emissive: "#c46a32",
						emissiveIntensity: fx.emissiveIntensity * .55,
						transparent: true,
						opacity: .42,
						depthWrite: false,
						attenuationColor: "#e27a3a",
						attenuationDistance: .35,
						onBeforeCompile: compilePotion
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					ref: orb,
					position: [
						0,
						1.62,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMesh, {
						form: formRef,
						uniforms: skinUniforms,
						detail
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Embers, {
					drops,
					vibe,
					count: particles
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Falls, { drops }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhysVis, { fx }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ladle, {})
			]
		})
	] });
}
function Skin({ uniforms }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		uniforms,
		vertexShader: skinVert,
		fragmentShader: skinFrag
	});
}
function FormMesh({ form, uniforms, detail }) {
	const fine = detail >= 5;
	if (form === "spire") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
		.48,
		1.35,
		fine ? 12 : 5
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
	if (form === "bloom") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: fine ? [
		.34,
		40,
		28
	] : [
		.34,
		24,
		16
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] }), [
		0,
		1,
		2,
		3,
		4
	].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			Math.cos(i / 5 * Math.PI * 2) * .42,
			.05,
			Math.sin(i / 5 * Math.PI * 2) * .42
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: fine ? [
			.22,
			24,
			16
		] : [
			.22,
			16,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })]
	}, i))] });
	if (form === "ribbon") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusKnotGeometry", { args: fine ? [
		.38,
		.12,
		160,
		12
	] : [
		.38,
		.12,
		80,
		8
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.62, fine ? 5 : Math.min(4, Math.max(2, detail))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
}
function emberSprite() {
	const canvas = document.createElement("canvas");
	canvas.width = 32;
	canvas.height = 32;
	const ctx = canvas.getContext("2d");
	if (ctx) {
		const glow = ctx.createRadialGradient(16, 16, 1, 16, 16, 16);
		glow.addColorStop(0, "rgba(255,255,255,1)");
		glow.addColorStop(.4, "rgba(255,255,255,0.7)");
		glow.addColorStop(1, "rgba(255,255,255,0)");
		ctx.fillStyle = glow;
		ctx.fillRect(0, 0, 32, 32);
	}
	const tex = new CanvasTexture(canvas);
	tex.needsUpdate = true;
	return tex;
}
function Embers({ drops, vibe, count }) {
	const ref = (0, import_react.useRef)(null);
	const sprite = (0, import_react.useMemo)(() => emberSprite(), []);
	const countUsed = Math.max(12, Math.min(count, 800));
	const positions = (0, import_react.useMemo)(() => {
		const arr = new Float32Array(countUsed * 3);
		for (let i = 0; i < countUsed; i += 1) {
			arr[i * 3] = (Math.random() - .5) * 1.4;
			arr[i * 3 + 1] = Math.random() * 2.4;
			arr[i * 3 + 2] = (Math.random() - .5) * 1.4;
		}
		return arr;
	}, [countUsed]);
	const speeds = (0, import_react.useMemo)(() => {
		const arr = new Float32Array(countUsed);
		for (let i = 0; i < countUsed; i += 1) arr[i] = .15 + Math.random() * .45;
		return arr;
	}, [countUsed]);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		const brew = mixNow(drops, vibe);
		const attr = (ref.current?.geometry)?.getAttribute("position");
		if (!attr) return;
		const kickX = masterMix.freeze ? 0 : flingVel.x * 36;
		const kickZ = masterMix.freeze ? 0 : flingVel.y * 22;
		for (let i = 0; i < countUsed; i += 1) {
			if (masterMix.freeze) break;
			let y = attr.getY(i) + dt * speeds[i] * (.6 + brew.energy) * (.65 + masterMix.stir);
			if (y > 2.6) y = .6;
			const spread = (.15 + brew.spikes * .2) * (.6 + masterMix.swirl);
			let x = attr.getX(i) + Math.sin(y * 3 + i) * dt * spread + kickX * dt;
			let z = attr.getZ(i) + kickZ * dt;
			if (x > 1.8 || x < -1.8) x = (Math.random() - .5) * 1.2;
			if (z > 1.8 || z < -1.8) z = (Math.random() - .5) * 1.2;
			attr.setX(i, x);
			attr.setY(i, y);
			attr.setZ(i, z);
		}
		attr.needsUpdate = true;
		if (ref.current) {
			const last = [...drops].reverse().find((drop) => !drop.neutral);
			ref.current.material.color.set(last ? hslToHex(ingredientById(last.ingredient).hue, .85, .55) : brew.color);
			const bloom = toolTouch.bloom ? masterMix.bloom : .28;
			ref.current.material.size = (.06 + brew.glow * .05) * (.35 + bloom * 2.2);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#e27a3a",
			size: .08,
			map: sprite,
			transparent: true,
			opacity: .9,
			depthWrite: false,
			blending: 2,
			sizeAttenuation: true
		})]
	});
}
function Falls({ drops }) {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const tint = (0, import_react.useMemo)(() => new Color(), []);
	useFrame(() => {
		const mesh = ref.current;
		if (!mesh) return;
		const now = Date.now();
		let shown = 0;
		for (const drop of drops) {
			const age = (now - drop.at) / 1e3;
			if (age < 0 || age > 1.8 || shown >= 8) continue;
			const t = age / 1.8;
			const ease = 1 - (1 - t) * (1 - t);
			const spinA = drop.at * .001 + t * 2.4;
			dummy.position.set(Math.cos(spinA) * .28, 2.45 - ease * 1.7, Math.sin(spinA) * .28);
			dummy.scale.setScalar(1.35 - t * .7);
			dummy.rotation.set(spinA, spinA * .6, 0);
			dummy.updateMatrix();
			mesh.setMatrixAt(shown, dummy.matrix);
			tint.set(hslToHex(ingredientById(drop.ingredient).hue, .85, .55));
			mesh.setColorAt(shown, tint);
			shown += 1;
		}
		for (let i = shown; i < 8; i += 1) {
			dummy.position.set(0, -8, 0);
			dummy.scale.setScalar(.001);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
			mesh.setColorAt(i, tint);
		}
		mesh.instanceMatrix.needsUpdate = true;
		if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			8
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.16,
			16,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ffffff" })]
	});
}
function paintBodies(mesh, kind, max, dummy, tint) {
	if (!mesh) return;
	const list = liveBodies().filter((body) => body.kind === kind);
	for (let i = 0; i < max; i += 1) {
		const body = list[i];
		if (!body) {
			dummy.position.set(0, -8, 0);
			dummy.scale.setScalar(.001);
			dummy.rotation.set(0, 0, 0);
		} else {
			dummy.position.set(body.x, body.y, body.z);
			const fade = kind === "spark" ? Math.max(.2, 1 - body.age / body.life) : 1;
			const hit = body.impact || 0;
			const size = body.r * (kind === "charm" ? 3.4 : 2.8) * (body.held ? 1.28 : 1) * fade;
			dummy.scale.set(size * (1 + hit * .45), size * (1 - hit * .42), size * (1 + hit * .45));
			dummy.rotation.set(body.age * 2.2, body.hue * .02, body.age * .8);
			tint.set(body.color);
			if (hit > 0) {
				tint.r += (1 - tint.r) * hit;
				tint.g += (1 - tint.g) * hit;
				tint.b += (1 - tint.b) * hit;
			}
			mesh.setColorAt(i, tint);
		}
		dummy.updateMatrix();
		mesh.setMatrixAt(i, dummy.matrix);
	}
	mesh.instanceMatrix.needsUpdate = true;
	if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}
function PhysVis({ fx }) {
	const charms = (0, import_react.useRef)(null);
	const sparksMesh = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const tint = (0, import_react.useMemo)(() => new Color("#ffffff"), []);
	useFrame(() => {
		const group = charms.current;
		if (group) {
			const list = liveBodies().filter((body) => body.kind === "charm");
			for (let i = 0; i < 8; i += 1) {
				const mesh = group.children[i];
				const body = list[i];
				if (!mesh) continue;
				if (!body) {
					mesh.visible = false;
					continue;
				}
				mesh.visible = true;
				mesh.position.set(body.x, body.y, body.z);
				const hit = body.impact || 0;
				const s = body.r * 3.6 * (body.held ? 1.3 : 1);
				mesh.scale.set(s * (1 + hit * .36), s * (1 - hit * .42), s * (1 + hit * .36));
				mesh.rotation.x += .01;
				mesh.rotation.y += .016;
				const mat = mesh.material;
				mat.color.set(body.color);
				mat.emissive.set(hit > .2 ? "#fff6df" : body.color);
				mat.emissiveIntensity = (fx.charmTransmission > 0 ? fx.emissiveIntensity * .65 : fx.emissiveIntensity * .45) * (1 + hit * 2.8);
				if (mat.attenuationColor) mat.attenuationColor.set(body.color);
			}
		}
		paintBodies(sparksMesh.current, "spark", 32, dummy, tint);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: charms,
		children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			castShadow: fx.shadows,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, fx.master ? 1 : 0] }), fx.charmTransmission > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#ffffff",
				transmission: Math.min(.72, fx.charmTransmission),
				thickness: Math.max(.25, fx.thickness * .5),
				ior: fx.ior,
				iridescence: fx.iridescence,
				clearcoat: fx.clearcoat,
				sheen: fx.sheen,
				roughness: .08,
				metalness: .02,
				emissive: "#ffffff",
				emissiveIntensity: fx.emissiveIntensity * .65,
				attenuationColor: "#ffffff",
				attenuationDistance: .28,
				transparent: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#ffffff",
				roughness: .28,
				metalness: .12,
				emissive: "#ffffff",
				emissiveIntensity: fx.emissiveIntensity * .45
			})]
		}, i))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: sparksMesh,
		args: [
			void 0,
			void 0,
			32
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#ffffff",
			emissive: "#ffffff",
			emissiveIntensity: Math.max(1.2, fx.emissiveIntensity * 2.2),
			roughness: .15,
			toneMapped: false
		})]
	})] });
}
function SurfaceRings() {
	const refs = [
		(0, import_react.useRef)(null),
		(0, import_react.useRef)(null),
		(0, import_react.useRef)(null)
	];
	useFrame(({ clock }) => {
		const t = clock.elapsedTime;
		refs.forEach((ref, i) => {
			const mesh = ref.current;
			if (!mesh) return;
			const wave = .5 + .5 * Math.sin(t * 3.1 - i * .95);
			mesh.scale.setScalar(.78 + i * .04 + wave * .08);
			const mat = mesh.material;
			mat.opacity = .28 + wave * .62;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			0,
			.83,
			0
		],
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		renderOrder: 3,
		children: refs.map((ref, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref,
			renderOrder: 3,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.18 + i * .16,
				.23 + i * .16,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#fff6df",
				transparent: true,
				opacity: .75,
				depthWrite: false,
				toneMapped: false,
				side: 2
			})]
		}, i))
	});
}
function Ladle() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.95,
				1.35,
				0
			],
			rotation: [
				0,
				0,
				-.9
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.045,
				.055,
				1.2,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f3e2b8",
				metalness: .55,
				roughness: .32
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.45,
				1.78,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.22,
				18,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fff8e8",
				emissive: "#ffb15a",
				emissiveIntensity: .7,
				metalness: .3,
				roughness: .22
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.02,
				1.08,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.26,
				.09,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fff6df",
				emissive: "#ffe29a",
				emissiveIntensity: 1.4
			})]
		})
	] });
}
function Bridges({ root, fx }) {
	const { gl } = useThree();
	(0, import_react.useEffect)(() => {
		setGrabStill(() => {
			try {
				return gl.domElement.toDataURL("image/jpeg", .72);
			} catch {
				return null;
			}
		});
		setExportGlb(async () => {
			if (!root.current) return null;
			const motion = rememberedMotion() ?? spinSnapshot();
			const snap = physicsSnapshot();
			root.current.userData = { conjure: {
				angularVelocity: motion.angularVelocity,
				axis: motion.axis,
				damping: motion.damping,
				spinCount: motion.spinCount,
				physicsSeed: snap.seed,
				gravity: snap.gravity,
				tier: fx.master ? "master" : fx.tier,
				transmission: fx.transmission,
				ior: fx.ior
			} };
			const frames = spinFrames(motion, 6, 36);
			const times = [];
			const values = [];
			const euler = new Euler();
			const quat = new Quaternion();
			for (const frame of frames) {
				times.push(frame.t);
				euler.set(frame.x, frame.y, frame.z);
				quat.setFromEuler(euler);
				values.push(quat.x, quat.y, quat.z, quat.w);
			}
			const clip = new AnimationClip("conjure-spin", 6, [new QuaternionKeyframeTrack("brew.quaternion", times, values)]);
			const { GLTFExporter } = await import("../_libs/three.mjs").then((n) => n.t);
			const bin = await new GLTFExporter().parseAsync(root.current, {
				binary: true,
				animations: [clip]
			});
			return new Blob([bin], { type: "model/gltf-binary" });
		});
		setEnterAR(async () => {
			const xr = navigator.xr;
			if (!xr) throw new Error("AR is not on this browser.");
			const session = await xr.requestSession("immersive-ar", { optionalFeatures: ["local-floor", "hit-test"] });
			gl.xr.enabled = true;
			await gl.xr.setSession(session);
		});
		return () => {
			setGrabStill(null);
			setExportGlb(null);
			setEnterAR(null);
		};
	}, [
		gl,
		root,
		fx
	]);
	return null;
}
var liquidVert = `
  varying vec2 vUv;
  varying vec3 vN;
  varying float vWave;
  uniform sampler2D uSlosh;
  uniform float uTime;
  uniform float uEnergy;
  void main() {
    vUv = uv;
    vec2 c = uv - 0.5;
    float r = length(c);
    float hTex = texture2D(uSlosh, uv).r * 2.0 - 1.0;
    float rings = sin(r * 32.0 - uTime * 5.2);
    float rings2 = sin(r * 16.0 - uTime * 2.5 + 1.1);
    float amp = 0.22 + uEnergy * 0.14;
    float disp = clamp(hTex * 0.52 + rings * amp + rings2 * amp * 0.65, -0.22, 0.48);
    vec3 p = position;
    p.z += disp;
    float slope = cos(r * 32.0 - uTime * 5.2) * 32.0 * amp + cos(r * 16.0 - uTime * 2.5 + 1.1) * 16.0 * amp * 0.65;
    vec2 dir = r > 0.0008 ? c / r : vec2(0.0);
    vN = normalize(vec3(-dir.x * slope, -dir.y * slope, 1.0));
    vWave = rings * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
var liquidFrag = `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vN;
  varying float vWave;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uEnergy;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p);
    float rings = sin(r * 30.0 - uTime * 5.0) * 0.5 + 0.5;
    float rings2 = sin(r * 15.0 - uTime * 2.4) * 0.5 + 0.5;
    vec3 n = normalize(vN);
    vec3 lightDir = normalize(vec3(0.25, 0.45, 1.0));
    vec3 viewDir = vec3(0.0, 0.15, 1.0);
    float ndl = clamp(dot(n, lightDir), 0.0, 1.0);
    float spec = pow(clamp(dot(n, normalize(lightDir + viewDir)), 0.0, 1.0), 28.0);
    float rim = smoothstep(0.5, 0.22, r);
    vec3 col = uColor * (0.42 + 0.85 * rings * (0.45 + uEnergy) + 0.35 * rings2);
    col += uColor * ndl * 0.45;
    col += vec3(1.0, 0.94, 0.82) * spec * (0.85 + uEnergy);
    col += vec3(1.0, 0.86, 0.62) * pow(rings, 2.0) * 1.05;
    col += vec3(1.0, 0.95, 0.85) * vWave * rings2 * 0.2;
    float alpha = rim * 0.96;
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;
var skinVert = `
  uniform float uTime;
  uniform float uSpikes;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vec3 p = position;
    float n = sin(p.x * 4.0 + uTime) * sin(p.y * 3.0 + uTime * 0.7) * sin(p.z * 5.0 + uTime * 0.4);
    p += normal * n * uSpikes * 0.28;
    vec4 w = modelMatrix * vec4(p, 1.0);
    vW = w.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
var skinFrag = `
  precision highp float;
  uniform vec3 uColor;
  uniform float uGlow;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vW);
    float fres = pow(1.0 - max(dot(normalize(vN), viewDir), 0.0), 2.2);
    vec3 col = uColor * (0.55 + uGlow * 0.7) + uColor * fres * 1.35;
    col += vec3(1.0, 0.92, 0.82) * fres * 0.25;
    gl_FragColor = vec4(col, 1.0);
  }
`;
function RoomEnv() {
	const { gl, scene } = useThree();
	(0, import_react.useEffect)(() => {
		const pmrem = new PMREMGenerator(gl);
		const room = new RoomEnvironment();
		const target = pmrem.fromScene(room, .04);
		scene.environment = target.texture;
		scene.environmentIntensity = .42;
		return () => {
			scene.environment = null;
			target.dispose();
			pmrem.dispose();
			room.traverse((obj) => {
				const mesh = obj;
				mesh.geometry?.dispose();
				const mat = mesh.material;
				if (Array.isArray(mat)) mat.forEach((item) => item.dispose());
				else mat?.dispose();
			});
		};
	}, [gl, scene]);
	return null;
}
function Grade({ fx }) {
	const { gl } = useThree();
	(0, import_react.useEffect)(() => {
		gl.outputColorSpace = SRGBColorSpace;
		gl.toneMapping = fx.toneMapping === "AgX" ? 6 : 4;
		gl.toneMappingExposure = fx.master ? 1 : .92;
	}, [
		gl,
		fx.toneMapping,
		fx.master
	]);
	return null;
}
function Post({ fx }) {
	const { gl, scene, camera, size } = useThree();
	const composer = (0, import_react.useRef)(null);
	const bokeh = (0, import_react.useRef)(null);
	const ratio = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const next = new EffectComposer(gl);
		next.addPass(new RenderPass(scene, camera));
		if (fx.bloom > 0) next.addPass(new UnrealBloomPass(new Vector2(size.width, size.height), fx.bloom, .22, .94));
		bokeh.current = null;
		if (fx.dof) {
			const dist = camera.position.distanceTo(new Vector3(0, .7, 0));
			const pass = new BokehPass(scene, camera, {
				focus: dist,
				aperture: 15e-5,
				maxblur: .0045
			});
			next.addPass(pass);
			bokeh.current = pass;
		}
		next.setPixelRatio(gl.getPixelRatio());
		next.setSize(size.width, size.height);
		composer.current = next;
		ratio.current = gl.getPixelRatio();
		return () => {
			next.dispose();
			composer.current = null;
			bokeh.current = null;
		};
	}, [
		gl,
		scene,
		camera,
		size.width,
		size.height,
		fx.bloom,
		fx.dof
	]);
	useFrame(() => {
		const current = composer.current;
		if (!current) return;
		const pixelRatio = gl.getPixelRatio();
		if (pixelRatio !== ratio.current) {
			ratio.current = pixelRatio;
			current.setPixelRatio(pixelRatio);
			current.setSize(size.width, size.height);
		}
		const pass = bokeh.current;
		if (pass) {
			const uniforms = pass.uniforms;
			if (uniforms.focus) uniforms.focus.value = camera.position.distanceTo(new Vector3(0, .7, 0));
		}
		current.render();
	}, 1);
	return null;
}
function applyFrame(camera, width, height, aspect) {
	const frame = frameFor(width, height);
	camera.position.set(frame.position[0], frame.position[1], frame.position[2]);
	camera.lookAt(frame.lookAt[0], frame.lookAt[1], frame.lookAt[2]);
	if (camera instanceof PerspectiveCamera) {
		const framed = camera;
		framed.fov = frame.fov;
		framed.aspect = aspect;
		framed.manual = true;
		framed.updateProjectionMatrix();
	}
}
function FrameCamera() {
	const { camera, size, gl } = useThree();
	useFrame(() => {
		const canvas = gl.domElement;
		const view = viewportForFrame(size.width, size.height, canvas.clientWidth, canvas.clientHeight, window.innerWidth, window.innerHeight);
		const aspectW = canvas.clientWidth >= 32 ? canvas.clientWidth : size.width || view.width;
		const aspectH = canvas.clientHeight >= 32 ? canvas.clientHeight : size.height || view.height;
		applyFrame(camera, view.width, view.height, aspectW / Math.max(aspectH, 1));
	});
	return null;
}
function CauldronScene({ drops, vibe, form, quality, reduced }) {
	const root = (0, import_react.useRef)(null);
	const fx = (0, import_react.useMemo)(() => effectsFor(quality), [quality]);
	const initialCamera = (0, import_react.useMemo)(() => ({
		position: [
			0,
			2.55,
			4.05
		],
		fov: 34
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		dpr: quality.dpr,
		shadows: fx.shadows ? "soft" : false,
		camera: initialCamera,
		gl: {
			antialias: quality.tier !== "low",
			alpha: false,
			powerPreference: "high-performance",
			preserveDrawingBuffer: true
		},
		onCreated: ({ gl, camera }) => {
			gl.setClearColor("#110e0c", 1);
			const view = viewportForFrame(gl.domElement.clientWidth, gl.domElement.clientHeight, gl.domElement.clientWidth, gl.domElement.clientHeight, window.innerWidth, window.innerHeight);
			const aspectW = gl.domElement.clientWidth || view.width;
			const aspectH = gl.domElement.clientHeight || view.height;
			applyFrame(camera, view.width, view.height, aspectW / Math.max(aspectH, 1));
			gl.outputColorSpace = SRGBColorSpace;
			gl.toneMapping = fx.toneMapping === "AgX" ? 6 : 4;
			gl.toneMappingExposure = fx.master ? 1 : .92;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grade, { fx }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCamera, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomEnv, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceMonitor, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdaptiveDpr, {}) }),
			fx.shadows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
				position: [
					0,
					.01,
					0
				],
				opacity: .45,
				scale: 6.5,
				blur: 2.4,
				far: 3.4,
				color: "#140e0b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: root,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .32 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							1.8,
							2.8,
							2.2
						],
						intensity: 14,
						color: "#ffc8a0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							-1.6,
							1.6,
							1.2
						],
						intensity: 6,
						color: "#9ee0c4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
						position: [
							2.2,
							4.4,
							2.2
						],
						intensity: 1.05,
						color: "#fff1df",
						castShadow: fx.shadows,
						"shadow-mapSize-width": fx.master ? 1024 : 512,
						"shadow-mapSize-height": fx.master ? 1024 : 512
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {
						drops,
						vibe,
						form,
						reduced,
						particles: fx.particles,
						detail: quality.detail,
						fx
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bridges, {
				root,
				fx
			}),
			(fx.bloom > 0 || fx.dof) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Post, { fx })
		]
	});
}
//#endregion
export { CauldronScene };
