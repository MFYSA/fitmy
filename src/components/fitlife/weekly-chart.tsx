import { lastSevenDays } from "@/lib/fitlife/logic";
import type { WorkoutHistoryEntry } from "@/lib/fitlife/types";
import { cn } from "@/lib/utils";

interface WeeklyChartProps {
  history: WorkoutHistoryEntry[];
  /** Fixed Monday-to-Sunday view instead of rolling last 7 days. */
  mode?: "rolling" | "week";
  metric?: "workouts" | "minutes";
}

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function currentWeekDays(today = new Date()) {
  const dayIndex = (today.getDay() + 6) % 7; // Monday = 0
  return WEEK_LABELS.map((label, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - dayIndex + i);
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return { key: `${y}-${m}-${d}`, label, isToday: i === dayIndex };
  });
}

export function WeeklyChart({ history, mode = "rolling", metric = "workouts" }: WeeklyChartProps) {
  const today = new Date();
  const days =
    mode === "week"
      ? currentWeekDays(today)
      : lastSevenDays(today).map((d, i, arr) => ({ ...d, isToday: i === arr.length - 1 }));

  const values = days.map((day) => {
    const entries = history.filter((h) => h.day === day.key);
    return metric === "minutes"
      ? Math.round(entries.reduce((s, h) => s + h.durationSeconds, 0) / 60)
      : entries.length;
  });

  const max = Math.max(1, ...values);

  return (
    <div className="flex items-end justify-between gap-2" role="img" aria-label={`Activity for the last 7 days by ${metric}`}>
      {days.map((day, index) => {
        const value = values[index] ?? 0;
        const heightPercent = value === 0 ? 6 : Math.max(12, Math.round((value / max) * 100));
        return (
          <div key={day.key} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[10px] font-medium text-muted-foreground">{value || ""}</span>
            <div className="flex h-24 w-full items-end justify-center">
              <div
                className={cn(
                  "w-full max-w-8 rounded-lg transition-all duration-500",
                  value > 0 ? "gradient-primary" : "bg-secondary",
                )}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span
              className={cn(
                "text-[11px]",
                day.isToday ? "font-semibold text-primary" : "text-muted-foreground",
              )}
            >
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
