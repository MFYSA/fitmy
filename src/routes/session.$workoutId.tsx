"use client";

import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Check, Pause, Play, SkipForward, X } from "lucide-react";

import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getExercise } from "@/lib/fitlife/exercises";
import { formatDuration } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";
import type { Workout } from "@/lib/fitlife/types";
import { getWorkout } from "@/lib/fitlife/workouts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/session/$workoutId")({
  loader: ({ params }) => {
    const workout = getWorkout(params.workoutId);
    if (!workout) throw notFound();
    return { workout };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Session unavailable | FitLife" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Now training: ${loaderData.workout.name} | FitLife`;
    const description = `Guided ${loaderData.workout.durationMinutes}-minute session with timers, rest periods and progress tracking.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell title="Session not found" backTo="/workouts">
      <p className="text-sm text-muted-foreground">That workout no longer exists.</p>
      <Button asChild className="mt-4">
        <Link to="/workouts">Browse workouts</Link>
      </Button>
    </AppShell>
  ),
  component: SessionRoute,
});

function SessionRoute() {
  return (
    <OnboardingGate>
      <SessionScreen />
    </OnboardingGate>
  );
}

type Phase = "work" | "rest" | "done";

function SessionScreen() {
  const { workout } = Route.useLoaderData() as { workout: Workout };
  const { completeWorkout } = useFitLife();
  const navigate = useNavigate();

  const steps = workout.exercises;
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("work");
  const [remaining, setRemaining] = React.useState(steps[0]?.seconds ?? 30);
  const [running, setRunning] = React.useState(true);
  const [elapsed, setElapsed] = React.useState(0);
  const [confirmQuit, setConfirmQuit] = React.useState(false);
  const [savedXp, setSavedXp] = React.useState<number | null>(null);

  const current = steps[index];
  const exercise = current ? getExercise(current.exerciseId) : undefined;
  const nextStep = steps[index + 1];
  const nextExercise = nextStep ? getExercise(nextStep.exerciseId) : undefined;

  const advance = React.useCallback(() => {
    setPhase((prevPhase) => {
      if (prevPhase === "work") {
        const rest = steps[index]?.restSeconds ?? 0;
        const isLast = index === steps.length - 1;
        if (!isLast && rest > 0) {
          setRemaining(rest);
          return "rest";
        }
        if (isLast) {
          setRunning(false);
          return "done";
        }
        setIndex(index + 1);
        setRemaining(steps[index + 1]?.seconds ?? 30);
        return "work";
      }
      // rest -> next work
      setIndex(index + 1);
      setRemaining(steps[index + 1]?.seconds ?? 30);
      return "work";
    });
  }, [index, steps]);

  React.useEffect(() => {
    if (!running || phase === "done") return;
    const id = window.setInterval(() => {
      setElapsed((e) => e + 1);
      setRemaining((r) => {
        if (r <= 1) {
          advance();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, phase, advance]);

  React.useEffect(() => {
    if (phase !== "done" || savedXp !== null) return;
    const result = completeWorkout({
      workout,
      durationSeconds: elapsed,
      exercisesCompleted: steps.length,
    });
    setSavedXp(result.xp);
  }, [phase, savedXp, elapsed, completeWorkout, workout, steps.length]);

  const totalSeconds = steps.reduce((sum, step) => sum + step.seconds + step.restSeconds, 0);
  const progress = Math.min(100, Math.round((elapsed / Math.max(1, totalSeconds)) * 100));
  const phaseTotal = phase === "rest" ? (current?.restSeconds ?? 1) : (current?.seconds ?? 1);
  const ringPercent = Math.max(0, Math.min(100, (remaining / Math.max(1, phaseTotal)) * 100));

  if (phase === "done") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6 text-center">
        <div className="gradient-primary flex h-24 w-24 items-center justify-center rounded-full shadow-raised">
          <Check className="h-12 w-12 text-primary-foreground" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Workout complete!</h1>
          <p className="mt-1 text-muted-foreground">{workout.name}</p>
        </div>
        <dl className="grid w-full max-w-sm grid-cols-3 gap-3">
          <SummaryStat label="Time" value={formatDuration(elapsed)} />
          <SummaryStat label="Exercises" value={`${steps.length}`} />
          <SummaryStat label="XP earned" value={`+${savedXp ?? 0}`} />
        </dl>
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Button size="lg" onClick={() => void navigate({ to: "/" })}>
            Back to home
          </Button>
          <Button variant="secondary" onClick={() => void navigate({ to: "/workouts" })}>
            Pick another workout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex items-center gap-3 px-4 pt-4">
        <button
          type="button"
          onClick={() => setConfirmQuit(true)}
          aria-label="End workout"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{workout.name}</p>
          <p className="text-xs text-muted-foreground">
            Exercise {index + 1} of {steps.length} · {formatDuration(elapsed)} elapsed
          </p>
        </div>
      </header>

      <div className="px-4 pt-3">
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-label="Workout progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="gradient-primary h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8 text-center">
        <p
          className={cn(
            "rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest",
            phase === "rest" ? "bg-secondary text-secondary-foreground" : "bg-primary-soft text-primary",
          )}
        >
          {phase === "rest" ? "Rest" : "Work"}
        </p>

        <h1 className="text-3xl font-bold leading-tight">
          {phase === "rest" ? "Take a breath" : (exercise?.name ?? "Exercise")}
        </h1>

        <div
          className="relative flex h-56 w-56 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${ringPercent}%, var(--secondary) ${ringPercent}%)`,
          }}
        >
          <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-card">
            <span className="text-5xl font-bold tabular-nums" aria-live="polite">
              {formatDuration(remaining)}
            </span>
            <span className="text-xs text-muted-foreground">remaining</span>
          </div>
        </div>

        <p className="max-w-sm text-sm text-muted-foreground">
          {phase === "rest"
            ? nextExercise
              ? `Next up: ${nextExercise.name}`
              : "Almost done — final push!"
            : (exercise?.instructions ?? "")}
        </p>
      </main>

      <div className="safe-bottom border-t border-border px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Button
            size="lg"
            className="h-14 flex-1 gap-2 text-base"
            onClick={() => setRunning((v) => !v)}
          >
            {running ? (
              <>
                <Pause className="h-5 w-5" aria-hidden="true" /> Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" aria-hidden="true" /> Resume
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-14 gap-2"
            onClick={() => {
              setRemaining(0);
              advance();
            }}
          >
            <SkipForward className="h-5 w-5" aria-hidden="true" />
            Skip
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmQuit} onOpenChange={setConfirmQuit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End this workout?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress for this session won't be saved and you won't earn XP.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep going</AlertDialogCancel>
            <AlertDialogAction onClick={() => void navigate({ to: "/workouts" })}>
              End workout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-3">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-lg font-bold">{value}</dd>
    </div>
  );
}
