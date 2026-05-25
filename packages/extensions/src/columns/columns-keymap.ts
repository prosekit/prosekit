import { defineKeymap, findParentNode, type PlainExtension } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'

/**
 * @internal
 */
export type ColumnsKeymapExtension = PlainExtension

/**
 * Register keyboard shortcuts for the columns extension.
 *
 * When `enableModAWithinColumn` is enabled, pressing `Mod-a` inside a column
 * selects only the current column content.
 */
export function defineColumnsKeymap(options: {
  enableModAWithinColumn?: boolean
} = {}): ColumnsKeymapExtension {
  if (!options.enableModAWithinColumn) {
    return defineKeymap({})
  }

  return defineKeymap({
    'Mod-a': (state, dispatch) => {
      const found = findParentNode((node) => node.type.name === 'column', state.selection.$from)
      if (!found) return false
      dispatch?.(state.tr.setSelection(TextSelection.between(state.doc.resolve(found.start), state.doc.resolve(found.start + found.node.content.size))))
      return true
    },
  })
}
