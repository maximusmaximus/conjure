import { createFileRoute } from "@tanstack/react-router";
import { PageFrame } from "@/components/conjure/app";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageFrame title="Privacy">
      <p>The microphone, camera, and motion sensors start only after you tap them.</p>
      <p>Raw audio and camera frames stay on this device. A circle only receives levels: loudness, pitch, a color hue, tilt.</p>
      <p>A capture saves the brew, not the camera, unless you sampled a color. That sample is a hue number.</p>
      <p>In a group capture, each player gets a few seconds to be included. Silence means leave me out, unless you are signed in and opted in.</p>
      <p>The host owns the room, can remove someone, and can lock the code. There is no chat.</p>
      <p>Your display name and an anonymous device id live in this browser. Room state is stored so other phones can join the same code.</p>
      <p>Share and remix counts are first-party. No third-party analytics.</p>
    </PageFrame>
  );
}
