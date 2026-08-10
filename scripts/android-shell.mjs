/**
 * Post-build step for the Android bundle.
 *
 * The TanStack Start SPA build emits `_shell.html` (the client-rendered shell)
 * and a `server/` folder that the packaged app never uses. Capacitor expects an
 * `index.html` at the root of `webDir`, so we copy the shell into place and drop
 * the unused server output.
 */
import { cp, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const clientDir = path.join(root, "dist-android", "client");
const shell = path.join(clientDir, "_shell.html");
const index = path.join(clientDir, "index.html");

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(shell))) {
  console.error(`[android] Missing ${shell}. Run the Android vite build first.`);
  process.exit(1);
}

await cp(shell, index);
await rm(path.join(root, "dist-android", "server"), { recursive: true, force: true });

console.log("[android] dist-android/client/index.html ready for Capacitor.");
