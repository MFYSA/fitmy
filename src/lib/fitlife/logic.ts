import { LEVEL_THRESHOLDS } from "./constants";
import { EXERCISE_MAP } from "./exercises";
import type { AppState, Workout, WorkoutHistoryEntry } from "./types";

/* ------------------------------ dates ------------------------------ */

/** Local calendar day key, e.g. "2026-08-08". */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function dayDifference(fromKey: string, toKey: string): number {
  const from = new Date(`${fromKey}T00:00:00`);
  const to = new Date(`${toKey}T00:00:00`);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return Number.NaN;
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/** Last 7 days ending today, oldest first. */
export function lastSevenDays(today: Date = new Date()) {
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6);
    return {
      key: dayKey(date),
      label: date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3),
    };
  });
}

/* ------------------------------ levels / xp ------------------------------ */

export interface LevelInfo {
  level: number;
  xp: number;
  currentLevelXp: number;
  nextLevelXp: number | null;
  progressPercent: number;
  xpToNextLevel: number | null;
}

export function getLevelInfo(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp || 0));
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (safeXp >= (LEVEL_THRESHOLDS[i] ?? 0)) level = i + 1;
  }
  const currentLevelXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextLevelXp = level < LEVEL_THRESHOLDS.length ? (LEVEL_THRESHOLDS[level] ?? null) : null;
  const progressPercent =
    nextLevelXp === null
      ? 100
      : Math.min(100, Math.round(((safeXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100));

  return {
    level,
    xp: safeXp,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
    xpToNextLevel: nextLevelXp === null ? null : Math.max(0, nextLevelXp - safeXp),
  };
}

/* ------------------------------ BMI ------------------------------ */

export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  explanation: string;
}

export function calculateBmi(heightCm: number | null, weightKg: number | null): BmiResult | null {
  if (!heightCm || !weightKg) return null;
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return null;
  if (heightCm < 80 || heightCm > 250) return null;
  if (weightKg < 20 || weightKg > 400) return null;

  const metres = heightCm / 100;
  const bmi = Math.round((weightKg / (metres * metres)) * 10) / 10;

  let category: BmiCategory = "Normal";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  const explanation: Record<BmiCategory, string> = {
    Underweight:
      "Your BMI is below the typical range. Focus on strength training and eating enough to support your body. Consider speaking to a health professional.",
    Normal:
      "Your BMI sits in the typical range. Keep training consistently and eating a balanced diet to maintain it.",
    Overweight:
      "Your BMI is above the typical range. Regular activity and small sustainable eating changes make the biggest difference over time.",
    Obese:
      "Your BMI is well above the typical range. Gentle, consistent activity is a great starting point, and a health professional can help you build a safe plan.",
  };

  return { bmi, category, explanation: explanation[category] };
}

/* ------------------------------ workouts ------------------------------ */

export function workoutTotalSeconds(workout: Workout, includeRest: boolean, restSeconds: number): number {
  const work = workout.exercises.reduce((sum, e) => sum + e.seconds, 0);
  const rest = includeRest ? restSeconds * Math.max(0, workout.exercises.length - 1) : 0;
  return work + rest;
}

export function estimateCalories(workout: Workout, completedExercises: number, weightKg: number | null): number {
  const slice = workout.exercises.slice(0, Math.max(0, completedExercises));
  const intensitySum = slice.reduce(
    (sum, e) => sum + e.seconds * (EXERCISE_MAP[e.exerciseId]?.intensity ?? 1),
    0,
  );
  const weightFactor = weightKg ? weightKg / 70 : 1;
  return Math.max(1, Math.round((intensitySum / 60) * 7 * weightFactor));
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${`${m}`.padStart(2, "0")}:${`${s}`.padStart(2, "0")}`;
}

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  if (m === 0) return `${s}s`;
  return s === 0 ? `${m} min` : `${m} min ${s}s`;
}

/* ------------------------------ streaks ------------------------------ */

export function computeStreak(history: WorkoutHistoryEntry[], today: string = dayKey()): {
  current: number;
  longest: number;
} {
  const days = Array.from(new Set(history.map((h) => h.day))).sort();
  if (!days.length) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i += 1) {
    const diff = dayDifference(days[i - 1] as string, days[i] as string);
    if (diff === 1) {
      run += 1;
      longest = Math.max(longest, run);
    } else if (diff !== 0) {
      run = 1;
    }
  }

  const lastDay = days[days.length - 1] as string;
  const sinceLast = dayDifference(lastDay, today);
  let current = 0;
  if (sinceLast === 0 || sinceLast === 1) {
    current = 1;
    for (let i = days.length - 1; i > 0; i -= 1) {
      if (dayDifference(days[i - 1] as string, days[i] as string) === 1) current += 1;
      else break;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

/* ------------------------------ stats ------------------------------ */

export interface ActivityStats {
  totalWorkouts: number;
  totalSeconds: number;
  totalCalories: number;
  currentStreak: number;
  longestStreak: number;
  monthWorkouts: number;
  monthCalories: number;
  monthSeconds: number;
  weekWorkouts: number;
}

export function getActivityStats(state: AppState, today: Date = new Date()): ActivityStats {
  const monthPrefix = dayKey(today).slice(0, 7);
  const weekKeys = new Set(lastSevenDays(today).map((d) => d.key));
  const streak = computeStreak(state.history, dayKey(today));

  const monthEntries = state.history.filter((h) => h.day.startsWith(monthPrefix));

  return {
    totalWorkouts: state.history.length,
    totalSeconds: state.history.reduce((s, h) => s + h.durationSeconds, 0),
    totalCalories: state.history.reduce((s, h) => s + h.calories, 0),
    currentStreak: streak.current,
    longestStreak: Math.max(streak.longest, state.progress.longestStreak),
    monthWorkouts: monthEntries.length,
    monthCalories: monthEntries.reduce((s, h) => s + h.calories, 0),
    monthSeconds: monthEntries.reduce((s, h) => s + h.durationSeconds, 0),
    weekWorkouts: state.history.filter((h) => weekKeys.has(h.day)).length,
  };
}

export function getTodayStats(state: AppState, today: Date = new Date()) {
  const key = dayKey(today);
  const todaysWorkouts = state.history.filter((h) => h.day === key);
  return {
    workouts: todaysWorkouts.length,
    workoutTarget: Math.max(1, state.goals.dailyWorkoutTarget),
    calories: todaysWorkouts.reduce((s, h) => s + h.calories, 0),
    water: state.water[key] ?? 0,
    waterTarget: Math.max(1, state.goals.dailyWaterTarget),
    minutes: Math.round(todaysWorkouts.reduce((s, h) => s + h.durationSeconds, 0) / 60),
  };
}

export function greetingFor(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function quoteOfTheDay(quotes: string[], date: Date = new Date()): string {
  if (!quotes.length) return "";
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  return quotes[dayOfYear % quotes.length] as string;
}
