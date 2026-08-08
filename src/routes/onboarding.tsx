"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FITNESS_GOALS, FITNESS_LEVELS, GENDERS } from "@/lib/fitlife/constants";
import { useFitLife } from "@/lib/fitlife/store";
import type { Difficulty, FitnessGoal, Gender } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get Started with FitLife — Set Up Your Profile" },
      {
        name: "description",
        content:
          "Tell FitLife a little about you — your name, fitness level and goal — and get a personalised workout plan in under a minute.",
      },
      { property: "og:title", content: "Get Started with FitLife" },
      {
        property: "og:description",
        content: "Set your fitness level, goal and daily targets to personalise FitLife.",
      },
    ],
  }),
  component: OnboardingScreen,
});

const STEPS = ["Welcome", "About you", "Fitness level", "Your goal", "Daily targets"] as const;

function OnboardingScreen() {
  const { completeOnboarding, state, ready } = useFitLife();
  const navigate = useNavigate();

  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<Gender | null>(null);
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [level, setLevel] = React.useState<Difficulty>("Beginner");
  const [goal, setGoal] = React.useState<FitnessGoal>("Improve Fitness");
  const [weeklyTarget, setWeeklyTarget] = React.useState(4);
  const [waterTarget, setWaterTarget] = React.useState(8);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (ready && state.onboarded) void navigate({ to: "/", replace: true });
  }, [ready, state.onboarded, navigate]);

  const numberOrNull = (value: string, min: number, max: number) => {
    const parsed = Number.parseFloat(value.replace(",", "."));
    if (!value.trim()) return null;
    if (!Number.isFinite(parsed) || parsed < min || parsed > max) return undefined;
    return parsed;
  };

  const validateAboutYou = () => {
    const next: Record<string, string> = {};
    if (numberOrNull(age, 10, 100) === undefined) next["age"] = "Enter an age between 10 and 100, or leave it blank.";
    if (numberOrNull(height, 80, 250) === undefined) next["height"] = "Enter a height between 80 and 250 cm, or leave it blank.";
    if (numberOrNull(weight, 20, 400) === undefined) next["weight"] = "Enter a weight between 20 and 400 kg, or leave it blank.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateAboutYou()) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const finish = () => {
    completeOnboarding(
      {
        name: name.trim(),
        age: (numberOrNull(age, 10, 100) ?? null) as number | null,
        gender,
        heightCm: (numberOrNull(height, 80, 250) ?? null) as number | null,
        weightKg: (numberOrNull(weight, 20, 400) ?? null) as number | null,
        fitnessLevel: level,
        goal,
      },
      {
        weeklyWorkoutTarget: weeklyTarget,
        dailyWaterTarget: waterTarget,
        dailyWorkoutTarget: 1,
      },
    );
    void navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="mx-auto w-full max-w-lg flex-1 px-5 pb-8 pt-6">
        <div className="flex items-center gap-2" aria-hidden="true">
          {STEPS.map((label, index) => (
            <span
              key={label}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index <= step ? "gradient-primary" : "bg-secondary",
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </p>

        <div className="mt-6">
          {step === 0 ? (
            <section className="space-y-4 text-center">
              <div className="gradient-primary mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-5xl shadow-raised">
                💪
              </div>
              <h1 className="text-3xl font-bold">Welcome to FitLife</h1>
              <p className="text-muted-foreground">
                90+ guided workouts, a real workout timer, water and weight tracking, XP and
                achievements — all stored on your device and fully usable offline.
              </p>
              <ul className="mx-auto max-w-sm space-y-2 pt-2 text-left text-sm">
                <li className="surface-card px-4 py-3">🏋️ Follow guided workouts with timers</li>
                <li className="surface-card px-4 py-3">📈 Track weight, BMI and streaks</li>
                <li className="surface-card px-4 py-3">🏆 Earn XP, levels and achievements</li>
              </ul>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="space-y-4">
              <h1 className="text-2xl font-bold">About you</h1>
              <p className="text-sm text-muted-foreground">
                Everything here is optional except your name — you can change it later in your
                profile.
              </p>
              <div className="space-y-2">
                <Label htmlFor="ob-name">Name</Label>
                <Input
                  id="ob-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex"
                  autoComplete="given-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="ob-age">Age</Label>
                  <Input
                    id="ob-age"
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="28"
                    aria-invalid={errors["age"] ? true : undefined}
                  />
                  {errors["age"] ? <p className="text-xs text-destructive">{errors["age"]}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ob-height">Height (cm)</Label>
                  <Input
                    id="ob-height"
                    inputMode="decimal"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    aria-invalid={errors["height"] ? true : undefined}
                  />
                  {errors["height"] ? <p className="text-xs text-destructive">{errors["height"]}</p> : null}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-weight">Weight (kg)</Label>
                <Input
                  id="ob-weight"
                  inputMode="decimal"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  aria-invalid={errors["weight"] ? true : undefined}
                />
                {errors["weight"] ? <p className="text-xs text-destructive">{errors["weight"]}</p> : null}
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Gender</legend>
                <div className="grid grid-cols-2 gap-2">
                  {GENDERS.map((option) => (
                    <ChoiceButton
                      key={option}
                      selected={gender === option}
                      onClick={() => setGender(option)}
                    >
                      {option}
                    </ChoiceButton>
                  ))}
                </div>
              </fieldset>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-4">
              <h1 className="text-2xl font-bold">Your fitness level</h1>
              <p className="text-sm text-muted-foreground">
                We'll recommend workouts that match. You can change this any time.
              </p>
              <div className="space-y-2">
                {FITNESS_LEVELS.map((option) => (
                  <ChoiceButton key={option} selected={level === option} onClick={() => setLevel(option)} block>
                    <span className="font-semibold">{option}</span>
                    <span className="block text-xs opacity-80">
                      {option === "Beginner"
                        ? "New to exercise or coming back after a break"
                        : option === "Intermediate"
                          ? "Training semi-regularly and comfortable with the basics"
                          : "Training consistently and ready for high intensity"}
                    </span>
                  </ChoiceButton>
                ))}
              </div>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-4">
              <h1 className="text-2xl font-bold">What's your goal?</h1>
              <div className="grid grid-cols-2 gap-2">
                {FITNESS_GOALS.map((option) => (
                  <ChoiceButton key={option} selected={goal === option} onClick={() => setGoal(option)}>
                    {option}
                  </ChoiceButton>
                ))}
              </div>
            </section>
          ) : null}

          {step === 4 ? (
            <section className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Daily targets</h1>
                <p className="text-sm text-muted-foreground">Choose something realistic — you can adjust later.</p>
              </div>
              <div className="space-y-2">
                <Label>Workouts per week</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5, 6, 7].map((n) => (
                    <ChoiceButton key={n} selected={weeklyTarget === n} onClick={() => setWeeklyTarget(n)}>
                      {n}
                    </ChoiceButton>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Glasses of water per day</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 8, 10, 12].map((n) => (
                    <ChoiceButton key={n} selected={waterTarget === n} onClick={() => setWaterTarget(n)}>
                      {n}
                    </ChoiceButton>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <div className="safe-bottom sticky bottom-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-5 py-3">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className="gap-1">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>
          ) : null}
          {step < STEPS.length - 1 ? (
            <Button className="ml-auto min-w-32 gap-1" onClick={goNext}>
              {step === 0 ? "Get started" : "Continue"}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button className="ml-auto min-w-40" onClick={finish}>
              Let's Get Started 💪
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  children,
  block = false,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-12 rounded-xl border px-3 py-2.5 text-sm transition-colors",
        block ? "w-full text-left" : "text-center",
        selected
          ? "border-primary bg-primary-soft font-semibold text-accent-foreground"
          : "border-border bg-card hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}
