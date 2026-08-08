import { cn } from "@/lib/utils";

/**
 * AdMob placeholder slot.
 *
 * Ads are OFF by default (see AppSettings.adsEnabled) and are never rendered
 * during workouts or countdown timers. To go live:
 *   1. Wrap the app with Capacitor and install @capacitor-community/admob
 *      (or swap in AdSense for the pure-web build).
 *   2. Put your unit IDs in AD_UNITS below.
 *   3. Replace the placeholder markup with the real banner view.
 */
export const AD_UNITS = {
  // Google's official test IDs — safe for development.
  androidBanner: "ca-app-pub-3940256099942544/6300978111",
  androidInterstitial: "ca-app-pub-3940256099942544/1033173712",
  webAdSlot: "",
} as const;

export function AdSlot({
  enabled,
  label = "Advertisement",
  className,
}: {
  enabled: boolean;
  label?: string;
  className?: string;
}) {
  if (!enabled) return null;

  return (
    <div
      aria-label={label}
      className={cn(
        "flex h-14 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-xs text-muted-foreground",
        className,
      )}
    >
      Ad space (test mode)
    </div>
  );
}
