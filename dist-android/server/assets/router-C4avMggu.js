import { r as initAds } from "./ads-VkpEf_bc.js";
import { t as FitLifeProvider } from "./store-0KjQDRyU.js";
import { t as Route$10 } from "./nutrition._slug-MztDbJ13.js";
import { t as Route$11 } from "./session._workoutId-B6XjLGal.js";
import { t as Route$12 } from "./workouts._workoutId-CL6u52Zr.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "./assets/styles-CkMtx_SO.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Your saved data is safe — try again or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#0b0f0c"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "FitLife"
			},
			{
				name: "author",
				content: "FitLife"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/icon-192.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	useEffect(() => {
		initAds();
	}, []);
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(FitLifeProvider, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, { position: "top-center" })] })
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$8 = () => import("./routes-CUCyVMT8.js");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "FitLife — Your Daily Workout & Fitness Tracker" },
		{
			name: "description",
			content: "FitLife is your offline-ready fitness companion: 96 guided workouts, a workout timer, water tracking, BMI, weight logging, XP and achievements."
		},
		{
			property: "og:title",
			content: "FitLife — Your Daily Workout & Fitness Tracker"
		},
		{
			property: "og:description",
			content: "Train with 96 guided workouts, track water and weight, earn XP and keep your streak alive. Works offline."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/favorites.tsx
var $$splitComponentImporter$7 = () => import("./favorites-C4pokJz4.js");
var Route$7 = createFileRoute("/favorites")({
	head: () => ({ meta: [
		{ title: "Favorite Workouts | FitLife" },
		{
			name: "description",
			content: "Your saved FitLife workouts, ready to start again in one tap — available offline."
		},
		{
			property: "og:title",
			content: "Favorite Workouts | FitLife"
		},
		{
			property: "og:description",
			content: "Your saved FitLife workouts in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/history.tsx
var $$splitComponentImporter$6 = () => import("./history-Q4u1h51F.js");
var Route$6 = createFileRoute("/history")({
	head: () => ({ meta: [
		{ title: "Workout History | FitLife" },
		{
			name: "description",
			content: "Every workout you've completed in FitLife, with duration, calories and XP earned."
		},
		{
			property: "og:title",
			content: "Workout History | FitLife"
		},
		{
			property: "og:description",
			content: "Review every completed FitLife session."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/onboarding.tsx
var $$splitComponentImporter$5 = () => import("./onboarding-D18QvI0q.js");
var Route$5 = createFileRoute("/onboarding")({
	head: () => ({ meta: [
		{ title: "Get Started with FitLife — Set Up Your Profile" },
		{
			name: "description",
			content: "Tell FitLife a little about you — your name, fitness level and goal — and get a personalised workout plan in under a minute."
		},
		{
			property: "og:title",
			content: "Get Started with FitLife"
		},
		{
			property: "og:description",
			content: "Set your fitness level, goal and daily targets to personalise FitLife."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/profile.tsx
var $$splitComponentImporter$4 = () => import("./profile-DG8FaRsT.js");
var Route$4 = createFileRoute("/profile")({
	head: () => ({ meta: [
		{ title: "Your Profile & Goals | FitLife" },
		{
			name: "description",
			content: "Manage your FitLife profile, fitness level, goal, weekly workout target and daily water target, and review your lifetime stats."
		},
		{
			property: "og:title",
			content: "Your Profile & Goals | FitLife"
		},
		{
			property: "og:description",
			content: "Update your details, targets and review lifetime training stats."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/progress.tsx
var $$splitComponentImporter$3 = () => import("./progress-CS6kN85l.js");
var Route$3 = createFileRoute("/progress")({
	head: () => ({ meta: [
		{ title: "Progress, BMI & Achievements | FitLife" },
		{
			name: "description",
			content: "Track your workout streak, weekly activity, calories burned, weight trend, BMI and unlocked achievements in FitLife."
		},
		{
			property: "og:title",
			content: "Your Progress & BMI | FitLife"
		},
		{
			property: "og:description",
			content: "Streaks, weekly charts, weight history, BMI calculator and achievements."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/settings.tsx
var $$splitComponentImporter$2 = () => import("./settings-ByD2_3Rs.js");
var Route$2 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings & Data | FitLife" },
		{
			name: "description",
			content: "Control your FitLife theme, reminders, sounds, rest periods and stored data. Everything stays on your device."
		},
		{
			property: "og:title",
			content: "Settings & Data | FitLife"
		},
		{
			property: "og:description",
			content: "Theme, reminders, rest timing and data controls."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/nutrition.index.tsx
var $$splitComponentImporter$1 = () => import("./nutrition.index-CfMOe7Le.js");
var Route$1 = createFileRoute("/nutrition/")({
	head: () => ({ meta: [
		{ title: "Nutrition & Hydration Guides | FitLife" },
		{
			name: "description",
			content: "Learn about protein, carbs, fats, hydration and meal timing with FitLife's offline nutrition guides, plus track your daily water intake."
		},
		{
			property: "og:title",
			content: "Nutrition & Hydration Guides | FitLife"
		},
		{
			property: "og:description",
			content: "Macronutrient guides, hydration tips and a daily water tracker."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/workouts.index.tsx
var $$splitComponentImporter = () => import("./workouts.index-Ck2kwFxD.js");
var Route = createFileRoute("/workouts/")({
	head: () => ({ meta: [
		{ title: "Workout Library — 90+ Guided Routines | FitLife" },
		{
			name: "description",
			content: "Browse 90+ FitLife workouts by muscle group, difficulty, duration and equipment. Full body, cardio, core, stretching and more — all offline."
		},
		{
			property: "og:title",
			content: "Workout Library — 90+ Guided Routines"
		},
		{
			property: "og:description",
			content: "Search and filter FitLife workouts by muscle group, difficulty, duration and equipment."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var FavoritesRoute = Route$7.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$9
});
var HistoryRoute = Route$6.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$9
});
var OnboardingRoute = Route$5.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$9
});
var ProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$9
});
var ProgressRoute = Route$3.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$9
});
var SettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$9
});
var NutritionIndexRoute = Route$1.update({
	id: "/nutrition/",
	path: "/nutrition/",
	getParentRoute: () => Route$9
});
var NutritionSlugRoute = Route$10.update({
	id: "/nutrition/$slug",
	path: "/nutrition/$slug",
	getParentRoute: () => Route$9
});
var SessionWorkoutIdRoute = Route$11.update({
	id: "/session/$workoutId",
	path: "/session/$workoutId",
	getParentRoute: () => Route$9
});
var WorkoutsIndexRoute = Route.update({
	id: "/workouts/",
	path: "/workouts/",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	IndexRoute,
	FavoritesRoute,
	HistoryRoute,
	OnboardingRoute,
	ProfileRoute,
	ProgressRoute,
	SettingsRoute,
	NutritionSlugRoute,
	SessionWorkoutIdRoute,
	WorkoutsWorkoutIdRoute: Route$12.update({
		id: "/workouts/$workoutId",
		path: "/workouts/$workoutId",
		getParentRoute: () => Route$9
	}),
	NutritionIndexRoute,
	WorkoutsIndexRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
