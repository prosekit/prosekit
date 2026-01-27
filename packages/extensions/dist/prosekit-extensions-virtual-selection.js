import { definePlugin } from "@prosekit/core";
import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { Decoration, DecorationSet } from "@prosekit/pm/view";

//#region src/virtual-selection/index.ts
/**
* Shows a virtual selection when the editor is not focused. When the editor is
* not focused, the selected inline content will be wrapped in a `<span>`
* element with the class `prosekit-virtual-selection`.
*
* This is useful when you want to move the focus to an element outside the
* editor, but still want to show the selection.
*
* @public
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

//#endregion
export { defineVirtualSelection };
//# sourceMappingURL=prosekit-extensions-virtual-selection.js.map