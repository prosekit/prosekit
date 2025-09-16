import { getStateWithDefaults } from "./get-default-state-CIEy7xrl.js";
import { useEditorExtension } from "./use-editor-extension-Cc7ZG7uj.js";
import { getSafeEditorView } from "./get-safe-editor-view-DENm4avv.js";
import { assignStyles, useScrolling } from "./use-scrolling-BNfsQs3S.js";
import { cloneElement, deepCloneElement, injectStyle } from "./inject-style-BJQNFufI.js";
import { createComputed, createContext, createSignal, defineCustomElement, defineEmit, registerCustomElement, useAttribute, useEffect, useEventListener } from "@aria-ui/core";
import { defineDOMEventHandler, union } from "@prosekit/core";
import { useOverlayPositionerState } from "@aria-ui/overlay/elements";
import { usePresence } from "@aria-ui/presence";
import { isHTMLElement, once } from "@ocavue/utils";
import { overlayPositionerEvents as overlayPositionerEvents$1, overlayPositionerProps as overlayPositionerProps$1 } from "@aria-ui/overlay";
import { menuContentEvents, menuContentProps, menuRootEvents, menuRootProps, useMenuContent, useMenuItem, useMenuRoot, useMenuTrigger } from "@aria-ui/menu/elements";
import { moveTableColumn, moveTableRow, selectTableColumn, selectTableRow } from "@prosekit/extensions/table";
import { computePosition, offset } from "@floating-ui/dom";
import { menuItemEvents, menuItemProps } from "@aria-ui/menu";
import { TableMap, cellAround } from "prosemirror-tables";

//#region src/components/table-handle/context.ts
/**
* @internal
*/
const tableHandleRootContext = createContext("prosekit-table-handle-root-context", null);
/**
* @internal
*/
const defaultTableHandleDndContext = {
	dragging: false,
	direction: "row",
	draggingIndex: -1,
	droppingIndex: -1,
	x: -1,
	y: -1,
	startX: -1,
	startY: -1
};
/**
* @internal
*/
const tableHandleDndContext = createContext("prosekit-table-handle-dnd-context", defaultTableHandleDndContext);

//#endregion
//#region src/components/table-handle/table-handle-column-root/setup.ts
/**
* @internal
*/
function useTableHandleColumnRoot(host, { state }) {
	const { editor,...overlayState } = state;
	const rootContext = tableHandleRootContext.consume(host);
	const colFirstCellPos = createComputed(() => {
		return rootContext.get()?.colFirstCellPos;
	});
	const referenceCell = createComputed(() => {
		const pos = colFirstCellPos.get();
		const view = getSafeEditorView(editor.get());
		if (!pos || !view) return null;
		return view.nodeDOM(pos);
	});
	const contentOpen = createSignal(false);
	useEffect(host, () => {
		colFirstCellPos.get();
		contentOpen.set(false);
	});
	useOverlayPositionerState(host, overlayState, { reference: referenceCell });
	const presence = createComputed(() => !!referenceCell.get());
	useAttribute(host, "data-state", () => presence.get() ? "open" : "closed");
	usePresence(host, presence);
	const menuRootState = getStateWithDefaults({ open: contentOpen }, menuRootProps);
	useMenuRoot(host, {
		state: menuRootState,
		emit: () => void 0
	});
}

//#endregion
//#region src/components/table-handle/table-handle-column-root/types.ts
/** @internal */
const tableHandleColumnRootProps = Object.freeze({
	...overlayPositionerProps$1,
	editor: { default: null },
	placement: { default: "top" },
	hoist: { default: false },
	flip: { default: false },
	shift: { default: false },
	hide: { default: true }
});
/** @internal */
const tableHandleColumnRootEvents = overlayPositionerEvents$1;

//#endregion
//#region src/components/table-handle/table-handle-column-root/element.gen.ts
const TableHandleColumnRootElementBase = defineCustomElement({
	props: tableHandleColumnRootProps,
	events: tableHandleColumnRootEvents,
	setup: useTableHandleColumnRoot
});
var TableHandleColumnRootElement = class extends TableHandleColumnRootElementBase {};
registerCustomElement("prosekit-table-handle-column-root", TableHandleColumnRootElement);

//#endregion
//#region src/components/table-handle/hooks/use-empty-image.ts
/**
* Returns a function that returns a 1x1 transparent image. This is used to
* prevent the browser from showing the default drag image. An earth icon in
* chrome is used as the default drag image. This image must be loaded before
* the dragStart event triggers.
*
* See https://stackoverflow.com/a/40923520
*
* @internal
*/
function useEmptyImage(host) {
	let image;
	useEffect(host, () => {
		image = new Image(1, 1);
		image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
		return () => {
			image?.remove();
			image = void 0;
		};
	});
	return () => image;
}

//#endregion
//#region src/components/table-handle/table-handle-column-trigger/setup.ts
/**
* @internal
*/
function useTableHandleColumnTrigger(host, { state }) {
	useMenuTrigger(host);
	const context = tableHandleRootContext.consume(host);
	const dndContext = tableHandleDndContext.consume(host);
	useEventListener(host, "pointerdown", () => {
		const editor = state.editor.peek();
		const cellPos = context.peek()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableColumn({ head: cellPos }));
	});
	useEffect(host, () => {
		host.draggable = true;
	});
	const getEmptyImage = useEmptyImage(host);
	useEventListener(host, "dragstart", (event) => {
		const dataTransfer = event.dataTransfer;
		if (dataTransfer) {
			dataTransfer.effectAllowed = "move";
			const emptyImage = getEmptyImage();
			if (emptyImage) dataTransfer.setDragImage(emptyImage, 0, 0);
			dataTransfer.setData("application/x-prosekit-table-handle-drag", "");
		}
		const prev = dndContext.peek();
		const index = context.peek()?.colIndex;
		if (index == null || index < 0) {
			console.warn("[prosekit] Invalid column index for drag operation:", index);
			event.preventDefault();
			return;
		}
		dndContext.set({
			...prev,
			direction: "col",
			dragging: true,
			draggingIndex: index,
			startX: event.clientX,
			startY: event.clientY
		});
	});
}

//#endregion
//#region src/components/table-handle/table-handle-column-trigger/types.ts
/** @internal */
const tableHandleColumnTriggerProps = { editor: { default: null } };
/** @internal */
const tableHandleColumnTriggerEvents = {};

//#endregion
//#region src/components/table-handle/table-handle-column-trigger/element.gen.ts
const TableHandleColumnTriggerElementBase = defineCustomElement({
	props: tableHandleColumnTriggerProps,
	events: tableHandleColumnTriggerEvents,
	setup: useTableHandleColumnTrigger
});
var TableHandleColumnTriggerElement = class extends TableHandleColumnTriggerElementBase {};
registerCustomElement("prosekit-table-handle-column-trigger", TableHandleColumnTriggerElement);

//#endregion
//#region src/components/table-handle/dnd.ts
function useInitDndPosition(host, editor, onInit) {
	const dndContext = tableHandleDndContext.consume(host);
	const rootContext = tableHandleRootContext.consume(host);
	const draggingSignal = createComputed(() => {
		return dndContext.get().dragging;
	});
	const directionSignal = createComputed(() => {
		return dndContext.get().direction;
	});
	const draggingIndexSignal = createComputed(() => {
		return dndContext.get().draggingIndex;
	});
	useEffect(host, () => {
		const view = getSafeEditorView(editor.get());
		if (!view) return;
		const dragging = draggingSignal.get();
		const direction = directionSignal.get();
		host.dataset.direction = direction;
		host.dataset.dragging = dragging.toString();
		const draggingIndex = draggingIndexSignal.get();
		const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction);
		if (!relatedDOMs) return;
		const { table, cell } = relatedDOMs;
		onInit({
			host,
			direction,
			dragging,
			draggingIndex,
			table,
			cell
		});
		if (!dragging) return;
		let cancelled = false;
		computePosition(cell, host, {
			placement: direction === "row" ? "right" : "bottom",
			middleware: [offset(({ rects }) => {
				if (direction === "col") return -rects.reference.height;
				return -rects.reference.width;
			})]
		}).then(({ x, y }) => {
			if (cancelled) return;
			assignStyles(host, {
				left: `${x}px`,
				top: `${y}px`
			});
		});
		return () => {
			cancelled = true;
		};
	});
}
function getTableDOMByPos(view, pos) {
	const dom = view.domAtPos(pos).node;
	if (!dom) return;
	return (isHTMLElement(dom) ? dom : dom.parentElement)?.closest("table") ?? void 0;
}
function getTargetFirstCellDOM(table, index, direction) {
	if (direction === "row") return table.querySelectorAll("tr")[index]?.querySelector("td") ?? void 0;
	else return table.querySelector("tr")?.querySelectorAll("td")[index] ?? void 0;
}
function getDndRelatedDOMs(view, cellPos, draggingIndex, direction) {
	if (cellPos == null) return;
	const table = getTableDOMByPos(view, cellPos);
	if (!table) return;
	const cell = getTargetFirstCellDOM(table, draggingIndex, direction);
	if (!cell) return;
	return {
		table,
		cell
	};
}

//#endregion
//#region src/utils/css-feature-detection.ts
const isColorMixSupported = once(() => {
	try {
		return CSS.supports("background-color", "color-mix(in srgb, red, blue)");
	} catch {
		return false;
	}
});

//#endregion
//#region src/utils/fade-color.ts
/**
* Convert a color to a color with opacity
* @param color - The color to convert
* @param opacity - The opacity to apply
* @returns The converted color if color-mix is supported, otherwise undefined
*/
function fadeColor(color, opacity) {
	if (isColorMixSupported()) {
		const transparentWeight = (1 - opacity) * 100;
		const colorWeight = opacity * 100;
		return `color-mix(in srgb, ${color} ${colorWeight}%, transparent ${transparentWeight}%)`;
	}
}

//#endregion
//#region src/utils/get-effective-background-color.ts
function getEffectiveBackgroundColor(element) {
	let current = element;
	while (current) {
		const backgroundColor = (current.ownerDocument.defaultView?.getComputedStyle(current))?.backgroundColor;
		if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") return backgroundColor;
		current = current.parentElement;
	}
}

//#endregion
//#region src/components/table-handle/table-handle-drag-preview/render-preview.ts
function clearPreviewDOM(previewRoot) {
	while (previewRoot.firstChild) previewRoot.removeChild(previewRoot.firstChild);
}
function createPreviewDOM(table, previewRoot, index, direction) {
	clearPreviewDOM(previewRoot);
	const [previewTable, previewTableStyle] = cloneElement(table);
	injectStyle(previewRoot, previewTableStyle);
	unsetSize(previewTable);
	const tableBody = table.querySelector("tbody");
	const [previewTableBody, previewTableBodyStyle] = tableBody ? cloneElement(tableBody) : [table.ownerDocument.createElement("tbody"), ""];
	injectStyle(previewRoot, previewTableBodyStyle);
	unsetSize(previewTableBody);
	const backgroundColor = getEffectiveBackgroundColor(table);
	if (backgroundColor) {
		const backgroundColorWithOpacity = fadeColor(backgroundColor, .8);
		if (backgroundColorWithOpacity) assignStyles(previewTable, { backgroundColor: backgroundColorWithOpacity });
	}
	previewTable.appendChild(previewTableBody);
	previewRoot.appendChild(previewTable);
	const rows = table.querySelectorAll("tr");
	if (direction === "row") {
		const row = rows[index];
		const [previewRow, previewRowStyle] = deepCloneElement(row);
		injectStyle(previewRoot, previewRowStyle);
		previewTableBody.appendChild(previewRow);
	} else rows.forEach((row) => {
		const [previewRow, previewRowStyle] = cloneElement(row);
		injectStyle(previewRoot, previewRowStyle);
		unsetSize(previewRow);
		const cell = row.querySelectorAll("td")[index];
		if (cell) {
			const [previewCell, previewCellStyle] = deepCloneElement(cell);
			injectStyle(previewRoot, previewCellStyle);
			previewRow.appendChild(previewCell);
			previewTableBody.appendChild(previewRow);
		}
	});
}
function unsetSize(element) {
	assignStyles(element, {
		width: "unset",
		height: "unset",
		minWidth: "unset",
		minHeight: "unset",
		maxWidth: "unset",
		maxHeight: "unset"
	});
}

//#endregion
//#region src/components/table-handle/table-handle-drag-preview/updater.ts
function useUpdatePreviewPosition(host, editor) {
	const dndContext = tableHandleDndContext.consume(host);
	const rootContext = tableHandleRootContext.consume(host);
	const draggingSignal = createComputed(() => {
		return dndContext.get().dragging;
	});
	const clientXSignal = createComputed(() => {
		return dndContext.get().x;
	});
	const clientYSignal = createComputed(() => {
		return dndContext.get().y;
	});
	useEffect(host, () => {
		const view = getSafeEditorView(editor.get());
		if (!view) return;
		if (!draggingSignal.get()) return;
		const { draggingIndex, direction } = dndContext.peek();
		const x = clientXSignal.get();
		const y = clientYSignal.get();
		const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction);
		if (!relatedDOMs) return;
		const { cell } = relatedDOMs;
		let cancelled = false;
		computePosition(getVirtualElement(cell, x, y), host, { placement: direction === "row" ? "right" : "bottom" }).then(({ x: x$1, y: y$1 }) => {
			if (cancelled) return;
			if (direction === "row") {
				assignStyles(host, { top: `${y$1}px` });
				return;
			}
			if (direction === "col") {
				assignStyles(host, { left: `${x$1}px` });
				return;
			}
		});
		return () => {
			cancelled = true;
		};
	});
}
function getVirtualElement(cell, x, y) {
	return {
		contextElement: cell,
		getBoundingClientRect: () => {
			const rect = cell.getBoundingClientRect();
			return {
				width: rect.width,
				height: rect.height,
				right: x + rect.width / 2,
				bottom: y + rect.height / 2,
				top: y - rect.height / 2,
				left: x - rect.width / 2,
				x: x - rect.width / 2,
				y: y - rect.height / 2
			};
		}
	};
}

//#endregion
//#region src/components/table-handle/table-handle-drag-preview/setup.ts
/**
* @internal
*/
function useTableHandleDragPreview(host, { state }) {
	const { editor } = state;
	useEffect(host, () => {
		assignStyles(host, {
			position: "absolute",
			pointerEvents: "none"
		});
	});
	useInitDndPosition(host, editor, onInitPreviewPosition);
	useUpdatePreviewPosition(host, editor);
}
function onInitPreviewPosition({ host, direction, dragging, table, cell, draggingIndex }) {
	assignStyles(host, { display: dragging ? "block" : "none" });
	if (!dragging) {
		clearPreviewDOM(host);
		return;
	}
	createPreviewDOM(table, host, draggingIndex, direction);
	const tableRect = table.getBoundingClientRect();
	const cellRect = cell.getBoundingClientRect();
	if (direction === "col") assignStyles(host, {
		width: `${cellRect.width}px`,
		height: `${tableRect.height}px`
	});
	if (direction === "row") assignStyles(host, {
		width: `${tableRect.width}px`,
		height: `${cellRect.height}px`
	});
}

//#endregion
//#region src/components/table-handle/table-handle-drag-preview/types.ts
const tableHandleDragPreviewProps = { editor: { default: null } };
const tableHandleDragPreviewEvents = {};

//#endregion
//#region src/components/table-handle/table-handle-drag-preview/element.gen.ts
const TableHandleDragPreviewElementBase = defineCustomElement({
	props: tableHandleDragPreviewProps,
	events: tableHandleDragPreviewEvents,
	setup: useTableHandleDragPreview
});
var TableHandleDragPreviewElement = class extends TableHandleDragPreviewElementBase {};
registerCustomElement("prosekit-table-handle-drag-preview", TableHandleDragPreviewElement);

//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/calc-drag-over.ts
function findDragOverElement(elements, pointer, axis) {
	const startProp = axis === "x" ? "left" : "top";
	const endProp = axis === "x" ? "right" : "bottom";
	const lastIndex = elements.length - 1;
	const index = elements.findIndex((el, index$1) => {
		const rect = el.getBoundingClientRect();
		const boundaryStart = rect[startProp];
		const boundaryEnd = rect[endProp];
		if (boundaryStart <= pointer && pointer <= boundaryEnd) return true;
		if (index$1 === lastIndex && pointer > boundaryEnd) return true;
		if (index$1 === 0 && pointer < boundaryStart) return true;
		return false;
	});
	return index >= 0 ? [elements[index], index] : void 0;
}
function getDragOverColumn(table, pointerX) {
	const firstRow = table.querySelector("tr");
	if (!firstRow) return;
	const cells = Array.from(firstRow.children);
	return findDragOverElement(cells, pointerX, "x");
}
function getDragOverRow(table, pointerY) {
	const rows = Array.from(table.querySelectorAll("tr"));
	return findDragOverElement(rows, pointerY, "y");
}

//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/updater.ts
function useUpdateIndicatorPosition(host, editor, handleWidth) {
	const dndContext = tableHandleDndContext.consume(host);
	const rootContext = tableHandleRootContext.consume(host);
	const draggingSignal = createComputed(() => {
		return dndContext.get().dragging;
	});
	const clientXSignal = createComputed(() => {
		return dndContext.get().x;
	});
	const clientYSignal = createComputed(() => {
		return dndContext.get().y;
	});
	const startXSignal = createComputed(() => {
		return dndContext.get().startX;
	});
	const startYSignal = createComputed(() => {
		return dndContext.get().startY;
	});
	useEffect(host, () => {
		const view = getSafeEditorView(editor.get());
		if (!view) return;
		if (!draggingSignal.get()) return;
		const { draggingIndex, direction } = dndContext.peek();
		const x = clientXSignal.get();
		const y = clientYSignal.get();
		const relatedDOMs = getDndRelatedDOMs(view, rootContext.peek()?.cellPos, draggingIndex, direction);
		if (!relatedDOMs) return;
		const { table } = relatedDOMs;
		let cancelled = false;
		let cleanup = () => {
			cancelled = true;
		};
		if (direction === "col") {
			const direction$1 = startXSignal.get() > x ? "left" : "right";
			const dragOverColumn = getDragOverColumn(table, x);
			if (dragOverColumn) {
				const [col, index] = dragOverColumn;
				dndContext.set({
					...dndContext.peek(),
					droppingIndex: index
				});
				computePosition(col, host, {
					placement: direction$1 === "left" ? "left" : "right",
					middleware: [offset(direction$1 === "left" ? -1 * handleWidth : 0)]
				}).then(({ x: x$1 }) => {
					if (cancelled) return;
					assignStyles(host, { left: `${x$1}px` });
				});
			}
			return cleanup;
		}
		if (direction === "row") {
			const direction$1 = startYSignal.get() > y ? "up" : "down";
			const dragOverRow = getDragOverRow(table, y);
			if (dragOverRow) {
				const [row, index] = dragOverRow;
				dndContext.set({
					...dndContext.peek(),
					droppingIndex: index
				});
				computePosition(row, host, {
					placement: direction$1 === "up" ? "top" : "bottom",
					middleware: [offset(direction$1 === "up" ? -1 * handleWidth : 0)]
				}).then(({ y: y$1 }) => {
					if (cancelled) return;
					assignStyles(host, { top: `${y$1}px` });
				});
			}
			return cleanup;
		}
	});
}

//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/setup.ts
const HANDLE_WIDTH = 2;
/**
* @internal
*/
function useTableHandleDropIndicator(host, { state }) {
	const { editor } = state;
	useEffect(host, () => {
		assignStyles(host, {
			pointerEvents: "none",
			position: "absolute"
		});
	});
	useInitDndPosition(host, editor, onInitIndicatorPosition);
	useUpdateIndicatorPosition(host, editor, HANDLE_WIDTH);
}
function onInitIndicatorPosition({ host, direction, dragging, table }) {
	assignStyles(host, { display: dragging ? "block" : "none" });
	const tableRect = table.getBoundingClientRect();
	if (direction === "col") assignStyles(host, {
		width: `${HANDLE_WIDTH}px`,
		height: `${tableRect.height}px`
	});
	if (direction === "row") assignStyles(host, {
		width: `${tableRect.width}px`,
		height: `${HANDLE_WIDTH}px`
	});
}

//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/types.ts
const tableHandleDropIndicatorProps = { editor: { default: null } };
const tableHandleDropIndicatorEvents = {};

//#endregion
//#region src/components/table-handle/table-handle-drop-indicator/element.gen.ts
const TableHandleDropIndicatorElementBase = defineCustomElement({
	props: tableHandleDropIndicatorProps,
	events: tableHandleDropIndicatorEvents,
	setup: useTableHandleDropIndicator
});
var TableHandleDropIndicatorElement = class extends TableHandleDropIndicatorElementBase {};
registerCustomElement("prosekit-table-handle-drop-indicator", TableHandleDropIndicatorElement);

//#endregion
//#region src/components/table-handle/table-handle-popover-content/setup.ts
/**
* @internal
*/
function useTableHandlePopoverContent(host, { state, emit }) {
	const rootContext = tableHandleRootContext.consume(host);
	const open = createComputed(() => !!rootContext.get());
	const keyDownTarget = useKeyDownTarget(host, open);
	const menuContentState = getStateWithDefaults({
		placement: state.placement,
		offset: state.offset,
		eventTarget: createSignal(keyDownTarget)
	}, menuContentProps);
	useMenuContent(host, {
		state: menuContentState,
		emit
	});
}
function useKeyDownTarget(element, open) {
	const keydownHandlers = [];
	useEffect(element, () => {
		const handleKeydown = (event) => {
			if (event.isComposing || event.defaultPrevented || !open.get()) return false;
			keydownHandlers.forEach((handler) => handler(event));
		};
		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});
	return {
		addEventListener: (type, listener) => {
			if (type === "keydown") keydownHandlers.push(listener);
		},
		removeEventListener: (type, listener) => {
			if (type === "keydown") {
				const index = keydownHandlers.indexOf(listener);
				if (index !== -1) keydownHandlers.splice(index, 1);
			}
		}
	};
}

//#endregion
//#region src/components/table-handle/table-handle-popover-content/types.ts
/** @internal */
const tableHandlePopoverContentProps = Object.freeze({
	...menuContentProps,
	placement: { default: "right-start" },
	offset: { default: {
		mainAxis: -4,
		crossAxis: 4
	} },
	editor: { default: null }
});
/** @internal */
const tableHandlePopoverContentEvents = Object.freeze({ ...menuContentEvents });

//#endregion
//#region src/components/table-handle/table-handle-popover-content/element.gen.ts
const TableHandlePopoverContentElementBase = defineCustomElement({
	props: tableHandlePopoverContentProps,
	events: tableHandlePopoverContentEvents,
	setup: useTableHandlePopoverContent
});
var TableHandlePopoverContentElement = class extends TableHandlePopoverContentElementBase {};
registerCustomElement("prosekit-table-handle-popover-content", TableHandlePopoverContentElement);

//#endregion
//#region src/components/table-handle/table-handle-popover-item/setup.ts
/**
* @internal
*/
function useTableHandlePopoverItem(element, { state, emit }) {
	useMenuItem(element, {
		state,
		emit
	});
}

//#endregion
//#region src/components/table-handle/table-handle-popover-item/types.ts
/** @internal */
const tableHandlePopoverItemProps = { ...menuItemProps };
/** @internal */
const tableHandlePopoverItemEvents = { ...menuItemEvents };

//#endregion
//#region src/components/table-handle/table-handle-popover-item/element.gen.ts
const TableHandlePopoverItemElementBase = defineCustomElement({
	props: tableHandlePopoverItemProps,
	events: tableHandlePopoverItemEvents,
	setup: useTableHandlePopoverItem
});
var TableHandlePopoverItemElement = class extends TableHandlePopoverItemElementBase {};
registerCustomElement("prosekit-table-handle-popover-item", TableHandlePopoverItemElement);

//#endregion
//#region src/hooks/use-editor-typing.ts
function useEditorTyping(host, editor) {
	const typing = createSignal(false);
	const handleKeypress = () => {
		typing.set(true);
	};
	const handlePointerMove = () => {
		typing.set(false);
	};
	const extension = union(defineDOMEventHandler("keypress", handleKeypress), defineDOMEventHandler("pointermove", handlePointerMove));
	useEditorExtension(host, editor, extension);
	return typing;
}

//#endregion
//#region src/hooks/use-selecting.ts
/**
* Detect if the user is selecting text inside the editor, in which case some
* components should be disabled or hidden.
*/
function useSelecting(host, editor, enabled) {
	const selecting = createSignal(false);
	const isPointerDown = createSignal(false);
	useEffect(host, () => {
		if (!enabled.get()) return;
		const view = getSafeEditorView(editor.peek());
		if (!view) return;
		const { dom, root } = view;
		if (!root) return;
		const handlePointerDown = () => {
			selecting.set(true);
			isPointerDown.set(true);
		};
		const handlePointerUp = () => {
			isPointerDown.set(false);
		};
		const handleMouseMove = () => {
			if (!isPointerDown.get()) selecting.set(false);
		};
		dom.addEventListener("pointerdown", handlePointerDown);
		root.addEventListener("pointerup", handlePointerUp);
		root.addEventListener("pointermove", handleMouseMove);
		return () => {
			dom.removeEventListener("pointerdown", handlePointerDown);
			root.removeEventListener("pointerup", handlePointerUp);
			root.removeEventListener("pointermove", handleMouseMove);
		};
	});
	return selecting;
}

//#endregion
//#region src/components/table-handle/hooks/use-drop.ts
function useDrop(host, editor, dndContext) {
	const dragging = createComputed(() => dndContext.get().dragging);
	useEffect(host, () => {
		const view = getSafeEditorView(editor.get());
		if (!view || !view.editable) return;
		const ownerDocument = view.dom?.ownerDocument;
		if (!ownerDocument) return;
		const handleDrop = () => {
			if (!dragging.peek()) return;
			const editorValue = editor.peek();
			if (!editorValue) return;
			const { droppingIndex, draggingIndex, direction } = dndContext.peek();
			if (draggingIndex < 0 || droppingIndex < 0) {
				console.warn("[prosekit] Invalid drag indices:", {
					draggingIndex,
					droppingIndex
				});
				return;
			}
			if (direction === "row") {
				editorValue.exec(moveTableRow({
					from: draggingIndex,
					to: droppingIndex
				}));
				return;
			}
			if (direction === "col") {
				editorValue.exec(moveTableColumn({
					from: draggingIndex,
					to: droppingIndex
				}));
				return;
			}
		};
		const handleDragOver = (event) => {
			if (!dragging.peek()) return;
			event.preventDefault();
			const prev = dndContext.peek();
			dndContext.set({
				...prev,
				dragging: true,
				x: event.clientX,
				y: event.clientY
			});
		};
		const handleDragEnd = () => {
			if (!dragging.peek()) return;
			const prev = dndContext.peek();
			dndContext.set({
				...prev,
				dragging: false
			});
		};
		ownerDocument.addEventListener("dragover", handleDragOver);
		ownerDocument.addEventListener("drop", handleDrop);
		ownerDocument.addEventListener("dragend", handleDragEnd);
		return () => {
			ownerDocument.removeEventListener("dragover", handleDragOver);
			ownerDocument.removeEventListener("drop", handleDrop);
			ownerDocument.removeEventListener("dragend", handleDragEnd);
		};
	});
}

//#endregion
//#region src/components/table-handle/utils.ts
function isHoveringCellInfoEqual(a, b) {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return a.rowIndex === b.rowIndex && a.colIndex === b.colIndex && a.cellPos === b.cellPos && a.rowFirstCellPos === b.rowFirstCellPos && a.colFirstCellPos === b.colFirstCellPos;
}
/**
* Copied from https://github.com/ProseMirror/prosemirror-tables/blob/v1.5.0/src/columnresizing.ts#L256
*
* @internal
*/
function domCellAround(target) {
	while (target && target.nodeName != "TD" && target.nodeName != "TH") target = target.classList?.contains("ProseMirror") ? null : target.parentNode;
	return target;
}
function getHoveringCell(view, event) {
	const domCell = domCellAround(event.target);
	if (!domCell) return;
	const { left, top, width, height } = domCell.getBoundingClientRect();
	const eventPos = view.posAtCoords({
		left: left + width / 2,
		top: top + height / 2
	});
	if (!eventPos) return;
	const $cellPos = cellAround(view.state.doc.resolve(eventPos.pos));
	if (!$cellPos) return;
	const map = TableMap.get($cellPos.node(-1));
	const tableStart = $cellPos.start(-1);
	const cellRect = map.findCell($cellPos.pos - tableStart);
	const rowIndex = cellRect.top;
	const colIndex = cellRect.left;
	return {
		rowIndex,
		colIndex,
		cellPos: $cellPos.pos,
		rowFirstCellPos: getCellPos(map, tableStart, rowIndex, 0),
		colFirstCellPos: getCellPos(map, tableStart, 0, colIndex)
	};
}
function getCellPos(map, tableStart, rowIndex, colIndex) {
	const cellIndex = getCellIndex(map, rowIndex, colIndex);
	const posInTable = map.map[cellIndex];
	return tableStart + posInTable;
}
function getCellIndex(map, rowIndex, colIndex) {
	return map.width * rowIndex + colIndex;
}

//#endregion
//#region src/components/table-handle/table-handle-root/setup.ts
/**
* @internal
*/
function useTableHandleRoot(host, { state }) {
	const { editor } = state;
	const context = createSignal(null);
	const dndContext = createSignal(defaultTableHandleDndContext);
	const hoveringCell = useHoveringCell(host, editor);
	const typing = useEditorTyping(host, editor);
	const isInTable = createComputed(() => !!hoveringCell.get());
	const selecting = useSelecting(host, editor, isInTable);
	const scrolling = useScrolling(host);
	const canShow = createComputed(() => {
		return !typing.get() && !selecting.get() && !scrolling.get();
	});
	useEffect(host, () => {
		context.set(canShow.get() ? hoveringCell.get() : null);
	});
	tableHandleRootContext.provide(host, context);
	tableHandleDndContext.provide(host, dndContext);
	useDrop(host, editor, dndContext);
}
function useHoveringCell(host, editor) {
	const hoveringCell = createSignal(null);
	const extension = defineCellHoverHandler((curr) => {
		const prev = hoveringCell.peek();
		if (!isHoveringCellInfoEqual(prev, curr)) hoveringCell.set(curr);
	});
	useEditorExtension(host, editor, extension);
	return hoveringCell;
}
function defineCellHoverHandler(handler) {
	const pointerHandler = (view, event) => {
		const hoveringCell = getHoveringCell(view, event);
		return handler(hoveringCell ?? null);
	};
	return defineDOMEventHandler("pointerover", pointerHandler);
}

//#endregion
//#region src/components/table-handle/table-handle-root/types.ts
/** @internal */
const tableHandleRootProps = { editor: { default: null } };
/** @internal */
const tableHandleRootEvents = {};

//#endregion
//#region src/components/table-handle/table-handle-root/element.gen.ts
const TableHandleRootElementBase = defineCustomElement({
	props: tableHandleRootProps,
	events: tableHandleRootEvents,
	setup: useTableHandleRoot
});
var TableHandleRootElement = class extends TableHandleRootElementBase {};
registerCustomElement("prosekit-table-handle-root", TableHandleRootElement);

//#endregion
//#region src/components/table-handle/table-handle-row-root/setup.ts
/**
* @internal
*/
function useTableHandleRowRoot(host, { state }) {
	const { editor,...overlayState } = state;
	const rootContext = tableHandleRootContext.consume(host);
	const rowFirstCellPos = createComputed(() => {
		return rootContext.get()?.rowFirstCellPos;
	});
	const referenceCell = createComputed(() => {
		const pos = rowFirstCellPos.get();
		const view = getSafeEditorView(editor.get());
		if (!pos || !view) return null;
		return view.nodeDOM(pos);
	});
	const contentOpen = createSignal(false);
	useEffect(host, () => {
		rowFirstCellPos.get();
		contentOpen.set(false);
	});
	useOverlayPositionerState(host, overlayState, { reference: referenceCell });
	const presence = createComputed(() => !!referenceCell.get());
	useAttribute(host, "data-state", () => presence.get() ? "open" : "closed");
	usePresence(host, presence);
	const menuRootState = getStateWithDefaults({ open: contentOpen }, menuRootProps);
	useMenuRoot(host, {
		state: menuRootState,
		emit: defineEmit(host, menuRootEvents)
	});
}

//#endregion
//#region src/components/table-handle/table-handle-row-root/types.ts
/** @internal */
const tableHandleRowRootProps = {
	...overlayPositionerProps$1,
	editor: { default: null },
	placement: { default: "left" },
	hoist: { default: false },
	flip: { default: false },
	shift: { default: false },
	hide: { default: true }
};
/** @internal */
const tableHandleRowRootEvents = {};

//#endregion
//#region src/components/table-handle/table-handle-row-root/element.gen.ts
const TableHandleRowRootElementBase = defineCustomElement({
	props: tableHandleRowRootProps,
	events: tableHandleRowRootEvents,
	setup: useTableHandleRowRoot
});
var TableHandleRowRootElement = class extends TableHandleRowRootElementBase {};
registerCustomElement("prosekit-table-handle-row-root", TableHandleRowRootElement);

//#endregion
//#region src/components/table-handle/table-handle-row-trigger/setup.ts
/**
* @internal
*/
function useTableHandleRowTrigger(host, { state }) {
	useMenuTrigger(host);
	const context = tableHandleRootContext.consume(host);
	const dndContext = tableHandleDndContext.consume(host);
	useEventListener(host, "pointerdown", () => {
		const editor = state.editor.peek();
		const cellPos = context.peek()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableRow({ head: cellPos }));
	});
	useEffect(host, () => {
		host.draggable = true;
	});
	const getEmptyImage = useEmptyImage(host);
	useEventListener(host, "dragstart", (event) => {
		const dataTransfer = event.dataTransfer;
		if (dataTransfer) {
			dataTransfer.effectAllowed = "move";
			const emptyImage = getEmptyImage();
			if (emptyImage) dataTransfer.setDragImage(emptyImage, 0, 0);
		}
		const prev = dndContext.peek();
		const index = context.peek()?.rowIndex;
		if (index == null || index < 0) {
			console.warn("[prosekit] Invalid row index for drag operation:", index);
			event.preventDefault();
			return;
		}
		dndContext.set({
			...prev,
			direction: "row",
			dragging: true,
			draggingIndex: index,
			startX: event.clientX,
			startY: event.clientY
		});
	});
}

//#endregion
//#region src/components/table-handle/table-handle-row-trigger/types.ts
/** @internal */
const tableHandleRowTriggerProps = { editor: { default: null } };
/** @internal */
const tableHandleRowTriggerEvents = { select: {} };

//#endregion
//#region src/components/table-handle/table-handle-row-trigger/element.gen.ts
const TableHandleRowTriggerElementBase = defineCustomElement({
	props: tableHandleRowTriggerProps,
	events: tableHandleRowTriggerEvents,
	setup: useTableHandleRowTrigger
});
var TableHandleRowTriggerElement = class extends TableHandleRowTriggerElementBase {};
registerCustomElement("prosekit-table-handle-row-trigger", TableHandleRowTriggerElement);

//#endregion
export { TableHandleColumnRootElement, TableHandleColumnTriggerElement, TableHandleDragPreviewElement, TableHandleDropIndicatorElement, TableHandlePopoverContentElement, TableHandlePopoverItemElement, TableHandleRootElement, TableHandleRowRootElement, TableHandleRowTriggerElement, tableHandleColumnRootEvents, tableHandleColumnRootProps, tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, tableHandleDragPreviewEvents, tableHandleDragPreviewProps, tableHandleDropIndicatorEvents, tableHandleDropIndicatorProps, tableHandlePopoverContentEvents, tableHandlePopoverContentProps, tableHandlePopoverItemEvents, tableHandlePopoverItemProps, tableHandleRootEvents, tableHandleRootProps, tableHandleRowRootEvents, tableHandleRowRootProps, tableHandleRowTriggerEvents, tableHandleRowTriggerProps, useTableHandleColumnRoot, useTableHandleColumnTrigger, useTableHandleDragPreview, useTableHandleDropIndicator, useTableHandlePopoverContent, useTableHandlePopoverItem, useTableHandleRoot, useTableHandleRowRoot, useTableHandleRowTrigger };
//# sourceMappingURL=prosekit-web-table-handle.js.map