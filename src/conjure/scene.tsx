import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  computeBrew,
  decaySensor,
  type Drop,
  type FormId,
  type Vibe,
} from "./brew";
import { liveSensor, masterMix, remoteSensor, setEnterAR, setExportGlb, setGrabStill } from "./live";
import { flingVel } from "./fling";
import { blendSensors } from "./brew";
import type { Quality } from "./quality";

const potPoints = (() => {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i += 1) {
    const t = i / 24;
    const y = t * 1.05;
    const belly = Math.sin(t * Math.PI) * 0.72;
    const r = 0.28 + belly + (t > 0.82 ? (t - 0.82) * 0.9 : 0);
    pts.push(new THREE.Vector2(Math.max(0.16, r), y));
  }
  return pts;
})();

function mixNow(drops: Drop[], vibe: Vibe) {
  return computeBrew(drops, blendSensors([liveSensor, remoteSensor]), vibe);
}

function Rig({
  drops,
  vibe,
  form,
  reduced,
  particles,
  detail,
}: {
  drops: Drop[];
  vibe: Vibe;
  form: FormId;
  reduced: boolean;
  particles: number;
  detail: number;
}) {
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    if (!reduced && !masterMix.freeze) decaySensor(liveSensor, dt);
    else {
      liveSensor.burst = 0;
      liveSensor.shake = 0;
      liveSensor.wave *= 0.9;
    }
  });
  return (
    <BrewMesh drops={drops} vibe={vibe} form={form} reduced={reduced} particles={particles} detail={detail} />
  );
}

function BrewMesh({
  drops,
  vibe,
  form,
  reduced,
  particles,
  detail,
}: {
  drops: Drop[];
  vibe: Vibe;
  form: FormId;
  reduced: boolean;
  particles: number;
  detail: number;
}) {
  const liquid = useRef<THREE.ShaderMaterial>(null);
  const skin = useRef<THREE.ShaderMaterial>(null);
  const orb = useRef<THREE.Group>(null);
  const formRef = form;
  const liquidUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#c46a32") },
      uEnergy: { value: 0.4 },
    }),
    [],
  );
  const skinUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#e27a3a") },
      uSpikes: { value: 0.3 },
      uGlow: { value: 0.5 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const brew = mixNow(drops, vibe);
    const speed = masterMix.freeze ? 0 : reduced ? 0.15 : 1 + masterMix.stir;
    liquidUniforms.uTime.value += dt * speed;
    skinUniforms.uTime.value += dt * speed;
    liquidUniforms.uColor.value.set(brew.color);
    skinUniforms.uColor.value.set(brew.color);
    if (masterMix.hue) {
      liquidUniforms.uColor.value.offsetHSL(masterMix.hue / 360, 0, 0);
      skinUniforms.uColor.value.offsetHSL(masterMix.hue / 360, 0, 0);
    }
    liquidUniforms.uEnergy.value = brew.energy * (masterMix.freeze ? 0.35 : 1);
    skinUniforms.uSpikes.value = brew.spikes * (0.55 + masterMix.swirl);
    skinUniforms.uGlow.value = brew.glow * (0.45 + masterMix.bloom * 1.4);
    if (orb.current) {
      const swirl = masterMix.freeze ? 0 : (reduced ? 0.12 : brew.swirl) * (0.35 + masterMix.swirl * 1.6);
      orb.current.rotation.y += dt * swirl;
      orb.current.rotation.z = liveSensor.tiltX * 0.35 + remoteSensor.tiltX * 0.2;
      orb.current.rotation.x = 0.2 + liveSensor.tiltY * 0.25;
      const s = brew.scale * (1 + liveSensor.burst * 0.12);
      orb.current.scale.setScalar(s);
      const bob = Math.sin(skinUniforms.uTime.value * 1.4) * (reduced || masterMix.freeze ? 0.01 : 0.06);
      orb.current.position.set(
        masterMix.freeze ? 0 : flingVel.x * 0.55,
        1.62 + bob,
        masterMix.freeze ? 0 : flingVel.y * 0.32,
      );
    }
  });

  return (
    <group>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 40]} />
        <meshStandardMaterial color="#3a2e28" roughness={1} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow={false}>
        <latheGeometry args={[potPoints, detail >= 5 ? 64 : 40]} />
        <meshStandardMaterial color="#8d6b52" roughness={0.62} metalness={0.28} />
      </mesh>
      <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.98, 0.055, 12, 40]} />
        <meshStandardMaterial color="#e0b07a" roughness={0.35} metalness={0.6} />
      </mesh>
      {[0, 2, 4].map((k) => (
        <mesh
          key={k}
          position={[Math.cos((k / 6) * Math.PI * 2) * 0.62, 0.16, Math.sin((k / 6) * Math.PI * 2) * 0.62]}
        >
          <cylinderGeometry args={[0.06, 0.08, 0.32, 8]} />
          <meshStandardMaterial color="#241910" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 48]} />
        <shaderMaterial
          ref={liquid}
          transparent
          uniforms={liquidUniforms}
          vertexShader={liquidVert}
          fragmentShader={liquidFrag}
        />
      </mesh>
      <group ref={orb} position={[0, 1.62, 0]}>
        <FormMesh form={formRef} uniforms={skinUniforms} detail={detail} />
      </group>
      <Embers drops={drops} vibe={vibe} count={particles} />
      <Falls drops={drops} />
    </group>
  );
}

function Skin({
  uniforms,
}: {
  uniforms: {
    uTime: { value: number };
    uColor: { value: THREE.Color };
    uSpikes: { value: number };
    uGlow: { value: number };
  };
}) {
  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={skinVert}
      fragmentShader={skinFrag}
    />
  );
}

function FormMesh({
  form,
  uniforms,
  detail,
}: {
  form: FormId;
  uniforms: {
    uTime: { value: number };
    uColor: { value: THREE.Color };
    uSpikes: { value: number };
    uGlow: { value: number };
  };
  detail: number;
}) {
  const fine = detail >= 5;
  if (form === "spire") {
    return (
      <mesh>
        <coneGeometry args={[0.48, 1.35, fine ? 12 : 5]} />
        <Skin uniforms={uniforms} />
      </mesh>
    );
  }
  if (form === "bloom") {
    return (
      <group>
        <mesh>
          <sphereGeometry args={fine ? [0.34, 40, 28] : [0.34, 24, 16]} />
          <Skin uniforms={uniforms} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 0.42,
              0.05,
              Math.sin((i / 5) * Math.PI * 2) * 0.42,
            ]}
          >
            <sphereGeometry args={fine ? [0.22, 24, 16] : [0.22, 16, 12]} />
            <Skin uniforms={uniforms} />
          </mesh>
        ))}
      </group>
    );
  }
  if (form === "ribbon") {
    return (
      <mesh>
        <torusKnotGeometry args={fine ? [0.38, 0.12, 160, 12] : [0.38, 0.12, 80, 8]} />
        <Skin uniforms={uniforms} />
      </mesh>
    );
  }
  return (
    <mesh>
      <icosahedronGeometry args={[0.62, fine ? 5 : Math.min(4, Math.max(2, detail))]} />
      <Skin uniforms={uniforms} />
    </mesh>
  );
}

function emberSprite(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const glow = ctx.createRadialGradient(16, 16, 1, 16, 16, 16);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.4, "rgba(255,255,255,0.7)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 32, 32);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
function Embers({ drops, vibe, count }: { drops: Drop[]; vibe: Vibe; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const sprite = useMemo(() => emberSprite(), []);
  const countUsed = Math.max(12, Math.min(count, 800));
  const positions = useMemo(() => {
    const arr = new Float32Array(countUsed * 3);
    for (let i = 0; i < countUsed; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 1.4;
      arr[i * 3 + 1] = Math.random() * 2.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    return arr;
  }, [countUsed]);
  const speeds = useMemo(() => {
    const arr = new Float32Array(countUsed);
    for (let i = 0; i < countUsed; i += 1) arr[i] = 0.15 + Math.random() * 0.45;
    return arr;
  }, [countUsed]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const brew = mixNow(drops, vibe);
    const geo = ref.current?.geometry;
    const attr = geo?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const kickX = masterMix.freeze ? 0 : flingVel.x * 36;
    const kickZ = masterMix.freeze ? 0 : flingVel.y * 22;
    for (let i = 0; i < countUsed; i += 1) {
      if (masterMix.freeze) break;
      let y = attr.getY(i) + dt * speeds[i] * (0.6 + brew.energy) * (0.65 + masterMix.stir);
      if (y > 2.6) y = 0.6;
      const spread = (0.15 + brew.spikes * 0.2) * (0.6 + masterMix.swirl);
      let x = attr.getX(i) + Math.sin(y * 3 + i) * dt * spread + kickX * dt;
      let z = attr.getZ(i) + kickZ * dt;
      if (x > 1.8 || x < -1.8) x = (Math.random() - 0.5) * 1.2;
      if (z > 1.8 || z < -1.8) z = (Math.random() - 0.5) * 1.2;
      attr.setX(i, x);
      attr.setY(i, y);
      attr.setZ(i, z);
    }
    attr.needsUpdate = true;
    if (ref.current) {
      (ref.current.material as THREE.PointsMaterial).color.set(brew.color);
      (ref.current.material as THREE.PointsMaterial).size =
        (0.035 + brew.glow * 0.02) * (0.65 + masterMix.bloom);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e27a3a"
        size={0.08}
        map={sprite}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function Falls({ drops }: { drops: Drop[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const now = Date.now();
    let shown = 0;
    for (const drop of drops) {
      const age = (now - drop.at) / 1000;
      if (age < 0 || age > 1.15 || shown >= 8) continue;
      const t = age / 1.15;
      const ease = 1 - (1 - t) * (1 - t);
      dummy.position.set(((shown % 3) - 1) * 0.18, 2.3 - ease * 1.7, 0.1);
      dummy.scale.setScalar(1 - t * 0.4);
      dummy.updateMatrix();
      mesh.setMatrixAt(shown, dummy.matrix);
      shown += 1;
    }
    for (let i = shown; i < 8; i += 1) {
      dummy.position.set(0, -5, 0);
      dummy.scale.setScalar(0.001);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 8]}>
      <sphereGeometry args={[0.09, 12, 10]} />
      <meshStandardMaterial color="#f6efe4" emissive="#e27a3a" emissiveIntensity={0.4} />
    </instancedMesh>
  );
}

function Bridges({ root }: { root: RefObject<THREE.Group | null> }) {
  const { gl } = useThree();
  useEffect(() => {
    setGrabStill(() => {
      try {
        return gl.domElement.toDataURL("image/jpeg", 0.72);
      } catch {
        return null;
      }
    });
    setExportGlb(async () => {
      if (!root.current) return null;
      const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js");
      const exporter = new GLTFExporter();
      const bin = await exporter.parseAsync(root.current, { binary: true });
      return new Blob([bin as ArrayBuffer], { type: "model/gltf-binary" });
    });
    setEnterAR(async () => {
      const xr = (navigator as Navigator & { xr?: { requestSession: (mode: string, opts?: object) => Promise<XRSession> } }).xr;
      if (!xr) throw new Error("AR is not on this browser.");
      const session = await xr.requestSession("immersive-ar", {
        optionalFeatures: ["local-floor", "hit-test"],
      });
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

const liquidVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const liquidFrag = /* glsl */ `
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

const skinVert = /* glsl */ `
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

const skinFrag = /* glsl */ `
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

export function CauldronScene({
  drops,
  vibe,
  form,
  quality,
  reduced,
}: {
  drops: Drop[];
  vibe: Vibe;
  form: FormId;
  quality: Quality;
  reduced: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  return (
    <Canvas
      dpr={quality.dpr}
      camera={{ position: [0, 1.65, 4.55], fov: 36 }}
      gl={{ antialias: quality.tier !== "low", alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor("#110e0c", 1);
        camera.lookAt(0, 1.15, 0);
        if (quality.master) {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }
      }}
    >
      <group ref={root}>
        <ambientLight intensity={0.85} />
        <pointLight position={[1.8, 2.8, 2.2]} intensity={28} color="#ffc8a0" />
        <pointLight position={[-1.6, 1.6, 1.2]} intensity={12} color="#9ee0c4" />
        <directionalLight position={[0, 3, 2]} intensity={1.4} color="#fff1df" />
        <Rig
          drops={drops}
          vibe={vibe}
          form={form}
          reduced={reduced}
          particles={quality.particles}
          detail={quality.detail}
        />
      </group>
      <Bridges root={root} />
    </Canvas>
  );
}
