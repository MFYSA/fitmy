import { a as getActivityStats, i as formatDuration, n as useFitLife, o as getLevelInfo, p as ACHIEVEMENTS, r as calculateBmi } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { i as StatCard, n as EmptyState, r as ProgressBar } from "./stat-card-BN9dt71g.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { t as LogWeightDialog } from "./log-weight-dialog-9u-bk3Sv.js";
import { t as Input } from "./input-uzm9g8Y7.js";
import { t as Label } from "./label-BeT0bXvu.js";
import { t as WeeklyChart } from "./weekly-chart-CWkmGkmV.js";
import { t as Badge } from "./badge-B3f60TId.js";
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Activity, Flame, Scale, TrendingUp, Trophy } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/routes/progress.tsx?tsr-split=component
function ProgressRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(ProgressScreen, {}) });
}
function ProgressScreen() {
	const { state } = useFitLife();
	const stats = getActivityStats(state);
	const level = getLevelInfo(state.progress.xp);
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Progress",
		subtitle: `Level ${level.level} · ${state.progress.xp} XP`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card p-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: ["Level ", level.level]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-lg font-bold",
								children: [state.progress.xp, " XP total"]
							})] }), /* @__PURE__ */ jsx(Trophy, {
								className: "h-6 w-6 text-primary",
								"aria-hidden": "true"
							})]
						}),
						/* @__PURE__ */ jsx(ProgressBar, {
							className: "mt-3",
							value: level.progressPercent,
							label: `Progress to level ${level.level + 1}`
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: level.xpToNextLevel !== null ? `${level.xpToNextLevel} XP to level ${level.level + 1}` : "Max level reached — legend status."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ jsx(StatCard, {
							label: "Current streak",
							value: `${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}`,
							hint: `Longest: ${stats.longestStreak}`,
							icon: /* @__PURE__ */ jsx(Flame, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							tone: "flame"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Workouts",
							value: stats.totalWorkouts,
							hint: `${stats.weekWorkouts} this week`,
							icon: /* @__PURE__ */ jsx(Activity, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							tone: "primary"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Total time",
							value: formatDuration(stats.totalSeconds),
							hint: "All time"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							label: "Calories",
							value: `${stats.totalCalories}`,
							hint: "Estimated, all time"
						})
					]
				}),
				/* @__PURE__ */ jsxs(Tabs, {
					defaultValue: "activity",
					children: [
						/* @__PURE__ */ jsxs(TabsList, {
							className: "w-full",
							children: [
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "activity",
									className: "flex-1",
									children: "Activity"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "body",
									className: "flex-1",
									children: "Body"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "awards",
									className: "flex-1",
									children: "Awards"
								})
							]
						}),
						/* @__PURE__ */ jsxs(TabsContent, {
							value: "activity",
							className: "space-y-4 pt-4",
							children: [/* @__PURE__ */ jsxs("section", {
								className: "surface-card p-4",
								children: [
									/* @__PURE__ */ jsx("h2", {
										className: "text-sm font-semibold",
										children: "This week"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-xs text-muted-foreground",
										children: [
											stats.weekWorkouts,
											" of ",
											state.goals.weeklyWorkoutTarget,
											" target workouts"
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3",
										children: /* @__PURE__ */ jsx(WeeklyChart, {
											history: state.history,
											mode: "week",
											metric: "minutes"
										})
									})
								]
							}), /* @__PURE__ */ jsxs("section", {
								className: "surface-card p-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-sm font-semibold",
									children: "This month"
								}), /* @__PURE__ */ jsxs("dl", {
									className: "mt-2 grid grid-cols-3 gap-3 text-center",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-[11px] text-muted-foreground",
											children: "Workouts"
										}), /* @__PURE__ */ jsx("dd", {
											className: "text-lg font-bold",
											children: stats.monthWorkouts
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-[11px] text-muted-foreground",
											children: "Minutes"
										}), /* @__PURE__ */ jsx("dd", {
											className: "text-lg font-bold",
											children: Math.round(stats.monthSeconds / 60)
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-[11px] text-muted-foreground",
											children: "Calories"
										}), /* @__PURE__ */ jsx("dd", {
											className: "text-lg font-bold",
											children: stats.monthCalories
										})] })
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs(TabsContent, {
							value: "body",
							className: "space-y-4 pt-4",
							children: [/* @__PURE__ */ jsx(BmiSection, {}), /* @__PURE__ */ jsx(WeightSection, {})]
						}),
						/* @__PURE__ */ jsx(TabsContent, {
							value: "awards",
							className: "pt-4",
							children: /* @__PURE__ */ jsx("ul", {
								className: "space-y-2",
								children: ACHIEVEMENTS.map((achievement) => {
									const unlocked = state.achievements.find((a) => a.id === achievement.id);
									return /* @__PURE__ */ jsxs("li", {
										className: cn("surface-card flex items-start gap-3 p-3", !unlocked && "opacity-60"),
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "text-2xl",
												"aria-hidden": "true",
												children: unlocked ? achievement.icon : "🔒"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ jsx("p", {
													className: "font-medium",
													children: achievement.title
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: achievement.description
												})]
											}),
											unlocked ? /* @__PURE__ */ jsx(Badge, {
												className: "rounded-full text-[10px]",
												children: "Unlocked"
											}) : null
										]
									}, achievement.id);
								})
							})
						})
					]
				}),
				/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
			]
		})
	});
}
var BMI_TONES = {
	Underweight: "text-water",
	Normal: "text-primary",
	Overweight: "text-flame",
	Obese: "text-destructive"
};
function BmiSection() {
	const { state, updateProfile } = useFitLife();
	const [height, setHeight] = React.useState(state.profile.heightCm ? String(state.profile.heightCm) : "");
	const [weight, setWeight] = React.useState(state.profile.weightKg ? String(state.profile.weightKg) : "");
	const [error, setError] = React.useState(null);
	const parsedHeight = Number.parseFloat(height.replace(",", "."));
	const parsedWeight = Number.parseFloat(weight.replace(",", "."));
	const bmi = calculateBmi(Number.isFinite(parsedHeight) ? parsedHeight : null, Number.isFinite(parsedWeight) ? parsedWeight : null);
	const save = () => {
		if (!bmi) {
			setError("Enter a height between 80–250 cm and a weight between 20–400 kg.");
			return;
		}
		setError(null);
		updateProfile({
			heightCm: parsedHeight,
			weightKg: parsedWeight
		});
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "surface-card p-4",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold",
				children: "BMI calculator"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "bmi-height",
						children: "Height (cm)"
					}), /* @__PURE__ */ jsx(Input, {
						id: "bmi-height",
						inputMode: "decimal",
						value: height,
						onChange: (e) => setHeight(e.target.value),
						placeholder: "175"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "bmi-weight",
						children: "Weight (kg)"
					}), /* @__PURE__ */ jsx(Input, {
						id: "bmi-weight",
						inputMode: "decimal",
						value: weight,
						onChange: (e) => setWeight(e.target.value),
						placeholder: "70"
					})]
				})]
			}),
			bmi ? /* @__PURE__ */ jsxs("div", {
				className: "mt-4 rounded-xl bg-secondary p-4 text-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: cn("text-3xl font-bold", BMI_TONES[bmi.category]),
						children: bmi.bmi.toFixed(1)
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm font-medium",
						children: bmi.category
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: bmi.explanation
					})
				]
			}) : /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Enter your height and weight to see your BMI."
			}),
			error ? /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ jsx(Button, {
				className: "mt-3 w-full",
				variant: "secondary",
				onClick: save,
				children: "Save to profile"
			})
		]
	});
}
function WeightSection() {
	const { state } = useFitLife();
	const entries = [...state.weights].sort((a, b) => a.day < b.day ? 1 : -1);
	const latest = entries[0];
	const first = entries[entries.length - 1];
	const change = latest && first ? latest.weightKg - first.weightKg : 0;
	const max = Math.max(...entries.map((e) => e.weightKg), 1);
	const min = Math.min(...entries.map((e) => e.weightKg), max);
	return /* @__PURE__ */ jsxs("section", {
		className: "surface-card p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold",
				children: "Weight log"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: latest ? `Latest: ${latest.weightKg} kg` : "No entries yet"
			})] }), /* @__PURE__ */ jsx(LogWeightDialog, { trigger: /* @__PURE__ */ jsxs(Button, {
				size: "sm",
				className: "gap-1",
				children: [/* @__PURE__ */ jsx(Scale, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				}), "Log"]
			}) })]
		}), entries.length === 0 ? /* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children: /* @__PURE__ */ jsx(EmptyState, {
				icon: "⚖️",
				title: "No weight entries",
				description: "Log your weight to see your trend over time."
			})
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [entries.length > 1 ? /* @__PURE__ */ jsxs("p", {
			className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsx(TrendingUp, {
				className: "h-3.5 w-3.5",
				"aria-hidden": "true"
			}), change === 0 ? "No change since your first entry" : `${change > 0 ? "+" : ""}${change.toFixed(1)} kg since your first entry`]
		}) : null, /* @__PURE__ */ jsx("ul", {
			className: "mt-3 divide-y divide-border",
			children: entries.slice(0, 12).map((entry) => {
				const percent = max === min ? 100 : (entry.weightKg - min) / (max - min) * 80 + 20;
				return /* @__PURE__ */ jsxs("li", {
					className: "flex items-center gap-3 py-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "w-24 shrink-0 text-xs text-muted-foreground",
							children: entry.day
						}),
						/* @__PURE__ */ jsx("span", {
							className: "h-2 flex-1 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ jsx("span", {
								className: "gradient-primary block h-full rounded-full",
								style: { width: `${percent}%` }
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "w-16 shrink-0 text-right text-sm font-semibold",
							children: [entry.weightKg, " kg"]
						})
					]
				}, entry.id);
			})
		})] })]
	});
}
//#endregion
export { ProgressRoute as component };
