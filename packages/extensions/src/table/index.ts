export { defineTableCommands, type TableCommandsExtension } from './table-commands.ts'
export { exitTable } from './table-commands/exit-table.ts'
export { insertTable, type InsertTableOptions } from './table-commands/insert-table.ts'
export { moveTableColumn, type MoveTableColumnOptions } from './table-commands/move-table-column.ts'
export { moveTableRow, type MoveTableRowOptions } from './table-commands/move-table-row.ts'
export { selectTableCell, type SelectTableCellOptions } from './table-commands/select-table-cell.ts'
export { selectTableColumn, type SelectTableColumnOptions } from './table-commands/select-table-column.ts'
export { selectTableRow, type SelectTableRowOptions } from './table-commands/select-table-row.ts'
export { selectTable, type SelectTableOptions } from './table-commands/select-table.ts'
export { defineTableDropIndicator } from './table-drop-indicator.ts'
export { defineTablePlugins } from './table-plugins.ts'
export {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
  type TableCellSpecExtension,
  type TableHeaderCellSpecExtension,
  type TableRowSpecExtension,
  type TableSpecExtension,
} from './table-spec.ts'
export { findTable, isCellSelection } from './table-utils.ts'
export { defineTable, type TableExtension } from './table.ts'
