import { r as getArticle } from "./nutrition-L3KqR14j.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/nutrition.$slug.tsx
var $$splitComponentImporter = () => import("./nutrition._slug-B-yYRmy3.js");
var $$splitNotFoundComponentImporter = () => import("./nutrition._slug-CJUnvbww.js");
var Route = createFileRoute("/nutrition/$slug")({
	loader: ({ params }) => {
		const article = getArticle(params.slug);
		if (!article) throw notFound();
		return { article };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Guide unavailable | FitLife" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { article } = loaderData;
		const title = `${article.title} | FitLife Nutrition`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: article.summary
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: article.summary
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
