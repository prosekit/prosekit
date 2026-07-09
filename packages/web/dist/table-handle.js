import { t as useEditorExtension } from "./use-editor-extension.js";
import { t as getSafeEditorView } from "./get-safe-editor-view.js";
import { t as assignStyles } from "./assign-styles.js";
import { t as useScrolling } from "./use-scrolling.js";
import { computed, createContext, createSignal, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { useEventListener } from "@aria-ui/utils";
import { OverlayPositionerPropsDeclaration, createOverlayStore, setupOverlayPopup, setupOverlayPositioner } from "@aria-ui/elements/overlay";
import { defineDOMEventHandler, union } from "@prosekit/core";
import { getDocument, getId, isHTMLElement, once } from "@ocavue/utils";
import { computePosition, offset } from "@floating-ui/dom";
import { MenuRootPropsDeclaration, setupMenuRoot, setupMenuTrigger } from "@aria-ui/elements/menu";
import { moveTableColumn, moveTableRow, selectTableColumn, selectTableRow } from "@prosekit/extensions/table";
import { TableMap, cellAround } from "prosemirror-tables";
function noop() {}
function returnTrue() {
	return true;
}
function returnFalse() {
	return false;
}
var DndStore = class {
	constructor() {
		this.dragging = createSignal(false);
		this.direction = createSignal("row");
		this.draggingIndex = createSignal(-1);
		this.droppingIndex = createSignal(-1);
		this.x = createSignal(-1);
		this.y = createSignal(-1);
		this.startX = createSignal(-1);
		this.startY = createSignal(-1);
	}
};
/**
* @internal
*/
function createTableHandleStore(getHoveringCellInfo, getCanShow) {
	const isColumnMenuOpen = createSignal(false);
	const isRowMenuOpen = createSignal(false);
	const getHasMenuOpen = () => {
		return isColumnMenuOpen.get() || isRowMenuOpen.get();
	};
	const setIsRowMenuOpen = (open) => {
		isRowMenuOpen.set(open);
	};
	const setIsColumnMenuOpen = (open) => {
		isColumnMenuOpen.set(open);
	};
	let prevHoveringCellInfo;
	const getReferenceCell = computed(() => {
		if (getHasMenuOpen()) return prevHoveringCellInfo;
		if (!getCanShow()) return;
		prevHoveringCellInfo = getHoveringCellInfo();
		return prevHoveringCellInfo;
	});
	const getOpen = computed(() => {
		return !!getReferenceCell();
	});
	const handleOpenChange = (event) => {
		if (getHasMenuOpen()) event.preventDefault();
	};
	const columnOverlayStore = createOverlayStore(getOpen, noop, returnTrue, returnFalse, handleOpenChange);
	const rowOverlayStore = createOverlayStore(getOpen, noop, returnTrue, returnFalse, handleOpenChange);
	return {
		dndStore: new DndStore(),
		setIsRowMenuOpen,
		setIsColumnMenuOpen,
		columnOverlayStore,
		rowOverlayStore,
		getReferenceCell
	};
}
/**
* @internal
*/
const tableHandleStoreContext = createContext("prosekit-table-handle-store");
/** @internal */
const TableHandleColumnPopupPropsDeclaration = defineProps({});
/** @internal */
function setupTableHandleColumnPopup(host, _props) {
	const getStore = tableHandleStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.columnOverlayStore;
	setupOverlayPopup(host, getOverlayStore);
}
const TableHandleColumnPopupElementBase = defineCustomElement(setupTableHandleColumnPopup, TableHandleColumnPopupPropsDeclaration);
/**
* `<prosekit-table-handle-column-popup>` custom element.
*
* Properties: {@link TableHandleColumnPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when visible, `"closed"` otherwise |
*/
var TableHandleColumnPopupElement = class extends TableHandleColumnPopupElementBase {};
/** @internal */
function registerTableHandleColumnPopupElement() {
	registerCustomElement("prosekit-table-handle-column-popup", TableHandleColumnPopupElement);
}
function useHTMLElementAt(getEditor, getPos) {
	return computed(() => {
		const editor = getEditor();
		const pos = getPos();
		if (!editor || !pos) return;
		const element = editor.view.nodeDOM(pos);
		if (element && isHTMLElement(element)) return element;
	});
}
/** @internal */
const SharedTableHandlePositionerPropsDeclaration = defineProps({
	...OverlayPositionerPropsDeclaration,
	editor: {
		default: null,
		attribute: false
	},
	hoist: {
		default: false,
		attribute: false
	},
	flip: {
		default: false,
		attribute: false
	},
	shift: {
		default: false,
		attribute: false
	},
	hide: {
		default: true,
		attribute: false
	},
	offset: {
		default: 0,
		attribute: false
	}
});
/** @internal */
const TableHandleColumnPositionerPropsDeclaration = defineProps({
	...SharedTableHandlePositionerPropsDeclaration,
	placement: {
		default: "top",
		attribute: "placement",
		type: "string"
	}
});
/** @internal */
function setupTableHandleColumnPositioner(host, props) {
	const getStore = tableHandleStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.columnOverlayStore;
	setupOverlayPositioner(host, props, getOverlayStore);
	const getEditor = props.editor.get;
	const getReferenceCell = useHTMLElementAt(getEditor, computed(() => getStore()?.getReferenceCell()?.colFirstCellPos));
	useEffect(host, () => {
		getOverlayStore()?.setAnchorElement(getReferenceCell());
	});
}
const TableHandleColumnPositionerElementBase = defineCustomElement(setupTableHandleColumnPositioner, TableHandleColumnPositionerPropsDeclaration);
/**
* `<prosekit-table-handle-column-positioner>` custom element.
*
* Properties: {@link TableHandleColumnPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var TableHandleColumnPositionerElement = class extends TableHandleColumnPositionerElementBase {};
/** @internal */
function registerTableHandleColumnPositionerElement() {
	registerCustomElement("prosekit-table-handle-column-positioner", TableHandleColumnPositionerElement);
}
/** @internal */
const TableHandleColumnMenuRootPropsDeclaration = defineProps(MenuRootPropsDeclaration);
/** @internal */
function setupTableHandleColumnMenuRoot(host, props) {
	setupMenuRoot(host, props);
	const getStore = tableHandleStoreContext.consume(host);
	useEffect(host, () => {
		const open = props.open.get() || false;
		const store = getStore?.();
		if (!store) return;
		store.setIsColumnMenuOpen(open);
	});
}
const TableHandleColumnMenuRootElementBase = defineCustomElement(setupTableHandleColumnMenuRoot, TableHandleColumnMenuRootPropsDeclaration);
/**
* `<prosekit-table-handle-column-menu-root>` custom element.
*
* Properties: {@link TableHandleColumnMenuRootProps}
*/
var TableHandleColumnMenuRootElement = class extends TableHandleColumnMenuRootElementBase {};
/** @internal */
function registerTableHandleColumnMenuRootElement() {
	registerCustomElement("prosekit-table-handle-column-menu-root", TableHandleColumnMenuRootElement);
}
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
/** @internal */
const TableHandleColumnMenuTriggerPropsDeclaration = defineProps({ editor: {
	default: null,
	attribute: false
} });
/** @internal */
function setupTableHandleColumnMenuTrigger(host, props) {
	const getEditor = props.editor.get;
	const getStore = tableHandleStoreContext.consume(host);
	setupMenuTrigger(host, { disabled: createSignal(false) });
	useEventListener(host, "pointerdown", () => {
		const editor = getEditor();
		const cellPos = getStore()?.getReferenceCell()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableColumn({ head: cellPos }));
	});
	onMount(host, () => {
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
		const store = getStore();
		if (!store) return;
		const index = store.getReferenceCell()?.colIndex;
		if (index == null || index < 0) {
			console.warn("[prosekit] Invalid column index for drag operation:", index);
			event.preventDefault();
			return;
		}
		const dndStore = store.dndStore;
		dndStore.direction.set("col");
		dndStore.dragging.set(true);
		dndStore.draggingIndex.set(index);
		dndStore.startX.set(event.clientX);
		dndStore.startY.set(event.clientY);
	});
}
const TableHandleColumnMenuTriggerElementBase = defineCustomElement(setupTableHandleColumnMenuTrigger, TableHandleColumnMenuTriggerPropsDeclaration);
/**
* `<prosekit-table-handle-column-menu-trigger>` custom element.
*
* Properties: {@link TableHandleColumnMenuTriggerProps}
*/
var TableHandleColumnMenuTriggerElement = class extends TableHandleColumnMenuTriggerElementBase {};
/**
* @internal
*/
function registerTableHandleColumnMenuTriggerElement() {
	registerCustomElement("prosekit-table-handle-column-menu-trigger", TableHandleColumnMenuTriggerElement);
}
function useInitDndPosition(host, getEditor, onInit) {
	const getStore = tableHandleStoreContext.consume(host);
	useEffect(host, () => {
		const view = getSafeEditorView(getEditor());
		if (!view) return;
		const store = getStore();
		if (!store) return;
		const dndStore = store.dndStore;
		const dragging = dndStore.dragging.get();
		const direction = dndStore.direction.get();
		host.dataset.direction = direction;
		host.dataset.dragging = dragging.toString();
		const draggingIndex = dndStore.draggingIndex.get();
		const relatedDOMs = getDndRelatedDOMs(view, store.getReferenceCell()?.cellPos, draggingIndex, direction);
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
	if (direction === "row") return table.querySelectorAll("tr")[index]?.querySelector("td, th") ?? void 0;
	else return table.querySelector("tr")?.querySelectorAll("td, th")[index] ?? void 0;
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
/**
* Creates a deep clone of an Element, including all computed styles so that
* it looks almost exactly the same as the original element.
*/
function deepCloneElement(element, important = false) {
	const clonedElement = element.cloneNode(true);
	return [clonedElement, deepCopyStyles(element, clonedElement, important)];
}
/**
* Creates a clone of an Element, including all computed styles so that
* it looks similar enough to the original element.
*/
function cloneElement(element, important = false) {
	const clonedElement = element.cloneNode();
	return [clonedElement, copyStyles(element, clonedElement, important)];
}
function deepCopyStyles(source, target, important) {
	const sources = [source];
	const targets = [target];
	const styles = [];
	while (sources.length > 0 && sources.length === targets.length) {
		const source = sources.pop();
		const target = targets.pop();
		if (!source || !target) break;
		const style = copyStyles(source, target, important);
		if (style) styles.push(style);
		sources.push(...source.children);
		targets.push(...target.children);
	}
	return styles.join("\n");
}
function copyStyles(source, target, important) {
	if (!source || !target) return "";
	const view = source.ownerDocument?.defaultView;
	if (!view) return "";
	const sourceStyle = view.getComputedStyle(source);
	const targetStyle = target.style;
	if (!sourceStyle || !targetStyle) return "";
	for (const key of sourceStyle) targetStyle.setProperty(key, sourceStyle.getPropertyValue(key), important ? "important" : sourceStyle.getPropertyPriority(key) || "");
	const styles = [];
	for (const pseudoSelector of [":before", ":after"]) {
		const sourcePseudoStyle = view.getComputedStyle(source, pseudoSelector);
		const targetPseudoStyle = view.getComputedStyle(target, pseudoSelector);
		if (!sourcePseudoStyle) continue;
		const content = sourcePseudoStyle.getPropertyValue("content");
		if (!(content && content !== "none" && content !== "normal")) continue;
		const cssProps = [];
		for (const property of sourcePseudoStyle) {
			const sourceValue = sourcePseudoStyle.getPropertyValue(property);
			const sourcePriority = sourcePseudoStyle.getPropertyPriority(property);
			const targetValue = targetPseudoStyle.getPropertyValue(property);
			const targetPriority = targetPseudoStyle.getPropertyPriority(property);
			if (sourceValue !== targetValue || sourcePriority !== targetPriority) cssProps.push(`${property}: ${sourceValue}${sourcePriority ? " !important" : ""};`);
		}
		const uniqueClassName = `clone-pseudo-element-${getId()}`;
		target.classList.add(uniqueClassName);
		styles.push(`.${uniqueClassName}${pseudoSelector} { ${cssProps.join(" ")} }`);
	}
	return styles.join("\n");
}
const isColorMixSupported = once(() => {
	try {
		return CSS.supports("background-color", "color-mix(in srgb, red, blue)");
	} catch {
		return false;
	}
});
/**
* Convert a color to a color with opacity
* @param color - The color to convert
* @param opacity - The opacity to apply
* @returns The converted color if color-mix is supported, otherwise undefined
*/
function fadeColor(color, opacity) {
	if (isColorMixSupported()) {
		const transparentWeight = (1 - opacity) * 100;
		return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent ${transparentWeight}%)`;
	}
}
function getEffectiveBackgroundColor(element) {
	let current = element;
	while (current) {
		const backgroundColor = (current.ownerDocument.defaultView?.getComputedStyle(current))?.backgroundColor;
		if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") return backgroundColor;
		current = current.parentElement;
	}
}
function injectStyle(container, styleText) {
	if (!styleText) return;
	const style = getDocument(container).createElement("style");
	style.textContent = styleText;
	container.appendChild(style);
}
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
		const cell = row.querySelectorAll("td, th")[index];
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
/** @internal */
const TableHandleDragPreviewPropsDeclaration = defineProps({ editor: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupTableHandleDragPreview(host, props) {
	const getEditor = props.editor.get;
	useEffect(host, () => {
		assignStyles(host, {
			position: "absolute",
			pointerEvents: "none"
		});
	});
	useInitDndPosition(host, getEditor, onInitPreviewPosition);
	useUpdatePreviewPosition(host, getEditor);
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
function useUpdatePreviewPosition(host, getEditor) {
	const getStore = tableHandleStoreContext.consume(host);
	useEffect(host, () => {
		const view = getSafeEditorView(getEditor());
		if (!view) return;
		const store = getStore();
		if (!store) return;
		const dndStore = store.dndStore;
		if (!dndStore.dragging.get()) return;
		const draggingIndex = dndStore.draggingIndex.get();
		const direction = dndStore.direction.get();
		const x = dndStore.x.get();
		const y = dndStore.y.get();
		const relatedDOMs = getDndRelatedDOMs(view, store.getReferenceCell()?.cellPos, draggingIndex, direction);
		if (!relatedDOMs) return;
		const { cell } = relatedDOMs;
		let cancelled = false;
		computePosition(getVirtualElement(cell, x, y), host, { placement: direction === "row" ? "right" : "bottom" }).then(({ x, y }) => {
			if (cancelled) return;
			if (direction === "row") {
				assignStyles(host, { top: `${y}px` });
				return;
			}
			if (direction === "col") {
				assignStyles(host, { left: `${x}px` });
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
const TableHandleDragPreviewElementBase = defineCustomElement(setupTableHandleDragPreview, TableHandleDragPreviewPropsDeclaration);
/**
* `<prosekit-table-handle-drag-preview>` custom element.
*
* Properties: {@link TableHandleDragPreviewProps}
*/
var TableHandleDragPreviewElement = class extends TableHandleDragPreviewElementBase {};
/**
* @internal
*/
function registerTableHandleDragPreviewElement() {
	registerCustomElement("prosekit-table-handle-drag-preview", TableHandleDragPreviewElement);
}
function findDragOverElement(elements, pointer, axis) {
	const startProp = axis === "x" ? "left" : "top";
	const endProp = axis === "x" ? "right" : "bottom";
	const lastIndex = elements.length - 1;
	const index = elements.findIndex((el, index) => {
		const rect = el.getBoundingClientRect();
		const boundaryStart = rect[startProp];
		const boundaryEnd = rect[endProp];
		if (boundaryStart <= pointer && pointer <= boundaryEnd) return true;
		if (index === lastIndex && pointer > boundaryEnd) return true;
		if (index === 0 && pointer < boundaryStart) return true;
		return false;
	});
	return index >= 0 ? [elements[index], index] : void 0;
}
function getDragOverColumn(table, pointerX) {
	const firstRow = table.querySelector("tr");
	if (!firstRow) return;
	return findDragOverElement(Array.from(firstRow.children), pointerX, "x");
}
function getDragOverRow(table, pointerY) {
	return findDragOverElement(Array.from(table.querySelectorAll("tr")), pointerY, "y");
}
const HANDLE_WIDTH = 2;
/** @internal */
const TableHandleDropIndicatorPropsDeclaration = defineProps({ editor: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupTableHandleDropIndicator(host, props) {
	const getEditor = props.editor.get;
	useEffect(host, () => {
		assignStyles(host, {
			pointerEvents: "none",
			position: "absolute"
		});
	});
	useInitDndPosition(host, getEditor, onInitIndicatorPosition);
	useUpdateIndicatorPosition(host, getEditor, HANDLE_WIDTH);
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
function useUpdateIndicatorPosition(host, getEditor, handleWidth) {
	const getStore = tableHandleStoreContext.consume(host);
	useEffect(host, () => {
		const view = getSafeEditorView(getEditor());
		if (!view) return;
		const store = getStore();
		if (!store) return;
		const dndStore = store.dndStore;
		if (!dndStore.dragging.get()) return;
		const draggingIndex = dndStore.draggingIndex.get();
		const direction = dndStore.direction.get();
		const x = dndStore.x.get();
		const y = dndStore.y.get();
		const relatedDOMs = getDndRelatedDOMs(view, store.getReferenceCell()?.cellPos, draggingIndex, direction);
		if (!relatedDOMs) return;
		const { table } = relatedDOMs;
		let cancelled = false;
		const cleanup = () => {
			cancelled = true;
		};
		if (direction === "col") {
			const dir = dndStore.startX.get() > x ? "left" : "right";
			const dragOverColumn = getDragOverColumn(table, x);
			if (dragOverColumn) {
				const [col, index] = dragOverColumn;
				dndStore.droppingIndex.set(index);
				computePosition(col, host, {
					placement: dir === "left" ? "left" : "right",
					middleware: [offset(dir === "left" ? -1 * handleWidth : 0)]
				}).then(({ x }) => {
					if (cancelled) return;
					assignStyles(host, { left: `${x}px` });
				});
			}
			return cleanup;
		}
		if (direction === "row") {
			const dir = dndStore.startY.get() > y ? "up" : "down";
			const dragOverRow = getDragOverRow(table, y);
			if (dragOverRow) {
				const [row, index] = dragOverRow;
				dndStore.droppingIndex.set(index);
				computePosition(row, host, {
					placement: dir === "up" ? "top" : "bottom",
					middleware: [offset(dir === "up" ? -1 * handleWidth : 0)]
				}).then(({ y }) => {
					if (cancelled) return;
					assignStyles(host, { top: `${y}px` });
				});
			}
			return cleanup;
		}
	});
}
const TableHandleDropIndicatorElementBase = defineCustomElement(setupTableHandleDropIndicator, TableHandleDropIndicatorPropsDeclaration);
/**
* `<prosekit-table-handle-drop-indicator>` custom element.
*
* Properties: {@link TableHandleDropIndicatorProps}
*/
var TableHandleDropIndicatorElement = class extends TableHandleDropIndicatorElementBase {};
/**
* @internal
*/
function registerTableHandleDropIndicatorElement() {
	registerCustomElement("prosekit-table-handle-drop-indicator", TableHandleDropIndicatorElement);
}
function useEditorTyping(host, getEditor) {
	const typing = createSignal(false);
	useEditorExtension(host, getEditor, union(defineDOMEventHandler("keypress", () => {
		typing.set(true);
	}), defineDOMEventHandler("pointermove", () => {
		typing.set(false);
	})));
	return typing.get;
}
/**
* Detect if the user is selecting text inside the editor, in which case some
* components should be disabled or hidden.
*/
function useSelecting(host, getEditor, getEnabled) {
	const selecting = createSignal(false);
	const isPointerDown = createSignal(false);
	useEffect(host, () => {
		if (!getEnabled()) return;
		const view = getSafeEditorView(getEditor());
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
	return selecting.get;
}
function useDrop(host, getEditor, store) {
	const getDndStore = () => store.dndStore;
	const getDragging = computed(() => getDndStore().dragging.get());
	useEffect(host, () => {
		const view = getSafeEditorView(getEditor());
		if (!view || !view.editable) return;
		const ownerDocument = view.dom?.ownerDocument;
		if (!ownerDocument) return;
		const handleDrop = () => {
			if (!getDragging()) return;
			const editor = getEditor();
			if (!editor) return;
			const dndStore = getDndStore();
			const droppingIndex = dndStore.droppingIndex.get();
			const draggingIndex = dndStore.draggingIndex.get();
			const direction = dndStore.direction.get();
			if (draggingIndex < 0 || droppingIndex < 0) {
				console.warn("[prosekit] Invalid drag indices:", {
					draggingIndex,
					droppingIndex
				});
				return;
			}
			if (direction === "row") {
				editor.exec(moveTableRow({
					from: draggingIndex,
					to: droppingIndex
				}));
				return;
			}
			if (direction === "col") {
				editor.exec(moveTableColumn({
					from: draggingIndex,
					to: droppingIndex
				}));
				return;
			}
		};
		const handleDragOver = (event) => {
			if (!getDragging()) return;
			event.preventDefault();
			const dndStore = getDndStore();
			dndStore.dragging.set(true);
			dndStore.x.set(event.clientX);
			dndStore.y.set(event.clientY);
		};
		const handleDragEnd = () => {
			if (!getDragging()) return;
			getDndStore().dragging.set(false);
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
	return tableStart + map.map[cellIndex];
}
function getCellIndex(map, rowIndex, colIndex) {
	return map.width * rowIndex + colIndex;
}
/** @internal */
const TableHandleRootPropsDeclaration = defineProps({ editor: {
	default: null,
	attribute: false
} });
/**
* @internal
*/
function setupTableHandleRoot(host, props) {
	const getEditor = props.editor.get;
	const getHoveringCellInfo = useHoveringCell(host, getEditor);
	const getTyping = useEditorTyping(host, getEditor);
	const getSelecting = useSelecting(host, getEditor, computed(() => !!getHoveringCellInfo()));
	const getScrolling = useScrolling(host);
	const store = createTableHandleStore(getHoveringCellInfo, computed(() => !getTyping() && !getSelecting() && !getScrolling()));
	tableHandleStoreContext.provide(host, store);
	useDrop(host, getEditor, store);
}
function useHoveringCell(host, getEditor) {
	const hoveringCell = createSignal(void 0);
	useEditorExtension(host, getEditor, defineCellHoverHandler((curr) => {
		if (isHoveringCellInfoEqual(hoveringCell.get(), curr)) return;
		hoveringCell.set(curr);
	}));
	return hoveringCell.get;
}
function defineCellHoverHandler(handler) {
	const pointerHandler = (view, event) => {
		return handler(getHoveringCell(view, event));
	};
	return defineDOMEventHandler("pointerover", pointerHandler);
}
const TableHandleRootElementBase = defineCustomElement(setupTableHandleRoot, TableHandleRootPropsDeclaration);
/**
* `<prosekit-table-handle-root>` custom element.
*
* Properties: {@link TableHandleRootProps}
*/
var TableHandleRootElement = class extends TableHandleRootElementBase {};
/**
* @internal
*/
function registerTableHandleRootElement() {
	registerCustomElement("prosekit-table-handle-root", TableHandleRootElement);
}
/** @internal */
const TableHandleRowPopupPropsDeclaration = defineProps({});
/** @internal */
function setupTableHandleRowPopup(host, _props) {
	const getStore = tableHandleStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.rowOverlayStore;
	setupOverlayPopup(host, getOverlayStore);
}
const TableHandleRowPopupElementBase = defineCustomElement(setupTableHandleRowPopup, TableHandleRowPopupPropsDeclaration);
/**
* `<prosekit-table-handle-row-popup>` custom element.
*
* Properties: {@link TableHandleRowPopupProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when visible, `"closed"` otherwise |
*/
var TableHandleRowPopupElement = class extends TableHandleRowPopupElementBase {};
/** @internal */
function registerTableHandleRowPopupElement() {
	registerCustomElement("prosekit-table-handle-row-popup", TableHandleRowPopupElement);
}
/** @internal */
const TableHandleRowPositionerPropsDeclaration = defineProps({
	...SharedTableHandlePositionerPropsDeclaration,
	placement: {
		default: "left",
		attribute: "placement",
		type: "string"
	}
});
/** @internal */
function setupTableHandleRowPositioner(host, props) {
	const getStore = tableHandleStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.rowOverlayStore;
	setupOverlayPositioner(host, props, getOverlayStore);
	const getEditor = props.editor.get;
	const getReferenceCell = useHTMLElementAt(getEditor, computed(() => getStore()?.getReferenceCell()?.rowFirstCellPos));
	useEffect(host, () => {
		getOverlayStore()?.setAnchorElement(getReferenceCell());
	});
}
const TableHandleRowPositionerElementBase = defineCustomElement(setupTableHandleRowPositioner, TableHandleRowPositionerPropsDeclaration);
/**
* `<prosekit-table-handle-row-positioner>` custom element.
*
* Properties: {@link TableHandleRowPositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var TableHandleRowPositionerElement = class extends TableHandleRowPositionerElementBase {};
/** @internal */
function registerTableHandleRowPositionerElement() {
	registerCustomElement("prosekit-table-handle-row-positioner", TableHandleRowPositionerElement);
}
/** @internal */
const TableHandleRowMenuRootPropsDeclaration = defineProps(MenuRootPropsDeclaration);
/** @internal */
function setupTableHandleRowMenuRoot(host, props) {
	setupMenuRoot(host, props);
	const getStore = tableHandleStoreContext.consume(host);
	useEffect(host, () => {
		const open = props.open.get() || false;
		const store = getStore?.();
		if (!store) return;
		store.setIsRowMenuOpen(open);
	});
}
const TableHandleRowMenuRootElementBase = defineCustomElement(setupTableHandleRowMenuRoot, TableHandleRowMenuRootPropsDeclaration);
/**
* `<prosekit-table-handle-row-menu-root>` custom element.
*
* Properties: {@link TableHandleRowMenuRootProps}
*/
var TableHandleRowMenuRootElement = class extends TableHandleRowMenuRootElementBase {};
/** @internal */
function registerTableHandleRowMenuRootElement() {
	registerCustomElement("prosekit-table-handle-row-menu-root", TableHandleRowMenuRootElement);
}
/** @internal */
const TableHandleRowMenuTriggerPropsDeclaration = defineProps({ editor: {
	default: null,
	attribute: false
} });
/** @internal */
function setupTableHandleRowMenuTrigger(host, props) {
	const getEditor = props.editor.get;
	const getStore = tableHandleStoreContext.consume(host);
	setupMenuTrigger(host, { disabled: createSignal(false) });
	useEventListener(host, "pointerdown", () => {
		const editor = getEditor();
		const cellPos = getStore()?.getReferenceCell()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableRow({ head: cellPos }));
	});
	onMount(host, () => {
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
		const store = getStore();
		if (!store) return;
		const index = store.getReferenceCell()?.rowIndex;
		if (index == null || index < 0) {
			console.warn("[prosekit] Invalid row index for drag operation:", index);
			event.preventDefault();
			return;
		}
		const dndStore = store.dndStore;
		dndStore.direction.set("row");
		dndStore.dragging.set(true);
		dndStore.draggingIndex.set(index);
		dndStore.startX.set(event.clientX);
		dndStore.startY.set(event.clientY);
	});
}
const TableHandleRowMenuTriggerElementBase = defineCustomElement(setupTableHandleRowMenuTrigger, TableHandleRowMenuTriggerPropsDeclaration);
/**
* `<prosekit-table-handle-row-menu-trigger>` custom element.
*
* Properties: {@link TableHandleRowMenuTriggerProps}
*/
var TableHandleRowMenuTriggerElement = class extends TableHandleRowMenuTriggerElementBase {};
/**
* @internal
*/
function registerTableHandleRowMenuTriggerElement() {
	registerCustomElement("prosekit-table-handle-row-menu-trigger", TableHandleRowMenuTriggerElement);
}
export { TableHandleColumnMenuRootElement, TableHandleColumnMenuRootPropsDeclaration, TableHandleColumnMenuTriggerElement, TableHandleColumnMenuTriggerPropsDeclaration, TableHandleColumnPopupElement, TableHandleColumnPopupPropsDeclaration, TableHandleColumnPositionerElement, TableHandleColumnPositionerPropsDeclaration, TableHandleDragPreviewElement, TableHandleDragPreviewPropsDeclaration, TableHandleDropIndicatorElement, TableHandleDropIndicatorPropsDeclaration, TableHandleRootElement, TableHandleRootPropsDeclaration, TableHandleRowMenuRootElement, TableHandleRowMenuRootPropsDeclaration, TableHandleRowMenuTriggerElement, TableHandleRowMenuTriggerPropsDeclaration, TableHandleRowPopupElement, TableHandleRowPopupPropsDeclaration, TableHandleRowPositionerElement, TableHandleRowPositionerPropsDeclaration, registerTableHandleColumnMenuRootElement, registerTableHandleColumnMenuTriggerElement, registerTableHandleColumnPopupElement, registerTableHandleColumnPositionerElement, registerTableHandleDragPreviewElement, registerTableHandleDropIndicatorElement, registerTableHandleRootElement, registerTableHandleRowMenuRootElement, registerTableHandleRowMenuTriggerElement, registerTableHandleRowPopupElement, registerTableHandleRowPositionerElement, setupTableHandleColumnMenuRoot, setupTableHandleColumnMenuTrigger, setupTableHandleColumnPopup, setupTableHandleColumnPositioner, setupTableHandleDragPreview, setupTableHandleDropIndicator, setupTableHandleRoot, setupTableHandleRowMenuRoot, setupTableHandleRowMenuTrigger, setupTableHandleRowPopup, setupTableHandleRowPositioner };

//# sourceMappingURL=table-handle.js.map