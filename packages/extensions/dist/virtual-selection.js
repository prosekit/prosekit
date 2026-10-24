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
function getPluginState(state) {
	return key.getState(state);
}
function updatePluginState(view, value) {
	if (getPluginState(view.state) === value) return;
	view.dispatch(setFocusMeta(view.state.tr, value));
}
function isEditablePrimaryPointerEvent(event) {
	if (!event.isPrimary || event.button !== 0) return false;
	const target = event.target;
	if (!(target instanceof Element)) return false;
	return !target.closest("[contenteditable=\"false\"]");
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
				updatePluginState(view, false);
			},
			pointerdown: (view, event) => {
				if (isEditablePrimaryPointerEvent(event)) updatePluginState(view, false);
				return false;
			},
			blur: (view) => {
				const { dom, root } = view;
				if (root.activeElement === dom) return;
				updatePluginState(view, true);
			}
		},
		decorations: (state) => {
			const { selection, doc } = state;
			if (selection.empty || !getPluginState(state) || !selection.visible) return null;
			return DecorationSet.create(doc, [Decoration.inline(selection.from, selection.to, { class: "prosekit-virtual-selection" })]);
		}
	}
});
export { defineVirtualSelection };

//# sourceMappingURL=virtual-selection.js.map