"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Droplets, Flame, LogOut, Settings, Trophy } from "lucide-react";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { LogWeightDialog } from "@/components/fitlife/log-weight-dialog";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { ProgressBar, StatCard } from "@/components/fitlife/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FITNESS_GOALS, FITNESS_LEVELS } from "@/lib/fitlife/constants";
import { formatDuration, getActivityStats, getLevelInfo } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";
import type { Difficulty, FitnessGoal } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile & Goals | FitLife" },
      {
        name: "description",
        content:
          "Manage your FitLife profile, fitness level, goal, weekly workout target and daily water target, and review your lifetime stats.",
      },
      { property: "og:title", content: "Your Profile & Goals | FitLife" },
      {
        property: "og:description",
        content: "Update your details, targets and review lifetime training stats.",
      },
    ],
  }),
  component: ProfileRoute,
});

function ProfileRoute() {
  return (
    <OnboardingGate>
      <ProfileScreen />
    </OnboardingGate>
  );
}

function ProfileScreen() {
  const { state, updateProfile, updateGoals } = useFitLife();
  const stats = getActivityStats(state);
  const level = getLevelInfo(state.progress.xp);

  return (
    <AppShell
      title="Profile"
      subtitle={state.profile.name || "FitLife member"}
      actions={
        <Link
          to="/settings"
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
        </Link>
      }
    >
      <div className="space-y-5">
        <section className="surface-card flex items-center gap-4 p-4">
          <span className="gradient-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-primary-foreground">
            {(state.profile.name || "F").slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold">{state.profile.name || "FitLife member"}</p>
            <p className="text-xs text-muted-foreground">
              Level {level.level} · {state.progress.xp} XP · {state.profile.fitnessLevel}
            </p>
            <ProgressBar className="mt-2" value={level.progressPercent} label="Level progress" />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Workouts"
            value={stats.totalWorkouts}
            icon={<Trophy className="h-4 w-4" aria-hidden="true" />}
            tone="primary"
          />
          <StatCard
            label="Streak"
            value={`${stats.currentStreak} d`}
            icon={<Flame className="h-4 w-4" aria-hidden="true" />}
            tone="flame"
          />
          <StatCard label="Total time" value={formatDuration(stats.totalSeconds)} />
          <StatCard label="Calories" value={`${stats.totalCalories}`} />
        </div>

        <section className="surface-card space-y-4 p-4">
          <h2 className="text-sm font-semibold">Your details</h2>
          <div className="space-y-1.5">
            <Label htmlFor="p-name">Name</Label>
            <Input
              id="p-name"
              value={state.profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="p-height">Height (cm)</Label>
              <Input
                id="p-height"
                inputMode="decimal"
                value={state.profile.heightCm ?? ""}
                onChange={(e) => {
                  const n = Number.parseFloat(e.target.value);
                  updateProfile({ heightCm: Number.isFinite(n) ? n : null });
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Weight (kg)</Label>
              <LogWeightDialog
                trigger={
                  <Button variant="secondary" className="w-full justify-start">
                    {state.profile.weightKg ? `${state.profile.weightKg} kg` : "Log weight"}
                  </Button>
                }
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Fitness level</legend>
            <div className="flex flex-wrap gap-2">
              {FITNESS_LEVELS.map((option) => (
                <Chip
                  key={option}
                  active={state.profile.fitnessLevel === option}
                  onClick={() => updateProfile({ fitnessLevel: option as Difficulty })}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Goal</legend>
            <div className="flex flex-wrap gap-2">
              {FITNESS_GOALS.map((option) => (
                <Chip
                  key={option}
                  active={state.profile.goal === option}
                  onClick={() => updateProfile({ goal: option as FitnessGoal })}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="surface-card space-y-4 p-4">
          <h2 className="text-sm font-semibold">Targets</h2>
          <div className="space-y-2">
            <Label>Workouts per week</Label>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6, 7].map((n) => (
                <Chip
                  key={n}
                  active={state.goals.weeklyWorkoutTarget === n}
                  onClick={() => updateGoals({ weeklyWorkoutTarget: n })}
                >
                  {n}
                </Chip>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-water" aria-hidden="true" />
              Glasses of water per day
            </Label>
            <div className="flex flex-wrap gap-2">
              {[6, 8, 10, 12].map((n) => (
                <Chip
                  key={n}
                  active={state.goals.dailyWaterTarget === n}
                  onClick={() => updateGoals({ dailyWaterTarget: n })}
                >
                  {n}
                </Chip>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-2">
          <Button asChild variant="secondary" className="justify-start gap-2">
            <Link to="/history">
              <Bell className="h-4 w-4" aria-hidden="true" />
              Workout history
            </Link>
          </Button>
          <Button asChild variant="secondary" className="justify-start gap-2">
            <Link to="/settings">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Settings & data
            </Link>
          </Button>
        </div>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-10 rounded-full border px-3 text-sm transition-colors",
        active
          ? "border-primary bg-primary-soft font-semibold text-primary"
          : "border-border bg-card hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
