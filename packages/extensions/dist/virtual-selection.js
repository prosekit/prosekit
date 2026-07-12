import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { definePlugin } from "@prosekit/core";
import { Decoration, DecorationSet } from "@prosekit/pm/view";
/**
* Shows a virtual selection when the editor is not focused. When the editor is
* not focused, the selected inline content will be wrapped in a `<span>`
* element with the class `prosekit-virtual-selection`.
*
* This is useful when you want to move the focus to an element outside the
* editor, but still want to show the selection.
*/
function defineVirtualSelection() {
	return definePlugin(virtualSelectionPlugin);
}
const key = new PluginKey("prosekit-virtual-selection");
function getFocusMeta(tr) {
	return tr.getMeta(key);
}
function setFocusMeta(tr, value) {
	return tr.setMeta(key, value);
}
function getFocusState(state) {
	return key.getState(state);
}
/**
* Removes the native selection when it's inside the editor. Otherwise the
* browser would keep painting it while the editor is blurred, and any DOM
* update dispatched while blurred (starting with the virtual selection
* decoration itself) re-anchors its endpoints to node boundaries, making the
* painted highlight drift away from the actual selection. ProseMirror
* restores the DOM selection from the state when the editor regains focus.
*/
function removeNativeSelection(view) {
	const { dom, root } = view;
	const { selection } = view.state;
	if (selection.empty || !selection.visible) return;
	const domSelection = "getSelection" in root ? root.getSelection() : window.getSelection();
	if (domSelection?.anchorNode && dom.contains(domSelection.anchorNode)) domSelection.removeAllRanges();
}
const virtualSelectionPlugin = new ProseMirrorPlugin({
	key,
	state: {
		init: () => false,
		apply: (tr, value) => {
			return getFocusMeta(tr) ?? value;
		}
	},
	props: {
		handleDOMEvents: {
			focus: (view) => {
				view.dispatch(setFocusMeta(view.state.tr, false));
			},
			blur: (view) => {
				const { dom, root } = view;
				if (root.activeElement === dom) return;
				removeNativeSelection(view);
				view.dispatch(setFocusMeta(view.state.tr, true));
			}
		},
		decorations: (state) => {
			const { selection, doc } = state;
			if (selection.empty || !getFocusState(state) || !selection.visible) return null;
			return DecorationSet.create(doc, [Decoration.inline(selection.from, selection.to, { class: "prosekit-virtual-selection" })]);
		}
	}
});
export { defineVirtualSelection };

//# sourceMappingURL=virtual-selection.js.map