import { n as useFitLife } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Apple, ArrowLeft, Dumbbell, Home, TrendingUp, User } from "lucide-react";
//#region src/components/fitlife/achievement-popup.tsx
/** Animated popup shown whenever an achievement is unlocked. */
function AchievementPopup() {
	const { pendingAchievement, dismissAchievement } = useFitLife();
	const achievement = pendingAchievement;
	React.useEffect(() => {
		if (!achievement) return;
		const timer = window.setTimeout(dismissAchievement, 6e3);
		return () => window.clearTimeout(timer);
	}, [achievement, dismissAchievement]);
	if (!achievement) return null;
	return /* @__PURE__ */ jsx("div", {
		role: "status",
		"aria-live": "polite",
		className: "fixed inset-x-0 top-4 z-50 flex justify-center px-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "animate-in slide-in-from-top-4 fade-in w-full max-w-sm rounded-2xl border border-primary/30 bg-card p-4 shadow-raised duration-500",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex h-12 w-12 shrink-0 animate-bounce items-center justify-center rounded-full bg-primary-soft text-2xl",
						"aria-hidden": "true",
						children: achievement.icon
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase tracking-wide text-primary",
								children: "Achievement unlocked"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "truncate font-semibold",
								children: achievement.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: achievement.description
							})
						]
					}),
					/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: dismissAchievement,
						"aria-label": "Dismiss achievement",
						children: "Nice"
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/fitlife/bottom-nav.tsx
var TABS = [
	{
		to: "/",
		label: "Home",
		icon: Home,
		match: (p) => p === "/"
	},
	{
		to: "/workouts",
		label: "Train",
		icon: Dumbbell,
		match: (p) => p.startsWith("/workouts") || p.startsWith("/favorites") || p.startsWith("/history")
	},
	{
		to: "/progress",
		label: "Progress",
		icon: TrendingUp,
		match: (p) => p.startsWith("/progress")
	},
	{
		to: "/nutrition",
		label: "Fuel",
		icon: Apple,
		match: (p) => p.startsWith("/nutrition")
	},
	{
		to: "/profile",
		label: "You",
		icon: User,
		match: (p) => p.startsWith("/profile") || p.startsWith("/settings")
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Main navigation",
		className: "fixed inset-x-0 bottom-0 z-40 safe-bottom px-3 pb-3",
		children: /* @__PURE__ */ jsx("ul", {
			className: "mx-auto flex max-w-lg items-stretch justify-between gap-1 rounded-full border border-border bg-card/85 px-2 py-1.5 shadow-nav backdrop-blur-xl",
			children: TABS.map((tab) => {
				const active = tab.match(pathname);
				const Icon = tab.icon;
				return /* @__PURE__ */ jsx("li", {
					className: "flex-1",
					children: /* @__PURE__ */ jsxs(Link, {
						to: tab.to,
						"aria-current": active ? "page" : void 0,
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
						children: [/* @__PURE__ */ jsx(Icon, {
							className: "h-[18px] w-[18px]",
							"aria-hidden": "true"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] font-bold uppercase tracking-widest",
							children: tab.label
						})]
					})
				}, tab.to);
			})
		})
	});
}
//#endregion
//#region src/components/fitlife/app-shell.tsx
function AppShell({ title, subtitle, backTo, actions, children, hideNav = false, hero, bareHeader = false, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: cn("sticky top-0 z-30 safe-top", bareHeader ? "pointer-events-none bg-transparent" : "border-b border-border bg-background/80 backdrop-blur-xl"),
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-lg items-center gap-3 px-4 py-3",
					children: [
						backTo ? /* @__PURE__ */ jsx(Link, {
							to: backTo,
							"aria-label": "Go back",
							className: "pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:bg-accent",
							children: /* @__PURE__ */ jsx(ArrowLeft, {
								className: "h-5 w-5",
								"aria-hidden": "true"
							})
						}) : null,
						bareHeader ? /* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: title
						}) : /* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "display-title truncate text-[1.4rem]",
								children: title
							}), subtitle ? /* @__PURE__ */ jsx("p", {
								className: "truncate text-xs font-medium text-muted-foreground",
								children: subtitle
							}) : null]
						}),
						actions ? /* @__PURE__ */ jsx("div", {
							className: "pointer-events-auto flex items-center",
							children: actions
						}) : null
					]
				})
			}),
			hero,
			/* @__PURE__ */ jsx("main", {
				className: cn("mx-auto max-w-lg px-4 pt-4", hideNav ? "pb-10" : "pb-32", className),
				children
			}),
			hideNav ? null : /* @__PURE__ */ jsx(BottomNav, {}),
			/* @__PURE__ */ jsx(AchievementPopup, {})
		]
	});
}
//#endregion
export { AppShell as t };
