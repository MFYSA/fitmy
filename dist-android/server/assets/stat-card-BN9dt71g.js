import { r as cn } from "./button-PwNqyxv_.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/fitlife/stat-card.tsx
var TONES = {
	default: "text-foreground",
	primary: "text-primary",
	water: "text-water",
	flame: "text-flame"
};
function StatCard({ label, value, hint, icon, tone = "default", className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("surface-card p-4", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "kicker",
					children: label
				}), icon ? /* @__PURE__ */ jsx("span", {
					className: TONES[tone],
					children: icon
				}) : null]
			}),
			/* @__PURE__ */ jsx("p", {
				className: cn("display-title mt-2 text-2xl tabular-nums", TONES[tone]),
				children: value
			}),
			hint ? /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function ProgressBar({ value, tone = "primary", label, className }) {
	const clamped = Math.max(0, Math.min(100, Math.round(value || 0)));
	const bg = tone === "water" ? "bg-water" : tone === "flame" ? "bg-flame" : "gradient-primary";
	return /* @__PURE__ */ jsx("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className),
		role: "progressbar",
		"aria-valuenow": clamped,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": label ?? "Progress",
		children: /* @__PURE__ */ jsx("div", {
			className: cn("h-full rounded-full transition-all duration-500", bg),
			style: { width: `${clamped}%` }
		})
	});
}
/** Big activity ring used on Home and Progress. */
function ActivityRing({ value, size = 132, stroke = 10, label, children }) {
	const clamped = Math.max(0, Math.min(100, Math.round(value || 0)));
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ jsxs("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			role: "img",
			"aria-label": `${label}: ${clamped}%`,
			className: "-rotate-90",
			children: [/* @__PURE__ */ jsx("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--secondary)",
				strokeWidth: stroke
			}), /* @__PURE__ */ jsx("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "var(--primary)",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c - c * clamped / 100,
				className: "transition-all duration-700"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center",
			children
		})]
	});
}
function EmptyState({ icon, title, description, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "surface-card flex flex-col items-center gap-2 px-6 py-12 text-center",
		children: [
			icon ? /* @__PURE__ */ jsx("span", {
				className: "text-3xl",
				"aria-hidden": "true",
				children: icon
			}) : null,
			/* @__PURE__ */ jsx("p", {
				className: "display-title text-lg",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "max-w-xs text-sm text-muted-foreground",
				children: description
			}),
			action ? /* @__PURE__ */ jsx("div", {
				className: "mt-2",
				children: action
			}) : null
		]
	});
}
//#endregion
export { StatCard as i, EmptyState as n, ProgressBar as r, ActivityRing as t };
