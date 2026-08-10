/**
 * Vite config used ONLY for the Android (Capacitor) build.
 *
 *   bun run build:android
 *
 * Produces a fully static, client-rendered bundle in `dist-android/` that
 * Capacitor copies into the Android WebView. Nitro/SSR is disabled because the
 * packaged app has no server — every screen already runs on localStorage.
 *
 * The web deployment keeps using vite.config.ts untouched.
 */
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  tanstackStart: {
    // Single static shell; routing happens client-side inside the WebView.
    spa: { enabled: true },
    prerender: { enabled: false },
    router: { basepath: "/" },
  },
  vite: {
    base: "./",
    build: {
      outDir: "dist-android",
      emptyOutDir: true,
      sourcemap: false,
    },
  },
});
