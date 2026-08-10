import { a as getWorkout } from "./workouts-COSmNJcJ.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/workouts.$workoutId.tsx
var $$splitComponentImporter = () => import("./workouts._workoutId-BdvNQbO_.js");
var $$splitNotFoundComponentImporter = () => import("./workouts._workoutId-BO3xNWhL.js");
var Route = createFileRoute("/workouts/$workoutId")({
	loader: ({ params }) => {
		const workout = getWorkout(params.workoutId);
		if (!workout) throw notFound();
		return { workout };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Workout unavailable | FitLife" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { workout } = loaderData;
		const title = `${workout.name} — ${workout.durationMinutes} min ${workout.category} Workout | FitLife`;
		const description = `${workout.description} ${workout.exercises.length} exercises, about ${workout.calories} kcal, ${workout.difficulty} level.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
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
