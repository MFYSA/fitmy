import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { AchievementPopup } from "./achievement-popup";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  actions?: ReactNode;
  children: ReactNode;
  hideNav?: boolean;
  className?: string;
}

export function AppShell({
  title,
  subtitle,
  backTo,
  actions,
  children,
  hideNav = false,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          {backTo ? (
            <Link
              to={backTo as "/"}
              aria-label="Go back"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
          ) : null}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {actions}
        </div>
      </header>

      <main
        className={cn("mx-auto max-w-lg px-4 pt-4", hideNav ? "pb-8" : "pb-28", className)}
      >
        {children}
      </main>

      {hideNav ? null : <BottomNav />}
      <AchievementPopup />
    </div>
  );
}
