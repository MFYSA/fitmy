import * as React from "react";

import { useFitLife } from "@/lib/fitlife/store";
import { Button } from "@/components/ui/button";

/** Animated popup shown whenever an achievement is unlocked. */
export function AchievementPopup() {
  const { pendingAchievement, dismissAchievement } = useFitLife();
  const achievement = pendingAchievement;

  React.useEffect(() => {
    if (!achievement) return;
    const timer = window.setTimeout(dismissAchievement, 6000);
    return () => window.clearTimeout(timer);
  }, [achievement, dismissAchievement]);

  if (!achievement) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div className="animate-in slide-in-from-top-4 fade-in w-full max-w-sm rounded-2xl border border-primary/30 bg-card p-4 shadow-raised duration-500">
        <div className="flex items-start gap-3">
          <span
            className="flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-primary-soft text-2xl"
            aria-hidden="true"
          >
            {achievement.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Achievement unlocked
            </p>
            <p className="truncate font-semibold">{achievement.title}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={dismissAchievement} aria-label="Dismiss achievement">
            Nice
          </Button>
        </div>
      </div>
    </div>
  );
}
