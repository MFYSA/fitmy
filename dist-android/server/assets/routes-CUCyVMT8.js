import { _ as MOTIVATION_QUOTES, c as greetingFor, n as useFitLife, o as getLevelInfo, s as getTodayStats, u as quoteOfTheDay } from "./store-0KjQDRyU.js";
import { r as WORKOUTS } from "./workouts-COSmNJcJ.js";
import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { i as StatCard, n as EmptyState, t as ActivityRing } from "./stat-card-BN9dt71g.js";
import { t as WorkoutCard } from "./workout-card-DjpQf7fd.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { t as LogWeightDialog } from "./log-weight-dialog-9u-bk3Sv.js";
import { t as WeeklyChart } from "./weekly-chart-CWkmGkmV.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowRight, Calculator, Droplets, Dumbbell, Flame, Scale, Timer } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function HomeRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(HomeScreen, {}) });
}
function HomeScreen() {
	const { state, addWater } = useFitLife();
	const navigate = useNavigate();
	const today = getTodayStats(state);
	const level = getLevelInfo(state.progress.xp);
	const name = state.profile.name.trim() || "friend";
	const pool = WORKOUTS.filter((w) => w.difficulty === state.profile.fitnessLevel);
	const day = (/* @__PURE__ */ new Date()).getDate();
	const deck = pool.length ? pool : WORKOUTS;
	const recommended = deck[day % deck.length];
	const upNext = [
		1,
		2,
		3
	].map((offset) => deck[(day + offset) % deck.length]).filter((w) => Boolean(w));
	const workoutPercent = Math.min(100, today.workouts / today.workoutTarget * 100);
	const waterPercent = Math.min(100, today.water / today.waterTarget * 100);
	const goalPercent = Math.round((workoutPercent + waterPercent) / 2);
	return /* @__PURE__ */ jsx(AppShell, {
		title: `${greetingFor()}, ${name}`,
		subtitle: `Level ${level.level} · ${state.progress.xp} XP${state.progress.currentStreak ? ` · ${state.progress.currentStreak} day streak` : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card flex items-center gap-5 p-5",
					"aria-labelledby": "today-ring-heading",
					children: [/* @__PURE__ */ jsxs(ActivityRing, {
						value: goalPercent,
						label: "Daily goal completion",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "display-title text-3xl tabular-nums",
							children: [goalPercent, "%"]
						}), /* @__PURE__ */ jsx("span", {
							className: "kicker mt-1",
							children: "Today"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsx("h2", {
								id: "today-ring-heading",
								className: "display-title text-xl",
								children: "Move today"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"“",
									quoteOfTheDay(MOTIVATION_QUOTES),
									"”"
								]
							}),
							/* @__PURE__ */ jsxs(Button, {
								className: "mt-3 h-11 w-full rounded-full text-xs font-bold uppercase tracking-widest",
								onClick: () => void navigate({ to: "/workouts" }),
								children: ["Start training", /* @__PURE__ */ jsx(ArrowRight, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "recommended-heading",
					className: "space-y-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "kicker",
							children: "Featured session"
						}), /* @__PURE__ */ jsx("h2", {
							id: "recommended-heading",
							className: "display-title text-2xl",
							children: "Today's pick"
						})] }), /* @__PURE__ */ jsx(Link, {
							to: "/workouts",
							className: "text-[11px] font-bold uppercase tracking-widest text-primary",
							children: "See all"
						})]
					}), recommended ? /* @__PURE__ */ jsx(WorkoutCard, {
						workout: recommended,
						size: "hero"
					}) : /* @__PURE__ */ jsx(EmptyState, {
						title: "No workouts found",
						description: "Your workout library is empty."
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "stats-heading",
					className: "space-y-3",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "stats-heading",
						className: "kicker",
						children: "Today's numbers"
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ jsx(StatCard, {
								label: "Workouts",
								value: `${today.workouts}/${today.workoutTarget}`,
								icon: /* @__PURE__ */ jsx(Dumbbell, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								tone: "primary"
							}),
							/* @__PURE__ */ jsx(StatCard, {
								label: "Water",
								value: `${today.water}/${today.waterTarget}`,
								hint: "glasses",
								icon: /* @__PURE__ */ jsx(Droplets, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								tone: "water"
							}),
							/* @__PURE__ */ jsx(StatCard, {
								label: "Calories",
								value: today.calories,
								hint: "kcal burned",
								icon: /* @__PURE__ */ jsx(Flame, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								tone: "flame"
							}),
							/* @__PURE__ */ jsx(StatCard, {
								label: "Active time",
								value: `${today.minutes}m`,
								icon: /* @__PURE__ */ jsx(Timer, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "quick-heading",
					className: "space-y-3",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "quick-heading",
						className: "kicker",
						children: "Quick log"
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ jsxs(Button, {
								variant: "secondary",
								className: "h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest",
								onClick: () => {
									addWater(1);
									toast.success("Water logged");
								},
								children: [/* @__PURE__ */ jsx(Droplets, {
									className: "h-5 w-5 text-water",
									"aria-hidden": "true"
								}), "Water"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "secondary",
								className: "h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest",
								onClick: () => void navigate({
									to: "/progress",
									hash: "bmi"
								}),
								children: [/* @__PURE__ */ jsx(Calculator, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								}), "BMI"]
							}),
							/* @__PURE__ */ jsx(LogWeightDialog, { trigger: /* @__PURE__ */ jsxs(Button, {
								variant: "secondary",
								className: "h-auto flex-col gap-2 rounded-2xl py-4 text-[11px] font-bold uppercase tracking-widest",
								children: [/* @__PURE__ */ jsx(Scale, {
									className: "h-5 w-5",
									"aria-hidden": "true"
								}), "Weight"]
							}) })
						]
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "upnext-heading",
					className: "space-y-3",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "upnext-heading",
						className: "kicker",
						children: "Up next for you"
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: upNext.map((workout) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(WorkoutCard, {
							workout,
							size: "compact"
						}) }, workout.id))
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					"aria-labelledby": "week-heading",
					className: "space-y-3",
					children: [/* @__PURE__ */ jsx("h2", {
						id: "week-heading",
						className: "kicker",
						children: "Last 7 days"
					}), /* @__PURE__ */ jsx("div", {
						className: "surface-card p-4",
						children: /* @__PURE__ */ jsx(WeeklyChart, { history: state.history })
					})]
				}),
				/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
			]
		})
	});
}
//#endregion
export { HomeRoute as component };
