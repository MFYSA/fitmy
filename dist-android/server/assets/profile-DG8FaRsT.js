import { a as getActivityStats, h as FITNESS_LEVELS, i as formatDuration, m as FITNESS_GOALS, n as useFitLife, o as getLevelInfo } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { i as StatCard, r as ProgressBar } from "./stat-card-BN9dt71g.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { t as LogWeightDialog } from "./log-weight-dialog-9u-bk3Sv.js";
import { t as Input } from "./input-uzm9g8Y7.js";
import { t as Label } from "./label-BeT0bXvu.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Droplets, Flame, LogOut, Settings, Trophy } from "lucide-react";
//#region src/routes/profile.tsx?tsr-split=component
function ProfileRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(ProfileScreen, {}) });
}
function ProfileScreen() {
	const { state, updateProfile, updateGoals } = useFitLife();
	const stats = getActivityStats(state);
	const level = getLevelInfo(state.progress.xp);
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Profile",
		subtitle: state.profile.name || "FitLife member",
		actions: /* @__PURE__ */ jsx(Link, {
			to: "/settings",
			"aria-label": "Settings",
			className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent",
			children: /* @__PURE__ */ jsx(Settings, {
				className: "h-5 w-5",
				"aria-hidden": "true"
			})
		}),
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card flex items-center gap-4 p-4",
					children: [/* @__PURE__ */ jsx("span", {
						className: "gradient-primary flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-primary-foreground",
						children: (state.profile.name || "F").slice(0, 1).toUpperCase()
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "truncate text-lg font-bold",
								children: state.profile.name || "FitLife member"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Level ",
									level.level,
									" · ",
									state.progress.xp,
									" XP · ",
									state.profile.fitnessLevel
								]
							}),
							/* @__PURE__ */ jsx(ProgressBar, {
								className: "mt-2",
								value: level.progressPercent,
								label: "Level progress"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ jsx(StatCard, {
							label: "Workouts",
							value: stats.totalWorkouts,
							icon: /* @__PURE__ */ jsx(Trophy, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							tone: "primary"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Streak",
							value: `${stats.currentStreak} d`,
							icon: /* @__PURE__ */ jsx(Flame, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							tone: "flame"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Total time",
							value: formatDuration(stats.totalSeconds)
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Calories",
							value: `${stats.totalCalories}`
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card space-y-4 p-4",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-semibold",
							children: "Your details"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "p-name",
								children: "Name"
							}), /* @__PURE__ */ jsx(Input, {
								id: "p-name",
								value: state.profile.name,
								onChange: (e) => updateProfile({ name: e.target.value })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "p-height",
									children: "Height (cm)"
								}), /* @__PURE__ */ jsx(Input, {
									id: "p-height",
									inputMode: "decimal",
									value: state.profile.heightCm ?? "",
									onChange: (e) => {
										const n = Number.parseFloat(e.target.value);
										updateProfile({ heightCm: Number.isFinite(n) ? n : null });
									}
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Weight (kg)" }), /* @__PURE__ */ jsx(LogWeightDialog, { trigger: /* @__PURE__ */ jsx(Button, {
									variant: "secondary",
									className: "w-full justify-start",
									children: state.profile.weightKg ? `${state.profile.weightKg} kg` : "Log weight"
								}) })]
							})]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("legend", {
								className: "text-sm font-medium",
								children: "Fitness level"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: FITNESS_LEVELS.map((option) => /* @__PURE__ */ jsx(Chip, {
									active: state.profile.fitnessLevel === option,
									onClick: () => updateProfile({ fitnessLevel: option }),
									children: option
								}, option))
							})]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("legend", {
								className: "text-sm font-medium",
								children: "Goal"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: FITNESS_GOALS.map((option) => /* @__PURE__ */ jsx(Chip, {
									active: state.profile.goal === option,
									onClick: () => updateProfile({ goal: option }),
									children: option
								}, option))
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card space-y-4 p-4",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-semibold",
							children: "Targets"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Workouts per week" }), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: [
									2,
									3,
									4,
									5,
									6,
									7
								].map((n) => /* @__PURE__ */ jsx(Chip, {
									active: state.goals.weeklyWorkoutTarget === n,
									onClick: () => updateGoals({ weeklyWorkoutTarget: n }),
									children: n
								}, n))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsxs(Label, {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ jsx(Droplets, {
									className: "h-4 w-4 text-water",
									"aria-hidden": "true"
								}), "Glasses of water per day"]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: [
									6,
									8,
									10,
									12
								].map((n) => /* @__PURE__ */ jsx(Chip, {
									active: state.goals.dailyWaterTarget === n,
									onClick: () => updateGoals({ dailyWaterTarget: n }),
									children: n
								}, n))
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "secondary",
						className: "justify-start gap-2",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/history",
							children: [/* @__PURE__ */ jsx(Bell, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}), "Workout history"]
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "secondary",
						className: "justify-start gap-2",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/settings",
							children: [/* @__PURE__ */ jsx(LogOut, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}), "Settings & data"]
						})
					})]
				}),
				/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
			]
		})
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("min-h-10 rounded-full border px-3 text-sm transition-colors", active ? "border-primary bg-primary-soft font-semibold text-primary" : "border-border bg-card hover:bg-secondary"),
		children
	});
}
//#endregion
export { ProfileRoute as component };
