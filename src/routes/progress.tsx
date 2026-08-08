"use client";

import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Activity, Flame, Scale, TrendingUp, Trophy } from "lucide-react";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { LogWeightDialog } from "@/components/fitlife/log-weight-dialog";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { EmptyState, ProgressBar, StatCard } from "@/components/fitlife/stat-card";
import { WeeklyChart } from "@/components/fitlife/weekly-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACHIEVEMENTS } from "@/lib/fitlife/constants";
import {
  calculateBmi,
  formatDuration,
  getActivityStats,
  getLevelInfo,
} from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress, BMI & Achievements | FitLife" },
      {
        name: "description",
        content:
          "Track your workout streak, weekly activity, calories burned, weight trend, BMI and unlocked achievements in FitLife.",
      },
      { property: "og:title", content: "Your Progress & BMI | FitLife" },
      {
        property: "og:description",
        content: "Streaks, weekly charts, weight history, BMI calculator and achievements.",
      },
    ],
  }),
  component: ProgressRoute,
});

function ProgressRoute() {
  return (
    <OnboardingGate>
      <ProgressScreen />
    </OnboardingGate>
  );
}

function ProgressScreen() {
  const { state } = useFitLife();
  const stats = getActivityStats(state);
  const level = getLevelInfo(state.progress.xp);

  return (
    <AppShell title="Progress" subtitle={`Level ${level.level} · ${state.progress.xp} XP`}>
      <div className="space-y-5">
        <section className="surface-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Level {level.level}</p>
              <p className="text-lg font-bold">{level.title}</p>
            </div>
            <Trophy className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <ProgressBar
            className="mt-3"
            value={level.progressPercent}
            label={`Progress to level ${level.level + 1}`}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {level.xpToNext > 0
              ? `${level.xpToNext} XP to level ${level.level + 1}`
              : "Max level reached — legend status."}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Current streak"
            value={`${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}`}
            hint={`Longest: ${stats.longestStreak}`}
            icon={<Flame className="h-4 w-4" aria-hidden="true" />}
            tone="flame"
          />
          <StatCard
            label="Workouts"
            value={stats.totalWorkouts}
            hint={`${stats.weekWorkouts} this week`}
            icon={<Activity className="h-4 w-4" aria-hidden="true" />}
            tone="primary"
          />
          <StatCard label="Total time" value={formatDuration(stats.totalSeconds)} hint="All time" />
          <StatCard label="Calories" value={`${stats.totalCalories}`} hint="Estimated, all time" />
        </div>

        <Tabs defaultValue="activity">
          <TabsList className="w-full">
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
            <TabsTrigger value="body" className="flex-1">
              Body
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex-1">
              Awards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4 pt-4">
            <section className="surface-card p-4">
              <h2 className="text-sm font-semibold">This week</h2>
              <p className="text-xs text-muted-foreground">
                {stats.weekWorkouts} of {state.goals.weeklyWorkoutTarget} target workouts
              </p>
              <div className="mt-3">
                <WeeklyChart history={state.history} mode="week" metric="minutes" />
              </div>
            </section>

            <section className="surface-card p-4">
              <h2 className="text-sm font-semibold">This month</h2>
              <dl className="mt-2 grid grid-cols-3 gap-3 text-center">
                <div>
                  <dt className="text-[11px] text-muted-foreground">Workouts</dt>
                  <dd className="text-lg font-bold">{stats.monthWorkouts}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted-foreground">Minutes</dt>
                  <dd className="text-lg font-bold">{Math.round(stats.monthSeconds / 60)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted-foreground">Calories</dt>
                  <dd className="text-lg font-bold">{stats.monthCalories}</dd>
                </div>
              </dl>
            </section>
          </TabsContent>

          <TabsContent value="body" className="space-y-4 pt-4">
            <BmiSection />
            <WeightSection />
          </TabsContent>

          <TabsContent value="awards" className="pt-4">
            <ul className="space-y-2">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = state.achievements.find((a) => a.id === achievement.id);
                return (
                  <li
                    key={achievement.id}
                    className={cn(
                      "surface-card flex items-start gap-3 p-3",
                      !unlocked && "opacity-60",
                    )}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {unlocked ? achievement.icon : "🔒"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {unlocked ? (
                      <Badge className="rounded-full text-[10px]">Unlocked</Badge>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </TabsContent>
        </Tabs>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}

const BMI_TONES: Record<string, string> = {
  Underweight: "text-water",
  Normal: "text-primary",
  Overweight: "text-flame",
  Obese: "text-destructive",
};

function BmiSection() {
  const { state, updateProfile } = useFitLife();
  const [height, setHeight] = React.useState(
    state.profile.heightCm ? String(state.profile.heightCm) : "",
  );
  const [weight, setWeight] = React.useState(
    state.profile.weightKg ? String(state.profile.weightKg) : "",
  );
  const [error, setError] = React.useState<string | null>(null);

  const parsedHeight = Number.parseFloat(height.replace(",", "."));
  const parsedWeight = Number.parseFloat(weight.replace(",", "."));
  const bmi = calculateBmi(
    Number.isFinite(parsedHeight) ? parsedHeight : null,
    Number.isFinite(parsedWeight) ? parsedWeight : null,
  );

  const save = () => {
    if (!bmi) {
      setError("Enter a height between 80–250 cm and a weight between 20–400 kg.");
      return;
    }
    setError(null);
    updateProfile({ heightCm: parsedHeight, weightKg: parsedWeight });
  };

  return (
    <section className="surface-card p-4">
      <h2 className="text-sm font-semibold">BMI calculator</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="bmi-height">Height (cm)</Label>
          <Input
            id="bmi-height"
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bmi-weight">Weight (kg)</Label>
          <Input
            id="bmi-weight"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>
      </div>

      {bmi ? (
        <div className="mt-4 rounded-xl bg-secondary p-4 text-center">
          <p className={cn("text-3xl font-bold", BMI_TONES[bmi.category])}>{bmi.value.toFixed(1)}</p>
          <p className="text-sm font-medium">{bmi.category}</p>
          <p className="mt-1 text-xs text-muted-foreground">{bmi.advice}</p>
        </div>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          Enter your height and weight to see your BMI.
        </p>
      )}
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
      <Button className="mt-3 w-full" variant="secondary" onClick={save}>
        Save to profile
      </Button>
    </section>
  );
}

function WeightSection() {
  const { state } = useFitLife();
  const entries = [...state.weights].sort((a, b) => (a.day < b.day ? 1 : -1));
  const latest = entries[0];
  const first = entries[entries.length - 1];
  const change = latest && first ? latest.weightKg - first.weightKg : 0;
  const max = Math.max(...entries.map((e) => e.weightKg), 1);
  const min = Math.min(...entries.map((e) => e.weightKg), max);

  return (
    <section className="surface-card p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Weight log</h2>
          <p className="text-xs text-muted-foreground">
            {latest ? `Latest: ${latest.weightKg} kg` : "No entries yet"}
          </p>
        </div>
        <LogWeightDialog
          trigger={
            <Button size="sm" className="gap-1">
              <Scale className="h-4 w-4" aria-hidden="true" />
              Log
            </Button>
          }
        />
      </div>

      {entries.length === 0 ? (
        <div className="mt-3">
          <EmptyState
            icon="⚖️"
            title="No weight entries"
            description="Log your weight to see your trend over time."
          />
        </div>
      ) : (
        <>
          {entries.length > 1 ? (
            <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              {change === 0
                ? "No change since your first entry"
                : `${change > 0 ? "+" : ""}${change.toFixed(1)} kg since your first entry`}
            </p>
          ) : null}
          <ul className="mt-3 divide-y divide-border">
            {entries.slice(0, 12).map((entry) => {
              const percent = max === min ? 100 : ((entry.weightKg - min) / (max - min)) * 80 + 20;
              return (
                <li key={entry.id} className="flex items-center gap-3 py-2">
                  <span className="w-24 shrink-0 text-xs text-muted-foreground">{entry.day}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <span
                      className="gradient-primary block h-full rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                  <span className="w-16 shrink-0 text-right text-sm font-semibold">
                    {entry.weightKg} kg
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
