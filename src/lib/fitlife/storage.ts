import { STORAGE_KEY, createInitialState } from "./constants";
import type { AppState } from "./types";

/**
 * Local persistence layer (browser localStorage).
 * Every operation is defensive: corrupt or unavailable storage must never
 * crash the app, it just falls back to a fresh state.
 */

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function mergeState(raw: unknown): AppState {
  const base = createInitialState();
  if (!raw || typeof raw !== "object") return base;
  const parsed = raw as Partial<AppState>;

  return {
    ...base,
    ...parsed,
    profile: { ...base.profile, ...(parsed.profile ?? {}) },
    goals: { ...base.goals, ...(parsed.goals ?? {}) },
    settings: { ...base.settings, ...(parsed.settings ?? {}) },
    progress: { ...base.progress, ...(parsed.progress ?? {}) },
    history: Array.isArray(parsed.history) ? parsed.history : [],
    weights: Array.isArray(parsed.weights) ? parsed.weights : [],
    water: parsed.water && typeof parsed.water === "object" ? parsed.water : {},
    favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
    achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    version: base.version,
  };
}

export function loadState(): AppState {
  if (!isBrowser()) return createInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    return mergeState(JSON.parse(raw));
  } catch (error) {
    console.warn("FitLife: could not read saved data, starting fresh.", error);
    return createInitialState();
  }
}

export function saveState(state: AppState): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn("FitLife: could not save your data.", error);
    return false;
  }
}

export function clearState(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("FitLife: could not clear saved data.", error);
  }
}

export function createId(prefix = "id"): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}
