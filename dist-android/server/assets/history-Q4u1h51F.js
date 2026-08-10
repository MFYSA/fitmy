import { i as formatDuration, n as useFitLife } from "./store-0KjQDRyU.js";
import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { n as EmptyState } from "./stat-card-BN9dt71g.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/history.tsx?tsr-split=component
function HistoryScreen() {
	const { state } = useFitLife();
	const entries = [...state.history].sort((a, b) => a.completedAt < b.completedAt ? 1 : -1);
	return /* @__PURE__ */ jsx(AppShell, {
		title: "History",
		subtitle: `${entries.length} completed`,
		backTo: "/workouts",
		children: entries.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
			icon: "📋",
			title: "No workouts logged",
			description: "Finish your first session and it will appear here.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Link, {
					to: "/workouts",
					children: "Start a workout"
				})
			})
		}) : /* @__PURE__ */ jsx("ul", {
			className: "space-y-2",
			children: entries.map((entry) => /* @__PURE__ */ jsxs("li", {
				className: "surface-card flex items-center gap-3 p-3",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg",
						children: "💪"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("p", {
							className: "truncate font-medium",
							children: entry.workoutName
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								entry.day,
								" · ",
								formatDuration(entry.durationSeconds),
								" · ",
								entry.calories,
								" kcal"
							]
						})]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "shrink-0 text-sm font-semibold text-primary",
						children: [
							"+",
							entry.xp,
							" XP"
						]
					})
				]
			}, entry.id))
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(HistoryScreen, {}) });
//#endregion
export { SplitComponent as component };
