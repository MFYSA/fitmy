import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Calculator, Droplets, Dumbbell, Flame, Scale, Target } from "lucide-react";
import { toast } from "sonner";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { LogWeightDialog } from "@/components/fitlife/log-weight-dialog";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { EmptyState, ProgressBar, StatCard } from "@/components/fitlife/stat-card";
import { WeeklyChart } from "@/components/fitlife/weekly-chart";
import { WorkoutCard } from "@/components/fitlife/workout-card";
import { Button } from "@/components/ui/button";
import { MOTIVATION_QUOTES } from "@/lib/fitlife/constants";
import { getLevelInfo, getTodayStats, greetingFor, quoteOfTheDay } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";
import { WORKOUTS } from "@/lib/fitlife/workouts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitLife — Your Daily Workout & Fitness Tracker" },
      {
        name: "description",
        content:
          "FitLife is your offline-ready fitness companion: 90+ guided workouts, a workout timer, water tracking, BMI, weight logging, XP and achievements.",
      },
      { property: "og:title", content: "FitLife — Your Daily Workout & Fitness Tracker" },
      {
        property: "og:description",
        content:
          "Train with 90+ guided workouts, track water and weight, earn XP and keep your streak alive. Works offline.",
      },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <OnboardingGate>
      <HomeScreen />
    </OnboardingGate>
  );
}

function HomeScreen() {
  const { state, addWater } = useFitLife();
  const navigate = useNavigate();
  const today = getTodayStats(state);
  const level = getLevelInfo(state.progress.xp);
  const name = state.profile.name.trim() || "friend";

  const recommended =
    WORKOUTS.filter((w) => w.difficulty === state.profile.fitnessLevel).at(
      new Date().getDate() % Math.max(1, WORKOUTS.filter((w) => w.difficulty === state.profile.fitnessLevel).length),
    ) ?? WORKOUTS[0];

  const workoutPercent = Math.min(100, (today.workouts / today.workoutTarget) * 100);
  const waterPercent = Math.min(100, (today.water / today.waterTarget) * 100);
  const goalPercent = Math.round((workoutPercent + waterPercent) / 2);

  return (
    <AppShell
      title={`${greetingFor()}, ${name} 👋`}
      subtitle={`Level ${level.level} · ${state.progress.xp} XP${state.progress.currentStreak ? ` · 🔥 ${state.progress.currentStreak} day streak` : ""}`}
    >
      <div className="space-y-5">
        <section className="rounded-2xl bg-primary-soft p-4" aria-label="Daily motivation">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Daily motivation
          </p>
          <p className="mt-1 text-sm font-medium text-accent-foreground">
            “{quoteOfTheDay(MOTIVATION_QUOTES)}”
          </p>
        </section>

        <section aria-labelledby="today-heading" className="space-y-3">
          <h2 id="today-heading" className="text-sm font-semibold">
            Today's progress
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Workouts"
              value={`${today.workouts} / ${today.workoutTarget}`}
              icon={<Dumbbell className="h-4 w-4" aria-hidden="true" />}
              tone="primary"
            />
            <StatCard
              label="Water"
              value={`${today.water} / ${today.waterTarget}`}
              hint="glasses"
              icon={<Droplets className="h-4 w-4" aria-hidden="true" />}
              tone="water"
            />
            <StatCard
              label="Calories burned"
              value={`${today.calories} kcal`}
              icon={<Flame className="h-4 w-4" aria-hidden="true" />}
              tone="flame"
            />
            <StatCard
              label="Active time"
              value={`${today.minutes} min`}
              icon={<Target className="h-4 w-4" aria-hidden="true" />}
            />
          </div>

          <div className="surface-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Daily goal</span>
              <span className="text-muted-foreground">{goalPercent}%</span>
            </div>
            <ProgressBar value={goalPercent} label="Daily goal completion" className="mt-2" />
          </div>
        </section>

        <section aria-labelledby="quick-heading" className="space-y-3">
          <h2 id="quick-heading" className="text-sm font-semibold">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-auto justify-start gap-3 rounded-xl py-4"
              onClick={() => void navigate({ to: "/workouts" })}
            >
              <Dumbbell className="h-5 w-5" aria-hidden="true" />
              Start workout
            </Button>
            <Button
              variant="secondary"
              className="h-auto justify-start gap-3 rounded-xl py-4"
              onClick={() => {
                addWater(1);
                toast.success("Water logged 💧");
              }}
            >
              <Droplets className="h-5 w-5 text-water" aria-hidden="true" />
              Log water
            </Button>
            <Button
              variant="secondary"
              className="h-auto justify-start gap-3 rounded-xl py-4"
              onClick={() => void navigate({ to: "/progress", hash: "bmi" })}
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              Calculate BMI
            </Button>
            <LogWeightDialog
              trigger={
                <Button variant="secondary" className="h-auto justify-start gap-3 rounded-xl py-4">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                  Log weight
                </Button>
              }
            />
          </div>
        </section>

        <section aria-labelledby="recommended-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="recommended-heading" className="text-sm font-semibold">
              Today's recommended workout
            </h2>
            <Link to="/workouts" className="text-xs font-medium text-primary">
              See all
            </Link>
          </div>
          {recommended ? (
            <WorkoutCard workout={recommended} />
          ) : (
            <EmptyState title="No workouts found" description="Your workout library is empty." />
          )}
        </section>

        <section aria-labelledby="week-heading" className="space-y-3">
          <h2 id="week-heading" className="text-sm font-semibold">
            Weekly activity
          </h2>
          <div className="surface-card p-4">
            <WeeklyChart history={state.history} />
            <p className="mt-3 text-xs text-muted-foreground">
              Workouts completed over the last 7 days.
            </p>
          </div>
        </section>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}
