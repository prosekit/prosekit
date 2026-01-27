import { t as useEditorExtension } from "./use-editor-extension-B_5BbYvf.js";
import { t as getSafeEditorView } from "./get-safe-editor-view-DJlcheeV.js";
import { n as assignStyles, t as useScrolling } from "./use-scrolling-BjI3cuLt.js";
import { r as deepCloneElement, t as injectStyle } from "./inject-style-DYQXx-cE.js";
import { createComputed, createContext, createSignal, defineCustomElement, registerCustomElement, useAttribute, useEffect, useEventListener } from "@aria-ui/core";
import { defineDOMEventHandler, insertDefaultBlock, union } from "@prosekit/core";
import { overlayPositionerEvents, overlayPositionerProps, useOverlayPositionerState } from "@aria-ui/overlay/elements";
import { usePresence } from "@aria-ui/presence";
import { isElement, isHTMLElement, isTextNode } from "@ocavue/utils";
import { Fragment, Slice } from "@prosekit/pm/model";
import { NodeSelection } from "@prosekit/pm/state";

//#region src/components/block-handle/context.ts
/**
* @internal
*/
const blockPopoverContext = createContext("prosekit-block-popover-context", null);
/**
* @internal
*/
const draggingContext = createContext("prosekit-block-handle-dragging-context", false);

//#endregion
//#region src/components/block-handle/block-handle-add/setup.ts
/**
* @internal
*/
function useBlockHandleAdd(host, { state }) {
	const context = blockPopoverContext.consume(host);
	useEventListener(host, "pointerdown", (event) => {
		event.preventDefault();
		const editor = state.editor.get();
		const hoverState = context.get();
		if (!editor || !hoverState) return;
		const { node, pos } = hoverState;
		editor.exec(insertDefaultBlock({ pos: pos + node.nodeSize }));
		editor.focus();
		context.set(null);
	});
}

//#endregion
//#region src/components/block-handle/block-handle-add/types.ts
/** @internal */
const blockHandleAddProps = { editor: { default: null } };
/** @internal */
const blockHandleAddEvents = {};

//#endregion
//#region src/components/block-handle/block-handle-add/element.gen.ts
const BlockHandleAddElementBase = defineCustomElement({
	props: blockHandleAddProps,
	events: blockHandleAddEvents,
	setup: useBlockHandleAdd
});
var BlockHandleAddElement = class extends BlockHandleAddElementBase {};
registerCustomElement("prosekit-block-handle-add", BlockHandleAddElement);

//#endregion
//#region src/utils/get-box-element.ts
/**
* Returns the element that has a box.
*/
function getBoxElement(element) {
	const window = element.ownerDocument.defaultView;
	if (!window) return;
	const display = window.getComputedStyle(element).display;
	if (display === "contents" && element.childElementCount === 1) return element.firstElementChild;
	else if (display === "none") return;
	return element;
}

//#endregion
//#region src/utils/get-client-rect.ts
/**
* Similar to `element.getBoundingClientRect`, but handles `display: contents` elements.
*/
function getClientRect(element) {
	const rect = element.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0) {
		if (element.getClientRects().length === 0) {
			const rects = Array.from(element.children).map((child) => getClientRect(child));
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
	return rect;
}

//#endregion
//#region src/utils/max-z-index.ts
const maxZIndex = "2147483647";

//#endregion
//#region src/components/block-handle/block-handle-draggable/set-drag-preview.ts
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
	const { top, bottom, left, right } = getClientRect(element);
	const width = right - left;
	const height = bottom - top;
	const elementX = left;
	const elementY = top;
	const { clientX, clientY } = event;
	const document = element.ownerDocument;
	const container = document.createElement("div");
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
	const [clonedElement, styleText] = deepCloneElement(element, true);
	clonedElement.style.setProperty("opacity", "0.5", "important");
	clonedElement.style.setProperty("margin", "0", "important");
	clonedElement.style.setProperty("outline-color", "transparent", "important");
	document.body.appendChild(container);
	container.appendChild(clonedElement);
	injectStyle(container, styleText);
	event.dataTransfer?.setDragImage(container, Math.max(-outsideX, 0), Math.max(-outsideY, 0));
	requestAnimationFrame(() => {
		container.remove();
	});
}

//#endregion
//#region src/components/block-handle/block-handle-draggable/setup.ts
/**
* @internal
*/
function useBlockHandleDraggable(host, { state }) {
	const context = blockPopoverContext.consume(host);
	const dragging = draggingContext.consume(host);
	useEffect(host, () => {
		host.draggable = true;
	});
	usePointerDownHandler(host, context, state.editor);
	useEventListener(host, "dragstart", (event) => {
		dragging.set(true);
		const view = getSafeEditorView(state.editor.get());
		const hoverState = context.get();
		if (view && hoverState) {
			view.dom.classList.add("prosekit-dragging");
			createDraggingPreview(view, hoverState, event);
			setViewDragging(view, hoverState);
		}
	});
	useEventListener(host, "dragend", () => {
		dragging.set(false);
		const view = getSafeEditorView(state.editor.get());
		if (view) view.dom.classList.remove("prosekit-dragging");
	});
	useAttribute(host, "data-dragging", () => dragging.get() ? "" : void 0);
}
function usePointerDownHandler(host, context, editor) {
	useEventListener(host, "pointerdown", () => {
		const { pos } = context.get() ?? {};
		const { view } = editor.get() ?? {};
		if (pos == null || view == null) return;
		view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)));
		requestAnimationFrame(() => {
			view.focus();
		});
	});
}
function createDraggingPreview(view, hoverState, event) {
	if (!event.dataTransfer) return;
	const { pos } = hoverState;
	const element = view.nodeDOM(pos);
	if (!element || !isHTMLElement(element)) return;
	const boxElement = getBoxElement(element);
	if (!boxElement || !isHTMLElement(boxElement)) return;
	event.dataTransfer.clearData();
	event.dataTransfer.setData("text/html", boxElement.outerHTML);
	event.dataTransfer.effectAllowed = "copyMove";
	setDragPreview(event, boxElement);
}
function setViewDragging(view, hoverState) {
	const { node, pos } = hoverState;
	view.dragging = {
		slice: new Slice(Fragment.from(node), 0, 0),
		move: true,
		node: NodeSelection.create(view.state.doc, pos)
	};
}

//#endregion
//#region src/components/block-handle/block-handle-draggable/types.ts
/** @internal */
const blockHandleDraggableProps = { editor: { default: null } };
/** @internal */
const blockHandleDraggableEvents = {};

//#endregion
//#region src/components/block-handle/block-handle-draggable/element.gen.ts
const BlockHandleDraggableElementBase = defineCustomElement({
	props: blockHandleDraggableProps,
	events: blockHandleDraggableEvents,
	setup: useBlockHandleDraggable
});
var BlockHandleDraggableElement = class extends BlockHandleDraggableElementBase {};
registerCustomElement("prosekit-block-handle-draggable", BlockHandleDraggableElement);

//#endregion
//#region src/utils/throttle.ts
/**
* @internal
*/
function throttle(callback, wait) {
	let lastTime = 0;
	return (...args) => {
		const now = Date.now();
		if (now - lastTime >= wait) {
			callback(...args);
			lastTime = now;
		}
	};
}

//#endregion
//#region src/components/block-handle/block-handle-popover/pointer-move.ts
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
			handler(null, null);
			return;
		}
		const { node, pos } = block;
		const element = view.nodeDOM(pos);
		if (!element || !isHTMLElement(element)) {
			handler(null, null);
			return;
		}
		const $pos = view.state.doc.resolve(pos);
		if ($pos.depth > 0 && $pos.index($pos.depth) === 0) {
			const parentPos = $pos.before($pos.depth);
			const parentNode = $pos.parent;
			handleElement(parentNode, parentPos, element, view.nodeDOM(parentPos));
		} else handleElement(node, pos, element);
	};
	return union(defineDOMEventHandler("pointermove", throttle(handlePointerEvent, 200)), defineDOMEventHandler("pointerenter", handlePointerEvent), defineDOMEventHandler("pointerout", handlePointerEvent), defineDOMEventHandler("keypress", () => handler(null, null)));
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
	const rect = getClientRect(node);
	const style = node.ownerDocument.defaultView?.getComputedStyle(node);
	const marginLeft = style && Number.parseInt(style.marginLeft, 10) || 0;
	const marginRight = style && Number.parseInt(style.marginRight, 10) || 0;
	const left = rect.left - marginLeft;
	const right = rect.right + marginRight;
	return {
		top: rect.top,
		bottom: rect.bottom,
		left,
		right
	};
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

//#endregion
//#region src/components/block-handle/block-handle-popover/setup.ts
/**
* @internal
*/
function useBlockHandlePopover(host, { state, emit }) {
	const { editor, ...overlayState } = state;
	const reference = createSignal(null);
	useOverlayPositionerState(host, overlayState, { reference });
	const context = createSignal(null);
	blockPopoverContext.provide(host, context);
	const dragging = createSignal(false);
	draggingContext.provide(host, dragging);
	const scrolling = useScrolling(host);
	const open = createComputed(() => {
		return !!context.get() && !scrolling.get();
	});
	useHoverExtension(host, editor, (referenceValue, hoverState) => {
		reference.set(referenceValue);
		context.set(hoverState);
		emit("stateChange", hoverState ? {
			node: hoverState.node,
			pos: hoverState.pos
		} : null);
	});
	useAttribute(host, "data-state", () => open.get() ? "open" : "closed");
	usePresence(host, open);
}
function useHoverExtension(host, editor, handler) {
	let prevHoverState = null;
	useEditorExtension(host, editor, defineElementHoverHandler((reference, hoverState) => {
		if (isHoverStateEqual(prevHoverState, hoverState)) return;
		prevHoverState = hoverState;
		handler(reference, hoverState);
	}));
}
function isHoverStateEqual(a, b) {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return a.pos === b.pos && a.node.eq(b.node);
}

//#endregion
//#region src/components/block-handle/block-handle-popover/types.ts
/** @internal */
const blockHandlePopoverProps = {
	...overlayPositionerProps,
	editor: { default: null },
	placement: { default: "left" },
	hoist: { default: false },
	flip: { default: false },
	shift: { default: false },
	hide: { default: true }
};
/** @internal */
const blockHandlePopoverEvents = {
	...overlayPositionerEvents,
	stateChange: {}
};

//#endregion
//#region src/components/block-handle/block-handle-popover/element.gen.ts
const BlockHandlePopoverElementBase = defineCustomElement({
	props: blockHandlePopoverProps,
	events: blockHandlePopoverEvents,
	setup: useBlockHandlePopover
});
var BlockHandlePopoverElement = class extends BlockHandlePopoverElementBase {};
registerCustomElement("prosekit-block-handle-popover", BlockHandlePopoverElement);

//#endregion
export { BlockHandleAddElement, BlockHandleDraggableElement, BlockHandlePopoverElement, blockHandleAddEvents, blockHandleAddProps, blockHandleDraggableEvents, blockHandleDraggableProps, blockHandlePopoverEvents, blockHandlePopoverProps, useBlockHandleAdd, useBlockHandleDraggable, useBlockHandlePopover };
//# sourceMappingURL=prosekit-web-block-handle.js.map