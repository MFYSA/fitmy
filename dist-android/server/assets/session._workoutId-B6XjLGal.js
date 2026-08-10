import { a as getWorkout } from "./workouts-COSmNJcJ.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/session.$workoutId.tsx
var $$splitComponentImporter = () => import("./session._workoutId-BP7Ddeps.js");
var $$splitNotFoundComponentImporter = () => import("./session._workoutId-2Kvd9k0a.js");
var Route = createFileRoute("/session/$workoutId")({
	loader: ({ params }) => {
		const workout = getWorkout(params.workoutId);
		if (!workout) throw notFound();
		return { workout };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Session unavailable | FitLife" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `Now training: ${loaderData.workout.name} | FitLife`;
		const description = `Guided ${loaderData.workout.durationMinutes}-minute session with timers, rest periods and progress tracking.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "robots",
				content: "noindex"
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
