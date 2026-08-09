import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calculator, Droplets, Dumbbell, Flame, Scale, Timer } from "lucide-react";
import { toast } from "sonner";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { LogWeightDialog } from "@/components/fitlife/log-weight-dialog";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { ActivityRing, EmptyState, StatCard } from "@/components/fitlife/stat-card";
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
          "FitLife is your offline-ready fitness companion: 96 guided workouts, a workout timer, water tracking, BMI, weight logging, XP and achievements.",
      },
      { property: "og:title", content: "FitLife — Your Daily Workout & Fitness Tracker" },
      {
        property: "og:description",
        content:
          "Train with 96 guided workouts, track water and weight, earn XP and keep your streak alive. Works offline.",
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

  const pool = WORKOUTS.filter((w) => w.difficulty === state.profile.fitnessLevel);
  const day = new Date().getDate();
  const recommended = pool.length ? pool[day % pool.length] : WORKOUTS[0];
  const upNext = pool.length
    ? [pool[(day + 1) % pool.length], pool[(day + 2) % pool.length], pool[(day + 3) % pool.length]]
    : WORKOUTS.slice(0, 3);

  const workoutPercent = Math.min(100, (today.workouts / today.workoutTarget) * 100);
  const waterPercent = Math.min(100, (today.water / today.waterTarget) * 100);
  const goalPercent = Math.round((workoutPercent + waterPercent) / 2);

  return (
    <AppShell
      title={`${greetingFor()}, ${name}`}
      subtitle={`Level ${level.level} · ${state.progress.xp} XP${
        state.progress.currentStreak ? ` · ${state.progress.currentStreak} day streak` : ""
      }`}
    >
      <div className="space-y-6">
        <section
          className="surface-card flex items-center gap-5 p-5"
          aria-labelledby="today-ring-heading"
        >
          <ActivityRing value={goalPercent} label="Daily goal completion">
            <span className="display-title text-3xl tabular-nums">{goalPercent}%</span>
            <span className="kicker mt-1">Today</span>
          </ActivityRing>
          <div className="min-w-0 flex-1">
            <h2 id="today-ring-heading" className="display-title text-xl">
              Move today
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              “{quoteOfTheDay(MOTIVATION_QUOTES)}”
            </p>
            <Button
              className="mt-3 h-11 w-full rounded-full text-xs font-bold uppercase tracking-widest"
              onClick={() => void navigate({ to: "/workouts" })}
            >
              Start training
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </section>

        <section aria-labelledby="recommended-heading" className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="kicker">Featured session</p>
              <h2 id="recommended-heading" className="display-title text-2xl">
                Today's pick
              </h2>
            </div>
            <Link
              to="/workouts"
              className="text-[11px] font-bold uppercase tracking-widest text-primary"
            >
              See all
            </Link>
          </div>
          {recommended ? (
            <WorkoutCard workout={recommended} size="hero" />
          ) : (
            <EmptyState title="No workouts found" description="Your workout library is empty." />
          )}
        </section>

        <section aria-labelledby="stats-heading" className="space-y-3">
          <h2 id="stats-heading" className="kicker">
            Today's numbers
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Workouts"
              value={`${today.workouts}/${today.workoutTarget}`}
              icon={<Dumbbell className="h-4 w-4" aria-hidden="true" />}
              tone="primary"
            />
            <StatCard
              label="Water"
              value={`${today.water}/${today.waterTarget}`}
              hint="glasses"
              icon={<Droplets className="h-4 w-4" aria-hidden="true" />}
              tone="water"
            />
            <StatCard
              label="Calories"
              value={today.calories}
              hint="kcal burned"
              icon={<Flame className="h-4 w-4" aria-hidden="true" />}
              tone="flame"
            />
            <StatCard
              label="Active time"
              value={`${today.minutes}m`}
              icon={<Timer className="h-4 w-4" aria-hidden="true" />}
            />
          </div>
        </section>

        <section aria-labelledby="quick-heading" className="space-y-3">
          <h2 id="quick-heading" className="kicker">
            Quick log
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="secondary"
              className="h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest"
              onClick={() => {
                addWater(1);
                toast.success("Water logged");
              }}
            >
              <Droplets className="h-5 w-5 text-water" aria-hidden="true" />
              Water
            </Button>
            <Button
              variant="secondary"
              className="h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest"
              onClick={() => void navigate({ to: "/progress", hash: "bmi" })}
            >
              <Calculator className="h-5 w-5" aria-hidden="true" />
              BMI
            </Button>
            <LogWeightDialog
              trigger={
                <Button
                  variant="secondary"
                  className="h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest"
                >
                  <Scale className="h-5 w-5" aria-hidden="true" />
                  Weight
                </Button>
              }
            />
          </div>
        </section>

        <section aria-labelledby="upnext-heading" className="space-y-3">
          <h2 id="upnext-heading" className="kicker">
            Up next for you
          </h2>
          <ul className="space-y-2">
            {upNext.filter(Boolean).map((workout) => (
              <li key={workout.id}>
                <WorkoutCard workout={workout} size="compact" />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="week-heading" className="space-y-3">
          <h2 id="week-heading" className="kicker">
            Last 7 days
          </h2>
          <div className="surface-card p-4">
            <WeeklyChart history={state.history} />
          </div>
        </section>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}
