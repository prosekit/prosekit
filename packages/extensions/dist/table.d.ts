import { Command } from "@prosekit/pm/state";
import { Extension, PlainExtension, Union } from "@prosekit/core";
import { Attrs } from "@prosekit/pm/model";
import { CellSelection, ColumnResizingOptions, MoveTableColumnOptions, MoveTableRowOptions, TableEditingOptions, TableView, addColumnAfter as addTableColumnAfter, addColumnBefore as addTableColumnBefore, addRowAfter as addTableRowBelow, addRowBefore as addTableRowAbove, deleteCellSelection, deleteColumn as deleteTableColumn, deleteRow as deleteTableRow, deleteTable, findTable, mergeCells as mergeTableCells, moveTableColumn, moveTableRow, splitCell as splitTableCell } from "prosemirror-tables";
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
 */
export declare function insertTable(options: InsertTableOptions): Command;
interface SelectTableCellOptions {
  /**
   * A hit position of the table cell to select from. By default, the selection
   * anchor will be used.
   */
  pos?: number;
}
export declare function selectTableCell(options?: SelectTableCellOptions): Command;
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
export declare function selectTableColumn(options?: SelectTableColumnOptions): Command;
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
export declare function selectTableRow(options?: SelectTableRowOptions): Command;
interface SelectTableOptions {
  /**
   * A hit position of the table to select from. By default, the selection
   * anchor will be used.
   */
  pos?: number;
}
export declare function selectTable(options?: SelectTableOptions): Command;
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
 */
export declare function defineTableCommands(): TableCommandsExtension;
/**
 * When the selection is in a table node, create a default block after the table
 * table, and move the cursor there.
 */
export declare const exitTable: Command;
/**
 * Hides the drop indicator when dragging a table column or row by using the
 * table handle.
 *
 * @internal
 */
export declare function defineTableDropIndicator(): PlainExtension;
export declare function defineTableEditingPlugin(options?: TableEditingOptions): PlainExtension;
export declare function defineColumnResizingPlugin(options?: ColumnResizingOptions): PlainExtension;
export declare function defineTablePlugins(): PlainExtension;
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
export declare function defineTableSpec(): TableSpecExtension;
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
export declare function defineTableRowSpec(): TableRowSpecExtension;
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
export declare function defineTableCellSpec(): TableCellSpecExtension;
/**
 * @internal
 */
type TableHeaderCellSpecExtension = Extension<{
  Nodes: {
    tableHeaderCell: CellAttrs;
  };
}>;
export declare function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension;
/**
 * Checks if the given object is a `CellSelection` instance.
 */
export declare function isCellSelection(value: unknown): value is CellSelection;
/**
 * @internal
 */
type TableExtension = Union<[TableSpecExtension, TableRowSpecExtension, TableCellSpecExtension, TableHeaderCellSpecExtension, TableCommandsExtension]>;
export declare function defineTable(): TableExtension;
export { type ColumnResizingOptions, type InsertTableOptions, type MoveTableColumnOptions, type MoveTableRowOptions, type SelectTableCellOptions, type SelectTableColumnOptions, type SelectTableOptions, type SelectTableRowOptions, type TableCellSpecExtension, type TableCommandsExtension, type TableEditingOptions, type TableExtension, type TableHeaderCellSpecExtension, type TableRowSpecExtension, type TableSpecExtension, TableView, addTableColumnAfter, addTableColumnBefore, addTableRowAbove, addTableRowBelow, deleteCellSelection, deleteTable, deleteTableColumn, deleteTableRow, findTable, mergeTableCells, moveTableColumn, moveTableRow, splitTableCell };
//# sourceMappingURL=table.d.ts.map