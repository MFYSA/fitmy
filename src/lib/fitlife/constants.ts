import type { AchievementDef, AppState, FitnessGoal, Gender, Difficulty } from "./types";

export const APP_NAME = "FitLife";
export const STORAGE_KEY = "fitlife.state.v1";
export const STATE_VERSION = 1;

export const MOTIVATION_QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Small steps every day beat big steps once in a while.",
  "You don't have to be extreme, just consistent.",
  "Your body can do it. It's your mind you need to convince.",
  "Progress, not perfection.",
  "Sweat now, shine later.",
  "Discipline is choosing what you want most over what you want now.",
  "One workout at a time. One day at a time.",
  "Strong is not a look, it's a feeling.",
  "Show up for yourself today.",
  "The hardest part is putting on your shoes.",
  "Rest is part of training, not a reward for it.",
];

export const FITNESS_GOALS: FitnessGoal[] = [
  "Lose Weight",
  "Build Muscle",
  "Improve Fitness",
  "Increase Strength",
  "Improve Endurance",
  "Stay Active",
];

export const GENDERS: Gender[] = ["Male", "Female", "Other", "Prefer not to say"];
export const FITNESS_LEVELS: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

/** Cumulative XP required to reach each level (index 0 = level 1). */
export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000];

export const XP_REWARDS = {
  workout: 50,
  dailyGoal: 20,
  waterGoal: 10,
  streak: 25,
} as const;

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-workout", icon: "🏆", title: "First Workout", description: "Complete your first workout." },
  { id: "streak-3", icon: "🔥", title: "3 Day Streak", description: "Exercise for 3 consecutive days." },
  { id: "streak-7", icon: "🔥", title: "7 Day Streak", description: "Exercise for 7 consecutive days." },
  { id: "workouts-10", icon: "💪", title: "10 Workouts", description: "Complete 10 workouts." },
  { id: "workouts-50", icon: "💪", title: "50 Workouts", description: "Complete 50 workouts." },
  { id: "hydration-hero", icon: "💧", title: "Hydration Hero", description: "Reach your water goal 7 times." },
  { id: "xp-100", icon: "⭐", title: "100 XP", description: "Earn 100 XP." },
  { id: "level-10", icon: "🏆", title: "Level 10", description: "Reach Level 10." },
  { id: "calories-1000", icon: "🔥", title: "1000 Calories", description: "Burn 1000 calories in total." },
  { id: "weight-logger", icon: "⚖️", title: "Weight Watcher", description: "Log your weight 5 times." },
  { id: "favorite-five", icon: "❤️", title: "Curator", description: "Favorite 5 workouts." },
  { id: "early-bird", icon: "🌅", title: "Early Bird", description: "Finish a workout before 8 AM." },
];

export function createInitialState(): AppState {
  return {
    version: STATE_VERSION,
    onboarded: false,
    profile: {
      name: "",
      age: null,
      gender: null,
      heightCm: null,
      weightKg: null,
      fitnessLevel: "Beginner",
      goal: "Improve Fitness",
    },
    goals: {
      targetWeightKg: null,
      weeklyWorkoutTarget: 4,
      dailyWaterTarget: 8,
      dailyWorkoutTarget: 1,
    },
    settings: {
      theme: "system",
      notifications: true,
      waterReminders: true,
      workoutReminders: true,
      sound: true,
      restBetweenExercises: true,
      defaultRestSeconds: 30,
      adsEnabled: false,
    },
    progress: {
      xp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDay: null,
      waterGoalDaysHit: 0,
      waterRewardedDays: [],
      dailyGoalRewardedDays: [],
    },
    history: [],
    weights: [],
    water: {},
    favorites: [],
    achievements: [],
  };
}
