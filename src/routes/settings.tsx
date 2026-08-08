"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFitLife } from "@/lib/fitlife/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Data | FitLife" },
      {
        name: "description",
        content:
          "Control your FitLife theme, reminders, sounds, rest periods and stored data. Everything stays on your device.",
      },
      { property: "og:title", content: "Settings & Data | FitLife" },
      { property: "og:description", content: "Theme, reminders, rest timing and data controls." },
    ],
  }),
  component: () => (
    <OnboardingGate>
      <SettingsScreen />
    </OnboardingGate>
  ),
});

function SettingsScreen() {
  const { state, updateSettings, resetProgress, resetEverything, storageWorking } = useFitLife();
  const navigate = useNavigate();
  const s = state.settings;

  return (
    <AppShell title="Settings" backTo="/profile">
      <div className="space-y-5">
        <section className="surface-card p-4">
          <h2 className="text-sm font-semibold">Appearance</h2>
          <div className="mt-3 flex gap-2">
            {(["light", "dark", "system"] as const).map((theme) => (
              <Button
                key={theme}
                variant={s.theme === theme ? "default" : "secondary"}
                className="flex-1 capitalize"
                onClick={() => updateSettings({ theme })}
              >
                {theme}
              </Button>
            ))}
          </div>
        </section>

        <section className="surface-card divide-y divide-border p-4">
          <h2 className="pb-3 text-sm font-semibold">Preferences</h2>
          <ToggleRow
            id="set-sound"
            label="Timer sounds"
            description="Play a cue when an interval ends"
            checked={s.sound}
            onChange={(v) => updateSettings({ sound: v })}
          />
          <ToggleRow
            id="set-rest"
            label="Rest between exercises"
            description="Insert a rest interval during sessions"
            checked={s.restBetweenExercises}
            onChange={(v) => updateSettings({ restBetweenExercises: v })}
          />
          <ToggleRow
            id="set-water"
            label="Water reminders"
            description="Nudge yourself to keep hydrated"
            checked={s.waterReminders}
            onChange={(v) => updateSettings({ waterReminders: v })}
          />
          <ToggleRow
            id="set-workout"
            label="Workout reminders"
            description="Daily prompt to keep your streak alive"
            checked={s.workoutReminders}
            onChange={(v) => updateSettings({ workoutReminders: v })}
          />
        </section>

        <section className="surface-card space-y-3 p-4">
          <h2 className="text-sm font-semibold">Your data</h2>
          <p className="text-xs text-muted-foreground">
            {storageWorking
              ? "FitLife stores everything locally on this device — no account needed and it works offline."
              : "Local storage is unavailable, so your data will only last for this session."}
          </p>

          <ConfirmButton
            label="Reset progress"
            title="Reset all progress?"
            description="This clears your workout history, weight log, water log, XP and achievements. Your profile stays."
            onConfirm={() => {
              resetProgress();
              toast.success("Progress reset");
            }}
          />
          <ConfirmButton
            label="Delete everything"
            title="Delete all FitLife data?"
            description="This removes your profile, goals, history and achievements, and restarts onboarding."
            destructive
            onConfirm={() => {
              resetEverything();
              void navigate({ to: "/onboarding", replace: true });
            }}
          />
        </section>
      </div>
    </AppShell>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function ConfirmButton({
  label,
  title,
  description,
  onConfirm,
  destructive = false,
}: {
  label: string;
  title: string;
  description: string;
  onConfirm: () => void;
  destructive?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={destructive ? "destructive" : "secondary"} className="w-full">
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
