"use client";

import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { EmptyState } from "@/components/fitlife/stat-card";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Workout History | FitLife" },
      {
        name: "description",
        content: "Every workout you've completed in FitLife, with duration, calories and XP earned.",
      },
      { property: "og:title", content: "Workout History | FitLife" },
      { property: "og:description", content: "Review every completed FitLife session." },
    ],
  }),
  component: () => (
    <OnboardingGate>
      <HistoryScreen />
    </OnboardingGate>
  ),
});

function HistoryScreen() {
  const { state } = useFitLife();
  const entries = [...state.history].sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1));

  return (
    <AppShell title="History" subtitle={`${entries.length} completed`} backTo="/workouts">
      {entries.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No workouts logged"
          description="Finish your first session and it will appear here."
          action={
            <Button asChild>
              <Link to="/workouts">Start a workout</Link>
            </Button>
          }
        />
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.id} className="surface-card flex items-center gap-3 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg">
                💪
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{entry.workoutName}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.day} · {formatDuration(entry.durationSeconds)} · {entry.calories} kcal
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-primary">+{entry.xp} XP</span>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
