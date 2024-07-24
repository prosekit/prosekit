import { definePlugin, type PlainExtension } from '@prosekit/core'
import { tableEditing, columnResizing } from 'prosemirror-tables'

/**
 * @public
 */
export function defineTablePlugins(): PlainExtension {
  return definePlugin([tableEditing(), columnResizing()])
}
