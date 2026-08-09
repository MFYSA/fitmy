"use client";

import { useRouterState } from "@tanstack/react-router";

import { AD_CONFIG, adUnits, isAdBlockedPath } from "@/lib/fitlife/ads";
import { cn } from "@/lib/utils";

/**
 * Banner ad slot.
 *
 * Ads are OFF by default (see AppSettings.adsEnabled) and are automatically
 * suppressed on workout/countdown routes (see AD_CONFIG.blockedPathPrefixes).
 * On the web build this renders a reserved placeholder; inside a Capacitor
 * wrapper the native AdMob banner is displayed in the same space.
 */
export function AdSlot({
  enabled,
  label = "Advertisement",
  className,
}: {
  enabled: boolean;
  label?: string;
  className?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!enabled || isAdBlockedPath(pathname)) return null;

  return (
    <div
      role="complementary"
      aria-label={label}
      data-ad-unit={adUnits().banner}
      className={cn(
        "flex h-14 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-xs text-muted-foreground",
        className,
      )}
    >
      {AD_CONFIG.testMode ? "Ad space (test mode)" : "Ad space"}
    </div>
  );
}
