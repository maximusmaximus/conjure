import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dest = join(process.cwd(), ".vercel/output/functions/__server.func/_libs");
const src = join(process.cwd(), "node_modules/@electric-sql/pglite/dist");
if (!existsSync(dest)) {
  console.log("[pglite] server bundle not present, skip");
  process.exit(0);
}
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  copyFileSync(join(src, name), join(dest, name));
}
console.log("[pglite] copied wasm assets next to the server bundle");
