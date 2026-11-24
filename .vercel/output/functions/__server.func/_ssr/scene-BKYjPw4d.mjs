import { o as __toESM } from "../_runtime.mjs";
import { G as RGBAFormat, H as Quaternion, J as SRGBColorSpace, K as Raycaster, O as Matrix4, R as Object3D, U as QuaternionKeyframeTrack, _ as Euler, a as useFrame, at as require_jsx_runtime, c as AnimationClip, et as Vector2, f as CanvasTexture, g as DataTexture, i as Canvas, m as Color, n as AdaptiveDpr, o as useThree, ot as require_react, p as ClampToEdgeWrapping, r as ContactShadows, s as PMREMGenerator, t as PerformanceMonitor, tt as Vector3, w as LinearFilter } from "../_libs/@react-three/drei+[...].mjs";
import { A as toolTouch, C as setRayView, D as spinSnapshot, E as spinFrames, O as stepBrewPhysics, S as setGrabStill, T as spin, _ as punchStrength, a as decaySensor, b as setEnterAR, c as hslToHex, d as liveSensor, g as punch, h as physicsSnapshot, i as computeBrew, l as ingredientById, m as masterMix, o as effectsFor, p as localGravity, r as blendSensors, s as flingVel, u as liveBodies, v as rememberedMotion, w as sloshGrid, x as setExportGlb, y as remoteSensor } from "./app-36nkK2us.mjs";
import { a as RenderPass, i as UnrealBloomPass, n as RoomEnvironment, o as EffectComposer, r as BokehPass } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BKYjPw4d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
		shader.vertexShader = shader.vertexShader.replace("#include <uv_pars_vertex>", "#include <uv_pars_vertex>\nuniform sampler2D uSlosh;").replace("#include <begin_vertex>", "#include <begin_vertex>\nfloat sloshH = texture2D(uSlosh, uv).r * 2.0 - 1.0;\ntransformed.z += sloshH * 0.28;");
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
			glow.current.intensity = masterMix.freeze ? 6 : 16 + flashT * 36;
		}
		if (brewGroup.current) brewGroup.current.rotation.set(spin.x + leanX, spin.y, spin.z + leanZ);
		if (pot.current && !masterMix.freeze) {
			pot.current.rotation.y = spin.y;
			pot.current.rotation.z = Math.sin(spin.z) * .12 + leanZ * .25;
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
				const byte = Math.max(0, Math.min(255, Math.round((h + .48) / .96 * 255)));
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
						color: "#8d6b52",
						roughness: .55,
						metalness: .34
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
						color: "#e0b07a",
						roughness: .28,
						metalness: .72
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
						.72,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.78, fx.transmission > 0 ? 64 : 40] }), fx.transmission > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
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
						roughness: .08,
						metalness: 0,
						emissive: "#c46a32",
						emissiveIntensity: fx.emissiveIntensity * .45,
						transparent: true,
						opacity: .96,
						attenuationColor: "#e27a3a",
						attenuationDistance: .55,
						onBeforeCompile: compilePotion
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
						ref: liquid,
						transparent: true,
						uniforms: liquidUniforms,
						vertexShader: liquidVert,
						fragmentShader: liquidFrag
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
			const size = body.r * (kind === "charm" ? 2.5 : 2.2) * (body.held ? 1.28 : 1) * fade;
			dummy.scale.setScalar(size);
			dummy.rotation.set(body.age * 2.2, body.hue * .02, body.age * .8);
			tint.set(body.color);
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
		paintBodies(charms.current, "charm", 8, dummy, tint);
		paintBodies(sparksMesh.current, "spark", 32, dummy, tint);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: charms,
		args: [
			void 0,
			void 0,
			8
		],
		castShadow: fx.shadows,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, fx.master ? 1 : 0] }), fx.charmTransmission > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#ffffff",
			transmission: fx.charmTransmission,
			thickness: Math.max(.18, fx.thickness * .45),
			ior: fx.ior,
			iridescence: fx.iridescence,
			clearcoat: fx.clearcoat,
			sheen: fx.sheen,
			roughness: .05,
			metalness: .04,
			emissive: "#ffffff",
			emissiveIntensity: fx.emissiveIntensity * .4,
			transparent: true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#ffffff",
			roughness: .32,
			metalness: .16,
			emissive: "#ffffff",
			emissiveIntensity: fx.emissiveIntensity * .3
		})]
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
			emissiveIntensity: Math.max(1.1, fx.emissiveIntensity * 2),
			roughness: .18,
			toneMapped: false
		})]
	})] });
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
  uniform sampler2D uSlosh;
  void main() {
    vUv = uv;
    vec3 p = position;
    float h = texture2D(uSlosh, uv).r * 2.0 - 1.0;
    p.z += h * 0.28;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
var liquidFrag = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uEnergy;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p);
    float rip = sin(r * 28.0 - uTime * 3.0) * 0.5 + 0.5;
    float rim = smoothstep(0.5, 0.28, r);
    vec3 col = uColor * (0.85 + 0.65 * rip * uEnergy);
    col += vec3(1.0, 0.86, 0.7) * pow(rip, 4.0) * 0.25;
    float alpha = rim * 0.92;
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
		gl.toneMappingExposure = fx.master ? 1.08 : 1.02;
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
	const ratio = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const next = new EffectComposer(gl);
		next.addPass(new RenderPass(scene, camera));
		if (fx.bloom > 0) next.addPass(new UnrealBloomPass(new Vector2(size.width, size.height), fx.bloom, .42, .86));
		if (fx.dof) next.addPass(new BokehPass(scene, camera, {
			focus: 4.35,
			aperture: 22e-5,
			maxblur: .006
		}));
		next.setPixelRatio(gl.getPixelRatio());
		next.setSize(size.width, size.height);
		composer.current = next;
		ratio.current = gl.getPixelRatio();
		return () => {
			next.dispose();
			composer.current = null;
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
		current.render();
	}, 1);
	return null;
}
function CauldronScene({ drops, vibe, form, quality, reduced }) {
	const root = (0, import_react.useRef)(null);
	const fx = (0, import_react.useMemo)(() => effectsFor(quality), [quality]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		dpr: quality.dpr,
		shadows: fx.shadows ? "soft" : false,
		camera: {
			position: [
				0,
				1.65,
				4.55
			],
			fov: 36
		},
		gl: {
			antialias: quality.tier !== "low",
			alpha: false,
			powerPreference: "high-performance",
			preserveDrawingBuffer: true
		},
		onCreated: ({ gl, camera }) => {
			gl.setClearColor("#110e0c", 1);
			camera.lookAt(0, 1.15, 0);
			gl.outputColorSpace = SRGBColorSpace;
			gl.toneMapping = fx.toneMapping === "AgX" ? 6 : 4;
			gl.toneMappingExposure = fx.master ? 1.08 : 1.02;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grade, { fx }),
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .55 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							1.8,
							2.8,
							2.2
						],
						intensity: 28,
						color: "#ffc8a0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
						position: [
							-1.6,
							1.6,
							1.2
						],
						intensity: 12,
						color: "#9ee0c4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
						position: [
							2.2,
							4.4,
							2.2
						],
						intensity: 1.7,
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
