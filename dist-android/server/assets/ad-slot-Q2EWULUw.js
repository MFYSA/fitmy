import { i as isAdBlockedPath, n as adUnits, t as AD_CONFIG } from "./ads-VkpEf_bc.js";
import { r as cn } from "./button-PwNqyxv_.js";
import { useRouterState } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/components/fitlife/ad-slot.tsx
/**
* Banner ad slot.
*
* Ads are OFF by default (see AppSettings.adsEnabled) and are automatically
* suppressed on workout/countdown routes (see AD_CONFIG.blockedPathPrefixes).
* On the web build this renders a reserved placeholder; inside a Capacitor
* wrapper the native AdMob banner is displayed in the same space.
*/
function AdSlot({ enabled, label = "Advertisement", className }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (!enabled || isAdBlockedPath(pathname)) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "complementary",
		"aria-label": label,
		"data-ad-unit": adUnits().banner,
		className: cn("flex h-14 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-xs text-muted-foreground", className),
		children: AD_CONFIG.testMode ? "Ad space (test mode)" : "Ad space"
	});
}
//#endregion
export { AdSlot as t };
