"use client";

import { useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { AD_CONFIG, adUnits, hideBanner, isAdBlockedPath, showBanner } from "@/lib/fitlife/ads";
import { cn } from "@/lib/utils";

/**
 * Banner ad slot.
 *
 * Ads are OFF by default (see AppSettings.adsEnabled) and are automatically
 * suppressed on workout/countdown routes (see AD_CONFIG.blockedPathPrefixes).
 * On the web build this renders a reserved placeholder; inside the Capacitor
 * Android shell the native AdMob banner is anchored to the bottom of the screen
 * while this slot reserves the same vertical space.
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
  const active = enabled && !isAdBlockedPath(pathname);

  React.useEffect(() => {
    if (!active) {
      void hideBanner();
      return;
    }
    void showBanner();
    return () => {
      void hideBanner();
    };
  }, [active]);

  if (!active) return null;

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

