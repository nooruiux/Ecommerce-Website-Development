// Lists every file under /public so components can render a neutral fallback
// for Figma assets that have not been exported yet (no 404s, no layout shift).
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = join(process.cwd(), "public");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : ["/" + relative(root, full).split(sep).join("/")];
  });
}

const files = walk(root).filter((f) => !f.endsWith(".gitkeep")).sort();
writeFileSync(join(process.cwd(), "lib/asset-manifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`asset manifest: ${files.length} files`);
