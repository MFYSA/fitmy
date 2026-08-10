import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/session.$workoutId.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsxs(AppShell, {
	title: "Session not found",
	backTo: "/workouts",
	children: [/* @__PURE__ */ jsx("p", {
		className: "text-sm text-muted-foreground",
		children: "That workout no longer exists."
	}), /* @__PURE__ */ jsx(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/workouts",
			children: "Browse workouts"
		})
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
