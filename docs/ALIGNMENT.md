# Alignment

How a shared cauldron stays fair. This is what the app does.

## Roles

- **Host** opens the circle, picks the vibe, locks the code, removes a player, hands the host role off, and starts a capture.
- **Player** drops ingredients and may turn on their own sensors.
- **Spectator** watches. They do not drop ingredients and they do not vote on a capture.
- If the host's device goes quiet, the room promotes another player.

A circle holds 12 players and 40 spectators. Codes are four characters, and one device can open at most eight circles an hour.

## Sensors

Each person turns on their own microphone, camera, or motion. One is live at a time. Nobody can switch on someone else's sensor. Member rows show which sensor that person has on.

Only derived numbers leave the device: loudness, pitch, burst, tilt, shake, a sampled hue, and a wave amount from frame-difference. Raw audio and frames do not.

## Vibe

The host's vibe is calm, chaotic, or spooky. Everyone in the circle sees it. Sensor mappings use that vibe, so loudness, pitch, and shake push the same brew.

## Capture consent

The host starts a capture.

- Alone, the person who tapped capture is included. They asked for it.
- With other players, each of them gets about five seconds: **Include me** or **Leave me out**.
- No answer counts as leave out, unless that person is signed in and has opted in. This build has no Google sign-in, so the default for everyone except the host is leave out.
- Left-out drops are marked neutral and rendered as a dull ingredient. Those people are not credited.
- The host's tap counts as include for the host.

## Credit

A saved brew lists the display names of people whose drops stayed in. There is no chat. A shared brew has a report button with the reasons spam, unsafe, or other.

## Names

Display names are 2–18 characters. A short block list rejects names. The host can remove a person and lock the code so new people cannot join.
