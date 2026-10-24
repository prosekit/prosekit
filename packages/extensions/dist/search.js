import { TextSelection } from "@prosekit/pm/state";
import { defineCommands, definePlugin, defineUpdateHandler } from "@prosekit/core";
import { SearchQuery, findNext, findNextNoWrap, findPrev, findPrevNoWrap, getMatchHighlights, getSearchState, replaceAll, replaceCurrent, replaceNext, replaceNextNoWrap, search, setSearchState } from "prosemirror-search";
/**
* Defines an extension that stores a current search query and replace string.
* When called without options, it stores an empty query, which can be updated
* later with the `setSearchQuery` command.
*/
function defineSearchQuery(options) {
	return definePlugin(search(options ? { initialQuery: new SearchQuery(options) } : {}));
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
* Returns a command that updates the search query and selects the first match
* at or after the selection start, wrapping around to the first match in the
* document. When the query matches nothing, a selection left by a previous
* query collapses to its start. An empty query clears the highlights and
* leaves the selection alone. The command is a no-op when the query is
* unchanged, so it can be dispatched on every input change.
*/
function setSearchQuery(options) {
	return (state, dispatch) => {
		const query = new SearchQuery(options);
		const current = getSearchState(state)?.query;
		if (current && current.eq(query) && current.literal === query.literal) return false;
		if (dispatch) {
			const tr = setSearchState(state.tr, query);
			const match = query.findNext(state, state.selection.from) ?? query.findNext(state);
			if (match) tr.setSelection(TextSelection.create(tr.doc, match.from, match.to)).scrollIntoView();
			else if (query.valid && getSearchStatus(state).active > 0) tr.setSelection(TextSelection.create(tr.doc, state.selection.from));
			dispatch(tr);
		}
		return true;
	};
}
/**
* Defines commands for search and replace.
*/
function defineSearchCommands() {
	return defineCommands({
		setSearchQuery: (options) => withScrollActiveIntoView(setSearchQuery(options)),
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
/**
* Returns the current search status.
*/
function getSearchStatus(state) {
	const matches = getMatchHighlights(state).find();
	const { from, to } = state.selection;
	return {
		total: matches.length,
		active: matches.findIndex((match) => match.from === from && match.to === to) + 1
	};
}
/**
* Registers a handler that is called whenever the search status changes. It
* can be used to render a match counter.
*/
function defineSearchStatusHandler(handler) {
	return defineUpdateHandler((view, prevState) => {
		const status = getSearchStatus(view.state);
		const previous = getSearchStatus(prevState);
		if (status.total === previous.total && status.active === previous.active) return;
		handler(status);
	});
}
export { defineSearchCommands, defineSearchQuery, defineSearchStatusHandler, getSearchStatus };

//# sourceMappingURL=search.js.map