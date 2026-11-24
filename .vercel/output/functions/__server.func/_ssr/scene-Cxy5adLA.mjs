import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime, P as require_react, a as CanvasTexture, k as Vector2, n as useFrame, r as useThree, s as Color, t as Canvas, x as Object3D } from "../_libs/@react-three/fiber+[...].mjs";
import { a as decaySensor, c as remoteSensor, d as setGrabStill, i as computeBrew, l as setEnterAR, o as liveSensor, r as blendSensors, u as setExportGlb } from "./app-BRHp-Cky.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Cxy5adLA.js
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
function Rig({ drops, vibe, form, reduced, particles }) {
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		if (!reduced) decaySensor(liveSensor, dt);
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
		particles
	});
}
function BrewMesh({ drops, vibe, form, reduced, particles }) {
	const liquid = (0, import_react.useRef)(null);
	(0, import_react.useRef)(null);
	const orb = (0, import_react.useRef)(null);
	const formRef = form;
	const liquidUniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uColor: { value: new Color("#c46a32") },
		uEnergy: { value: .4 }
	}), []);
	const skinUniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uColor: { value: new Color("#e27a3a") },
		uSpikes: { value: .3 },
		uGlow: { value: .5 }
	}), []);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		const brew = mixNow(drops, vibe);
		const speed = reduced ? .15 : 1;
		liquidUniforms.uTime.value += dt * speed;
		skinUniforms.uTime.value += dt * speed;
		liquidUniforms.uColor.value.set(brew.color);
		liquidUniforms.uEnergy.value = brew.energy;
		skinUniforms.uColor.value.set(brew.color);
		skinUniforms.uSpikes.value = brew.spikes;
		skinUniforms.uGlow.value = brew.glow;
		if (orb.current) {
			const swirl = reduced ? .15 : brew.swirl;
			orb.current.rotation.y += dt * (.35 + swirl);
			orb.current.rotation.z = liveSensor.tiltX * .35 + remoteSensor.tiltX * .2;
			orb.current.rotation.x = .2 + liveSensor.tiltY * .25;
			const s = brew.scale * (1 + liveSensor.burst * .12);
			orb.current.scale.setScalar(s);
			orb.current.position.y = 1.62 + Math.sin(skinUniforms.uTime.value * 1.4) * (reduced ? .01 : .06);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
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
			castShadow: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("latheGeometry", { args: [potPoints, 40] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8d6b52",
				roughness: .62,
				metalness: .28
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.98,
				.055,
				12,
				40
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e0b07a",
				roughness: .35,
				metalness: .6
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
		}, k)),
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.78, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
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
				uniforms: skinUniforms
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Embers, {
			drops,
			vibe,
			count: particles
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Falls, { drops })
	] });
}
function Skin({ uniforms }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		uniforms,
		vertexShader: skinVert,
		fragmentShader: skinFrag
	});
}
function FormMesh({ form, uniforms }) {
	if (form === "spire") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
		.48,
		1.35,
		5
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
	if (form === "bloom") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.22,
			16,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })]
	}, i))] });
	if (form === "ribbon") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusKnotGeometry", { args: [
		.38,
		.12,
		80,
		8
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [.62, 3] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skin, { uniforms })] });
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
	const countUsed = Math.max(12, Math.min(count, 480));
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
		for (let i = 0; i < countUsed; i += 1) {
			let y = attr.getY(i) + dt * speeds[i] * (.6 + brew.energy);
			if (y > 2.6) y = .6;
			const spread = .15 + brew.spikes * .2;
			attr.setY(i, y);
			attr.setX(i, attr.getX(i) + Math.sin(y * 3 + i) * dt * spread);
		}
		attr.needsUpdate = true;
		if (ref.current) {
			ref.current.material.color.set(brew.color);
			ref.current.material.size = .035 + brew.glow * .02;
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
			sizeAttenuation: true
		})]
	});
}
function Falls({ drops }) {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	useFrame(() => {
		const mesh = ref.current;
		if (!mesh) return;
		const now = Date.now();
		let shown = 0;
		for (const drop of drops) {
			const age = (now - drop.at) / 1e3;
			if (age < 0 || age > 1.15 || shown >= 8) continue;
			const t = age / 1.15;
			const ease = 1 - (1 - t) * (1 - t);
			dummy.position.set((shown % 3 - 1) * .18, 2.3 - ease * 1.7, .1);
			dummy.scale.setScalar(1 - t * .4);
			dummy.updateMatrix();
			mesh.setMatrixAt(shown, dummy.matrix);
			shown += 1;
		}
		for (let i = shown; i < 8; i += 1) {
			dummy.position.set(0, -5, 0);
			dummy.scale.setScalar(.001);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			8
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.09,
			12,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#f6efe4",
			emissive: "#e27a3a",
			emissiveIntensity: .4
		})]
	});
}
function Bridges({ root }) {
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
			const { GLTFExporter } = await import("../_libs/three.mjs").then((n) => n.t);
			const bin = await new GLTFExporter().parseAsync(root.current, { binary: true });
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
	}, [gl, root]);
	return null;
}
var liquidVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
function CauldronScene({ drops, vibe, form, quality, reduced }) {
	const root = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		dpr: quality.dpr,
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
			powerPreference: "high-performance"
		},
		onCreated: ({ gl, camera }) => {
			gl.setClearColor("#110e0c", 1);
			camera.lookAt(0, 1.15, 0);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: root,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .85 }),
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
						0,
						3,
						2
					],
					intensity: 1.4,
					color: "#fff1df"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {
					drops,
					vibe,
					form,
					reduced,
					particles: quality.particles
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bridges, { root })]
	});
}
//#endregion
export { CauldronScene };
