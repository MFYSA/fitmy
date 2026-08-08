"use client";

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Dumbbell, Flame, Heart, ListChecks } from "lucide-react";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExercise } from "@/lib/fitlife/exercises";
import { formatDuration } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";
import { getWorkout } from "@/lib/fitlife/workouts";
import type { Workout } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workouts/$workoutId")({
  loader: ({ params }) => {
    const workout = getWorkout(params.workoutId);
    if (!workout) throw notFound();
    return { workout };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Workout unavailable | FitLife" }, { name: "robots", content: "noindex" }],
      };
    }
    const { workout } = loaderData;
    const title = `${workout.name} — ${workout.durationMinutes} min ${workout.category} Workout | FitLife`;
    const description = `${workout.description} ${workout.exercises.length} exercises, about ${workout.calories} kcal, ${workout.difficulty} level.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: WorkoutNotFound,
  component: WorkoutDetailRoute,
});

function WorkoutNotFound() {
  return (
    <AppShell title="Workout not found" backTo="/workouts">
      <p className="text-sm text-muted-foreground">
        We couldn't find that workout. It may have been renamed.
      </p>
      <Button asChild className="mt-4">
        <Link to="/workouts">Browse workouts</Link>
      </Button>
    </AppShell>
  );
}

function WorkoutDetailRoute() {
  return (
    <OnboardingGate>
      <WorkoutDetail />
    </OnboardingGate>
  );
}

const CATEGORY_EMOJI: Record<string, string> = {
  Beginner: "🌱",
  "Full Body": "🔥",
  "Upper Body": "💪",
  "Lower Body": "🦵",
  Chest: "🫀",
  Back: "🎽",
  Arms: "💪",
  Legs: "🦵",
  "Abs/Core": "🧘",
  Cardio: "🏃",
  Stretching: "🤸",
  "Home Workout": "🏠",
  "No Equipment": "✨",
};

function WorkoutDetail() {
  const { workout } = Route.useLoaderData() as { workout: Workout };
  const { state, toggleFavorite } = useFitLife();
  const isFavorite = state.favorites.includes(workout.id);

  const totalWork = workout.exercises.reduce((sum, e) => sum + e.seconds, 0);

  return (
    <AppShell
      title={workout.name}
      subtitle={`${workout.category} · ${workout.difficulty}`}
      backTo="/workouts"
      actions={
        <button
          type="button"
          onClick={() => toggleFavorite(workout.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")} aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-5">
        <div className="gradient-primary flex h-40 items-center justify-center rounded-2xl shadow-raised">
          <span className="text-6xl" aria-hidden="true">
            {CATEGORY_EMOJI[workout.category] ?? "💪"}
          </span>
          <span className="sr-only">{workout.category} workout illustration</span>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full">{workout.difficulty}</Badge>
            <Badge variant="secondary" className="rounded-full">
              {workout.muscle}
            </Badge>
            {workout.equipment.map((item) => (
              <Badge key={item} variant="outline" className="rounded-full">
                {item === "None" ? "No equipment" : item}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{workout.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MiniStat icon={<Clock className="h-4 w-4" aria-hidden="true" />} label="Duration" value={`${workout.durationMinutes} min`} />
          <MiniStat icon={<Flame className="h-4 w-4" aria-hidden="true" />} label="Calories" value={`~${workout.calories}`} />
          <MiniStat icon={<ListChecks className="h-4 w-4" aria-hidden="true" />} label="Exercises" value={`${workout.exercises.length}`} />
        </div>

        <section aria-labelledby="exercises-heading">
          <h2 id="exercises-heading" className="mb-3 text-sm font-semibold">
            Exercises · {formatDuration(totalWork)} of work
          </h2>
          <ol className="space-y-2">
            {workout.exercises.map((item, index) => {
              const exercise = getExercise(item.exerciseId);
              return (
                <li key={`${item.exerciseId}-${index}`} className="surface-card flex items-start gap-3 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{exercise?.name ?? "Exercise"}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.seconds}s · {exercise?.equipment === "None" ? "No equipment" : exercise?.equipment}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{exercise?.instructions}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-lg">
          <Button asChild size="lg" className="h-12 w-full gap-2 text-base">
            <Link to="/session/$workoutId" params={{ workoutId: workout.id }}>
              <Dumbbell className="h-5 w-5" aria-hidden="true" />
              Start Workout
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-20" aria-hidden="true" />
    </AppShell>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="surface-card p-3 text-center">
      <span className="flex justify-center text-primary">{icon}</span>
      <p className="mt-1 text-sm font-semibold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
