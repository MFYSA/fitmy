import { WORKOUT_IMAGE_MAP } from "./workout-image-map";

/** Tiny inline fallback so cards never render a broken image. */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10"><rect width="16" height="10" fill="#171a17"/></svg>`,
  );

export function workoutImage(workoutId: string): string {
  return WORKOUT_IMAGE_MAP[workoutId] ?? FALLBACK;
}
