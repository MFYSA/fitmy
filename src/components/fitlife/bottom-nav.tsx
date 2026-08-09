import { Link, useRouterState } from "@tanstack/react-router";
import { Apple, Dumbbell, Home, TrendingUp, User } from "lucide-react";

import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    to: "/workouts",
    label: "Train",
    icon: Dumbbell,
    match: (p: string) =>
      p.startsWith("/workouts") || p.startsWith("/favorites") || p.startsWith("/history"),
  },
  { to: "/progress", label: "Progress", icon: TrendingUp, match: (p: string) => p.startsWith("/progress") },
  { to: "/nutrition", label: "Fuel", icon: Apple, match: (p: string) => p.startsWith("/nutrition") },
  {
    to: "/profile",
    label: "You",
    icon: User,
    match: (p: string) => p.startsWith("/profile") || p.startsWith("/settings"),
  },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 safe-bottom px-3 pb-3"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-1 rounded-full border border-border bg-card/85 px-2 py-1.5 shadow-nav backdrop-blur-xl">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.to} className="flex-1">
              <Link
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
