# Privacy

Plain language, matching the in-app privacy screen.

- Microphone, camera, and motion start only after a tap. A short note explains what is shared before the browser asks.
- If you say no, the cauldron still works with taps.
- Processing stays on the device. The circle receives levels, not audio or pictures.
- A capture records the brew (still, WebM loop when the browser allows it, recipe, GLB). It does not record the camera.
- Sampling a color stores a hue, not the photo.
- An anonymous device id and your display name stay in this browser (`localStorage`).
- Room membership, drops, and those levels are stored so other devices with the code can join. Rooms drop members after a short silence.
- Share, remix, capture, and mint attempts are counted in a first-party table. No third-party analytics.
- Reports store a creation id and a reason, not a message thread.
- There is no account in this build, and no relayer key. A connected wallet talks to Robinhood Chain testnet from the browser. The wallet's address is handled by the wallet, not stored by the app.
- Opt-in "Include me when I am signed in" is stored locally. It does nothing until a signed-in session exists.
