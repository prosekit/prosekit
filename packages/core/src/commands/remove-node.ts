import type { NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/command'
import { findParentNode } from '../utils/find-parent-node'
import { getNodeType } from '../utils/get-node-type'

/**
 * Returns a command to remove the nearest ancestor node of a specific type from the current position.
 *
 * @public
 */
export function removeNode(options: {
  /**
   * The type of the node to remove.
   */
  type: string | NodeType

  /**
   * The document position to start searching node. By default it will be the anchor position of current selection.
   */
  pos?: number
}): Command {
  return (state, dispatch) => {
    const nodeType = getNodeType(state.schema, options.type)
    const $pos =
      typeof options.pos === 'number'
        ? state.doc.resolve(options.pos)
        : state.selection.$anchor

    const { from, to } = findParentNode(nodeType, $pos)
    if (!from || !to || from > to) {
      return false
    }

    dispatch?.(state.tr.delete(from, to))
    return true
  }
}

removeNode satisfies CommandCreator
