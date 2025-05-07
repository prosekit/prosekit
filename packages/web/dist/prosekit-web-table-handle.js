import { getStateWithDefaults } from "./get-default-state-CIEy7xrl.js";
import { useEditorExtension } from "./use-editor-extension-Cc7ZG7uj.js";
import { createComputed, createContext, createSignal, defineCustomElement, defineEmit, registerCustomElement, useAttribute, useEffect, useEventListener } from "@aria-ui/core";
import { defineDOMEventHandler, union } from "@prosekit/core";
import { useOverlayPositionerState } from "@aria-ui/overlay/elements";
import { usePresence } from "@aria-ui/presence";
import { overlayPositionerEvents as overlayPositionerEvents$1, overlayPositionerProps as overlayPositionerProps$1 } from "@aria-ui/overlay";
import { menuContentEvents, menuContentProps, menuRootEvents, menuRootProps, useMenuContent, useMenuItem, useMenuRoot, useMenuTrigger } from "@aria-ui/menu/elements";
import { selectTableColumn, selectTableRow } from "@prosekit/extensions/table";
import { menuItemEvents, menuItemProps } from "@aria-ui/menu";
import { TableMap, cellAround } from "prosemirror-tables";

//#region src/components/table-handle/context.ts
/**
* @internal
*/
const tableHandleRootContext = createContext("prosekit-table-handle-root-context", null);

//#endregion
//#region src/components/table-handle/table-handle-column-root/setup.ts
function useTableHandleColumnRoot(host, { state }) {
	const { editor,...overlayState } = state;
	const rootContext = tableHandleRootContext.consume(host);
	const colFirstCellPos = createComputed(() => {
		return rootContext.get()?.colFirstCellPos;
	});
	const referenceCell = createComputed(() => {
		const pos = colFirstCellPos.get();
		const view = editor.get()?.view;
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
	placement: { default: "top" }
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
//#region src/components/table-handle/table-handle-column-trigger/setup.ts
function useTableHandleColumnTrigger(host, { state }) {
	useMenuTrigger(host);
	const context = tableHandleRootContext.consume(host);
	useEventListener(host, "pointerdown", () => {
		const editor = state.editor.peek();
		const cellPos = context.peek()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableColumn({ head: cellPos }));
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
//#region src/components/table-handle/table-handle-popover-content/setup.ts
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
function useTableHandleRoot(host, { state }) {
	const { editor } = state;
	const context = createSignal(null);
	const hoveringCell = useHoveringCell(host, editor);
	const typing = useEditorTyping(host, editor);
	const isInTable = createComputed(() => !!hoveringCell.get());
	const selecting = useSelecting(host, editor, isInTable);
	useEffect(host, () => {
		const typingValue = typing.get();
		const selectingValue = selecting.get();
		const hoveringCellValue = hoveringCell.get();
		context.set(typingValue || selectingValue ? null : hoveringCellValue);
	});
	tableHandleRootContext.provide(host, context);
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
/**
* Detect if the user is selecting text by dragging.
*/
function useSelecting(host, editor, isInTable) {
	const selecting = createSignal(false);
	useEffect(host, () => {
		if (!isInTable.get()) return;
		const root = editor.peek()?.view.root;
		if (!root) return;
		const pointerDownHandler = (event) => {
			const target = event.target;
			if (!target || host.contains(event.target)) return;
			selecting.set(true);
		};
		const pointerUpHandler = () => {
			selecting.set(false);
		};
		root.addEventListener("pointerdown", pointerDownHandler);
		root.addEventListener("pointerup", pointerUpHandler);
		return () => {
			root.removeEventListener("pointerdown", pointerDownHandler);
			root.removeEventListener("pointerup", pointerUpHandler);
		};
	});
	return selecting;
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
function useTableHandleRowRoot(host, { state }) {
	const { editor,...overlayState } = state;
	const rootContext = tableHandleRootContext.consume(host);
	const rowFirstCellPos = createComputed(() => {
		return rootContext.get()?.rowFirstCellPos;
	});
	const referenceCell = createComputed(() => {
		const pos = rowFirstCellPos.get();
		const view = editor.get()?.view;
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
	placement: { default: "left" }
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
function useTableHandleRowTrigger(host, { state }) {
	useMenuTrigger(host);
	const context = tableHandleRootContext.consume(host);
	useEventListener(host, "pointerdown", () => {
		const editor = state.editor.peek();
		const cellPos = context.peek()?.cellPos;
		if (!editor || !cellPos) return;
		editor.exec(selectTableRow({ head: cellPos }));
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
export { TableHandleColumnRootElement, TableHandleColumnTriggerElement, TableHandlePopoverContentElement, TableHandlePopoverItemElement, TableHandleRootElement, TableHandleRowRootElement, TableHandleRowTriggerElement, tableHandleColumnRootEvents, tableHandleColumnRootProps, tableHandleColumnTriggerEvents, tableHandleColumnTriggerProps, tableHandlePopoverContentEvents, tableHandlePopoverContentProps, tableHandlePopoverItemEvents, tableHandlePopoverItemProps, tableHandleRootEvents, tableHandleRootProps, tableHandleRowRootEvents, tableHandleRowRootProps, tableHandleRowTriggerEvents, tableHandleRowTriggerProps };