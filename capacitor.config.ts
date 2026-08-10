import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor config for the FitLife Android app.
 *
 * `webDir` points at the static SPA bundle produced by `bun run build:android`
 * (see vite.config.android.ts). The app is fully offline — all data lives in
 * localStorage — so no dev server / remote URL is used in the release build.
 */
const config: CapacitorConfig = {
  appId: "app.fitlife.tracker",
  appName: "FitLife",
  webDir: "dist-android/client",
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 800,
      backgroundColor: "#0b0f0c",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0b0f0c",
      overlaysWebView: false,
    },
    AdMob: {
      initializeForTesting: true,
    },
  },
};

export default config;
