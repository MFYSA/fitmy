"use client";

import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { EmptyState } from "@/components/fitlife/stat-card";
import { WorkoutCard } from "@/components/fitlife/workout-card";
import { Button } from "@/components/ui/button";
import { useFitLife } from "@/lib/fitlife/store";
import { getWorkout } from "@/lib/fitlife/workouts";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorite Workouts | FitLife" },
      {
        name: "description",
        content: "Your saved FitLife workouts, ready to start again in one tap — available offline.",
      },
      { property: "og:title", content: "Favorite Workouts | FitLife" },
      { property: "og:description", content: "Your saved FitLife workouts in one place." },
    ],
  }),
  component: () => (
    <OnboardingGate>
      <FavoritesScreen />
    </OnboardingGate>
  ),
});

function FavoritesScreen() {
  const { state } = useFitLife();
  const workouts = state.favorites.map((id) => getWorkout(id)).filter((w) => w !== undefined);

  return (
    <AppShell title="Favorites" subtitle={`${workouts.length} saved`} backTo="/workouts">
      {workouts.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          description="Tap the heart on any workout to save it here for quick access."
          action={
            <Button asChild>
              <Link to="/workouts">Browse workouts</Link>
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {workouts.map((workout) => (
            <li key={workout.id}>
              <WorkoutCard workout={workout} />
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
