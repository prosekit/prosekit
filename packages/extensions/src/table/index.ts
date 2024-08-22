export { defineTable, type TableExtension } from './table'
export {
  defineTableCommands,
  insertTable,
  exitTable,
  deleteCellSelection,
  type InsertTableOptions,
  type TableCommandsExtension,
} from './table-commands'
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
