import { n as useFitLife } from "./store-0KjQDRyU.js";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/fitlife/onboarding-gate.tsx
/**
* Sends first-time users through onboarding before any main screen renders.
* Renders nothing until local data has been read, which avoids a flash of
* empty dashboard on first paint.
*/
function OnboardingGate({ children }) {
	const { state, ready } = useFitLife();
	const navigate = useNavigate();
	React.useEffect(() => {
		if (ready && !state.onboarded) navigate({
			to: "/onboarding",
			replace: true
		});
	}, [
		ready,
		state.onboarded,
		navigate
	]);
	if (!ready || !state.onboarded) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "gradient-primary flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl text-2xl",
				children: "💪"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading FitLife…"
			})]
		})
	});
	return /* @__PURE__ */ jsx(Fragment, { children });
}
//#endregion
export { OnboardingGate as t };
