import { l as lastSevenDays } from "./store-0KjQDRyU.js";
import { r as cn } from "./button-PwNqyxv_.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/fitlife/weekly-chart.tsx
var WEEK_LABELS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function currentWeekDays(today = /* @__PURE__ */ new Date()) {
	const dayIndex = (today.getDay() + 6) % 7;
	return WEEK_LABELS.map((label, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() - dayIndex + i);
		return {
			key: `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`,
			label,
			isToday: i === dayIndex
		};
	});
}
function WeeklyChart({ history, mode = "rolling", metric = "workouts" }) {
	const today = /* @__PURE__ */ new Date();
	const days = mode === "week" ? currentWeekDays(today) : lastSevenDays(today).map((d, i, arr) => ({
		...d,
		isToday: i === arr.length - 1
	}));
	const values = days.map((day) => {
		const entries = history.filter((h) => h.day === day.key);
		return metric === "minutes" ? Math.round(entries.reduce((s, h) => s + h.durationSeconds, 0) / 60) : entries.length;
	});
	const max = Math.max(1, ...values);
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-end justify-between gap-2",
		role: "img",
		"aria-label": `Activity for the last 7 days by ${metric}`,
		children: days.map((day, index) => {
			const value = values[index] ?? 0;
			const heightPercent = value === 0 ? 6 : Math.max(12, Math.round(value / max * 100));
			return /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 flex-col items-center gap-1.5",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-medium text-muted-foreground",
						children: value || ""
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex h-24 w-full items-end justify-center",
						children: /* @__PURE__ */ jsx("div", {
							className: cn("w-full max-w-8 rounded-lg transition-all duration-500", value > 0 ? "gradient-primary" : "bg-secondary"),
							style: { height: `${heightPercent}%` }
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: cn("text-[11px]", day.isToday ? "font-semibold text-primary" : "text-muted-foreground"),
						children: day.label
					})
				]
			}, day.key);
		})
	});
}
//#endregion
export { WeeklyChart as t };
