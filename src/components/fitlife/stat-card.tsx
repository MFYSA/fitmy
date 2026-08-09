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
        <p className="kicker">{label}</p>
        {icon ? <span className={TONES[tone]}>{icon}</span> : null}
      </div>
      <p className={cn("display-title mt-2 text-2xl tabular-nums", TONES[tone])}>{value}</p>
      {hint ? (
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {hint}
        </p>
      ) : null}
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
  const bg = tone === "water" ? "bg-water" : tone === "flame" ? "bg-flame" : "gradient-primary";

  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", bg)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/** Big activity ring used on Home and Progress. */
export function ActivityRing({
  value,
  size = 132,
  stroke = 10,
  label,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label: string;
  children?: ReactNode;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value || 0)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${label}: ${clamped}%`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * clamped) / 100}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
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
    <div className="surface-card flex flex-col items-center gap-2 px-6 py-12 text-center">
      {icon ? (
        <span className="text-3xl" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <p className="display-title text-lg">{title}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
