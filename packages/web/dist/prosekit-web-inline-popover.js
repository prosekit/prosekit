import { t as useEditorExtension } from "./use-editor-extension-B_5BbYvf.js";
import { createComputed, createSignal, defineCustomElement, registerCustomElement, useAttribute, useEffect } from "@aria-ui/core";
import { containsInlineNode, defineFocusChangeHandler, defineKeymap, defineUpdateHandler, isInCodeBlock, isTextSelection } from "@prosekit/core";
import { useOverlayPositionerState } from "@aria-ui/overlay/elements";
import { usePresence } from "@aria-ui/presence";
import { overlayPositionerEvents as overlayPositionerEvents$1, overlayPositionerProps as overlayPositionerProps$1 } from "@aria-ui/overlay";

//#region src/hooks/use-editor-focus-event.ts
/**
* @internal
*/
function useEditorFocusChangeEvent(host, editor, handler) {
	useEditorExtension(host, editor, defineFocusChangeHandler(handler));
}

//#endregion
//#region src/hooks/use-editor-update-event.ts
/**
* @internal
*/
function useEditorUpdateEvent(host, editor, handler) {
	useEditorExtension(host, editor, defineUpdateHandler(handler));
}

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(host, editor, keymap) {
	useEditorExtension(host, editor, defineKeymap(keymap));
}

//#endregion
//#region src/components/inline-popover/inline-popover/virtual-selection-element.ts
function getVirtualSelectionElement(view) {
	if (typeof window === "undefined" || view.isDestroyed) return;
	const selection = view.state.selection;
	if (!selection.empty && !isInCodeBlock(selection) && isTextSelection(selection) && containsInlineNode(view.state.doc, selection.from, selection.to)) return getDomDecoration(view) || getInlineDecoration(view);
}
function getDomDecoration(view) {
	const range = getDomRange(view);
	if (range) return {
		contextElement: view.dom,
		getBoundingClientRect: () => range.getBoundingClientRect(),
		getClientRects: () => range.getClientRects()
	};
}
function getDomRange(view) {
	const selection = view.dom.ownerDocument.defaultView?.getSelection();
	if (!selection || selection.isCollapsed) return;
	const range = typeof selection.rangeCount === "number" && selection.rangeCount > 0 && selection.getRangeAt(0);
	if (!range) return;
	return range;
}
function getInlineDecoration(view) {
	const match = view.dom.querySelectorAll(".prosekit-virtual-selection");
	if (match.length === 0) return;
	if (match.length === 1) return match[0];
	const items = Array.from(match);
	return {
		contextElement: items[0],
		getBoundingClientRect: () => items[0].getBoundingClientRect(),
		getClientRects: () => items.map((item) => item.getBoundingClientRect())
	};
}

//#endregion
//#region src/components/inline-popover/inline-popover/setup.ts
/**
* @internal
*/
function useInlinePopover(host, { state, emit }) {
	const { editor, defaultOpen, open, ...overlayState } = state;
	const reference = useInlinePopoverReference(host, editor);
	const hasReference = createComputed(() => !!reference.get());
	useEffect(host, () => {
		const hasReferenceValue = hasReference.get();
		const defaultOpenValue = defaultOpen.peek();
		const openValue = open.peek();
		if (defaultOpenValue || openValue) emit("openChange", hasReferenceValue);
	});
	useEffect(host, () => {
		const hasReferenceValue = hasReference.get();
		const defaultOpenValue = defaultOpen.peek();
		if (hasReferenceValue && defaultOpenValue) open.set(true);
		else if (!hasReferenceValue) open.set(false);
	});
	useKeymap(host, editor, { Escape: () => {
		if (!state.dismissOnEscape.peek() || !open.peek()) return false;
		open.set(false);
		emit("openChange", false);
		return true;
	} });
	useOverlayPositionerState(host, overlayState, { reference });
	useAttribute(host, "data-state", () => open.get() ? "open" : "closed");
	usePresence(host, open);
}
function useInlinePopoverReference(host, editor) {
	const reference = createSignal(null);
	let editorFocused = false;
	useEditorFocusChangeEvent(host, editor, (focus) => {
		editorFocused = focus;
	});
	let prevSelection;
	useEditorUpdateEvent(host, editor, (view) => {
		if (!editorFocused && host.contains(host.ownerDocument.activeElement)) return;
		const { selection } = view.state;
		const selectionUnchanged = prevSelection?.eq(selection);
		prevSelection = selection;
		if (selectionUnchanged) return;
		reference.set(getVirtualSelectionElement(view) || null);
	});
	return reference;
}

//#endregion
//#region src/components/inline-popover/inline-popover/types.ts
/** @internal */
const inlinePopoverProps = Object.freeze({
	...overlayPositionerProps$1,
	editor: { default: null },
	defaultOpen: { default: true },
	open: { default: false },
	dismissOnEscape: { default: true },
	placement: { default: "top" },
	offset: { default: 12 },
	hide: { default: true },
	overlap: { default: true },
	inline: { default: true },
	overflowPadding: { default: 8 }
});
/** @internal */
const inlinePopoverEvents = {
	...overlayPositionerEvents$1,
	openChange: {}
};

//#endregion
//#region src/components/inline-popover/inline-popover/element.gen.ts
const InlinePopoverElementBase = defineCustomElement({
	props: inlinePopoverProps,
	events: inlinePopoverEvents,
	setup: useInlinePopover
});
var InlinePopoverElement = class extends InlinePopoverElementBase {};
registerCustomElement("prosekit-inline-popover", InlinePopoverElement);

//#endregion
export { InlinePopoverElement, inlinePopoverEvents, inlinePopoverProps, useInlinePopover };
//# sourceMappingURL=prosekit-web-inline-popover.js.map