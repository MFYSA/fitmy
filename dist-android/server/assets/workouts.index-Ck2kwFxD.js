import { n as useFitLife } from "./store-0KjQDRyU.js";
import { i as WORKOUT_CATEGORIES, n as ALL_EQUIPMENT, r as WORKOUTS, t as ALL_DIFFICULTIES } from "./workouts-COSmNJcJ.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { n as EmptyState } from "./stat-card-BN9dt71g.js";
import { t as WorkoutCard } from "./workout-card-DjpQf7fd.js";
import { t as AdSlot } from "./ad-slot-Q2EWULUw.js";
import { t as Input } from "./input-uzm9g8Y7.js";
import { t as Badge } from "./badge-B3f60TId.js";
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Heart, History, Search, SlidersHorizontal, X } from "lucide-react";
//#region src/routes/workouts.index.tsx?tsr-split=component
function WorkoutsRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(WorkoutsScreen, {}) });
}
function WorkoutsScreen() {
	const { state } = useFitLife();
	const [query, setQuery] = React.useState("");
	const [category, setCategory] = React.useState("All");
	const [difficulty, setDifficulty] = React.useState("All");
	const [equipment, setEquipment] = React.useState("All");
	const [duration, setDuration] = React.useState("any");
	const [showFilters, setShowFilters] = React.useState(false);
	const results = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		return WORKOUTS.filter((workout) => {
			if (category !== "All" && workout.category !== category) return false;
			if (difficulty !== "All" && workout.difficulty !== difficulty) return false;
			if (equipment !== "All" && !workout.equipment.includes(equipment)) return false;
			if (duration === "short" && workout.durationMinutes > 10) return false;
			if (duration === "medium" && (workout.durationMinutes <= 10 || workout.durationMinutes > 20)) return false;
			if (duration === "long" && workout.durationMinutes <= 20) return false;
			if (!q) return true;
			return workout.name.toLowerCase().includes(q) || workout.category.toLowerCase().includes(q) || workout.muscle.toLowerCase().includes(q) || workout.difficulty.toLowerCase().includes(q) || workout.description.toLowerCase().includes(q) || workout.equipment.some((e) => e.toLowerCase().includes(q));
		});
	}, [
		query,
		category,
		difficulty,
		equipment,
		duration
	]);
	const filtersActive = category !== "All" || difficulty !== "All" || equipment !== "All" || duration !== "any";
	const clearFilters = () => {
		setCategory("All");
		setDifficulty("All");
		setEquipment("All");
		setDuration("any");
	};
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Workouts",
		subtitle: `${results.length} of ${WORKOUTS.length} workouts`,
		actions: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "/favorites",
				"aria-label": "Favorites",
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent",
				children: /* @__PURE__ */ jsx(Heart, {
					className: "h-5 w-5",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ jsx(Link, {
				to: "/history",
				"aria-label": "Workout history",
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-accent",
				children: /* @__PURE__ */ jsx(History, {
					className: "h-5 w-5",
					"aria-hidden": "true"
				})
			})]
		}),
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative flex-1",
						children: [
							/* @__PURE__ */ jsx(Search, {
								className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search workouts, muscles, equipment…",
								"aria-label": "Search workouts",
								className: "pl-9"
							}),
							query ? /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setQuery(""),
								"aria-label": "Clear search",
								className: "absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary",
								children: /* @__PURE__ */ jsx(X, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								})
							}) : null
						]
					}), /* @__PURE__ */ jsx(Button, {
						variant: showFilters || filtersActive ? "default" : "secondary",
						onClick: () => setShowFilters((v) => !v),
						"aria-expanded": showFilters,
						"aria-label": "Toggle filters",
						className: "shrink-0",
						children: /* @__PURE__ */ jsx(SlidersHorizontal, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "-mx-4 overflow-x-auto px-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex w-max gap-2 pb-1",
						children: [/* @__PURE__ */ jsx(FilterChip, {
							active: category === "All",
							onClick: () => setCategory("All"),
							children: "All"
						}), WORKOUT_CATEGORIES.map((item) => /* @__PURE__ */ jsx(FilterChip, {
							active: category === item,
							onClick: () => setCategory(item),
							children: item
						}, item))]
					})
				}),
				showFilters ? /* @__PURE__ */ jsxs("div", {
					className: "surface-card space-y-4 p-4",
					children: [
						/* @__PURE__ */ jsxs(FilterGroup, {
							label: "Difficulty",
							children: [/* @__PURE__ */ jsx(FilterChip, {
								active: difficulty === "All",
								onClick: () => setDifficulty("All"),
								children: "Any"
							}), ALL_DIFFICULTIES.map((item) => /* @__PURE__ */ jsx(FilterChip, {
								active: difficulty === item,
								onClick: () => setDifficulty(item),
								children: item
							}, item))]
						}),
						/* @__PURE__ */ jsxs(FilterGroup, {
							label: "Equipment",
							children: [/* @__PURE__ */ jsx(FilterChip, {
								active: equipment === "All",
								onClick: () => setEquipment("All"),
								children: "Any"
							}), ALL_EQUIPMENT.map((item) => /* @__PURE__ */ jsx(FilterChip, {
								active: equipment === item,
								onClick: () => setEquipment(item),
								children: item === "None" ? "No Equipment" : item
							}, item))]
						}),
						/* @__PURE__ */ jsx(FilterGroup, {
							label: "Duration",
							children: [
								["any", "Any"],
								["short", "Under 10 min"],
								["medium", "10–20 min"],
								["long", "20+ min"]
							].map(([value, label]) => /* @__PURE__ */ jsx(FilterChip, {
								active: duration === value,
								onClick: () => setDuration(value),
								children: label
							}, value))
						}),
						filtersActive ? /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: clearFilters,
							children: "Clear all filters"
						}) : null
					]
				}) : null,
				results.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
					icon: "🔍",
					title: "No workouts match",
					description: "Try a different search term or clear your filters.",
					action: /* @__PURE__ */ jsx(Button, {
						variant: "secondary",
						onClick: () => {
							setQuery("");
							clearFilters();
						},
						children: "Reset search"
					})
				}) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: results.map((workout) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(WorkoutCard, { workout }) }, workout.id))
				}),
				/* @__PURE__ */ jsx(AdSlot, { enabled: state.settings.adsEnabled })
			]
		})
	});
}
function FilterGroup({ label, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "mb-2 text-xs font-semibold text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2",
		children
	})] });
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		children: /* @__PURE__ */ jsx(Badge, {
			variant: active ? "default" : "secondary",
			className: cn("min-h-9 rounded-full px-3 text-xs font-medium", !active && "hover:bg-accent"),
			children
		})
	});
}
//#endregion
export { WorkoutsRoute as component };
