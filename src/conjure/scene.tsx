import { useCallback, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";
import { computeBrew, blendSensors, decaySensor, hslToHex, ingredientById, type Drop, type FormId, type Vibe } from "./brew";
import { liveSensor, masterMix, punch, punchStrength, remoteSensor, setEnterAR, setExportGlb, setGrabStill, toolTouch } from "./live";
import { flingVel } from "./fling";
import { rememberedMotion, spin, spinFrames, spinSnapshot, poseNow, stepTumble, tumble } from "./spin";
import type { Quality } from "./quality";
import { effectsFor, type FxProfile } from "./fx";
import { liveBodies, localGravity, physicsSnapshot, setRayView, SLOSH_AMP, sloshGrid, stepBrewPhysics } from "./physics";
import { frameFor, frameMode, publishFrameDebug, viewportForFrame } from "./frame";

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
  fx,
}: {
  drops: Drop[];
  vibe: Vibe;
  form: FormId;
  reduced: boolean;
  particles: number;
  detail: number;
  fx: FxProfile;
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
    <BrewMesh
      drops={drops}
      vibe={vibe}
      form={form}
      reduced={reduced}
      particles={particles}
      detail={detail}
      fx={fx}
    />
  );
}

function BrewMesh({
  drops,
  vibe,
  form,
  reduced,
  particles,
  detail,
  fx,
}: {
  drops: Drop[];
  vibe: Vibe;
  form: FormId;
  reduced: boolean;
  particles: number;
  detail: number;
  fx: FxProfile;
}) {
  const liquid = useRef<THREE.ShaderMaterial>(null);
  const potion = useRef<THREE.MeshPhysicalMaterial>(null);
  const skin = useRef<THREE.ShaderMaterial>(null);
  const orb = useRef<THREE.Group>(null);
  const pot = useRef<THREE.Group>(null);
  const brewGroup = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  const flash = useRef(new THREE.Color("#e27a3a"));
  const formRef = form;
  const { camera, gl } = useThree();
  const sloshTex = useMemo(() => {
    const size = 32;
    const data = new Uint8Array(size * size * 4);
    data.fill(128);
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.colorSpace = THREE.NoColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);
  const liquidUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#c46a32") },
      uEnergy: { value: 0.4 },
      uSlosh: { value: sloshTex },
    }),
    [sloshTex],
  );
  const compilePotion = useCallback(
    (shader: { uniforms: Record<string, { value: unknown }>; vertexShader: string; fragmentShader: string }) => {
      shader.uniforms.uSlosh = liquidUniforms.uSlosh;
      shader.uniforms.uTime = liquidUniforms.uTime;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <uv_pars_vertex>",
          "#include <uv_pars_vertex>\nuniform sampler2D uSlosh;\nuniform float uTime;\nvarying vec2 vRingUv;",
        )
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nvRingUv = uv;\nfloat sloshH = texture2D(uSlosh, uv).r * 2.0 - 1.0;\nfloat rr = length(uv - 0.5);\nfloat rings = sin(rr * 34.0 - uTime * 5.6);\ntransformed.z += clamp(sloshH * 0.55 + rings * 0.28, -0.2, 0.5);",
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nuniform float uTime;\nvarying vec2 vRingUv;",
        )
        .replace(
          "#include <opaque_fragment>",
          "#include <opaque_fragment>\nfloat rr = length(vRingUv - 0.5);\nfloat ring = pow(sin(rr * 34.0 - uTime * 5.6) * 0.5 + 0.5, 2.0);\ngl_FragColor.rgb += vec3(1.0, 0.94, 0.78) * ring * 0.85;",
        );
    },
    [liquidUniforms],
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
    const stir = toolTouch.stir ? masterMix.stir : 0.12;
    const swirl = toolTouch.swirl ? masterMix.swirl : 0.15;
    const bloom = toolTouch.bloom ? masterMix.bloom : 0.28;
    const speed = masterMix.freeze ? 0 : reduced ? 0.12 : 0.3 + stir * 3.6;
    liquidUniforms.uTime.value += dt * speed;
    skinUniforms.uTime.value += dt * speed;
    const last = [...drops].reverse().find((drop) => !drop.neutral);
    const shift = toolTouch.hue ? masterMix.hue : 0;
    const baseHue = ((last ? ingredientById(last.ingredient).hue : brew.hue) + shift + 360) % 360;
    const baseHex = hslToHex(baseHue, last ? 0.82 : Math.max(brew.saturation, 0.55), last ? 0.52 : Math.max(brew.lightness, 0.42));
    liquidUniforms.uColor.value.set(baseHex);
    skinUniforms.uColor.value.set(baseHex);
    const flashT = punchStrength();
    if (flashT > 0) {
      flash.current.set(punch.hex);
      liquidUniforms.uColor.value.lerp(flash.current, flashT);
      skinUniforms.uColor.value.lerp(flash.current, flashT);
    }
    liquidUniforms.uEnergy.value = brew.energy * (masterMix.freeze ? 0.2 : 0.6 + stir);
    skinUniforms.uSpikes.value = brew.spikes * (0.4 + swirl * 1.4);
    skinUniforms.uGlow.value = brew.glow * (0.35 + bloom * 1.8);
    if (orb.current) {
      const bloomMul = toolTouch.bloom ? 0.5 + masterMix.bloom * 1.7 : 0.7 + bloom * 0.95;
      const s = brew.scale * (1 + liveSensor.burst * 0.55) * bloomMul;
      orb.current.scale.setScalar(masterMix.freeze ? s * 0.92 : s);
      const bob = Math.sin(skinUniforms.uTime.value * (1.2 + stir * 3)) * (reduced || masterMix.freeze ? 0.01 : 0.08 + stir * 0.05);
      orb.current.position.set(
        masterMix.freeze ? 0 : flingVel.x * 0.55,
        1.62 + bob,
        masterMix.freeze ? 0 : flingVel.y * 0.32,
      );
    }
    const leanX = masterMix.freeze ? 0 : liveSensor.tiltY * 0.7 + remoteSensor.tiltY * 0.2;
    const leanZ = masterMix.freeze ? 0 : liveSensor.tiltX * 0.7 + remoteSensor.tiltX * 0.2;
    const energy = Math.min(
      1,
      liveSensor.loudness * 0.85 +
        liveSensor.burst * 0.7 +
        liveSensor.shake * 0.55 +
        Math.min(1, Math.hypot(spin.vx, spin.vy, spin.vz) / 3) +
        Math.min(1, Math.hypot(flingVel.x, flingVel.y)) +
        (toolTouch.stir ? masterMix.stir * 0.5 : 0),
    );
    stepTumble(dt, energy, { reduced, frozen: masterMix.freeze });
    const pose = poseNow(leanX, leanZ, masterMix.freeze);
    if (glow.current) {
      glow.current.color.copy(liquidUniforms.uColor.value);
      glow.current.intensity = masterMix.freeze ? 3 : 7 + flashT * 20;
    }
    if (brewGroup.current) {
      brewGroup.current.position.set(0, 0, 0);
      brewGroup.current.rotation.set(pose.x, pose.y, pose.z);
      brewGroup.current.scale.setScalar(pose.scale);
    }
    if (pot.current) {
      pot.current.position.set(0, 0, 0);
      pot.current.rotation.set(pose.x, pose.y, pose.z);
      pot.current.scale.setScalar(pose.scale);
    }
    stepBrewPhysics(dt, {
      gravity: localGravity(pose.x, pose.y, pose.z),
      tiltX: reduced ? pose.x * 0.35 : pose.x,
      tiltZ: reduced ? pose.z * 0.35 : pose.z,
      shake: reduced || masterMix.freeze ? 0 : liveSensor.shake + tumble.energy * 0.35,
    });
    const grid = sloshGrid();
    const data = sloshTex.image.data as Uint8Array;
    const size = sloshTex.image.width as number;
    const n = grid.n;
    for (let y = 0; y < size; y += 1) {
      const gy = Math.min(n - 1, (y * n) / size) | 0;
      for (let x = 0; x < size; x += 1) {
        const gx = Math.min(n - 1, (x * n) / size) | 0;
        const h = grid.h[gy * n + gx] ?? 0;
        const byte = Math.max(0, Math.min(255, Math.round((h / SLOSH_AMP + 1) * 0.5 * 255)));
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
      potion.current.emissiveIntensity = fx.emissiveIntensity * (0.22 + liquidUniforms.uEnergy.value);
    }
  });

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const inv = new THREE.Matrix4();
    const origin = new THREE.Vector3();
    const dir = new THREE.Vector3();
    setRayView((x, y) => {
      const group = brewGroup.current;
      const rect = gl.domElement.getBoundingClientRect();
      if (!group || rect.width < 1 || rect.height < 1) return null;
      ndc.x = ((x - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((y - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      group.updateWorldMatrix(true, false);
      inv.copy(group.matrixWorld).invert();
      origin.copy(raycaster.ray.origin).applyMatrix4(inv);
      dir.copy(raycaster.ray.direction).transformDirection(inv).normalize();
      return { origin: [origin.x, origin.y, origin.z], dir: [dir.x, dir.y, dir.z] };
    });
    return () => setRayView(null);
  }, [camera, gl]);

  return (
    <group>
      <pointLight ref={glow} position={[0, 1.7, 0.6]} intensity={16} distance={9} />
      <group ref={pot}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.35, 40]} />
          <meshStandardMaterial color="#3a2e28" roughness={1} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow={fx.shadows}>
          <latheGeometry args={[potPoints, detail >= 5 ? 64 : 40]} />
          <meshStandardMaterial color="#6b4c38" roughness={0.72} metalness={0.18} />
        </mesh>
        <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow={fx.shadows}>
          <torusGeometry args={[0.98, 0.055, 12, 40]} />
          <meshStandardMaterial color="#c49255" roughness={0.32} metalness={0.64} />
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
      </group>
      <group name="brew" ref={brewGroup}>
        <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
          <circleGeometry args={[0.78, 64]} />
          <shaderMaterial
            ref={liquid}
            transparent
            depthWrite={false}
            uniforms={liquidUniforms}
            vertexShader={liquidVert}
            fragmentShader={liquidFrag}
          />
        </mesh>
        <SurfaceRings />
        {fx.transmission > 0 && (
          <mesh position={[0, 0.74, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
            <circleGeometry args={[0.76, 64]} />
            <meshPhysicalMaterial
              ref={potion}
              color="#c46a32"
              transmission={fx.transmission}
              thickness={fx.thickness}
              ior={fx.ior}
              iridescence={fx.iridescence}
              iridescenceIOR={1.3}
              clearcoat={fx.clearcoat}
              sheen={fx.sheen}
              sheenColor="#fff1df"
              roughness={0.04}
              metalness={0}
              emissive="#c46a32"
              emissiveIntensity={fx.emissiveIntensity * 0.55}
              transparent
              opacity={0.42}
              depthWrite={false}
              attenuationColor="#e27a3a"
              attenuationDistance={0.35}
              onBeforeCompile={compilePotion}
            />
          </mesh>
        )}
        <group ref={orb} position={[0, 1.62, 0]}>
          <FormMesh form={formRef} uniforms={skinUniforms} detail={detail} />
        </group>
        <Embers drops={drops} vibe={vibe} count={particles} />
        <Falls drops={drops} />
        <PhysVis fx={fx} />
        <Ladle />
      </group>
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
      const last = [...drops].reverse().find((drop) => !drop.neutral);
      (ref.current.material as THREE.PointsMaterial).color.set(
        last ? hslToHex(ingredientById(last.ingredient).hue, 0.85, 0.55) : brew.color,
      );
      const bloom = toolTouch.bloom ? masterMix.bloom : 0.28;
      (ref.current.material as THREE.PointsMaterial).size = (0.06 + brew.glow * 0.05) * (0.35 + bloom * 2.2);
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
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Falls({ drops }: { drops: Drop[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tint = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const now = Date.now();
    let shown = 0;
    for (const drop of drops) {
      const age = (now - drop.at) / 1000;
      if (age < 0 || age > 1.8 || shown >= 8) continue;
      const t = age / 1.8;
      const ease = 1 - (1 - t) * (1 - t);
      const spinA = drop.at * 0.001 + t * 2.4;
      dummy.position.set(Math.cos(spinA) * 0.28, 2.45 - ease * 1.7, Math.sin(spinA) * 0.28);
      dummy.scale.setScalar(1.35 - t * 0.7);
      dummy.rotation.set(spinA, spinA * 0.6, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(shown, dummy.matrix);
      tint.set(hslToHex(ingredientById(drop.ingredient).hue, 0.85, 0.55));
      mesh.setColorAt(shown, tint);
      shown += 1;
    }
    for (let i = shown; i < 8; i += 1) {
      dummy.position.set(0, -8, 0);
      dummy.scale.setScalar(0.001);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, tint);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 8]}>
      <sphereGeometry args={[0.16, 16, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
}

function paintBodies(
  mesh: THREE.InstancedMesh | null,
  kind: "charm" | "spark" | "drop",
  max: number,
  dummy: THREE.Object3D,
  tint: THREE.Color,
) {
  if (!mesh) return;
  const list = liveBodies().filter((body) => body.kind === kind);
  for (let i = 0; i < max; i += 1) {
    const body = list[i];
    if (!body) {
      dummy.position.set(0, -8, 0);
      dummy.scale.setScalar(0.001);
      dummy.rotation.set(0, 0, 0);
    } else {
      dummy.position.set(body.x, body.y, body.z);
      const fade = kind === "spark" ? Math.max(0.2, 1 - body.age / body.life) : 1;
      const hit = body.impact || 0;
      const mul = kind === "charm" ? 3.4 : kind === "drop" ? 2.1 : 2.8;
      const size = body.r * mul * (body.held ? 1.28 : 1) * fade;
      dummy.scale.set(size * (1 + hit * 0.45), size * (1 - hit * 0.42), size * (1 + hit * 0.45));
      dummy.rotation.set(body.age * 2.2, body.hue * 0.02, body.age * 0.8);
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

function PhysVis({ fx }: { fx: FxProfile }) {
  const charms = useRef<THREE.Group>(null);
  const sparksMesh = useRef<THREE.InstancedMesh>(null);
  const dropsMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tint = useMemo(() => new THREE.Color("#ffffff"), []);
  useFrame(() => {
    const group = charms.current;
    if (group) {
      const list = liveBodies().filter((body) => body.kind === "charm");
      for (let i = 0; i < 8; i += 1) {
        const mesh = group.children[i] as THREE.Mesh;
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
        mesh.scale.set(s * (1 + hit * 0.36), s * (1 - hit * 0.42), s * (1 + hit * 0.36));
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.016;
        const mat = mesh.material as THREE.MeshStandardMaterial & { attenuationColor?: THREE.Color };
        mat.color.set(body.color);
        mat.emissive.set(hit > 0.2 ? "#fff6df" : body.color);
        const base = fx.charmTransmission > 0 ? fx.emissiveIntensity * 0.65 : fx.emissiveIntensity * 0.45;
        mat.emissiveIntensity = base * (1 + hit * 2.8);
        if (mat.attenuationColor) mat.attenuationColor.set(body.color);
      }
    }
    paintBodies(sparksMesh.current, "spark", 32, dummy, tint);
    paintBodies(dropsMesh.current, "drop", fx.drops, dummy, tint);
  });
  return (
    <group>
      <group ref={charms}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} visible={false} castShadow={fx.shadows}>
            <icosahedronGeometry args={[1, fx.master ? 1 : 0]} />
            {fx.charmTransmission > 0 ? (
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={Math.min(0.72, fx.charmTransmission)}
                thickness={Math.max(0.25, fx.thickness * 0.5)}
                ior={fx.ior}
                iridescence={fx.iridescence}
                clearcoat={fx.clearcoat}
                sheen={fx.sheen}
                roughness={0.08}
                metalness={0.02}
                emissive="#ffffff"
                emissiveIntensity={fx.emissiveIntensity * 0.65}
                attenuationColor="#ffffff"
                attenuationDistance={0.28}
                transparent
              />
            ) : (
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.28}
                metalness={0.12}
                emissive="#ffffff"
                emissiveIntensity={fx.emissiveIntensity * 0.45}
              />
            )}
          </mesh>
        ))}
      </group>
      <instancedMesh ref={sparksMesh} args={[undefined, undefined, 32]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={Math.max(1.2, fx.emissiveIntensity * 2.2)}
          roughness={0.15}
          toneMapped={false}
        />
      </instancedMesh>
      <instancedMesh ref={dropsMesh} args={[undefined, undefined, 24]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color="#f0b56a" emissive="#e27a3a" emissiveIntensity={0.8} roughness={0.35} />
      </instancedMesh>
    </group>
  );
}

function SurfaceRings() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.forEach((ref, i) => {
      const mesh = ref.current;
      if (!mesh) return;
      const wave = 0.5 + 0.5 * Math.sin(t * 3.1 - i * 0.95);
      mesh.scale.setScalar(0.78 + i * 0.04 + wave * 0.08);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.28 + wave * 0.62;
    });
  });
  return (
    <group position={[0, 0.83, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
      {refs.map((ref, i) => (
        <mesh key={i} ref={ref} renderOrder={3}>
          <ringGeometry args={[0.18 + i * 0.16, 0.23 + i * 0.16, 64]} />
          <meshBasicMaterial
            color="#fff6df"
            transparent
            opacity={0.75}
            depthWrite={false}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Ladle() {
  return (
    <group>
      <mesh position={[0.95, 1.35, 0]} rotation={[0, 0, -0.9]}>
        <cylinderGeometry args={[0.045, 0.055, 1.2, 10]} />
        <meshStandardMaterial color="#f3e2b8" metalness={0.55} roughness={0.32} />
      </mesh>
      <mesh position={[1.45, 1.78, 0]}>
        <sphereGeometry args={[0.22, 18, 14]} />
        <meshStandardMaterial color="#fff8e8" emissive="#ffb15a" emissiveIntensity={0.7} metalness={0.3} roughness={0.22} />
      </mesh>
      <mesh position={[1.02, 1.08, 0]}>
        <boxGeometry args={[0.26, 0.09, 0.12]} />
        <meshStandardMaterial color="#fff6df" emissive="#ffe29a" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function Bridges({ root, fx }: { root: RefObject<THREE.Group | null>; fx: FxProfile }) {
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
      const motion = rememberedMotion() ?? spinSnapshot();
      const snap = physicsSnapshot();
      root.current.userData = {
        conjure: {
          angularVelocity: motion.angularVelocity,
          axis: motion.axis,
          damping: motion.damping,
          spinCount: motion.spinCount,
          physicsSeed: snap.seed,
          gravity: snap.gravity,
          tier: fx.master ? "master" : fx.tier,
          transmission: fx.transmission,
          ior: fx.ior,
        },
      };
      const frames = spinFrames(motion, 6, 36);
      const times: number[] = [];
      const values: number[] = [];
      const euler = new THREE.Euler();
      const quat = new THREE.Quaternion();
      for (const frame of frames) {
        times.push(frame.t);
        euler.set(frame.x, frame.y, frame.z);
        quat.setFromEuler(euler);
        values.push(quat.x, quat.y, quat.z, quat.w);
      }
      const clip = new THREE.AnimationClip("conjure-spin", 6, [
        new THREE.QuaternionKeyframeTrack("brew.quaternion", times, values),
      ]);
      const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js");
      const exporter = new GLTFExporter();
      const bin = await exporter.parseAsync(root.current, { binary: true, animations: [clip] });
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
  }, [gl, root, fx]);
  return null;
}

const liquidVert = /* glsl */ `
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

const liquidFrag = /* glsl */ `
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

function RoomEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.42;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      room.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((item) => item.dispose());
        else mat?.dispose();
      });
    };
  }, [gl, scene]);
  return null;
}

function Grade({ fx }: { fx: FxProfile }) {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = fx.toneMapping === "AgX" ? THREE.AgXToneMapping : THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = fx.master ? 1.0 : 0.92;
  }, [gl, fx.toneMapping, fx.master]);
  return null;
}

function Post({ fx }: { fx: FxProfile }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer | null>(null);
  const bokeh = useRef<BokehPass | null>(null);
  const ratio = useRef(0);
  useEffect(() => {
    const next = new EffectComposer(gl);
    next.addPass(new RenderPass(scene, camera));
    if (fx.bloom > 0) {
      next.addPass(new UnrealBloomPass(new THREE.Vector2(size.width, size.height), fx.bloom, 0.22, 0.94));
    }
    bokeh.current = null;
    if (fx.dof) {
      const dist = camera.position.distanceTo(new THREE.Vector3(0, 0.7, 0));
      const pass = new BokehPass(scene, camera, { focus: dist, aperture: 0.00015, maxblur: 0.0045 });
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
  }, [gl, scene, camera, size.width, size.height, fx.bloom, fx.dof]);
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
      const uniforms = pass.uniforms as { focus?: { value: number } };
      if (uniforms.focus) uniforms.focus.value = camera.position.distanceTo(new THREE.Vector3(0, 0.7, 0));
    }
    current.render();
  }, 1);
  return null;
}

function applyFrame(camera: THREE.Camera, width: number, height: number, aspect: number) {
  const frame = frameFor(width, height);
  camera.position.set(frame.position[0], frame.position[1], frame.position[2]);
  camera.lookAt(frame.lookAt[0], frame.lookAt[1], frame.lookAt[2]);
  if (camera instanceof THREE.PerspectiveCamera) {
    const framed = camera as THREE.PerspectiveCamera & { manual?: boolean };
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
    const view = viewportForFrame(
      size.width,
      size.height,
      canvas.clientWidth,
      canvas.clientHeight,
      window.innerWidth,
      window.innerHeight,
    );
    const aspectW = canvas.clientWidth >= 32 ? canvas.clientWidth : size.width || view.width;
    const aspectH = canvas.clientHeight >= 32 ? canvas.clientHeight : size.height || view.height;
    applyFrame(camera, view.width, view.height, aspectW / Math.max(aspectH, 1));
    const persp = camera as THREE.PerspectiveCamera;
    publishFrameDebug({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      canvasWidth: canvas.clientWidth,
      canvasHeight: canvas.clientHeight,
      dpr: window.devicePixelRatio || 1,
      position: [persp.position.x, persp.position.y, persp.position.z],
      fov: persp.fov,
      mode: frameMode(view.width, view.height),
    });
  });
  return null;
}

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
  const fx = useMemo(() => effectsFor(quality), [quality]);
  const initialCamera = useMemo(() => ({ position: [0, 2.55, 4.05] as [number, number, number], fov: 34 }), []);
  return (
    <Canvas
      dpr={quality.dpr}
      shadows={fx.shadows ? "soft" : false}
      camera={initialCamera}
      gl={{ antialias: quality.tier !== "low", alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: true }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor("#110e0c", 1);
        const view = viewportForFrame(
          gl.domElement.clientWidth,
          gl.domElement.clientHeight,
          gl.domElement.clientWidth,
          gl.domElement.clientHeight,
          window.innerWidth,
          window.innerHeight,
        );
        const aspectW = gl.domElement.clientWidth || view.width;
        const aspectH = gl.domElement.clientHeight || view.height;
        applyFrame(camera, view.width, view.height, aspectW / Math.max(aspectH, 1));
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = fx.toneMapping === "AgX" ? THREE.AgXToneMapping : THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = fx.master ? 1.0 : 0.92;
      }}
    >
      <Grade fx={fx} />
      <FrameCamera />
      <RoomEnv />
      <PerformanceMonitor>
        <AdaptiveDpr />
      </PerformanceMonitor>
      {fx.shadows && (
        <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={6.5} blur={2.4} far={3.4} color="#140e0b" />
      )}
      <group ref={root}>
        <ambientLight intensity={0.32} />
        <pointLight position={[1.8, 2.8, 2.2]} intensity={14} color="#ffc8a0" />
        <pointLight position={[-1.6, 1.6, 1.2]} intensity={6} color="#9ee0c4" />
        <directionalLight
          position={[2.2, 4.4, 2.2]}
          intensity={1.05}
          color="#fff1df"
          castShadow={fx.shadows}
          shadow-mapSize-width={fx.master ? 1024 : 512}
          shadow-mapSize-height={fx.master ? 1024 : 512}
        />
        <Rig
          drops={drops}
          vibe={vibe}
          form={form}
          reduced={reduced}
          particles={fx.particles}
          detail={quality.detail}
          fx={fx}
        />
      </group>
      <Bridges root={root} fx={fx} />
      {(fx.bloom > 0 || fx.dof) && <Post fx={fx} />}
    </Canvas>
  );
}
