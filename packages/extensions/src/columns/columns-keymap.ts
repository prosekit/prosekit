import { defineKeymap, findParentNode, type PlainExtension } from '@prosekit/core'
import { TextSelection } from '@prosekit/pm/state'

/**
 * @internal
 */
export type ColumnsKeymapExtension = PlainExtension

/**
 * @internal
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
      dispatch?.(state.tr.setSelection(TextSelection.create(state.doc, found.start, found.start + found.node.content.size)))
      return true
    },
  })
}
