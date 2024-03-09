import { definePlugin } from '@prosekit/core'
import { tableEditing, columnResizing } from 'prosemirror-tables'

/**
 * @public
 */
export function defineTablePlugins() {
  return definePlugin([tableEditing(), columnResizing()])
}
