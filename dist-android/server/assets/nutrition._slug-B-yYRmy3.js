import { n as NUTRITION_DISCLAIMER } from "./nutrition-L3KqR14j.js";
import { t as Route } from "./nutrition._slug-MztDbJ13.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/nutrition.$slug.tsx?tsr-split=component
function ArticleRoute() {
	return /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(ArticleScreen, {}) });
}
function ArticleScreen() {
	const { article } = Route.useLoaderData();
	return /* @__PURE__ */ jsx(AppShell, {
		title: article.title,
		backTo: "/nutrition",
		children: /* @__PURE__ */ jsxs("article", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "surface-card flex items-center gap-3 p-4",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-4xl",
						"aria-hidden": "true",
						children: article.icon
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: article.summary
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm leading-relaxed",
					children: article.description
				}),
				/* @__PURE__ */ jsx(Section, {
					title: "Why it matters",
					items: article.benefits
				}),
				/* @__PURE__ */ jsx(Section, {
					title: "Good sources",
					items: article.examples
				}),
				/* @__PURE__ */ jsx(Section, {
					title: "Practical tips",
					items: article.tips
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: NUTRITION_DISCLAIMER
				})
			]
		})
	});
}
function Section({ title, items }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "surface-card p-4",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ jsx("ul", {
			className: "mt-2 space-y-1.5",
			children: items.map((item) => /* @__PURE__ */ jsxs("li", {
				className: "flex gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: "text-primary",
					children: "•"
				}), item]
			}, item))
		})]
	});
}
//#endregion
export { ArticleRoute as component };
