import { Extension, FindParentNodeResult, PlainExtension, Union } from "@prosekit/core";
import { Command, Selection } from "@prosekit/pm/state";
import { Attrs, ProseMirrorNode, ResolvedPos } from "@prosekit/pm/model";
import { CellSelection } from "prosemirror-tables";

//#region src/table/table-commands.d.ts
/**
* @public
*/
/**
* @public
*/
interface InsertTableOptions {
  /**
  * The number of rows in the table.
  */
  row: number;
  /**
  * The number of columns in the table.
  */
  col: number;
  /**
  * Whether the table has a header row.
  *
  * @default false
  */
  header?: boolean;
}
/**
* Insert a table node with the given number of rows and columns, and optionally
* a header row.
*
* @param options
*
* @public
*/
declare function insertTable(options: InsertTableOptions): Command;
/**
* When the selection is in a table node, create a default block after the table
* table, and move the cursor there.
*
* @public
*/
declare const exitTable: Command;
/**
* @public
*/
interface SelectTableColumnOptions {
  /**
  * A hit position of the table cell to select from. By default, the selection
  * anchor will be used.
  */
  anchor?: number;
  /**
  * A hit position of the table cell to select to. By default, the selection
  * head will be used.
  */
  head?: number;
}
/**
* @public
*/
declare function selectTableColumn(options?: SelectTableColumnOptions): Command;
/**
* @public
*/
interface SelectTableRowOptions {
  /**
  * A hit position of the table cell to select from. By default, the selection
  * anchor will be used.
  */
  anchor?: number;
  /**
  * A hit position of the table cell to select to. By default, the selection
  * head will be used.
  */
  head?: number;
}
/**
* @public
*/
declare function selectTableRow(options?: SelectTableRowOptions): Command;
/**
* @public
*/
interface SelectTableCellOptions {
  /**
  * A hit position of the table cell to select from. By default, the selection
  * anchor will be used.
  */
  pos?: number;
}
/**
* @public
*/
declare function selectTableCell(options?: SelectTableCellOptions): Command;
/**
* @public
*/
interface SelectTableOptions {
  /**
  * A hit position of the table to select from. By default, the selection
  * anchor will be used.
  */
  pos?: number;
}
/**
* @public
*/
declare function selectTable(options?: SelectTableOptions): Command;
/**
* @internal
*/
type TableCommandsExtension = Extension<{
  Commands: {
    insertTable: [options: InsertTableOptions];
    exitTable: [];
    selectTable: [options?: SelectTableOptions];
    selectTableCell: [options?: SelectTableCellOptions];
    selectTableColumn: [options?: SelectTableColumnOptions];
    selectTableRow: [options?: SelectTableRowOptions];
    addTableColumnBefore: [];
    addTableColumnAfter: [];
    addTableRowAbove: [];
    addTableRowBelow: [];
    deleteTable: [];
    deleteTableColumn: [];
    deleteTableRow: [];
    deleteCellSelection: [];
    mergeTableCells: [];
    splitTableCell: [];
  };
}>;
/**
* Adds commands for working with `table` nodes.
*
* @public
*/
declare function defineTableCommands(): TableCommandsExtension; //#endregion
//#region src/table/table-spec.d.ts
/**
* @public
*/
interface CellAttrs {
  colspan: number;
  rowspan: number;
  colwidth: number[] | null;
}
/**
* @internal
*/
type TableSpecExtension = Extension<{
  Nodes: {
    table: Attrs;
  };
}>;
/**
* @internal
*/
declare function defineTableSpec(): TableSpecExtension;
/**
* @internal
*/
type TableRowSpecExtension = Extension<{
  Nodes: {
    tableRow: Attrs;
  };
}>;
/**
* @internal
*/
declare function defineTableRowSpec(): TableRowSpecExtension;
/**
* @internal
*/
type TableCellSpecExtension = Extension<{
  Nodes: {
    tableCell: CellAttrs;
  };
}>;
/**
* @internal
*/
declare function defineTableCellSpec(): TableCellSpecExtension;
/**
* @internal
*/
type TableHeaderCellSpecExtension = Extension<{
  Nodes: {
    tableHeaderCell: CellAttrs;
  };
}>;
declare function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension;

//#endregion
//#region src/table/table.d.ts
/**
* @internal
*/
type TableExtension = Union<[TableSpecExtension, TableRowSpecExtension, TableCellSpecExtension, TableHeaderCellSpecExtension, TableCommandsExtension]>;
/**
* @public
*/
declare function defineTable(): TableExtension;

//#endregion
//#region src/table/table-plugins.d.ts
/**
* @public
*/
declare function defineTablePlugins(): PlainExtension;

//#endregion
//#region src/table/table-utils.d.ts
/**
* Checks if the given object is a `CellSelection` instance.
*
* @public
*/
declare function isCellSelection(value: unknown): value is CellSelection;
/**
* Find the closest table node.
*
* @internal
*/
declare function findTable($pos: ResolvedPos): FindParentNodeResult | undefined;

//#endregion
/**
* Try to find the anchor and head cell in the same table by using the given
* anchor and head as hit points, or fallback to the selection's anchor and
* head.
*
* @internal
*/

export { InsertTableOptions, SelectTableCellOptions, SelectTableColumnOptions, SelectTableOptions, SelectTableRowOptions, TableCellSpecExtension, TableCommandsExtension, TableExtension, TableHeaderCellSpecExtension, TableRowSpecExtension, TableSpecExtension, defineTable, defineTableCellSpec, defineTableCommands, defineTableHeaderCellSpec, defineTablePlugins, defineTableRowSpec, defineTableSpec, exitTable, findTable, insertTable, isCellSelection, selectTable, selectTableCell, selectTableColumn, selectTableRow };