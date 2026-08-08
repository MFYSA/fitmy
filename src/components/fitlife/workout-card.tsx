import { Link } from "@tanstack/react-router";
import { Clock, Flame, Heart, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useFitLife } from "@/lib/fitlife/store";
import type { Workout } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

export function WorkoutCard({ workout }: { workout: Workout }) {
  const { state, toggleFavorite } = useFitLife();
  const isFavorite = state.favorites.includes(workout.id);

  return (
    <div className="surface-card relative overflow-hidden">
      <Link
        to="/workouts/$workoutId"
        params={{ workoutId: workout.id }}
        className="block p-4 pr-14"
        aria-label={`${workout.name}, ${workout.difficulty}, ${workout.durationMinutes} minutes`}
      >
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full text-[11px]">
            {workout.category}
          </Badge>
          <Badge variant="outline" className="rounded-full text-[11px]">
            {workout.difficulty}
          </Badge>
        </div>
        <p className="mt-2 font-semibold leading-tight">{workout.name}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{workout.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.durationMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            {workout.exercises.length} exercises
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(workout.id)}
        aria-label={isFavorite ? `Remove ${workout.name} from favorites` : `Add ${workout.name} to favorites`}
        aria-pressed={isFavorite}
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
      >
        <Heart
          className={cn("h-5 w-5", isFavorite && "fill-primary text-primary")}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
