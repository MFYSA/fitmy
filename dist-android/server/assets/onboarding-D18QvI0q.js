import { g as GENDERS, h as FITNESS_LEVELS, m as FITNESS_GOALS, n as useFitLife } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as Input } from "./input-uzm9g8Y7.js";
import { t as Label } from "./label-BeT0bXvu.js";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
//#region src/routes/onboarding.tsx?tsr-split=component
var STEPS = [
	"Welcome",
	"About you",
	"Fitness level",
	"Your goal",
	"Daily targets"
];
function OnboardingScreen() {
	const { completeOnboarding, state, ready } = useFitLife();
	const navigate = useNavigate();
	const [step, setStep] = React.useState(0);
	const [name, setName] = React.useState("");
	const [age, setAge] = React.useState("");
	const [gender, setGender] = React.useState(null);
	const [height, setHeight] = React.useState("");
	const [weight, setWeight] = React.useState("");
	const [level, setLevel] = React.useState("Beginner");
	const [goal, setGoal] = React.useState("Improve Fitness");
	const [weeklyTarget, setWeeklyTarget] = React.useState(4);
	const [waterTarget, setWaterTarget] = React.useState(8);
	const [errors, setErrors] = React.useState({});
	React.useEffect(() => {
		if (ready && state.onboarded) navigate({
			to: "/",
			replace: true
		});
	}, [
		ready,
		state.onboarded,
		navigate
	]);
	const numberOrNull = (value, min, max) => {
		const parsed = Number.parseFloat(value.replace(",", "."));
		if (!value.trim()) return null;
		if (!Number.isFinite(parsed) || parsed < min || parsed > max) return void 0;
		return parsed;
	};
	const validateAboutYou = () => {
		const next = {};
		if (numberOrNull(age, 10, 100) === void 0) next["age"] = "Enter an age between 10 and 100, or leave it blank.";
		if (numberOrNull(height, 80, 250) === void 0) next["height"] = "Enter a height between 80 and 250 cm, or leave it blank.";
		if (numberOrNull(weight, 20, 400) === void 0) next["weight"] = "Enter a weight between 20 and 400 kg, or leave it blank.";
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const goNext = () => {
		if (step === 1 && !validateAboutYou()) return;
		setStep((s) => Math.min(STEPS.length - 1, s + 1));
	};
	const finish = () => {
		completeOnboarding({
			name: name.trim(),
			age: numberOrNull(age, 10, 100) ?? null,
			gender,
			heightCm: numberOrNull(height, 80, 250) ?? null,
			weightKg: numberOrNull(weight, 20, 400) ?? null,
			fitnessLevel: level,
			goal
		}, {
			weeklyWorkoutTarget: weeklyTarget,
			dailyWaterTarget: waterTarget,
			dailyWorkoutTarget: 1
		});
		navigate({
			to: "/",
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-full max-w-lg flex-1 px-5 pb-8 pt-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-2",
					"aria-hidden": "true",
					children: STEPS.map((label, index) => /* @__PURE__ */ jsx("span", { className: cn("h-1.5 flex-1 rounded-full transition-colors", index <= step ? "gradient-primary" : "bg-secondary") }, label))
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-xs font-medium text-muted-foreground",
					children: [
						"Step ",
						step + 1,
						" of ",
						STEPS.length,
						" · ",
						STEPS[step]
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6",
					children: [
						step === 0 ? /* @__PURE__ */ jsxs("section", {
							className: "space-y-4 text-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "gradient-primary mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-5xl shadow-raised",
									children: "💪"
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-3xl font-bold",
									children: "Welcome to FitLife"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-muted-foreground",
									children: "90+ guided workouts, a real workout timer, water and weight tracking, XP and achievements — all stored on your device and fully usable offline."
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "mx-auto max-w-sm space-y-2 pt-2 text-left text-sm",
									children: [
										/* @__PURE__ */ jsx("li", {
											className: "surface-card px-4 py-3",
											children: "🏋️ Follow guided workouts with timers"
										}),
										/* @__PURE__ */ jsx("li", {
											className: "surface-card px-4 py-3",
											children: "📈 Track weight, BMI and streaks"
										}),
										/* @__PURE__ */ jsx("li", {
											className: "surface-card px-4 py-3",
											children: "🏆 Earn XP, levels and achievements"
										})
									]
								})
							]
						}) : null,
						step === 1 ? /* @__PURE__ */ jsxs("section", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold",
									children: "About you"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Everything here is optional except your name — you can change it later in your profile."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "ob-name",
										children: "Name"
									}), /* @__PURE__ */ jsx(Input, {
										id: "ob-name",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Alex",
										autoComplete: "given-name"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Label, {
												htmlFor: "ob-age",
												children: "Age"
											}),
											/* @__PURE__ */ jsx(Input, {
												id: "ob-age",
												inputMode: "numeric",
												value: age,
												onChange: (e) => setAge(e.target.value),
												placeholder: "28",
												"aria-invalid": errors["age"] ? true : void 0
											}),
											errors["age"] ? /* @__PURE__ */ jsx("p", {
												className: "text-xs text-destructive",
												children: errors["age"]
											}) : null
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ jsx(Label, {
												htmlFor: "ob-height",
												children: "Height (cm)"
											}),
											/* @__PURE__ */ jsx(Input, {
												id: "ob-height",
												inputMode: "decimal",
												value: height,
												onChange: (e) => setHeight(e.target.value),
												placeholder: "175",
												"aria-invalid": errors["height"] ? true : void 0
											}),
											errors["height"] ? /* @__PURE__ */ jsx("p", {
												className: "text-xs text-destructive",
												children: errors["height"]
											}) : null
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "ob-weight",
											children: "Weight (kg)"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "ob-weight",
											inputMode: "decimal",
											value: weight,
											onChange: (e) => setWeight(e.target.value),
											placeholder: "70",
											"aria-invalid": errors["weight"] ? true : void 0
										}),
										errors["weight"] ? /* @__PURE__ */ jsx("p", {
											className: "text-xs text-destructive",
											children: errors["weight"]
										}) : null
									]
								}),
								/* @__PURE__ */ jsxs("fieldset", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx("legend", {
										className: "text-sm font-medium",
										children: "Gender"
									}), /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-2 gap-2",
										children: GENDERS.map((option) => /* @__PURE__ */ jsx(ChoiceButton, {
											selected: gender === option,
											onClick: () => setGender(option),
											children: option
										}, option))
									})]
								})
							]
						}) : null,
						step === 2 ? /* @__PURE__ */ jsxs("section", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold",
									children: "Your fitness level"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "We'll recommend workouts that match. You can change this any time."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "space-y-2",
									children: FITNESS_LEVELS.map((option) => /* @__PURE__ */ jsxs(ChoiceButton, {
										selected: level === option,
										onClick: () => setLevel(option),
										block: true,
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold",
											children: option
										}), /* @__PURE__ */ jsx("span", {
											className: "block text-xs opacity-80",
											children: option === "Beginner" ? "New to exercise or coming back after a break" : option === "Intermediate" ? "Training semi-regularly and comfortable with the basics" : "Training consistently and ready for high intensity"
										})]
									}, option))
								})
							]
						}) : null,
						step === 3 ? /* @__PURE__ */ jsxs("section", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "text-2xl font-bold",
								children: "What's your goal?"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 gap-2",
								children: FITNESS_GOALS.map((option) => /* @__PURE__ */ jsx(ChoiceButton, {
									selected: goal === option,
									onClick: () => setGoal(option),
									children: option
								}, option))
							})]
						}) : null,
						step === 4 ? /* @__PURE__ */ jsxs("section", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
									className: "text-2xl font-bold",
									children: "Daily targets"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Choose something realistic — you can adjust later."
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, { children: "Workouts per week" }), /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-4 gap-2",
										children: [
											2,
											3,
											4,
											5,
											6,
											7
										].map((n) => /* @__PURE__ */ jsx(ChoiceButton, {
											selected: weeklyTarget === n,
											onClick: () => setWeeklyTarget(n),
											children: n
										}, n))
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, { children: "Glasses of water per day" }), /* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-4 gap-2",
										children: [
											6,
											8,
											10,
											12
										].map((n) => /* @__PURE__ */ jsx(ChoiceButton, {
											selected: waterTarget === n,
											onClick: () => setWaterTarget(n),
											children: n
										}, n))
									})]
								})
							]
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "safe-bottom sticky bottom-0 border-t border-border bg-background/95 backdrop-blur",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-lg items-center gap-3 px-5 py-3",
				children: [step > 0 ? /* @__PURE__ */ jsxs(Button, {
					variant: "ghost",
					onClick: () => setStep((s) => s - 1),
					className: "gap-1",
					children: [/* @__PURE__ */ jsx(ChevronLeft, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), "Back"]
				}) : null, step < STEPS.length - 1 ? /* @__PURE__ */ jsxs(Button, {
					className: "ml-auto min-w-32 gap-1",
					onClick: goNext,
					children: [step === 0 ? "Get started" : "Continue", /* @__PURE__ */ jsx(ChevronRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})]
				}) : /* @__PURE__ */ jsx(Button, {
					className: "ml-auto min-w-40",
					onClick: finish,
					children: "Let's Get Started 💪"
				})]
			})
		})]
	});
}
function ChoiceButton({ selected, onClick, children, block = false }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		"aria-pressed": selected,
		className: cn("min-h-12 rounded-xl border px-3 py-2.5 text-sm transition-colors", block ? "w-full text-left" : "text-center", selected ? "border-primary bg-primary-soft font-semibold text-accent-foreground" : "border-border bg-card hover:bg-secondary"),
		children
	});
}
//#endregion
export { OnboardingScreen as component };
