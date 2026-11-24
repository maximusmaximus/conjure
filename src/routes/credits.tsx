import { createFileRoute } from "@tanstack/react-router";
import { PageFrame } from "@/components/conjure/app";

export const Route = createFileRoute("/credits")({
  component: CreditsPage,
});

function CreditsPage() {
  return (
    <PageFrame title="Credits">
      <p>
        <a href="https://github.com/maximusmaximus/xeroemoji">Xero Emoji by Max Infeld, CC BY 4.0</a>
      </p>
      <p>The cauldron, brew, and forms are drawn in the browser. No external meshes are shipped.</p>
      <p>Robinhood Chain testnet is chain id 46630. This build does not include a relayer key or a collection contract address.</p>
      <p>Graphics use three.js with a WebGL2 stage. A WebGPU adapter, when present, only picks the quality tier.</p>
    </PageFrame>
  );
}
