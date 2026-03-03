import { t as defineDropIndicator } from "./drop-indicator-DJq8pF92.js";
import { TextSelection } from "@prosekit/pm/state";
import { defaultBlockAt, defineCommands, defineNodeSpec, definePlugin, getNodeType, insertNode, union } from "@prosekit/core";
import { CellSelection, TableMap, addColumnAfter, addColumnBefore, addRowAfter, addRowBefore, columnResizing, deleteCellSelection, deleteColumn, deleteRow, deleteTable, findCellPos, findCellRange, findTable, mergeCells, moveTableColumn, moveTableRow, splitCell, tableEditing, tableNodes } from "prosemirror-tables";

//#region src/table/table-commands/exit-table.ts
/**
* When the selection is in a table node, create a default block after the table
* table, and move the cursor there.
*
* @public
*/
const exitTable = (state, dispatch) => {
	const { $head, $anchor } = state.selection;
	if (!$head.sameParent($anchor)) return false;
	let tableStart = -1;
	let tableDepth = -1;
	for (let depth = $head.depth; depth >= 0; depth--) if ($head.node(depth).type.spec.tableRole === "table") {
		tableStart = $head.before(depth);
		tableDepth = depth;
	}
	if (tableStart < 0 || tableDepth <= 0) return false;
	const above = $head.node(tableDepth - 1);
	const after = $head.indexAfter(tableDepth - 1);
	const type = defaultBlockAt(above.contentMatchAt(after));
	const node = type?.createAndFill();
	if (!type || !node || !above.canReplaceWith(after, after, type)) return false;
	if (dispatch) {
		const pos = $head.after(tableDepth);
		const tr = state.tr.replaceWith(pos, pos, node);
		tr.setSelection(TextSelection.near(tr.doc.resolve(pos), 1));
		dispatch(tr.scrollIntoView());
	}
	return true;
};

//#endregion
//#region src/table/table-commands/insert-table.ts
function createEmptyTable(schema, row, col, header) {
	const tableType = getNodeType(schema, "table");
	const tableRowType = getNodeType(schema, "tableRow");
	const tableCellType = getNodeType(schema, "tableCell");
	const tableHeaderCellType = getNodeType(schema, "tableHeaderCell");
	if (header) {
		const headerCells = repeat(tableHeaderCellType.createAndFill(), col);
		const headerRow = tableRowType.createAndFill(null, headerCells);
		const bodyCells = repeat(tableCellType.createAndFill(), col);
		const bodyRows = repeat(tableRowType.createAndFill(null, bodyCells), row - 1);
		return tableType.createAndFill(null, [headerRow, ...bodyRows]);
	} else {
		const bodyCells = repeat(tableCellType.createAndFill(), col);
		const bodyRows = repeat(tableRowType.createAndFill(null, bodyCells), row);
		return tableType.createAndFill(null, bodyRows);
	}
}
function repeat(node, length) {
	return Array(length).fill(node);
}
/**
* Insert a table node with the given number of rows and columns, and optionally
* a header row.
*
* @param options
*
* @public
*/
function insertTable(options) {
	return (state, dispatch, view) => {
		const { row, col, header = false } = options;
		return insertNode({ node: createEmptyTable(state.schema, row, col, header) })(state, dispatch, view);
	};
}

//#endregion
//#region src/table/table-utils.ts
/**
* Checks if the given object is a `CellSelection` instance.
*
* @public
*/
function isCellSelection(value) {
	return value instanceof CellSelection;
}

//#endregion
//#region src/table/table-commands/select-table-cell.ts
/**
* @public
*/
function selectTableCell(options) {
	return (state, dispatch) => {
		const $cellPos = findCellPos(state.doc, options?.pos ?? state.selection.anchor);
		if (!$cellPos) return false;
		if (dispatch) {
			const selection = new CellSelection($cellPos);
			dispatch(state.tr.setSelection(selection));
		}
		return true;
	};
}

//#endregion
//#region src/table/table-commands/select-table-column.ts
/**
* @public
*/
function selectTableColumn(options) {
	return (state, dispatch) => {
		const range = findCellRange(state.selection, options?.anchor, options?.head);
		if (!range) return false;
		if (dispatch) {
			const [$anchorCell, $headCell] = range;
			const selection = CellSelection.colSelection($anchorCell, $headCell);
			dispatch(state.tr.setSelection(selection));
		}
		return true;
	};
}

//#endregion
//#region src/table/table-commands/select-table-row.ts
/**
* @public
*/
function selectTableRow(options) {
	return (state, dispatch) => {
		const range = findCellRange(state.selection, options?.anchor, options?.head);
		if (!range) return false;
		if (dispatch) {
			const [$anchorCell, $headCell] = range;
			const selection = CellSelection.rowSelection($anchorCell, $headCell);
			dispatch(state.tr.setSelection(selection));
		}
		return true;
	};
}

//#endregion
//#region src/table/table-commands/select-table.ts
/**
* @public
*/
function selectTable(options) {
	return (state, dispatch) => {
		const table = findTable(options?.pos ? state.doc.resolve(options.pos) : state.selection.$anchor);
		if (!table) return false;
		const map = TableMap.get(table.node);
		if (map.map.length === 0) return false;
		if (dispatch) {
			let tr = state.tr;
			const firstCellPosInTable = map.map[0];
			const lastCellPosInTable = map.map[map.map.length - 1];
			const firstCellPos = table.pos + firstCellPosInTable + 1;
			const lastCellPos = table.pos + lastCellPosInTable + 1;
			const selection = new CellSelection(tr.doc.resolve(firstCellPos), tr.doc.resolve(lastCellPos));
			tr = tr.setSelection(selection);
			dispatch?.(tr);
		}
		return true;
	};
}

//#endregion
//#region src/table/table-commands.ts
/**
* Adds commands for working with `table` nodes.
*
* @public
*/
function defineTableCommands() {
	return defineCommands({
		insertTable,
		exitTable: () => exitTable,
		selectTable,
		selectTableCell,
		selectTableColumn,
		selectTableRow,
		addTableColumnBefore: () => addColumnBefore,
		addTableColumnAfter: () => addColumnAfter,
		addTableRowAbove: () => addRowBefore,
		addTableRowBelow: () => addRowAfter,
		deleteTable: () => deleteTable,
		deleteTableColumn: () => deleteColumn,
		deleteTableRow: () => deleteRow,
		deleteCellSelection: () => deleteCellSelection,
		mergeTableCells: () => mergeCells,
		splitTableCell: () => splitCell,
		moveTableRow,
		moveTableColumn
	});
}

//#endregion
//#region src/table/table-drop-indicator.ts
/**
* Hides the drop indicator when dragging a table column or row by using the
* table handle.
*
* @internal
*/
function defineTableDropIndicator() {
	return defineDropIndicator({ onDrag });
}
const matchMap = /* @__PURE__ */ new WeakMap();
const onDrag = ({ event }) => {
	const dataTransfer = event.dataTransfer;
	if (!dataTransfer) return true;
	let match;
	if (matchMap.has(dataTransfer)) match = matchMap.get(dataTransfer);
	else {
		match = dataTransfer.types.includes("application/x-prosekit-table-handle-drag");
		matchMap.set(dataTransfer, match);
	}
	return !match;
};

//#endregion
//#region src/table/table-plugins.ts
/**
* @public
*/
function defineTablePlugins() {
	return definePlugin([tableEditing(), columnResizing()]);
}

//#endregion
//#region src/table/table-spec.ts
const cellContent = "block+";
const cellAttrs = {
	colspan: { default: 1 },
	rowspan: { default: 1 },
	colwidth: { default: null }
};
const specs = tableNodes({
	tableGroup: "block",
	cellContent,
	cellAttributes: {}
});
/**
* @internal
*/
function defineTableSpec() {
	return defineNodeSpec({
		...specs["table"],
		content: "tableRow+",
		name: "table"
	});
}
/**
* @internal
*/
function defineTableRowSpec() {
	return defineNodeSpec({
		...specs["table_row"],
		content: "(tableCell | tableHeaderCell)*",
		name: "tableRow"
	});
}
/**
* @internal
*/
function defineTableCellSpec() {
	return defineNodeSpec({
		...specs["table_cell"],
		name: "tableCell",
		attrs: cellAttrs
	});
}
function defineTableHeaderCellSpec() {
	return defineNodeSpec({
		...specs["table_header"],
		name: "tableHeaderCell",
		attrs: cellAttrs
	});
}

//#endregion
//#region src/table/table.ts
/**
* @public
*/
function defineTable() {
	return union(defineTableSpec(), defineTableRowSpec(), defineTableCellSpec(), defineTableHeaderCellSpec(), defineTablePlugins(), defineTableCommands(), defineTableDropIndicator());
}

//#endregion
export { insertTable as _, defineTableSpec as a, defineTableCommands as c, selectTableColumn as d, selectTableCell as f, moveTableColumn as g, moveTableRow as h, defineTableRowSpec as i, selectTable as l, isCellSelection as m, defineTableCellSpec as n, defineTablePlugins as o, findTable as p, defineTableHeaderCellSpec as r, defineTableDropIndicator as s, defineTable as t, selectTableRow as u, exitTable as v };
//# sourceMappingURL=table-B81i9oH9.js.map