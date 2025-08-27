export {
  defineTable,
  type TableExtension,
} from './table'
export {
  defineTableCommands,
  selectTable,
  selectTableCell,
  type SelectTableCellOptions,
  type SelectTableOptions,
  type TableCommandsExtension,
} from './table-commands'
export { exitTable } from './table-commands/exit-table'
export {
  insertTable,
  type InsertTableOptions,
} from './table-commands/insert-table'
export {
  moveTableColumn,
  type MoveTableColumnOptions,
} from './table-commands/move-table-column'
export {
  moveTableRow,
  type MoveTableRowOptions,
} from './table-commands/move-table-row'
export {
  selectTableColumn,
  type SelectTableColumnOptions,
} from './table-commands/select-table-column'
export {
  selectTableRow,
  type SelectTableRowOptions,
} from './table-commands/select-table-row'
export { defineTableDropIndicator } from './table-drop-indicator'
export { defineTablePlugins } from './table-plugins'
export {
  defineTableCellSpec,
  defineTableHeaderCellSpec,
  defineTableRowSpec,
  defineTableSpec,
  type TableCellSpecExtension,
  type TableHeaderCellSpecExtension,
  type TableRowSpecExtension,
  type TableSpecExtension,
} from './table-spec'
export {
  findTable,
  isCellSelection,
} from './table-utils'
