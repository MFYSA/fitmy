import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/workouts.$workoutId.tsx?tsr-split=notFoundComponent
function WorkoutNotFound() {
	return /* @__PURE__ */ jsxs(AppShell, {
		title: "Workout not found",
		backTo: "/workouts",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "We couldn't find that workout. It may have been renamed."
		}), /* @__PURE__ */ jsx(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ jsx(Link, {
				to: "/workouts",
				children: "Browse workouts"
			})
		})]
	});
}
//#endregion
export { WorkoutNotFound as notFoundComponent };
