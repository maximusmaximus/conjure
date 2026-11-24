import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, "assets/MANIFEST.json"), "utf8"));
const allowed = new Set(["CC0-1.0", "CC-BY-4.0"]);
const files = new Map(manifest.assets.map((asset) => [asset.path, asset]));
const dir = join(root, "public/xeroemoji/svg");
const errors = [];

for (const name of readdirSync(dir)) {
  if (!name.endsWith(".svg")) continue;
  const path = `public/xeroemoji/svg/${name}`;
  const entry = files.get(path);
  if (!entry) errors.push(`missing manifest entry: ${path}`);
  else if (!allowed.has(entry.license)) errors.push(`license not allowed: ${path} ${entry.license}`);
}

for (const asset of manifest.assets) {
  if (!allowed.has(asset.license)) errors.push(`license not allowed: ${asset.path}`);
  if (!asset.source || !asset.author) errors.push(`incomplete: ${asset.path}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`manifest ok (${manifest.assets.length} assets)`);
