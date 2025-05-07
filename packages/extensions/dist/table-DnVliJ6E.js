import { defaultBlockAt, defineCommands, defineNodeSpec, definePlugin, findParentNode, getNodeType, insertNode, union } from "@prosekit/core";
import { TextSelection } from "@prosekit/pm/state";
import { CellSelection, TableMap, addColumnAfter, addColumnBefore, addRowAfter, addRowBefore, cellAround, cellNear, columnResizing, deleteCellSelection, deleteColumn, deleteRow, deleteTable, inSameTable, mergeCells, splitCell, tableEditing, tableNodes } from "prosemirror-tables";

//#region src/table/table-utils.ts
/**
* Checks if the given object is a `CellSelection` instance.
*
* @public
*/
function isCellSelection(value) {
	return value instanceof CellSelection;
}
/**
* Find the closest table node.
*
* @internal
*/
function findTable($pos) {
	return findParentNode((node) => node.type.spec.tableRole === "table", $pos);
}
/**
* Try to find the anchor and head cell in the same table by using the given
* anchor and head as hit points, or fallback to the selection's anchor and
* head.
*
* @internal
*/
function findCellRange(selection, anchorHit, headHit) {
	if (anchorHit == null && headHit == null && isCellSelection(selection)) return [selection.$anchorCell, selection.$headCell];
	const anchor = anchorHit ?? headHit ?? selection.anchor;
	const head = headHit ?? anchorHit ?? selection.head;
	const doc = selection.$head.doc;
	const $anchorCell = findCellPos(doc, anchor);
	const $headCell = findCellPos(doc, head);
	if ($anchorCell && $headCell && inSameTable($anchorCell, $headCell)) return [$anchorCell, $headCell];
}
/**
* Try to find a resolved pos of a cell by using the given pos as a hit point.
*
* @internal
*/
function findCellPos(doc, pos) {
	const $pos = doc.resolve(pos);
	return cellAround($pos) || cellNear($pos);
}

//#endregion
//#region src/table/table-commands.ts
function createEmptyTable(schema, row, col, header) {
	const tableType = getNodeType(schema, "table");
	const tableRowType = getNodeType(schema, "tableRow");
	const tableCellType = getNodeType(schema, "tableCell");
	const tableHeaderCellType = getNodeType(schema, "tableHeaderCell");
	if (header) {
		const headerCell = tableHeaderCellType.createAndFill();
		const headerCells = repeat(headerCell, col);
		const headerRow = tableRowType.createAndFill(null, headerCells);
		const bodyCell = tableCellType.createAndFill();
		const bodyCells = repeat(bodyCell, col);
		const bodyRow = tableRowType.createAndFill(null, bodyCells);
		const bodyRows = repeat(bodyRow, row - 1);
		return tableType.createAndFill(null, [headerRow, ...bodyRows]);
	} else {
		const bodyCell = tableCellType.createAndFill();
		const bodyCells = repeat(bodyCell, col);
		const bodyRow = tableRowType.createAndFill(null, bodyCells);
		const bodyRows = repeat(bodyRow, row);
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
		const table = createEmptyTable(state.schema, row, col, header);
		return insertNode({ node: table })(state, dispatch, view);
	};
}
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
	for (let depth = $head.depth; depth >= 0; depth--) {
		const node$1 = $head.node(depth);
		if (node$1.type.spec.tableRole === "table") {
			tableStart = $head.before(depth);
			tableDepth = depth;
		}
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
/**
* @public
*/
function selectTable(options) {
	return (state, dispatch) => {
		const $pos = options?.pos ? state.doc.resolve(options.pos) : state.selection.$anchor;
		const table = findTable($pos);
		if (!table) return false;
		const map = TableMap.get(table.node);
		if (map.map.length === 0) return false;
		if (dispatch) {
			let tr = state.tr;
			const firstCellPosInTable = map.map[0];
			const lastCellPosInTable = map.map[map.map.length - 1];
			const firstCellPos = table.pos + firstCellPosInTable + 1;
			const lastCellPos = table.pos + lastCellPosInTable + 1;
			const $firstCellPos = tr.doc.resolve(firstCellPos);
			const $lastCellPos = tr.doc.resolve(lastCellPos);
			const selection = new CellSelection($firstCellPos, $lastCellPos);
			tr = tr.setSelection(selection);
			dispatch?.(tr);
		}
		return true;
	};
}
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
		splitTableCell: () => splitCell
	});
}

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
	return union(defineTableSpec(), defineTableRowSpec(), defineTableCellSpec(), defineTableHeaderCellSpec(), defineTablePlugins(), defineTableCommands());
}

//#endregion
export { defineTable, defineTableCellSpec, defineTableCommands, defineTableHeaderCellSpec, defineTablePlugins, defineTableRowSpec, defineTableSpec, exitTable, findTable, insertTable, isCellSelection, selectTable, selectTableCell, selectTableColumn, selectTableRow };