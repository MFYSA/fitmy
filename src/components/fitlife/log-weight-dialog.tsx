"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFitLife } from "@/lib/fitlife/store";

export function LogWeightDialog({ trigger }: { trigger: React.ReactNode }) {
  const { state, logWeight } = useFitLife();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setValue(state.profile.weightKg ? String(state.profile.weightKg) : "");
      setError(null);
    }
  }, [open, state.profile.weightKg]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = Number.parseFloat(value.replace(",", "."));
    if (!Number.isFinite(parsed)) {
      setError("Please enter a number.");
      return;
    }
    if (!logWeight(parsed)) {
      setError("Enter a weight between 20 and 400 kg.");
      return;
    }
    toast.success(`Weight logged: ${Math.round(parsed * 10) / 10} kg`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Log your weight</DialogTitle>
            <DialogDescription>Stored on this device only.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <Label htmlFor="weight-input">Weight (kg)</Label>
            <Input
              id="weight-input"
              inputMode="decimal"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              placeholder="70"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "weight-error" : undefined}
            />
            {error ? (
              <p id="weight-error" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full">
              Save weight
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
