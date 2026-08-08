"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { Heart, History, Search, SlidersHorizontal, X } from "lucide-react";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { EmptyState } from "@/components/fitlife/stat-card";
import { WorkoutCard } from "@/components/fitlife/workout-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFitLife } from "@/lib/fitlife/store";
import type { Difficulty, Equipment, WorkoutCategory } from "@/lib/fitlife/types";
import { ALL_DIFFICULTIES, ALL_EQUIPMENT, WORKOUTS, WORKOUT_CATEGORIES } from "@/lib/fitlife/workouts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workouts/")({
  head: () => ({
    meta: [
      { title: "Workout Library — 90+ Guided Routines | FitLife" },
      {
        name: "description",
        content:
          "Browse 90+ FitLife workouts by muscle group, difficulty, duration and equipment. Full body, cardio, core, stretching and more — all offline.",
      },
      { property: "og:title", content: "Workout Library — 90+ Guided Routines" },
      {
        property: "og:description",
        content: "Search and filter FitLife workouts by muscle group, difficulty, duration and equipment.",
      },
    ],
  }),
  component: WorkoutsRoute,
});

function WorkoutsRoute() {
  return (
    <OnboardingGate>
      <WorkoutsScreen />
    </OnboardingGate>
  );
}

type DurationFilter = "any" | "short" | "medium" | "long";

function WorkoutsScreen() {
  const { state } = useFitLife();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<WorkoutCategory | "All">("All");
  const [difficulty, setDifficulty] = React.useState<Difficulty | "All">("All");
  const [equipment, setEquipment] = React.useState<Equipment | "All">("All");
  const [duration, setDuration] = React.useState<DurationFilter>("any");
  const [showFilters, setShowFilters] = React.useState(false);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORKOUTS.filter((workout) => {
      if (category !== "All" && workout.category !== category) return false;
      if (difficulty !== "All" && workout.difficulty !== difficulty) return false;
      if (equipment !== "All" && !workout.equipment.includes(equipment)) return false;
      if (duration === "short" && workout.durationMinutes > 10) return false;
      if (duration === "medium" && (workout.durationMinutes <= 10 || workout.durationMinutes > 20)) return false;
      if (duration === "long" && workout.durationMinutes <= 20) return false;
      if (!q) return true;
      return (
        workout.name.toLowerCase().includes(q) ||
        workout.category.toLowerCase().includes(q) ||
        workout.muscle.toLowerCase().includes(q) ||
        workout.difficulty.toLowerCase().includes(q) ||
        workout.description.toLowerCase().includes(q) ||
        workout.equipment.some((e) => e.toLowerCase().includes(q))
      );
    });
  }, [query, category, difficulty, equipment, duration]);

  const filtersActive =
    category !== "All" || difficulty !== "All" || equipment !== "All" || duration !== "any";

  const clearFilters = () => {
    setCategory("All");
    setDifficulty("All");
    setEquipment("All");
    setDuration("any");
  };

  return (
    <AppShell
      title="Workouts"
      subtitle={`${results.length} of ${WORKOUTS.length} workouts`}
      actions={
        <div className="flex items-center gap-1">
          <Link
            to="/favorites"
            aria-label="Favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent"
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            to="/history"
            aria-label="Workout history"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent"
          >
            <History className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search workouts, muscles, equipment…"
              aria-label="Search workouts"
              className="pl-9"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <Button
            variant={showFilters || filtersActive ? "default" : "secondary"}
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-label="Toggle filters"
            className="shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max gap-2 pb-1">
            <FilterChip active={category === "All"} onClick={() => setCategory("All")}>
              All
            </FilterChip>
            {WORKOUT_CATEGORIES.map((item) => (
              <FilterChip key={item} active={category === item} onClick={() => setCategory(item)}>
                {item}
              </FilterChip>
            ))}
          </div>
        </div>

        {showFilters ? (
          <div className="surface-card space-y-4 p-4">
            <FilterGroup label="Difficulty">
              <FilterChip active={difficulty === "All"} onClick={() => setDifficulty("All")}>
                Any
              </FilterChip>
              {ALL_DIFFICULTIES.map((item) => (
                <FilterChip key={item} active={difficulty === item} onClick={() => setDifficulty(item)}>
                  {item}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="Equipment">
              <FilterChip active={equipment === "All"} onClick={() => setEquipment("All")}>
                Any
              </FilterChip>
              {ALL_EQUIPMENT.map((item) => (
                <FilterChip key={item} active={equipment === item} onClick={() => setEquipment(item)}>
                  {item === "None" ? "No Equipment" : item}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="Duration">
              {(
                [
                  ["any", "Any"],
                  ["short", "Under 10 min"],
                  ["medium", "10–20 min"],
                  ["long", "20+ min"],
                ] as Array<[DurationFilter, string]>
              ).map(([value, label]) => (
                <FilterChip key={value} active={duration === value} onClick={() => setDuration(value)}>
                  {label}
                </FilterChip>
              ))}
            </FilterGroup>

            {filtersActive ? (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all filters
              </Button>
            ) : null}
          </div>
        ) : null}

        {results.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No workouts match"
            description="Try a different search term or clear your filters."
            action={
              <Button variant="secondary" onClick={() => { setQuery(""); clearFilters(); }}>
                Reset search
              </Button>
            }
          />
        ) : (
          <ul className="space-y-3">
            {results.map((workout) => (
              <li key={workout.id}>
                <WorkoutCard workout={workout} />
              </li>
            ))}
          </ul>
        )}

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}>
      <Badge
        variant={active ? "default" : "secondary"}
        className={cn("min-h-9 rounded-full px-3 text-xs font-medium", !active && "hover:bg-accent")}
      >
        {children}
      </Badge>
    </button>
  );
}
