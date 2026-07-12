import { t as useEditorExtension } from "./use-editor-extension.js";
import { t as getSafeEditorView } from "./get-safe-editor-view.js";
import { t as assignStyles } from "./assign-styles.js";
import { t as useScrolling } from "./use-scrolling.js";
import { t as useEditorUpdateEvent } from "./use-editor-update-event.js";
import { computed, createContext, createSignal, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { useAttribute, useEventListener } from "@aria-ui/utils";
import { OverlayPopupPropsDeclaration, OverlayPositionerPropsDeclaration, createOverlayStore, setupOverlayPopup, setupOverlayPositioner } from "@aria-ui/elements/overlay";
import { defineDOMEventHandler, insertDefaultBlock, isTextSelection, union } from "@prosekit/core";
import { isElement, isHTMLElement, isTextNode, throttle } from "@ocavue/utils";
import { Fragment, Slice } from "@prosekit/pm/model";
import { NodeSelection } from "@prosekit/pm/state";
/**
* @internal
*/
var BlockHandleStore = class {
	constructor() {
		this.hoverState = createSignal(void 0);
		this.dragging = createSignal(false);
	}
};
/**
* @internal
*/
const blockHandleStoreContext = createContext("prosekit-block-handle-store");
/**
* @internal
*/
const blockHandleOverlayStoreContext = createContext("prosekit-block-handle-overlay-store");
/** @internal */
const BlockHandleAddPropsDeclaration = /* @__PURE__ */ defineProps({ editor: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupBlockHandleAdd(host, props) {
	const getStore = blockHandleStoreContext.consume(host);
	useEventListener(host, "pointerdown", (event) => {
		event.preventDefault();
		const store = getStore();
		const editor = props.editor.get();
		const hoverState = store?.hoverState.get();
		if (!editor || !hoverState) return;
		const { node, pos } = hoverState;
		editor.exec(insertDefaultBlock({ pos: pos + node.nodeSize }));
		editor.focus();
		store?.hoverState.set(void 0);
	});
}
const BlockHandleAddElementBase = defineCustomElement(setupBlockHandleAdd, BlockHandleAddPropsDeclaration);
/**
* `<prosekit-block-handle-add>` custom element.
*
* Properties: {@link BlockHandleAddProps}
*/
var BlockHandleAddElement = class extends BlockHandleAddElementBase {};
/** @internal */
function registerBlockHandleAddElement() {
	registerCustomElement("prosekit-block-handle-add", BlockHandleAddElement);
}
const DRAGGING_CLASS_NAME = "prosekit-dragging";
/**
* Similar to `element.getBoundingClientRect`, but handles `display: contents` CSS
* property and optionally includes margins and outlines.
*/
function getClientRect(element, includeExtra) {
	const rect = element.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0) {
		if (element.getClientRects().length === 0) {
			const rects = [...element.children].map((child) => getClientRect(child, includeExtra));
			if (rects.length === 0) return rect;
			if (rects.length === 1) return rects[0];
			let { top, bottom, left, right } = rects[0];
			for (let i = 1; i < rects.length; i++) {
				const r = rects[i];
				if (r.top < top) top = r.top;
				if (r.bottom > bottom) bottom = r.bottom;
				if (r.left < left) left = r.left;
				if (r.right > right) right = r.right;
			}
			return {
				top,
				bottom,
				left,
				right
			};
		}
	}
	return includeExtra ? addExtra(element, rect, includeExtra) : rect;
}
function addExtra(element, rect, options) {
	const view = element.ownerDocument?.defaultView;
	if (!view) return rect;
	const style = view.getComputedStyle(element);
	const marginTop = options.top ? Number.parseFloat(style.marginTop) || 0 : 0;
	const marginBottom = options.bottom ? Number.parseFloat(style.marginBottom) || 0 : 0;
	const marginRight = options.right ? Number.parseFloat(style.marginRight) || 0 : 0;
	const marginLeft = options.left ? Number.parseFloat(style.marginLeft) || 0 : 0;
	const outlineWidth = Number.parseFloat(style.outlineWidth) || 0;
	const outlineOffset = Number.parseFloat(style.outlineOffset) || 0;
	const outline = Math.max(outlineWidth + outlineOffset, 0);
	const outlineTop = options.top ? outline : 0;
	const outlineBottom = options.bottom ? outline : 0;
	const outlineRight = options.right ? outline : 0;
	const outlineLeft = options.left ? outline : 0;
	return {
		top: rect.top - Math.max(marginTop, outlineTop),
		bottom: rect.bottom + Math.max(marginBottom, outlineBottom),
		right: rect.right + Math.max(marginRight, outlineRight),
		left: rect.left - Math.max(marginLeft, outlineLeft)
	};
}
const maxZIndex = "2147483647";
/**
* Sets a drag preview image for the given element and ensures the preview position
* relative to the pointer is correct.
*
* This function does the following:
*
* - Creates a temporary container element.
* - Puts the container at the end of the document body.
* - Sets event's drag image.
* - Removes the container from the document body after the next frame.
*/
function setDragPreview(event, element) {
	const { top, bottom, left, right } = getClientRect(element, {
		left: true,
		right: true,
		top: true,
		bottom: true
	});
	const width = right - left;
	const height = bottom - top;
	const elementX = left;
	const elementY = top;
	const { clientX, clientY } = event;
	const document = element.ownerDocument;
	const container = document.createElement("div");
	container.classList.add("ProseMirror", DRAGGING_CLASS_NAME);
	const outsideX = Math.round(elementX - clientX);
	const outsideY = Math.round(elementY - clientY);
	const borderX = Math.max(outsideX, 0);
	const borderY = Math.max(outsideY, 0);
	assignStyles(container, {
		position: "fixed",
		top: "-1000vh",
		left: "-1000vw",
		pointerEvents: "none",
		zIndex: maxZIndex,
		borderLeft: `${borderX}px solid transparent`,
		borderTop: `${borderY}px solid transparent`,
		boxSizing: "border-box",
		width: `${width + borderX}px`,
		height: `${height + borderY}px`
	});
	const clonedElement = element.cloneNode(true);
	clonedElement.style.setProperty("opacity", "0.8", "important");
	clonedElement.style.setProperty("outline-color", "transparent", "important");
	container.appendChild(clonedElement);
	document.body.appendChild(container);
	event.dataTransfer?.setDragImage(container, Math.max(-outsideX, 0), Math.max(-outsideY, 0));
	requestAnimationFrame(() => {
		container.remove();
	});
}
/** @internal */
const BlockHandleDraggablePropsDeclaration = /* @__PURE__ */ defineProps({ editor: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupBlockHandleDraggable(host, props) {
	const getStore = blockHandleStoreContext.consume(host);
	onMount(host, () => {
		host.draggable = true;
	});
	usePointerDownHandler(host, () => getStore()?.hoverState.get() ?? null, props.editor.get);
	useEventListener(host, "dragstart", (event) => {
		const store = getStore();
		store?.dragging.set(true);
		const view = getSafeEditorView(props.editor.get());
		const hoverState = store?.hoverState.get();
		if (view && hoverState) {
			view.dom.classList.add(DRAGGING_CLASS_NAME);
			startViewDragging(view, hoverState, event);
		}
	});
	useEventListener(host, "dragend", () => {
		getStore()?.dragging.set(false);
		const view = getSafeEditorView(props.editor.get());
		if (view) {
			view.dom.classList.remove(DRAGGING_CLASS_NAME);
			clearViewDragging(view);
		}
	});
	useAttribute(host, "data-dragging", () => getStore()?.dragging.get() ? "" : void 0);
}
function usePointerDownHandler(host, getHoverState, getEditor) {
	useEventListener(host, "pointerdown", () => {
		const hoverState = getHoverState();
		const editor = getEditor();
		if (hoverState?.pos == null) return;
		const view = editor?.view;
		if (!view || view.isDestroyed) return;
		view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, hoverState.pos)));
		requestAnimationFrame(() => {
			if (view.isDestroyed) return;
			view.focus();
		});
	});
}
function startViewDragging(view, hoverState, event) {
	const { node, pos } = hoverState;
	const { dom, text, slice } = view.serializeForClipboard(new Slice(Fragment.from(node), 0, 0));
	if (event.dataTransfer) {
		event.dataTransfer.clearData();
		event.dataTransfer.setData("text/html", dom.innerHTML);
		event.dataTransfer.setData("text/plain", text);
		event.dataTransfer.effectAllowed = "copyMove";
		const element = view.nodeDOM(pos);
		if (element && isHTMLElement(element)) setDragPreview(event, element);
	}
	view.dragging = {
		slice,
		move: true,
		node: NodeSelection.create(view.state.doc, pos)
	};
}
function clearViewDragging(view) {
	const dragging = view.dragging;
	if (!dragging) return;
	window.setTimeout(() => {
		if (view.dragging === dragging) view.dragging = null;
	}, 50);
}
const BlockHandleDraggableElementBase = defineCustomElement(setupBlockHandleDraggable, BlockHandleDraggablePropsDeclaration);
/**
* `<prosekit-block-handle-draggable>` custom element.
*
* Properties: {@link BlockHandleDraggableProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-dragging` | Present when the element is being dragged |
*/
var BlockHandleDraggableElement = class extends BlockHandleDraggableElementBase {};
/** @internal */
function registerBlockHandleDraggableElement() {
	registerCustomElement("prosekit-block-handle-draggable", BlockHandleDraggableElement);
}
/** @internal */
const BlockHandlePopupPropsDeclaration = OverlayPopupPropsDeclaration;
/** @internal */
function setupBlockHandlePopup(host, _props) {
	setupOverlayPopup(host, blockHandleOverlayStoreContext.consume(host));
}
const BlockHandlePopupElementBase = defineCustomElement(setupBlockHandlePopup, BlockHandlePopupPropsDeclaration);
/**
* `<prosekit-block-handle-popup>` custom element.
*
* Properties: {@link BlockHandlePopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
*/
var BlockHandlePopupElement = class extends BlockHandlePopupElementBase {};
/** @internal */
function registerBlockHandlePopupElement() {
	registerCustomElement("prosekit-block-handle-popup", BlockHandlePopupElement);
}
/** @internal */
const BlockHandlePositionerPropsDeclaration = /* @__PURE__ */ defineProps({
	...OverlayPositionerPropsDeclaration,
	placement: {
		default: "left",
		attribute: "placement",
		type: "string"
	},
	hoist: {
		default: false,
		attribute: "hoist",
		type: "boolean"
	},
	flip: {
		default: false,
		attribute: false
	},
	shift: {
		default: false,
		attribute: "shift",
		type: "boolean"
	},
	hide: {
		default: true,
		attribute: "hide",
		type: "boolean"
	}
});
/** @internal */
function setupBlockHandlePositioner(host, props) {
	setupOverlayPositioner(host, props, blockHandleOverlayStoreContext.consume(host));
}
const BlockHandlePositionerElementBase = defineCustomElement(setupBlockHandlePositioner, BlockHandlePositionerPropsDeclaration);
/**
* `<prosekit-block-handle-positioner>` custom element.
*
* Properties: {@link BlockHandlePositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var BlockHandlePositionerElement = class extends BlockHandlePositionerElementBase {};
/** @internal */
function registerBlockHandlePositionerElement() {
	registerCustomElement("prosekit-block-handle-positioner", BlockHandlePositionerElement);
}
function useHasTextSelection(host, getEditor) {
	const state = createSignal(false);
	useEditorUpdateEvent(host, getEditor, (view) => {
		const { selection } = view.state;
		state.set(!selection.empty && isTextSelection(selection));
	});
	return state.get;
}
function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
/**
* @internal
*/
function isHoverStateEqual(a, b) {
	return a.pos === b.pos && a.node.eq(b.node);
}
function defineElementHoverHandler(handler) {
	const handleElement = (node, pos, element, parentElement) => {
		handler({
			contextElement: element,
			getBoundingClientRect: () => {
				const rect = findFirstLineRect(parentElement, element);
				return rect ? fulfillRect(rect) : fallbackRect;
			}
		}, {
			node,
			pos
		});
	};
	let lastX = -1;
	let lastY = -1;
	let lastTime = -1;
	const handlePointerEvent = (view, event) => {
		const { x, y } = event;
		if (lastX === x && lastY === y) {
			const now = Date.now();
			if (now - lastTime < 100) return;
			lastTime = now;
		}
		lastX = x;
		lastY = y;
		const block = findBlockByCoords(view, x, y);
		if (!block) {
			handler();
			return;
		}
		const { node, pos } = block;
		const element = view.nodeDOM(pos);
		if (!element || !isHTMLElement(element)) {
			handler();
			return;
		}
		const $pos = view.state.doc.resolve(pos);
		if ($pos.depth > 0 && $pos.index($pos.depth) === 0) {
			const parentPos = $pos.before($pos.depth);
			const parentNode = $pos.parent;
			const parentElement = view.nodeDOM(parentPos);
			handleElement(parentNode, parentPos, element, parentElement);
		} else handleElement(node, pos, element);
	};
	return union(defineDOMEventHandler("pointermove", throttle(handlePointerEvent, 200)), defineDOMEventHandler("pointerenter", handlePointerEvent), defineDOMEventHandler("pointerout", handlePointerEvent), defineDOMEventHandler("keypress", () => handler()));
}
function findBlockByCoords(view, x, y) {
	if (!isWithinRect(getClientRect(view.dom), x, y)) return;
	let parent = view.state.doc;
	let pos = -1;
	while (parent) {
		if (parent.isBlock && (parent.isTextblock || parent.isAtom || parent.type.spec.isolating)) return {
			node: parent,
			pos
		};
		const children = [];
		const positions = [];
		parent.forEach((child, offset) => {
			children.push(child);
			positions.push(offset + pos + 1);
		});
		let lo = 0;
		let hi = children.length - 1;
		while (lo <= hi) {
			const i = hi - (hi - lo >> 1);
			const childRect = getNodeRect(view.nodeDOM(positions[i]));
			if (!childRect) {
				console.warn(`[prosekit] Unable to get rect at position: ${positions[i]}`);
				return;
			}
			if (childRect.top > y) hi = i - 1;
			else if (childRect.bottom < y) lo = i + 1;
			else {
				lo = i;
				break;
			}
		}
		if (lo > hi) return;
		parent = children[lo];
		pos = positions[lo];
	}
}
function getNodeRect(node) {
	if (node && isElement(node) && node.isConnected) return getClientRect(node);
}
function isWithinRect(rect, x, y) {
	return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
function findFirstLineRect(outer, inner) {
	if (outer && !outer.isConnected) return;
	if (inner && !inner.isConnected) return;
	if (outer && inner) {
		const outerRect = findOuterRect(outer);
		const innerRect = findFirstLineRectInNode(inner);
		if (outerRect && innerRect) {
			const { top, bottom } = innerRect;
			const { left, right } = outerRect;
			return {
				top,
				bottom,
				left,
				right
			};
		} else return outerRect || innerRect;
	} else if (outer) return findFirstLineRectInNode(outer);
	else if (inner) return findFirstLineRectInNode(inner);
}
function findOuterRect(node) {
	if (!isElement(node)) return;
	return getClientRect(node, {
		left: true,
		right: true
	});
}
function findFirstLineRectInNode(node) {
	if (isElement(node)) return findFirstLineRectInElement(node);
	else if (isTextNode(node)) return findFirstLineRectInTextNode(node);
}
function findFirstLineRectInTextNode(node) {
	const ownerDocument = node.ownerDocument;
	if (!ownerDocument) return;
	const range = ownerDocument.createRange();
	range.setStart(node, 0);
	range.setEnd(node, 0);
	return range.getClientRects()[0];
}
function findFirstLineRectInElement(element) {
	if (element.nodeName === "BR") return element.getBoundingClientRect();
	const rect = getClientRect(element);
	const style = element.ownerDocument.defaultView?.getComputedStyle(element);
	const marginLeft = style && Number.parseInt(style.marginLeft, 10) || 0;
	const marginRight = style && Number.parseInt(style.marginRight, 10) || 0;
	const left = rect.left - marginLeft;
	const right = rect.right + marginRight;
	const lineHeight = style && Number.parseInt(style.lineHeight, 10) || 24;
	const paddingTop = style && Number.parseInt(style.paddingTop, 10) || 0;
	const borderTop = style && Number.parseInt(style.borderTopWidth, 10) || 0;
	const top = rect.top + paddingTop + borderTop;
	return {
		top,
		bottom: top + lineHeight,
		left,
		right
	};
}
function fulfillRect({ top, right, bottom, left }) {
	return {
		top,
		right,
		bottom,
		left,
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
const fallbackRect = Object.freeze({
	top: -9999,
	right: -9999,
	bottom: -9999,
	left: -9999,
	width: 0,
	height: 0,
	x: -9999,
	y: -9999
});
function useHoverExtension(host, getEditor, handler) {
	const invalidTimeoutMs = prefersReducedMotion() ? 0 : 180;
	let invalidTimeoutId;
	let prevHoverState;
	const callHandler = (reference, hoverState) => {
		prevHoverState = hoverState;
		handler(reference, hoverState);
	};
	useEditorExtension(host, getEditor, defineElementHoverHandler((reference, hoverState) => {
		if (hoverState && invalidTimeoutId != null) {
			clearTimeout(invalidTimeoutId);
			invalidTimeoutId = void 0;
		}
		if (prevHoverState && hoverState) {
			if (isHoverStateEqual(prevHoverState, hoverState)) return;
			callHandler(reference, hoverState);
			return;
		}
		if (!prevHoverState && !hoverState) return;
		if (!prevHoverState && hoverState) {
			callHandler(reference, hoverState);
			return;
		}
		if (prevHoverState && !hoverState) {
			if (invalidTimeoutId != null) return;
			invalidTimeoutId = setTimeout(() => {
				callHandler(reference, void 0);
				invalidTimeoutId = void 0;
			}, invalidTimeoutMs);
		}
	}));
}
/** @internal */
const BlockHandleRootPropsDeclaration = /* @__PURE__ */ defineProps({ editor: {
	default: null,
	attribute: false
} });
var BlockHandleStateChangeEvent = class extends Event {
	constructor(state) {
		super("stateChange", { bubbles: true });
		this.detail = state;
	}
};
/**
* @internal
*/
function setupBlockHandleRoot(host, props) {
	const getEditor = props.editor.get;
	const store = new BlockHandleStore();
	blockHandleStoreContext.provide(host, store);
	const reference = createSignal(void 0);
	const getScrolling = useScrolling(host);
	const getHasTextSelection = useHasTextSelection(host, getEditor);
	const overlayStore = createOverlayStore(computed(() => !!store.hoverState.get() && !getScrolling() && !getHasTextSelection()), () => {}, () => true, () => false, (event) => host.dispatchEvent(event));
	useHoverExtension(host, getEditor, (ref, hoverState) => {
		reference.set(ref ?? void 0);
		store.hoverState.set(hoverState);
		const state = hoverState ? {
			node: hoverState.node,
			pos: hoverState.pos
		} : null;
		host.dispatchEvent(new BlockHandleStateChangeEvent(state));
	});
	useEffect(host, () => {
		overlayStore.setAnchorElement(reference.get());
	});
	blockHandleOverlayStoreContext.provide(host, overlayStore);
}
const BlockHandleRootElementBase = defineCustomElement(setupBlockHandleRoot, BlockHandleRootPropsDeclaration);
/**
* `<prosekit-block-handle-root>` custom element.
*
* Properties: {@link BlockHandleRootProps}
*
* Events: {@link BlockHandleRootEvents}
*/
var BlockHandleRootElement = class extends BlockHandleRootElementBase {};
/** @internal */
function registerBlockHandleRootElement() {
	registerCustomElement("prosekit-block-handle-root", BlockHandleRootElement);
}
export { BlockHandleAddElement, BlockHandleAddPropsDeclaration, BlockHandleDraggableElement, BlockHandleDraggablePropsDeclaration, BlockHandlePopupElement, BlockHandlePopupPropsDeclaration, BlockHandlePositionerElement, BlockHandlePositionerPropsDeclaration, BlockHandleRootElement, BlockHandleRootPropsDeclaration, BlockHandleStateChangeEvent, registerBlockHandleAddElement, registerBlockHandleDraggableElement, registerBlockHandlePopupElement, registerBlockHandlePositionerElement, registerBlockHandleRootElement, setupBlockHandleAdd, setupBlockHandleDraggable, setupBlockHandlePopup, setupBlockHandlePositioner, setupBlockHandleRoot };

//# sourceMappingURL=block-handle.js.map