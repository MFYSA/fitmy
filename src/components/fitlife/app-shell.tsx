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
  /** Rendered edge-to-edge above the padded content (e.g. a photo hero). */
  hero?: ReactNode;
  /** Hide the sticky text header — use with a hero that carries its own title. */
  bareHeader?: boolean;
  className?: string;
}

export function AppShell({
  title,
  subtitle,
  backTo,
  actions,
  children,
  hideNav = false,
  hero,
  bareHeader = false,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <header
        className={cn(
          "sticky top-0 z-30 safe-top",
          bareHeader
            ? "pointer-events-none bg-transparent"
            : "border-b border-border bg-background/80 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          {backTo ? (
            <Link
              to={backTo as "/"}
              aria-label="Go back"
              className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
          ) : null}
          {bareHeader ? (
            <span className="sr-only">{title}</span>
          ) : (
            <div className="min-w-0 flex-1">
              <h1 className="display-title truncate text-[1.4rem]">{title}</h1>
              {subtitle ? (
                <p className="truncate text-xs font-medium text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
          )}
          {actions ? <div className="pointer-events-auto flex items-center">{actions}</div> : null}
        </div>
      </header>

      {hero}

      <main className={cn("mx-auto max-w-lg px-4 pt-4", hideNav ? "pb-10" : "pb-32", className)}>
        {children}
      </main>

      {hideNav ? null : <BottomNav />}
      <AchievementPopup />
    </div>
  );
}
