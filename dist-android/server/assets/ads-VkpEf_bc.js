//#region src/lib/fitlife/ads.ts
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
var AD_UNITS = {
	test: {
		banner: "ca-app-pub-3940256099942544/6300978111",
		interstitial: "ca-app-pub-3940256099942544/1033173712"
	},
	production: {
		banner: "",
		interstitial: ""
	}
};
var AD_CONFIG = {
	testMode: true,
	/** Minimum gap between two interstitials, in ms. */
	interstitialCooldownMs: 180 * 1e3,
	/** Route prefixes where ads must never appear (active workouts/timers). */
	blockedPathPrefixes: ["/session", "/onboarding"]
};
function adUnits() {
	return AD_CONFIG.testMode ? AD_UNITS.test : AD_UNITS.production;
}
/** True when the given pathname is an ad-free surface (workout in progress). */
function isAdBlockedPath(pathname) {
	return AD_CONFIG.blockedPathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
var adMobPromise = null;
var initialized = false;
var lastInterstitialAt = 0;
/** Resolves the native plugin when running inside Capacitor, else null. */
async function loadAdMob() {
	if (typeof window === "undefined") return null;
	if (!adMobPromise) adMobPromise = (async () => {
		try {
			return (await import(
				/* @vite-ignore */
				"@capacitor-community/admob"
)).AdMob ?? null;
		} catch {
			return null;
		}
	})();
	return adMobPromise;
}
async function initAds() {
	if (initialized) return;
	const adMob = await loadAdMob();
	if (!adMob) return;
	initialized = true;
	await adMob.initialize({
		initializeForTesting: AD_CONFIG.testMode,
		testingDevices: []
	});
}
/**
* Shows an interstitial if allowed. Returns whether one was displayed.
* Never call this while a workout timer is running.
*/
async function showInterstitial(options) {
	const now = Date.now();
	if (!options?.force && now - lastInterstitialAt < AD_CONFIG.interstitialCooldownMs) return false;
	const adMob = await loadAdMob();
	if (!adMob) return false;
	try {
		await initAds();
		await adMob.prepareInterstitial({
			adId: adUnits().interstitial,
			isTesting: AD_CONFIG.testMode
		});
		await adMob.showInterstitial();
		lastInterstitialAt = now;
		return true;
	} catch {
		return false;
	}
}
//#endregion
export { showInterstitial as a, isAdBlockedPath as i, adUnits as n, initAds as r, AD_CONFIG as t };
