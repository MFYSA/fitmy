/**
 * AdMob configuration + a thin, safe wrapper.
 *
 * Web build: banners render as placeholder slots, interstitials are no-ops.
 * Capacitor build: install @capacitor-community/admob and the dynamic import
 * below picks it up automatically — no other code changes needed.
 *
 * Test unit IDs from Google are used whenever `testMode` is true (default),
 * so development never risks a policy strike on real inventory.
 */

export const AD_UNITS = {
  test: {
    banner: "ca-app-pub-3940256099942544/6300978111",
    interstitial: "ca-app-pub-3940256099942544/1033173712",
  },
  // Replace with your real IDs before a production Play Store release.
  production: {
    banner: "",
    interstitial: "",
  },
} as const;

export const AD_CONFIG = {
  testMode: true,
  /** Minimum gap between two interstitials, in ms. */
  interstitialCooldownMs: 3 * 60 * 1000,
  /** Route prefixes where ads must never appear (active workouts/timers). */
  blockedPathPrefixes: ["/session", "/onboarding"] as const,
};

export function adUnits() {
  return AD_CONFIG.testMode ? AD_UNITS.test : AD_UNITS.production;
}

/** True when the given pathname is an ad-free surface (workout in progress). */
export function isAdBlockedPath(pathname: string) {
  return AD_CONFIG.blockedPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

type AdMobLike = {
  initialize: (options: unknown) => Promise<unknown>;
  prepareInterstitial: (options: unknown) => Promise<unknown>;
  showInterstitial: () => Promise<unknown>;
  showBanner: (options: unknown) => Promise<unknown>;
  hideBanner: () => Promise<unknown>;
  removeBanner: () => Promise<unknown>;
};

let adMobPromise: Promise<AdMobLike | null> | null = null;
let initialized = false;
let lastInterstitialAt = 0;

/** True only inside the Capacitor Android/iOS shell. */
export async function isNativeApp() {
  if (typeof window === "undefined") return false;
  try {
    const { Capacitor } = await import("@capacitor/core");
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/** Resolves the native plugin when running inside Capacitor, else null. */
async function loadAdMob(): Promise<AdMobLike | null> {
  if (!(await isNativeApp())) return null;
  if (!adMobPromise) {
    adMobPromise = (async () => {
      try {
        const specifier = "@capacitor-community/admob";
        const mod = (await import(/* @vite-ignore */ specifier)) as unknown as {
          AdMob?: AdMobLike;
        };
        return mod.AdMob ?? null;
      } catch {
        return null; // web build — plugin not installed
      }
    })();
  }
  return adMobPromise;
}

export async function initAds() {
  if (initialized) return;
  const adMob = await loadAdMob();
  if (!adMob) return;
  initialized = true;
  try {
    await adMob.initialize({
      initializeForTesting: AD_CONFIG.testMode,
      testingDevices: [],
    });
  } catch {
    initialized = false;
  }
}

/** Shows the native anchored banner. No-op on the web build. */
export async function showBanner() {
  const adMob = await loadAdMob();
  if (!adMob) return false;
  try {
    await initAds();
    await adMob.showBanner({
      adId: adUnits().banner,
      adSize: "ADAPTIVE_BANNER",
      position: "BOTTOM_CENTER",
      margin: 0,
      isTesting: AD_CONFIG.testMode,
    });
    return true;
  } catch {
    return false;
  }
}

/** Hides the native banner (used on workout/session screens). */
export async function hideBanner() {
  const adMob = await loadAdMob();
  if (!adMob) return;
  try {
    await adMob.hideBanner();
  } catch {
    /* banner was never shown */
  }
}


/**
 * Shows an interstitial if allowed. Returns whether one was displayed.
 * Never call this while a workout timer is running.
 */
export async function showInterstitial(options?: { force?: boolean }) {
  const now = Date.now();
  if (!options?.force && now - lastInterstitialAt < AD_CONFIG.interstitialCooldownMs) {
    return false;
  }
  const adMob = await loadAdMob();
  if (!adMob) return false;
  try {
    await initAds();
    await adMob.prepareInterstitial({
      adId: adUnits().interstitial,
      isTesting: AD_CONFIG.testMode,
    });
    await adMob.showInterstitial();
    lastInterstitialAt = now;
    return true;
  } catch {
    return false;
  }
}
