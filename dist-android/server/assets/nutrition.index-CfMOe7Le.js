import { n as useFitLife, s as getTodayStats } from "./store-0KjQDRyU.js";
import { n as NUTRITION_DISCLAIMER, t as NUTRITION_ARTICLES } from "./nutrition-L3KqR14j.js";
import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { r as ProgressBar } from "./stat-card-BN9dt71g.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight, Droplets, Minus, Plus } from "lucide-react";
//#region src/routes/nutrition.index.tsx?tsr-split=component
function NutritionRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(NutritionScreen, {}) });
}
function NutritionScreen() {
	const { state, addWater } = useFitLife();
	const today = getTodayStats(state);
	const percent = today.water / today.waterTarget * 100;
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Nutrition",
		subtitle: "Fuel and hydration basics",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card p-4",
					"aria-labelledby": "water-heading",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								id: "water-heading",
								className: "text-sm font-semibold",
								children: "Water intake"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground",
								children: [
									today.water,
									" of ",
									today.waterTarget,
									" glasses today"
								]
							})] }), /* @__PURE__ */ jsx(Droplets, {
								className: "h-6 w-6 text-water",
								"aria-hidden": "true"
							})]
						}),
						/* @__PURE__ */ jsx(ProgressBar, {
							className: "mt-3",
							value: percent,
							tone: "water",
							label: "Water intake progress"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex items-center justify-center gap-4",
							children: [
								/* @__PURE__ */ jsx(Button, {
									variant: "secondary",
									size: "icon",
									className: "h-12 w-12 rounded-full",
									onClick: () => addWater(-1),
									disabled: today.water === 0,
									"aria-label": "Remove one glass of water",
									children: /* @__PURE__ */ jsx(Minus, {
										className: "h-5 w-5",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ jsx("p", {
									className: "min-w-16 text-center text-3xl font-bold tabular-nums",
									children: today.water
								}),
								/* @__PURE__ */ jsx(Button, {
									size: "icon",
									className: "h-12 w-12 rounded-full",
									onClick: () => addWater(1),
									"aria-label": "Add one glass of water",
									children: /* @__PURE__ */ jsx(Plus, {
										className: "h-5 w-5",
										"aria-hidden": "true"
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-3 flex justify-center gap-1",
							"aria-hidden": "true",
							children: Array.from({ length: today.waterTarget }).map((_, i) => /* @__PURE__ */ jsx("span", {
								className: `text-lg ${i < today.water ? "" : "opacity-25 grayscale"}`,
								children: "💧"
							}, i))
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "guides-heading",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "guides-heading",
						className: "mb-3 text-sm font-semibold",
						children: "Nutrition guides"
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: NUTRITION_ARTICLES.map((article) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
							to: "/nutrition/$slug",
							params: { slug: article.slug },
							className: "surface-card flex min-h-16 items-center gap-3 p-3 transition-colors hover:bg-secondary",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-2xl",
									"aria-hidden": "true",
									children: article.icon
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block font-medium",
										children: article.title
									}), /* @__PURE__ */ jsx("span", {
										className: "block text-xs text-muted-foreground",
										children: article.summary
									})]
								}),
								/* @__PURE__ */ jsx(ChevronRight, {
									className: "h-4 w-4 shrink-0 text-muted-foreground",
									"aria-hidden": "true"
								})
							]
						}) }, article.slug))
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: NUTRITION_DISCLAIMER
				}),
				/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
			]
		})
	});
}
//#endregion
export { NutritionRoute as component };
