import { Link, useRouterState } from "@tanstack/react-router";
import { Apple, Dumbbell, Home, TrendingUp, User } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { to: "/workouts", label: "Workouts", icon: Dumbbell, match: (p: string) => p.startsWith("/workouts") || p.startsWith("/favorites") || p.startsWith("/history") },
  { to: "/progress", label: "Progress", icon: TrendingUp, match: (p: string) => p.startsWith("/progress") },
  { to: "/nutrition", label: "Nutrition", icon: Apple, match: (p: string) => p.startsWith("/nutrition") },
  { to: "/profile", label: "Profile", icon: User, match: (p: string) => p.startsWith("/profile") || p.startsWith("/settings") || p.startsWith("/goals") },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main navigation"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.to} className="flex-1">
              <Link
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    active && "bg-primary-soft",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
