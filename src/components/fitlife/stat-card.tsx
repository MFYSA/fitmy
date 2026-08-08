import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "primary" | "water" | "flame";
  className?: string;
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-foreground",
  primary: "text-primary",
  water: "text-water",
  flame: "text-flame",
};

export function StatCard({ label, value, hint, icon, tone = "default", className }: StatCardProps) {
  return (
    <div className={cn("surface-card p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {icon ? <span className={TONES[tone]}>{icon}</span> : null}
      </div>
      <p className={cn("mt-1 text-xl font-semibold", TONES[tone])}>{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function ProgressBar({
  value,
  tone = "primary",
  label,
  className,
}: {
  value: number;
  tone?: "primary" | "water" | "flame";
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value || 0)));
  const bg =
    tone === "water" ? "bg-water" : tone === "flame" ? "bg-flame" : "gradient-primary";

  return (
    <div
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-secondary", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <div className={cn("h-full rounded-full transition-all duration-500", bg)} style={{ width: `${clamped}%` }} />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center gap-2 px-6 py-10 text-center">
      {icon ? <span className="text-3xl" aria-hidden="true">{icon}</span> : null}
      <p className="font-semibold">{title}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
