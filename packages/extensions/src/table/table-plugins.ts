import { definePlugin, type PlainExtension } from '@prosekit/core'
import { columnResizing, tableEditing } from 'prosemirror-tables'

export function defineTablePlugins(): PlainExtension {
  return definePlugin([tableEditing(), columnResizing()])
}
