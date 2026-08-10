import { a as showInterstitial } from "./ads-VkpEf_bc.js";
import { f as getExercise, i as formatDuration, n as useFitLife } from "./store-0KjQDRyU.js";
import { t as Route } from "./session._workoutId-B6XjLGal.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-Bz_ok53Q.js";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Check, Pause, Play, SkipForward, X } from "lucide-react";
//#region src/routes/session.$workoutId.tsx?tsr-split=component
function SessionRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(SessionScreen, {}) });
}
function SessionScreen() {
	const { workout } = Route.useLoaderData();
	const { completeWorkout } = useFitLife();
	const navigate = useNavigate();
	const steps = workout.exercises;
	const [index, setIndex] = React.useState(0);
	const [phase, setPhase] = React.useState("work");
	const [remaining, setRemaining] = React.useState(steps[0]?.seconds ?? 30);
	const [running, setRunning] = React.useState(true);
	const [elapsed, setElapsed] = React.useState(0);
	const [confirmQuit, setConfirmQuit] = React.useState(false);
	const [savedXp, setSavedXp] = React.useState(null);
	const current = steps[index];
	const exercise = current ? getExercise(current.exerciseId) : void 0;
	const nextStep = steps[index + 1];
	const nextExercise = nextStep ? getExercise(nextStep.exerciseId) : void 0;
	const advance = React.useCallback(() => {
		setPhase((prevPhase) => {
			if (prevPhase === "work") {
				const rest = steps[index]?.restSeconds ?? 0;
				const isLast = index === steps.length - 1;
				if (!isLast && rest > 0) {
					setRemaining(rest);
					return "rest";
				}
				if (isLast) {
					setRunning(false);
					return "done";
				}
				setIndex(index + 1);
				setRemaining(steps[index + 1]?.seconds ?? 30);
				return "work";
			}
			setIndex(index + 1);
			setRemaining(steps[index + 1]?.seconds ?? 30);
			return "work";
		});
	}, [index, steps]);
	React.useEffect(() => {
		if (!running || phase === "done") return;
		const id = window.setInterval(() => {
			setElapsed((e) => e + 1);
			setRemaining((r) => {
				if (r <= 1) {
					advance();
					return 0;
				}
				return r - 1;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [
		running,
		phase,
		advance
	]);
	React.useEffect(() => {
		if (phase !== "done" || savedXp !== null) return;
		const result = completeWorkout({
			workout,
			durationSeconds: elapsed,
			exercisesCompleted: steps.length
		});
		setSavedXp(result.xp);
		showInterstitial();
	}, [
		phase,
		savedXp,
		elapsed,
		completeWorkout,
		workout,
		steps.length
	]);
	const totalSeconds = steps.reduce((sum, step) => sum + step.seconds + step.restSeconds, 0);
	const progress = Math.min(100, Math.round(elapsed / Math.max(1, totalSeconds) * 100));
	const phaseTotal = phase === "rest" ? current?.restSeconds ?? 1 : current?.seconds ?? 1;
	const ringPercent = Math.max(0, Math.min(100, remaining / Math.max(1, phaseTotal) * 100));
	if (phase === "done") return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "gradient-primary flex h-24 w-24 items-center justify-center rounded-full shadow-raised",
				children: /* @__PURE__ */ jsx(Check, {
					className: "h-12 w-12 text-primary-foreground",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "display-title text-4xl",
				children: "Workout complete"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-muted-foreground",
				children: workout.name
			})] }),
			/* @__PURE__ */ jsxs("dl", {
				className: "grid w-full max-w-sm grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ jsx(SummaryStat, {
						label: "Time",
						value: formatDuration(elapsed)
					}),
					/* @__PURE__ */ jsx(SummaryStat, {
						label: "Exercises",
						value: `${steps.length}`
					}),
					/* @__PURE__ */ jsx(SummaryStat, {
						label: "XP earned",
						value: `+${savedXp ?? 0}`
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex w-full max-w-sm flex-col gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					size: "lg",
					onClick: () => void navigate({ to: "/" }),
					children: "Back to home"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					onClick: () => void navigate({ to: "/workouts" }),
					children: "Pick another workout"
				})]
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex items-center gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setConfirmQuit(true),
					"aria-label": "End workout",
					className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent",
					children: /* @__PURE__ */ jsx(X, {
						className: "h-5 w-5",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx("p", {
						className: "truncate text-sm font-semibold",
						children: workout.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Exercise ",
							index + 1,
							" of ",
							steps.length,
							" · ",
							formatDuration(elapsed),
							" elapsed"
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "px-4 pt-3",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
					role: "progressbar",
					"aria-label": "Workout progress",
					"aria-valuenow": progress,
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					children: /* @__PURE__ */ jsx("div", {
						className: "gradient-primary h-full rounded-full transition-all",
						style: { width: `${progress}%` }
					})
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8 text-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: cn("rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest", phase === "rest" ? "bg-secondary text-secondary-foreground" : "bg-primary-soft text-primary"),
						children: phase === "rest" ? "Rest" : "Work"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "display-title text-4xl",
						children: phase === "rest" ? "Take a breath" : exercise?.name ?? "Exercise"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "relative flex h-56 w-56 items-center justify-center rounded-full",
						style: { background: `conic-gradient(var(--primary) ${ringPercent}%, var(--secondary) ${ringPercent}%)` },
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex h-44 w-44 flex-col items-center justify-center rounded-full bg-card",
							children: [/* @__PURE__ */ jsx("span", {
								className: "display-title text-5xl tabular-nums",
								"aria-live": "polite",
								children: formatDuration(remaining)
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "remaining"
							})]
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "max-w-sm text-sm text-muted-foreground",
						children: phase === "rest" ? nextExercise ? `Next up: ${nextExercise.name}` : "Almost done — final push!" : exercise?.instructions ?? ""
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "safe-bottom border-t border-border px-4 py-4",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-lg items-center gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						size: "lg",
						className: "h-14 flex-1 gap-2 text-base",
						onClick: () => setRunning((v) => !v),
						children: running ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Pause, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						}), " Pause"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Play, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						}), " Resume"] })
					}), /* @__PURE__ */ jsxs(Button, {
						variant: "secondary",
						size: "lg",
						className: "h-14 gap-2",
						onClick: () => {
							setRemaining(0);
							advance();
						},
						children: [/* @__PURE__ */ jsx(SkipForward, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						}), "Skip"]
					})]
				})
			}),
			/* @__PURE__ */ jsx(AlertDialog, {
				open: confirmQuit,
				onOpenChange: setConfirmQuit,
				children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "End this workout?" }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Your progress for this session won't be saved and you won't earn XP." })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Keep going" }), /* @__PURE__ */ jsx(AlertDialogAction, {
					onClick: () => void navigate({ to: "/workouts" }),
					children: "End workout"
				})] })] })
			})
		]
	});
}
function SummaryStat({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "surface-card p-3",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "kicker",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "display-title text-lg",
			children: value
		})]
	});
}
//#endregion
export { SessionRoute as component };
