/**
 * FitLife domain models.
 * Pure types only — no runtime code, no storage concerns.
 */

export type Equipment = "None" | "Dumbbells" | "Resistance Band" | "Mat" | "Bench";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type MuscleGroup =
  | "Full Body"
  | "Upper Body"
  | "Lower Body"
  | "Chest"
  | "Back"
  | "Arms"
  | "Legs"
  | "Abs/Core"
  | "Cardio"
  | "Mobility";

export type WorkoutCategory =
  | "Beginner"
  | "Full Body"
  | "Upper Body"
  | "Lower Body"
  | "Chest"
  | "Back"
  | "Arms"
  | "Legs"
  | "Abs/Core"
  | "Cardio"
  | "Stretching"
  | "Home Workout"
  | "No Equipment";

export interface Exercise {
  id: string;
  name: string;
  muscle: MuscleGroup;
  equipment: Equipment;
  /** Work duration in seconds for a single set. */
  seconds: number;
  /** Rough intensity multiplier used for calorie estimates. */
  intensity: number;
  instructions: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  seconds: number;
  restSeconds: number;
}

export interface Workout {
  id: string;
  name: string;
  category: WorkoutCategory;
  muscle: MuscleGroup;
  difficulty: Difficulty;
  /** Total minutes including rest. */
  durationMinutes: number;
  calories: number;
  description: string;
  equipment: Equipment[];
  exercises: WorkoutExercise[];
}

export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";

export type FitnessGoal =
  | "Lose Weight"
  | "Build Muscle"
  | "Improve Fitness"
  | "Increase Strength"
  | "Improve Endurance"
  | "Stay Active";

export interface UserProfile {
  name: string;
  age: number | null;
  gender: Gender | null;
  heightCm: number | null;
  weightKg: number | null;
  fitnessLevel: Difficulty;
  goal: FitnessGoal;
}

export interface Goals {
  targetWeightKg: number | null;
  weeklyWorkoutTarget: number;
  dailyWaterTarget: number;
  dailyWorkoutTarget: number;
}

export interface WorkoutHistoryEntry {
  id: string;
  workoutId: string;
  workoutName: string;
  /** ISO date-time of completion. */
  completedAt: string;
  /** Local YYYY-MM-DD day key. */
  day: string;
  durationSeconds: number;
  exercisesCompleted: number;
  calories: number;
  xp: number;
}

export interface WeightEntry {
  id: string;
  day: string;
  weightKg: number;
}

export interface AppSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  waterReminders: boolean;
  workoutReminders: boolean;
  sound: boolean;
  restBetweenExercises: boolean;
  defaultRestSeconds: number;
  adsEnabled: boolean;
}

export interface AchievementDef {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface UserAchievement {
  id: string;
  unlockedAt: string;
}

export interface UserProgress {
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDay: string | null;
  waterGoalDaysHit: number;
  /** Day keys already rewarded for hitting the daily water target. */
  waterRewardedDays: string[];
  /** Day keys already rewarded for hitting the daily workout target. */
  dailyGoalRewardedDays: string[];
}

export interface AppState {
  version: number;
  onboarded: boolean;
  profile: UserProfile;
  goals: Goals;
  settings: AppSettings;
  progress: UserProgress;
  history: WorkoutHistoryEntry[];
  weights: WeightEntry[];
  /** day key -> glasses */
  water: Record<string, number>;
  favorites: string[];
  achievements: UserAchievement[];
}

export interface NutritionArticle {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  examples: string[];
  tips: string[];
}
