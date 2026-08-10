import { f as getExercise, i as formatDuration, n as useFitLife } from "./store-0KjQDRyU.js";
import { t as Route } from "./workouts._workoutId-CL6u52Zr.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { t as workoutImage } from "./workout-images-CJYj5DLf.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { t as Badge } from "./badge-B3f60TId.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Clock, Dumbbell, Flame, Heart, ListChecks } from "lucide-react";
//#region src/routes/workouts.$workoutId.tsx?tsr-split=component
function WorkoutDetailRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(WorkoutDetail, {}) });
}
function WorkoutDetail() {
	const { workout } = Route.useLoaderData();
	const { state, toggleFavorite } = useFitLife();
	const isFavorite = state.favorites.includes(workout.id);
	const totalWork = workout.exercises.reduce((sum, e) => sum + e.seconds, 0);
	return /* @__PURE__ */ jsxs(AppShell, {
		title: workout.name,
		subtitle: `${workout.category} · ${workout.difficulty}`,
		backTo: "/workouts",
		actions: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => toggleFavorite(workout.id),
			"aria-pressed": isFavorite,
			"aria-label": isFavorite ? "Remove from favorites" : "Add to favorites",
			className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent",
			children: /* @__PURE__ */ jsx(Heart, {
				className: cn("h-5 w-5", isFavorite && "fill-primary text-primary"),
				"aria-hidden": "true"
			})
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative aspect-16/10 overflow-hidden rounded-2xl border border-border",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: workoutImage(workout.id),
								alt: `${workout.name} — ${workout.muscle} training`,
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "photo-scrim absolute inset-0",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute inset-x-0 bottom-0 p-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "kicker",
									children: workout.category
								}), /* @__PURE__ */ jsx("h2", {
									className: "display-title text-3xl",
									children: workout.name
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ jsx(Badge, {
								className: "rounded-full",
								children: workout.difficulty
							}),
							/* @__PURE__ */ jsx(Badge, {
								variant: "secondary",
								className: "rounded-full",
								children: workout.muscle
							}),
							workout.equipment.map((item) => /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								className: "rounded-full",
								children: item === "None" ? "No equipment" : item
							}, item))
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: workout.description
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ jsx(MiniStat, {
								icon: /* @__PURE__ */ jsx(Clock, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								label: "Duration",
								value: `${workout.durationMinutes} min`
							}),
							/* @__PURE__ */ jsx(MiniStat, {
								icon: /* @__PURE__ */ jsx(Flame, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								label: "Calories",
								value: `~${workout.calories}`
							}),
							/* @__PURE__ */ jsx(MiniStat, {
								icon: /* @__PURE__ */ jsx(ListChecks, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								label: "Exercises",
								value: `${workout.exercises.length}`
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						"aria-labelledby": "exercises-heading",
						children: [/* @__PURE__ */ jsxs("h2", {
							id: "exercises-heading",
							className: "kicker mb-3",
							children: [
								"Exercises · ",
								formatDuration(totalWork),
								" of work"
							]
						}), /* @__PURE__ */ jsx("ol", {
							className: "space-y-2",
							children: workout.exercises.map((item, index) => {
								const exercise = getExercise(item.exerciseId);
								return /* @__PURE__ */ jsxs("li", {
									className: "surface-card flex items-start gap-3 p-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary",
										children: index + 1
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "font-medium",
												children: exercise?.name ?? "Exercise"
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-xs text-muted-foreground",
												children: [
													item.seconds,
													"s · ",
													exercise?.equipment === "None" ? "No equipment" : exercise?.equipment
												]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: exercise?.instructions
											})
										]
									})]
								}, `${item.exerciseId}-${index}`);
							})
						})]
					}),
					/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "safe-bottom fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-lg",
					children: /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "lg",
						className: "h-12 w-full gap-2 text-base",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/session/$workoutId",
							params: { workoutId: workout.id },
							children: [/* @__PURE__ */ jsx(Dumbbell, {
								className: "h-5 w-5",
								"aria-hidden": "true"
							}), "Start Workout"]
						})
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-20",
				"aria-hidden": "true"
			})
		]
	});
}
function MiniStat({ icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "surface-card p-3 text-center",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "flex justify-center text-primary",
				children: icon
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm font-semibold",
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-[11px] text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { WorkoutDetailRoute as component };
