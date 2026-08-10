import { t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/nutrition.$slug.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsxs(AppShell, {
	title: "Guide not found",
	backTo: "/nutrition",
	children: [/* @__PURE__ */ jsx("p", {
		className: "text-sm text-muted-foreground",
		children: "That nutrition guide doesn't exist."
	}), /* @__PURE__ */ jsx(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ jsx(Link, {
			to: "/nutrition",
			children: "All guides"
		})
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
