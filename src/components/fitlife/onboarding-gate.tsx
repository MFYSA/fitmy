"use client";

import { useNavigate } from "@tanstack/react-router";
import * as React from "react";

import { useFitLife } from "@/lib/fitlife/store";

/**
 * Sends first-time users through onboarding before any main screen renders.
 * Renders nothing until local data has been read, which avoids a flash of
 * empty dashboard on first paint.
 */
export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { state, ready } = useFitLife();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (ready && !state.onboarded) {
      void navigate({ to: "/onboarding", replace: true });
    }
  }, [ready, state.onboarded, navigate]);

  if (!ready || !state.onboarded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="gradient-primary flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl text-2xl">
            💪
          </div>
          <p className="text-sm text-muted-foreground">Loading FitLife…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
