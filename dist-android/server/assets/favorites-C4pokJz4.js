import { n as useFitLife } from "./store-0KjQDRyU.js";
import { a as getWorkout } from "./workouts-COSmNJcJ.js";
import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { n as EmptyState } from "./stat-card-BN9dt71g.js";
import { t as WorkoutCard } from "./workout-card-DjpQf7fd.js";
import { Link } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/routes/favorites.tsx?tsr-split=component
function FavoritesScreen() {
	const { state } = useFitLife();
	const workouts = state.favorites.map((id) => getWorkout(id)).filter((w) => w !== void 0);
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Favorites",
		subtitle: `${workouts.length} saved`,
		backTo: "/workouts",
		children: workouts.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
			icon: "❤️",
			title: "No favorites yet",
			description: "Tap the heart on any workout to save it here for quick access.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Link, {
					to: "/workouts",
					children: "Browse workouts"
				})
			})
		}) : /* @__PURE__ */ jsx("ul", {
			className: "space-y-3",
			children: workouts.map((workout) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(WorkoutCard, { workout }) }, workout.id))
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(FavoritesScreen, {}) });
//#endregion
export { SplitComponent as component };
