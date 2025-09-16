import { defineCommands, definePlugin } from "@prosekit/core";
import { SearchQuery, findNext, findNextNoWrap, findPrev, findPrevNoWrap, replaceAll, replaceCurrent, replaceNext, replaceNextNoWrap, search } from "prosemirror-search";

//#region src/search/index.ts
/**
* Defines an extension that stores a current search query and replace string.
*
* @public
*/
function defineSearchQuery(options) {
	const query = new SearchQuery(options);
	return definePlugin(search({ initialQuery: query }));
}
/**
* Scrolls the active search match into view.
*/
function scrollActiveIntoView(view) {
	if (view.isDestroyed) return;
	view.dom.querySelector(".ProseMirror-active-search-match")?.scrollIntoView({
		block: "nearest",
		inline: "nearest",
		behavior: "smooth"
	});
}
/**
* Wraps a command and scrolls the active search match into view when the command
* is applied.
*/
function withScrollActiveIntoView(command) {
	return (state, dispatch, view) => {
		const result = command(state, dispatch, view);
		if (result && dispatch && view) setTimeout(() => scrollActiveIntoView(view), 50);
		return result;
	};
}
/**
* Defines commands for search and replace.
*
* @public
*/
function defineSearchCommands() {
	return defineCommands({
		findNext: () => withScrollActiveIntoView(findNext),
		findPrev: () => withScrollActiveIntoView(findPrev),
		findNextNoWrap: () => withScrollActiveIntoView(findNextNoWrap),
		findPrevNoWrap: () => withScrollActiveIntoView(findPrevNoWrap),
		replaceNext: () => withScrollActiveIntoView(replaceNext),
		replaceNextNoWrap: () => withScrollActiveIntoView(replaceNextNoWrap),
		replaceCurrent: () => withScrollActiveIntoView(replaceCurrent),
		replaceAll: () => withScrollActiveIntoView(replaceAll)
	});
}

//#endregion
export { defineSearchCommands, defineSearchQuery };
//# sourceMappingURL=prosekit-extensions-search.js.map