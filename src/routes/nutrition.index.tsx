"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Droplets, Minus, Plus } from "lucide-react";

import { AdSlot } from "@/components/fitlife/ad-slot";
import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { ProgressBar } from "@/components/fitlife/stat-card";
import { Button } from "@/components/ui/button";
import { NUTRITION_ARTICLES, NUTRITION_DISCLAIMER } from "@/lib/fitlife/nutrition";
import { getTodayStats } from "@/lib/fitlife/logic";
import { useFitLife } from "@/lib/fitlife/store";

export const Route = createFileRoute("/nutrition/")({
  head: () => ({
    meta: [
      { title: "Nutrition & Hydration Guides | FitLife" },
      {
        name: "description",
        content:
          "Learn about protein, carbs, fats, hydration and meal timing with FitLife's offline nutrition guides, plus track your daily water intake.",
      },
      { property: "og:title", content: "Nutrition & Hydration Guides | FitLife" },
      {
        property: "og:description",
        content: "Macronutrient guides, hydration tips and a daily water tracker.",
      },
    ],
  }),
  component: NutritionRoute,
});

function NutritionRoute() {
  return (
    <OnboardingGate>
      <NutritionScreen />
    </OnboardingGate>
  );
}

function NutritionScreen() {
  const { state, addWater } = useFitLife();
  const today = getTodayStats(state);
  const percent = (today.water / today.waterTarget) * 100;

  return (
    <AppShell title="Nutrition" subtitle="Fuel and hydration basics">
      <div className="space-y-5">
        <section className="surface-card p-4" aria-labelledby="water-heading">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="water-heading" className="text-sm font-semibold">
                Water intake
              </h2>
              <p className="text-xs text-muted-foreground">
                {today.water} of {today.waterTarget} glasses today
              </p>
            </div>
            <Droplets className="h-6 w-6 text-water" aria-hidden="true" />
          </div>

          <ProgressBar className="mt-3" value={percent} tone="water" label="Water intake progress" />

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => addWater(-1)}
              disabled={today.water === 0}
              aria-label="Remove one glass of water"
            >
              <Minus className="h-5 w-5" aria-hidden="true" />
            </Button>
            <p className="min-w-16 text-center text-3xl font-bold tabular-nums">{today.water}</p>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => addWater(1)}
              aria-label="Add one glass of water"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-3 flex justify-center gap-1" aria-hidden="true">
            {Array.from({ length: today.waterTarget }).map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < today.water ? "" : "opacity-25 grayscale"}`}
              >
                💧
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="mb-3 text-sm font-semibold">
            Nutrition guides
          </h2>
          <ul className="space-y-2">
            {NUTRITION_ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  to="/nutrition/$slug"
                  params={{ slug: article.slug }}
                  className="surface-card flex min-h-16 items-center gap-3 p-3 transition-colors hover:bg-secondary"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {article.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{article.title}</span>
                    <span className="block text-xs text-muted-foreground">{article.summary}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-muted-foreground">{NUTRITION_DISCLAIMER}</p>

        <AdSlot enabled={state.settings.adsEnabled} />
      </div>
    </AppShell>
  );
}
