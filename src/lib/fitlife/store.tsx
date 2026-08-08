"use client";

import * as React from "react";

import { ACHIEVEMENTS, XP_REWARDS, createInitialState } from "./constants";
import { computeStreak, dayKey, estimateCalories, getLevelInfo } from "./logic";
import { clearState, createId, loadState, saveState } from "./storage";
import type {
  AchievementDef,
  AppSettings,
  AppState,
  Goals,
  UserProfile,
  Workout,
  WorkoutHistoryEntry,
} from "./types";

export interface WorkoutResult {
  xp: number;
  calories: number;
  durationSeconds: number;
  exercisesCompleted: number;
  unlocked: AchievementDef[];
  leveledUpTo: number | null;
}

interface FitLifeContextValue {
  state: AppState;
  ready: boolean;
  storageWorking: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  updateGoals: (patch: Partial<Goals>) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  completeOnboarding: (profile: Partial<UserProfile>, goals: Partial<Goals>) => void;
  addWater: (delta: number) => void;
  logWeight: (weightKg: number) => boolean;
  toggleFavorite: (workoutId: string) => void;
  completeWorkout: (input: {
    workout: Workout;
    durationSeconds: number;
    exercisesCompleted: number;
  }) => WorkoutResult;
  resetProgress: () => void;
  resetWater: () => void;
  resetEverything: () => void;
  pendingAchievement: AchievementDef | null;
  dismissAchievement: () => void;
}

const FitLifeContext = React.createContext<FitLifeContextValue | null>(null);

/** Returns achievement ids that the state qualifies for. */
function qualifyingAchievements(state: AppState, now: Date): string[] {
  const ids: string[] = [];
  const totalCalories = state.history.reduce((s, h) => s + h.calories, 0);
  const streak = computeStreak(state.history, dayKey(now));
  const level = getLevelInfo(state.progress.xp).level;

  if (state.history.length >= 1) ids.push("first-workout");
  if (state.history.length >= 10) ids.push("workouts-10");
  if (state.history.length >= 50) ids.push("workouts-50");
  if (streak.longest >= 3 || state.progress.longestStreak >= 3) ids.push("streak-3");
  if (streak.longest >= 7 || state.progress.longestStreak >= 7) ids.push("streak-7");
  if (state.progress.waterGoalDaysHit >= 7) ids.push("hydration-hero");
  if (state.progress.xp >= 100) ids.push("xp-100");
  if (level >= 10) ids.push("level-10");
  if (totalCalories >= 1000) ids.push("calories-1000");
  if (state.weights.length >= 5) ids.push("weight-logger");
  if (state.favorites.length >= 5) ids.push("favorite-five");
  if (state.history.some((h) => new Date(h.completedAt).getHours() < 8)) ids.push("early-bird");

  return ids;
}

function applyAchievements(state: AppState, now: Date): { state: AppState; unlocked: AchievementDef[] } {
  const owned = new Set(state.achievements.map((a) => a.id));
  const newIds = qualifyingAchievements(state, now).filter((id) => !owned.has(id));
  if (!newIds.length) return { state, unlocked: [] };

  const unlocked = newIds
    .map((id) => ACHIEVEMENTS.find((a) => a.id === id))
    .filter((a): a is AchievementDef => Boolean(a));

  return {
    state: {
      ...state,
      achievements: [
        ...state.achievements,
        ...newIds.map((id) => ({ id, unlockedAt: now.toISOString() })),
      ],
    },
    unlocked,
  };
}

export function FitLifeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(() => createInitialState());
  const [ready, setReady] = React.useState(false);
  const [storageWorking, setStorageWorking] = React.useState(true);
  const [queue, setQueue] = React.useState<AchievementDef[]>([]);

  // Hydrate from local storage after mount (keeps SSR output stable).
  React.useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    setStorageWorking(saveState(state));
  }, [state, ready]);

  // Theme handling (light / dark / system).
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const dark =
        state.settings.theme === "dark" || (state.settings.theme === "system" && media.matches);
      root.classList.toggle("dark", dark);
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [state.settings.theme]);

  const enqueue = React.useCallback((items: AchievementDef[]) => {
    if (items.length) setQueue((prev) => [...prev, ...items]);
  }, []);

  const updateProfile = React.useCallback((patch: Partial<UserProfile>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const updateGoals = React.useCallback((patch: Partial<Goals>) => {
    setState((prev) => ({ ...prev, goals: { ...prev.goals, ...patch } }));
  }, []);

  const updateSettings = React.useCallback((patch: Partial<AppSettings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const completeOnboarding = React.useCallback(
    (profile: Partial<UserProfile>, goals: Partial<Goals>) => {
      setState((prev) => {
        const next: AppState = {
          ...prev,
          onboarded: true,
          profile: { ...prev.profile, ...profile },
          goals: { ...prev.goals, ...goals },
        };
        if (profile.weightKg) {
          next.weights = [
            ...prev.weights,
            { id: createId("w"), day: dayKey(), weightKg: profile.weightKg },
          ];
        }
        return next;
      });
    },
    [],
  );

  const addWater = React.useCallback(
    (delta: number) => {
      const now = new Date();
      const key = dayKey(now);
      let unlockedOut: AchievementDef[] = [];

      setState((prev) => {
        const target = Math.max(1, prev.goals.dailyWaterTarget);
        const current = prev.water[key] ?? 0;
        const value = Math.max(0, Math.min(50, current + delta));

        let next: AppState = { ...prev, water: { ...prev.water, [key]: value } };

        const alreadyRewarded = prev.progress.waterRewardedDays.includes(key);
        if (value >= target && !alreadyRewarded) {
          next = {
            ...next,
            progress: {
              ...next.progress,
              xp: next.progress.xp + XP_REWARDS.waterGoal,
              waterGoalDaysHit: next.progress.waterGoalDaysHit + 1,
              waterRewardedDays: [...next.progress.waterRewardedDays, key],
            },
          };
        }

        const result = applyAchievements(next, now);
        unlockedOut = result.unlocked;
        return result.state;
      });

      // Queue outside of the updater to keep the reducer pure-ish.
      setTimeout(() => enqueue(unlockedOut), 0);
    },
    [enqueue],
  );

  const logWeight = React.useCallback((weightKg: number) => {
    if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) return false;
    const now = new Date();
    let unlockedOut: AchievementDef[] = [];

    setState((prev) => {
      const entry = { id: createId("w"), day: dayKey(now), weightKg: Math.round(weightKg * 10) / 10 };
      const next: AppState = {
        ...prev,
        weights: [...prev.weights, entry],
        profile: { ...prev.profile, weightKg: entry.weightKg },
      };
      const result = applyAchievements(next, now);
      unlockedOut = result.unlocked;
      return result.state;
    });

    setTimeout(() => enqueue(unlockedOut), 0);
    return true;
  }, [enqueue]);

  const toggleFavorite = React.useCallback((workoutId: string) => {
    const now = new Date();
    let unlockedOut: AchievementDef[] = [];

    setState((prev) => {
      const favorites = prev.favorites.includes(workoutId)
        ? prev.favorites.filter((id) => id !== workoutId)
        : [...prev.favorites, workoutId];
      const result = applyAchievements({ ...prev, favorites }, now);
      unlockedOut = result.unlocked;
      return result.state;
    });

    setTimeout(() => enqueue(unlockedOut), 0);
  }, [enqueue]);

  const completeWorkout = React.useCallback<FitLifeContextValue["completeWorkout"]>(
    ({ workout, durationSeconds, exercisesCompleted }) => {
      const now = new Date();
      const key = dayKey(now);
      const safeExercises = Math.max(1, Math.min(workout.exercises.length, exercisesCompleted));
      const safeDuration = Math.max(1, Math.round(durationSeconds));

      const outcome: WorkoutResult = {
        xp: XP_REWARDS.workout,
        calories: 0,
        durationSeconds: safeDuration,
        exercisesCompleted: safeExercises,
        unlocked: [],
        leveledUpTo: null,
      };

      setState((prev) => {
        const calories = estimateCalories(workout, safeExercises, prev.profile.weightKg);
        const entry: WorkoutHistoryEntry = {
          id: createId("s"),
          workoutId: workout.id,
          workoutName: workout.name,
          completedAt: now.toISOString(),
          day: key,
          durationSeconds: safeDuration,
          exercisesCompleted: safeExercises,
          calories,
          xp: XP_REWARDS.workout,
        };

        const previousLevel = getLevelInfo(prev.progress.xp).level;
        const history = [entry, ...prev.history];
        const streak = computeStreak(history, key);
        const firstToday = !prev.history.some((h) => h.day === key);

        let xpGain = XP_REWARDS.workout;
        if (firstToday && streak.current >= 2) xpGain += XP_REWARDS.streak;

        const workoutsToday = history.filter((h) => h.day === key).length;
        const dailyTarget = Math.max(1, prev.goals.dailyWorkoutTarget);
        const dailyRewarded = prev.progress.dailyGoalRewardedDays.includes(key);
        const hitsDailyGoal = workoutsToday >= dailyTarget && !dailyRewarded;
        if (hitsDailyGoal) xpGain += XP_REWARDS.dailyGoal;

        let next: AppState = {
          ...prev,
          history,
          progress: {
            ...prev.progress,
            xp: prev.progress.xp + xpGain,
            currentStreak: streak.current,
            longestStreak: Math.max(prev.progress.longestStreak, streak.longest),
            lastWorkoutDay: key,
            dailyGoalRewardedDays: hitsDailyGoal
              ? [...prev.progress.dailyGoalRewardedDays, key]
              : prev.progress.dailyGoalRewardedDays,
          },
        };

        const result = applyAchievements(next, now);
        next = result.state;

        const newLevel = getLevelInfo(next.progress.xp).level;
        outcome.xp = xpGain;
        outcome.calories = calories;
        outcome.unlocked = result.unlocked;
        outcome.leveledUpTo = newLevel > previousLevel ? newLevel : null;

        return next;
      });

      setTimeout(() => enqueue(outcome.unlocked), 0);
      return outcome;
    },
    [enqueue],
  );

  const resetProgress = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: [],
      weights: [],
      achievements: [],
      progress: createInitialState().progress,
    }));
  }, []);

  const resetWater = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      water: {},
      progress: { ...prev.progress, waterGoalDaysHit: 0, waterRewardedDays: [] },
    }));
  }, []);

  const resetEverything = React.useCallback(() => {
    clearState();
    setState(createInitialState());
  }, []);

  const dismissAchievement = React.useCallback(() => {
    setQueue((prev) => prev.slice(1));
  }, []);

  const value = React.useMemo<FitLifeContextValue>(
    () => ({
      state,
      ready,
      storageWorking,
      updateProfile,
      updateGoals,
      updateSettings,
      completeOnboarding,
      addWater,
      logWeight,
      toggleFavorite,
      completeWorkout,
      resetProgress,
      resetWater,
      resetEverything,
      pendingAchievement: queue[0] ?? null,
      dismissAchievement,
    }),
    [
      state,
      ready,
      storageWorking,
      updateProfile,
      updateGoals,
      updateSettings,
      completeOnboarding,
      addWater,
      logWeight,
      toggleFavorite,
      completeWorkout,
      resetProgress,
      resetWater,
      resetEverything,
      queue,
      dismissAchievement,
    ],
  );

  return <FitLifeContext.Provider value={value}>{children}</FitLifeContext.Provider>;
}

export function useFitLife(): FitLifeContextValue {
  const context = React.useContext(FitLifeContext);
  if (!context) throw new Error("useFitLife must be used inside <FitLifeProvider>.");
  return context;
}
