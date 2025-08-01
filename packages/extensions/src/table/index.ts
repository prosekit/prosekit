export {
  defineTable,
  type TableExtension,
} from './table'
export {
  defineTableCommands,
  exitTable,
  insertTable,
  selectTable,
  selectTableCell,
  selectTableColumn,
  selectTableRow,
  type InsertTableOptions,
  type SelectTableCellOptions,
  type SelectTableColumnOptions,
  type SelectTableOptions,
  type SelectTableRowOptions,
  type TableCommandsExtension,
} from './table-commands'
export {
  moveTableColumn,
  type MoveTableColumnOptions,
} from './table-commands/move-table-column'
export {
  moveTableRow,
  type MoveTableRowOptions,
} from './table-commands/move-table-row'
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
