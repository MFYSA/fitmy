import { Link } from "@tanstack/react-router";
import { Clock, Flame, Heart, ListChecks } from "lucide-react";

import { workoutImage } from "@/lib/fitlife/workout-images";
import { useFitLife } from "@/lib/fitlife/store";
import type { Workout } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

/**
 * Photo-led workout card.
 * `size="hero"` is the full-bleed feature card used on Home.
 */
export function WorkoutCard({
  workout,
  size = "default",
}: {
  workout: Workout;
  size?: "default" | "hero" | "compact";
}) {
  const { state, toggleFavorite } = useFitLife();
  const isFavorite = state.favorites.includes(workout.id);
  const image = workoutImage(workout.id);

  if (size === "compact") {
    return (
      <Link
        to="/workouts/$workoutId"
        params={{ workoutId: workout.id }}
        className="surface-card flex items-center gap-3 overflow-hidden p-2 pr-4 transition-colors hover:bg-elevated"
        aria-label={`${workout.name}, ${workout.difficulty}, ${workout.durationMinutes} minutes`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="kicker block">{workout.category}</span>
          <span className="display-title mt-0.5 block truncate text-base">{workout.name}</span>
          <span className="block text-xs font-medium text-muted-foreground">
            {workout.durationMinutes} min · {workout.calories} kcal
          </span>
        </span>
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card",
        size === "hero" ? "aspect-4/5" : "aspect-16/10",
      )}
    >
      <img
        src={image}
        alt={`${workout.name} — ${workout.muscle} workout`}
        loading={size === "hero" ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="photo-scrim absolute inset-0" aria-hidden="true" />

      <Link
        to="/workouts/$workoutId"
        params={{ workoutId: workout.id }}
        className="absolute inset-0 flex flex-col justify-end p-4"
        aria-label={`${workout.name}, ${workout.difficulty}, ${workout.durationMinutes} minutes`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            {workout.category}
          </span>
          <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur">
            {workout.difficulty}
          </span>
        </div>

        <h3
          className={cn(
            "display-title mt-2 text-foreground",
            size === "hero" ? "text-4xl" : "text-2xl",
          )}
        >
          {workout.name}
        </h3>

        {size === "hero" ? (
          <p className="mt-1.5 line-clamp-2 max-w-[85%] text-sm text-muted-foreground">
            {workout.description}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.durationMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.exercises.length} moves
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(workout.id)}
        aria-label={
          isFavorite ? `Remove ${workout.name} from favorites` : `Add ${workout.name} to favorites`
        }
        aria-pressed={isFavorite}
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 text-foreground backdrop-blur transition-colors hover:bg-background/70"
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")} aria-hidden="true" />
      </button>
    </div>
  );
}
