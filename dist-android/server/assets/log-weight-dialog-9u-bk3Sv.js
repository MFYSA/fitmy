import { n as useFitLife } from "./store-0KjQDRyU.js";
import { r as cn, t as Button } from "./button-PwNqyxv_.js";
import { t as Input } from "./input-uzm9g8Y7.js";
import { t as Label } from "./label-BeT0bXvu.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/fitlife/log-weight-dialog.tsx
function LogWeightDialog({ trigger }) {
	const { state, logWeight } = useFitLife();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [error, setError] = React.useState(null);
	React.useEffect(() => {
		if (open) {
			setValue(state.profile.weightKg ? String(state.profile.weightKg) : "");
			setError(null);
		}
	}, [open, state.profile.weightKg]);
	const submit = (event) => {
		event.preventDefault();
		const parsed = Number.parseFloat(value.replace(",", "."));
		if (!Number.isFinite(parsed)) {
			setError("Please enter a number.");
			return;
		}
		if (!logWeight(parsed)) {
			setError("Enter a weight between 20 and 400 kg.");
			return;
		}
		toast.success(`Weight logged: ${Math.round(parsed * 10) / 10} kg`);
		setOpen(false);
	};
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ jsx(DialogContent, {
			className: "max-w-sm",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Log your weight" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Stored on this device only." })] }),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 space-y-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "weight-input",
								children: "Weight (kg)"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "weight-input",
								inputMode: "decimal",
								autoComplete: "off",
								value,
								onChange: (e) => {
									setValue(e.target.value);
									setError(null);
								},
								placeholder: "70",
								"aria-invalid": error ? true : void 0,
								"aria-describedby": error ? "weight-error" : void 0
							}),
							error ? /* @__PURE__ */ jsx("p", {
								id: "weight-error",
								className: "text-sm text-destructive",
								children: error
							}) : null
						]
					}),
					/* @__PURE__ */ jsx(DialogFooter, {
						className: "mt-6",
						children: /* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "w-full",
							children: "Save weight"
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { LogWeightDialog as t };
