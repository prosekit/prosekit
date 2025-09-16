import "./drop-indicator-E7nCfdnR.js";
import { findTable } from "./table-DV3F8wCL.js";
import { definePlugin, isInCodeBlock, maybeRun } from "@prosekit/core";
import { Plugin, PluginKey } from "@prosekit/pm/state";
import { Decoration, DecorationSet } from "@prosekit/pm/view";

//#region src/placeholder/index.ts
/**
* Add a placeholder text to the editor when the current block or document is
* empty.
*/
function definePlaceholder(options) {
	return definePlugin(createPlaceholderPlugin(options));
}
function createPlaceholderPlugin({ placeholder, strategy = "block" }) {
	return new Plugin({
		key: new PluginKey("prosekit-placeholder"),
		props: { decorations: (state) => {
			if (!(typeof strategy === "function" ? strategy : strategy === "doc" ? docStrategy : defaultStrategy)(state)) return null;
			const placeholderText = maybeRun(placeholder, state);
			const deco = createPlaceholderDecoration(state, placeholderText);
			if (!deco) return null;
			return DecorationSet.create(state.doc, [deco]);
		} }
	});
}
function defaultStrategy(state) {
	return !isInCodeBlock(state.selection) && !findTable(state.selection.$from);
}
function docStrategy(state) {
	return isDocEmpty(state.doc) && defaultStrategy(state);
}
function isDocEmpty(doc) {
	return doc.childCount <= 1 && !doc.firstChild?.content.size;
}
function createPlaceholderDecoration(state, placeholderText) {
	if (!placeholderText) return null;
	const { selection } = state;
	if (!selection.empty) return null;
	const $pos = selection.$anchor;
	const node = $pos.parent;
	if (node.content.size > 0) return null;
	const before = $pos.before();
	return Decoration.node(before, before + node.nodeSize, {
		"class": "prosekit-placeholder",
		"data-placeholder": placeholderText
	});
}

//#endregion
export { definePlaceholder };
//# sourceMappingURL=prosekit-extensions-placeholder.js.map