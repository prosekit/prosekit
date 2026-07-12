import { t as useEditorExtension } from "./use-editor-extension.js";
import { t as resolveAnchor } from "./resolve-anchor.js";
import { t as useEditorUpdateEvent } from "./use-editor-update-event.js";
import { computed, createContext, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { usePresence } from "@aria-ui/utils";
import { OpenChangeEvent, OverlayPopupPropsDeclaration, OverlayPositionerPropsDeclaration, OverlayRootPropsDeclaration, setupOverlayPopup, setupOverlayPositioner, useOverlayStore } from "@aria-ui/elements/overlay";
import { containsInlineNode, defineFocusChangeHandler, defineKeymap, isInCodeBlock, isTextSelection } from "@prosekit/core";
const InlinePopoverStoreContext = createContext("prosekit-inline-popover-store");
/** @internal */
const InlinePopoverPopupPropsDeclaration = OverlayPopupPropsDeclaration;
/** @internal */
function setupInlinePopoverPopup(host, _props) {
	const getStore = InlinePopoverStoreContext.consume(host);
	setupOverlayPopup(host, getStore);
	usePresence(host, computed(() => getStore()?.getIsOpen() ?? false));
	onMount(host, () => {
		host.role = "dialog";
	});
}
const InlinePopoverPopupElementBase = defineCustomElement(setupInlinePopoverPopup, InlinePopoverPopupPropsDeclaration);
/**
* `<prosekit-inline-popover-popup>` custom element.
*
* Properties: {@link InlinePopoverPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the inline popover is visible, `"closed"` otherwise |
*/
var InlinePopoverPopupElement = class extends InlinePopoverPopupElementBase {};
/** @internal */
function registerInlinePopoverPopupElement() {
	registerCustomElement("prosekit-inline-popover-popup", InlinePopoverPopupElement);
}
/** @internal */
const InlinePopoverPositionerPropsDeclaration = /* @__PURE__ */ defineProps({
	...OverlayPositionerPropsDeclaration,
	placement: {
		default: "top",
		attribute: "placement",
		type: "string"
	},
	offset: {
		default: 12,
		attribute: false
	},
	hide: {
		default: true,
		attribute: "hide",
		type: "boolean"
	},
	hoist: {
		default: false,
		attribute: "hoist",
		type: "boolean"
	},
	overlap: {
		default: true,
		attribute: "overlap",
		type: "boolean"
	},
	inline: {
		default: true,
		attribute: "inline",
		type: "boolean"
	},
	overflowPadding: {
		default: 8,
		attribute: "overflow-padding",
		type: "number"
	}
});
/** @internal */
function setupInlinePopoverPositioner(host, props) {
	setupOverlayPositioner(host, props, InlinePopoverStoreContext.consume(host));
}
const InlinePopoverPositionerElementBase = defineCustomElement(setupInlinePopoverPositioner, InlinePopoverPositionerPropsDeclaration);
/**
* `<prosekit-inline-popover-positioner>` custom element.
*
* Properties: {@link InlinePopoverPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the inline popover is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var InlinePopoverPositionerElement = class extends InlinePopoverPositionerElementBase {};
/** @internal */
function registerInlinePopoverPositionerElement() {
	registerCustomElement("prosekit-inline-popover-positioner", InlinePopoverPositionerElement);
}
/**
* @internal
*/
function useEditorFocusChangeEvent(host, getEditor, handler) {
	useEditorExtension(host, getEditor, defineFocusChangeHandler(handler));
}
function useKeymap(host, getEditor, keymap) {
	useEditorExtension(host, getEditor, defineKeymap(keymap));
}
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
/** @internal */
const InlinePopoverRootPropsDeclaration = /* @__PURE__ */ defineProps({
	...OverlayRootPropsDeclaration,
	editor: {
		default: null,
		attribute: false
	},
	defaultOpen: {
		default: true,
		attribute: "default-open",
		type: "boolean"
	},
	dismissOnEscape: {
		default: true,
		attribute: "dismiss-on-escape",
		type: "boolean"
	},
	anchor: {
		default: null,
		attribute: false
	}
});
/** @internal */
function setupInlinePopoverRoot(host, props) {
	const store = useOverlayStore(host, props);
	InlinePopoverStoreContext.provide(host, store);
	let editorFocused = false;
	useEditorFocusChangeEvent(host, props.editor.get, (focus) => {
		editorFocused = focus;
	});
	const hasCustomAnchor = computed(() => !!props.anchor.get());
	useEffect(host, () => {
		if (!hasCustomAnchor()) return;
		const anchor = resolveAnchor(props.anchor.get());
		if (!anchor) return;
		store.setAnchorElement(anchor);
	});
	let prevSelection;
	useEditorUpdateEvent(host, props.editor.get, (view) => {
		if (hasCustomAnchor()) return;
		if (!editorFocused && host.contains(host.ownerDocument.activeElement)) return;
		const { selection } = view.state;
		if (prevSelection?.eq(selection)) return;
		prevSelection = selection;
		const reference = getVirtualSelectionElement(view);
		store.setAnchorElement(reference);
		if (reference && props.defaultOpen.get()) store.requestOpenChange(true);
		else if (!reference) store.requestOpenChange(false);
	});
	useKeymap(host, props.editor.get, { Escape: () => {
		if (!props.dismissOnEscape.get() || !store.getIsOpen()) return false;
		store.requestOpenChange(false);
		return true;
	} });
}
const InlinePopoverRootElementBase = defineCustomElement(setupInlinePopoverRoot, InlinePopoverRootPropsDeclaration);
/**
* `<prosekit-inline-popover-root>` custom element.
*
* Properties: {@link InlinePopoverRootProps}
*
* Events: {@link InlinePopoverRootEvents}
*/
var InlinePopoverRootElement = class extends InlinePopoverRootElementBase {};
/** @internal */
function registerInlinePopoverRootElement() {
	registerCustomElement("prosekit-inline-popover-root", InlinePopoverRootElement);
}
export { InlinePopoverPopupElement, InlinePopoverPopupPropsDeclaration, InlinePopoverPositionerElement, InlinePopoverPositionerPropsDeclaration, InlinePopoverRootElement, InlinePopoverRootPropsDeclaration, OpenChangeEvent, registerInlinePopoverPopupElement, registerInlinePopoverPositionerElement, registerInlinePopoverRootElement, setupInlinePopoverPopup, setupInlinePopoverPositioner, setupInlinePopoverRoot };

//# sourceMappingURL=inline-popover.js.map