import { useEffect, useRef } from "react";
import { burstSound } from "./audio";
import { holdDeviceTilt } from "./brew";
import { liveSensor } from "./live";

export type SensorKind = "mic" | "camera" | "motion" | null;

function hueFromRgb(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 30;
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}

function estimatePitch(time: Uint8Array, sampleRate: number): number {
  let best = 0;
  let bestLag = 0;
  for (let lag = 32; lag < 420; lag += 2) {
    let corr = 0;
    for (let i = 0; i < time.length - lag; i += 8) {
      corr += ((time[i] - 128) / 128) * ((time[i + lag] - 128) / 128);
    }
    if (corr > best) {
      best = corr;
      bestLag = lag;
    }
  }
  if (!bestLag || best < 6) return 0.5;
  const freq = sampleRate / bestLag;
  return Math.max(0, Math.min(1, (freq - 80) / 640));
}

export function useSensors(kind: SensorKind, onError: (message: string) => void) {
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const sampleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    sampleRef.current = null;
    if (!kind) {
      liveSensor.loudness = 0;
      liveSensor.wave = 0;
      return;
    }
    let stop = false;
    const bucket: (() => void)[] = [];
    const fail = (message: string) => {
      if (!stop) onErrorRef.current(message);
    };

    if (kind === "mic") {
      void (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          if (stop) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new Ctx();
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
            if (rms - previous > 0.28 && rms > 0.42) {
              liveSensor.burst = 1;
              burstSound();
            }
            previous = previous * 0.65 + rms * 0.35;
            liveSensor.pitch = estimatePitch(time, ctx.sampleRate);
            frame = requestAnimationFrame(loop);
          };
          frame = requestAnimationFrame(loop);
          bucket.push(() => {
            cancelAnimationFrame(frame);
            stream.getTracks().forEach((track) => track.stop());
            void ctx.close();
            liveSensor.loudness = 0;
          });
        } catch {
          fail("Microphone stayed off.");
        }
      })();
    }

    if (kind === "camera") {
      void (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: "environment", width: { ideal: 160 }, height: { ideal: 120 } },
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
          let prev: Uint8ClampedArray | null = null;
          let frame = 0;
          const loop = () => {
            if (ctx && video.readyState >= 2) {
              ctx.drawImage(video, 0, 0, 32, 24);
              const data = ctx.getImageData(0, 0, 32, 24).data;
              if (prev) {
                let diff = 0;
                for (let i = 0; i < data.length; i += 16) diff += Math.abs(data[i] - prev[i]);
                const wave = Math.min(1, diff / 3500);
                if (wave > 0.08) liveSensor.wave = Math.max(liveSensor.wave, wave);
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
    }

    if (kind === "motion") {
      void (async () => {
        try {
          const motionEvent = DeviceMotionEvent as unknown as {
            requestPermission?: () => Promise<string>;
          };
          if (typeof motionEvent.requestPermission === "function") {
            const result = await motionEvent.requestPermission();
            if (result !== "granted") {
              fail("Motion stayed off.");
              return;
            }
          }
          if (stop) return;
          const onMotion = (event: DeviceMotionEvent) => {
            const gravity = event.accelerationIncludingGravity;
            if (gravity) {
              liveSensor.tiltX = Math.max(-1, Math.min(1, (gravity.x ?? 0) / 9));
              liveSensor.tiltY = Math.max(-1, Math.min(1, (gravity.y ?? 0) / 12));
              holdDeviceTilt();
            }
            const acc = event.acceleration;
            const mag = Math.hypot(acc?.x ?? 0, acc?.y ?? 0, acc?.z ?? 0);
            if (mag > 16) liveSensor.shake = 1;
          };
          const onOri = (event: DeviceOrientationEvent) => {
            const extra = event as DeviceOrientationEvent & { webkitCompassHeading?: number };
            const heading = extra.webkitCompassHeading ?? event.alpha ?? 0;
            liveSensor.pitch = ((((heading % 360) + 360) % 360) / 360);
          };
          window.addEventListener("devicemotion", onMotion);
          window.addEventListener("deviceorientation", onOri);
          bucket.push(() => {
            window.removeEventListener("devicemotion", onMotion);
            window.removeEventListener("deviceorientation", onOri);
            liveSensor.tiltX = 0;
            liveSensor.tiltY = 0;
          });
          const Ambient = (
            window as unknown as {
              AmbientLightSensor?: new () => {
                illuminance: number;
                start: () => void;
                stop: () => void;
                addEventListener: (name: string, fn: () => void) => void;
              };
            }
          ).AmbientLightSensor;
          if (Ambient) {
            try {
              const sensor = new Ambient();
              sensor.addEventListener("reading", () => {
                liveSensor.loudness = Math.min(1, (sensor.illuminance || 0) / 700) * 0.4;
              });
              sensor.start();
              bucket.push(() => sensor.stop());
            } catch {
              /* this browser has no ambient light sensor */
            }
          }
        } catch {
          fail("Motion stayed off.");
        }
      })();
    }

    return () => {
      stop = true;
      bucket.forEach((fn) => fn());
    };
  }, [kind]);

  return {
    sampleColor: () => sampleRef.current?.(),
  };
}
