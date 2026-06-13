import { definePlugin, union, type PlainExtension } from '@prosekit/core'
import { columnResizing, tableEditing, type ColumnResizingOptions, type TableEditingOptions } from 'prosemirror-tables'

export { type ColumnResizingOptions, type TableEditingOptions }

export function defineTableEditingPlugin(options?: TableEditingOptions): PlainExtension {
  return definePlugin(tableEditing(options))
}

export function defineColumnResizingPlugin(options?: ColumnResizingOptions): PlainExtension {
  return definePlugin(columnResizing(options))
}

export function defineTablePlugins(): PlainExtension {
  return union(
    defineTableEditingPlugin(),
    defineColumnResizingPlugin(),
  )
}
