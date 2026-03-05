import { MarkdownPageEvent } from "typedoc-plugin-markdown";

//#region src/index.ts
function load(app) {
	app.renderer.on(MarkdownPageEvent.BEGIN, (page) => {
		/**
		* Update page.frontmatter object to match the requirements of Astro Starlight.
		*/
		const name = page.model.name;
		if (name) page.frontmatter = {
			title: name,
			sidebar: { label: name.replace(/^@?prosekit\//, "") },
			...page.frontmatter
		};
	});
}

//#endregion
export { load };