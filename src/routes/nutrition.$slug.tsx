"use client";

import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { AppShell } from "@/components/fitlife/app-shell";
import { OnboardingGate } from "@/components/fitlife/onboarding-gate";
import { Button } from "@/components/ui/button";
import { NUTRITION_DISCLAIMER, getArticle } from "@/lib/fitlife/nutrition";
import type { NutritionArticle } from "@/lib/fitlife/types";

export const Route = createFileRoute("/nutrition/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guide unavailable | FitLife" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const title = `${article.title} | FitLife Nutrition`;
    return {
      meta: [
        { title },
        { name: "description", content: article.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: article.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell title="Guide not found" backTo="/nutrition">
      <p className="text-sm text-muted-foreground">That nutrition guide doesn't exist.</p>
      <Button asChild className="mt-4">
        <Link to="/nutrition">All guides</Link>
      </Button>
    </AppShell>
  ),
  component: ArticleRoute,
});

function ArticleRoute() {
  return (
    <OnboardingGate>
      <ArticleScreen />
    </OnboardingGate>
  );
}

function ArticleScreen() {
  const { article } = Route.useLoaderData() as { article: NutritionArticle };

  return (
    <AppShell title={article.title} backTo="/nutrition">
      <article className="space-y-5">
        <div className="surface-card flex items-center gap-3 p-4">
          <span className="text-4xl" aria-hidden="true">
            {article.icon}
          </span>
          <p className="text-sm text-muted-foreground">{article.summary}</p>
        </div>

        <p className="text-sm leading-relaxed">{article.description}</p>

        <Section title="Why it matters" items={article.benefits} />
        <Section title="Good sources" items={article.examples} />
        <Section title="Practical tips" items={article.tips} />

        <p className="text-xs text-muted-foreground">{NUTRITION_DISCLAIMER}</p>
      </article>
    </AppShell>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="surface-card p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
