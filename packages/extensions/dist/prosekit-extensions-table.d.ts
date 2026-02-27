import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
import { CellSelection, MoveTableColumnOptions, MoveTableRowOptions, findTable, moveTableColumn, moveTableRow } from "prosemirror-tables";

//#region src/table/table-commands/insert-table.d.ts
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
//#endregion
//#region src/table/table-commands/select-table-cell.d.ts
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
//#endregion
//#region src/table/table-commands/select-table-column.d.ts
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
//#endregion
//#region src/table/table-commands/select-table-row.d.ts
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
//#endregion
//#region src/table/table-commands/select-table.d.ts
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
//#endregion
//#region src/table/table-commands.d.ts
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
    moveTableRow: [options: MoveTableRowOptions];
    moveTableColumn: [options: MoveTableColumnOptions];
  };
}>;
/**
 * Adds commands for working with `table` nodes.
 *
 * @public
 */
declare function defineTableCommands(): TableCommandsExtension;
//#endregion
//#region src/table/table-commands/exit-table.d.ts
/**
 * When the selection is in a table node, create a default block after the table
 * table, and move the cursor there.
 *
 * @public
 */
declare const exitTable: Command;
//#endregion
//#region src/table/table-drop-indicator.d.ts
/**
 * Hides the drop indicator when dragging a table column or row by using the
 * table handle.
 *
 * @internal
 */
declare function defineTableDropIndicator(): PlainExtension;
//#endregion
//#region src/table/table-plugins.d.ts
/**
 * @public
 */
declare function defineTablePlugins(): PlainExtension;
//#endregion
//#region src/table/table-spec.d.ts
/**
 * @public
 */
interface CellAttrs {
  colspan?: number;
  rowspan?: number;
  colwidth?: number[] | null;
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
//#region src/table/table-utils.d.ts
/**
 * Checks if the given object is a `CellSelection` instance.
 *
 * @public
 */
declare function isCellSelection(value: unknown): value is CellSelection;
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
export { type InsertTableOptions, type MoveTableColumnOptions, type MoveTableRowOptions, type SelectTableCellOptions, type SelectTableColumnOptions, type SelectTableOptions, type SelectTableRowOptions, type TableCellSpecExtension, type TableCommandsExtension, type TableExtension, type TableHeaderCellSpecExtension, type TableRowSpecExtension, type TableSpecExtension, defineTable, defineTableCellSpec, defineTableCommands, defineTableDropIndicator, defineTableHeaderCellSpec, defineTablePlugins, defineTableRowSpec, defineTableSpec, exitTable, findTable, insertTable, isCellSelection, moveTableColumn, moveTableRow, selectTable, selectTableCell, selectTableColumn, selectTableRow };
//# sourceMappingURL=prosekit-extensions-table.d.ts.map