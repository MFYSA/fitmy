import { n as useFitLife } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as AppShell } from "./app-shell-CCdV4563.js";
import { t as OnboardingGate } from "./onboarding-gate-D83woqBE.js";
import { t as Label } from "./label-BeT0bXvu.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-Bz_ok53Q.js";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/routes/settings.tsx?tsr-split=component
function SettingsScreen() {
	const { state, updateSettings, resetProgress, resetEverything, storageWorking } = useFitLife();
	const navigate = useNavigate();
	const s = state.settings;
	return /* @__PURE__ */ jsx(AppShell, {
		title: "Settings",
		backTo: "/profile",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card p-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold",
						children: "Appearance"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3 flex gap-2",
						children: [
							"light",
							"dark",
							"system"
						].map((theme) => /* @__PURE__ */ jsx(Button, {
							variant: s.theme === theme ? "default" : "secondary",
							className: "flex-1 capitalize",
							onClick: () => updateSettings({ theme }),
							children: theme
						}, theme))
					})]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card divide-y divide-border p-4",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "pb-3 text-sm font-semibold",
							children: "Preferences"
						}),
						/* @__PURE__ */ jsx(ToggleRow, {
							id: "set-sound",
							label: "Timer sounds",
							description: "Play a cue when an interval ends",
							checked: s.sound,
							onChange: (v) => updateSettings({ sound: v })
						}),
						/* @__PURE__ */ jsx(ToggleRow, {
							id: "set-rest",
							label: "Rest between exercises",
							description: "Insert a rest interval during sessions",
							checked: s.restBetweenExercises,
							onChange: (v) => updateSettings({ restBetweenExercises: v })
						}),
						/* @__PURE__ */ jsx(ToggleRow, {
							id: "set-water",
							label: "Water reminders",
							description: "Nudge yourself to keep hydrated",
							checked: s.waterReminders,
							onChange: (v) => updateSettings({ waterReminders: v })
						}),
						/* @__PURE__ */ jsx(ToggleRow, {
							id: "set-workout",
							label: "Workout reminders",
							description: "Daily prompt to keep your streak alive",
							checked: s.workoutReminders,
							onChange: (v) => updateSettings({ workoutReminders: v })
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "surface-card space-y-3 p-4",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-semibold",
							children: "Your data"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: storageWorking ? "FitLife stores everything locally on this device — no account needed and it works offline." : "Local storage is unavailable, so your data will only last for this session."
						}),
						/* @__PURE__ */ jsx(ConfirmButton, {
							label: "Reset progress",
							title: "Reset all progress?",
							description: "This clears your workout history, weight log, water log, XP and achievements. Your profile stays.",
							onConfirm: () => {
								resetProgress();
								toast.success("Progress reset");
							}
						}),
						/* @__PURE__ */ jsx(ConfirmButton, {
							label: "Delete everything",
							title: "Delete all FitLife data?",
							description: "This removes your profile, goals, history and achievements, and restarts onboarding.",
							destructive: true,
							onConfirm: () => {
								resetEverything();
								navigate({
									to: "/onboarding",
									replace: true
								});
							}
						})
					]
				})
			]
		})
	});
}
function ToggleRow({ id, label, description, checked, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-4 py-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: id,
				className: "font-medium",
				children: label
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})]
		}), /* @__PURE__ */ jsx(Switch, {
			id,
			checked,
			onCheckedChange: onChange
		})]
	});
}
function ConfirmButton({ label, title, description, onConfirm, destructive = false }) {
	return /* @__PURE__ */ jsxs(AlertDialog, { children: [/* @__PURE__ */ jsx(AlertDialogTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			variant: destructive ? "destructive" : "secondary",
			className: "w-full",
			children: label
		})
	}), /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: title }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: description })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ jsx(AlertDialogAction, {
		onClick: onConfirm,
		children: "Confirm"
	})] })] })] });
}
var SplitComponent = () => /* @__PURE__ */ jsx(OnboardingGate, { children: /* @__PURE__ */ jsx(SettingsScreen, {}) });
//#endregion
export { SplitComponent as component };
