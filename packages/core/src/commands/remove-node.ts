import type { NodeType, ResolvedPos } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import type { CommandCreator } from '../types/command'
import { getNodeType } from '../utils/get-node-type'

/**
 * Returns a command to remove the nearest ancestor node of a specific type from the current position.
 *
 * @public
 */
export function removeNode(options: {
  /**
   * The type of the mark to remove.
   */
  type: string | NodeType

  /**
   * The document position to start searching node. By default it will be the anchor position of current selection.
   */
  position?: number
}): Command {
  return (state, dispatch) => {
    const nodeType = getNodeType(state.schema, options.type)
    const $pos =
      typeof options.position === 'number'
        ? state.doc.resolve(options.position)
        : state.selection.$anchor

    const getNodePos = (
      $pos: ResolvedPos,
    ): { from: number | null; to: number | null } => {
      for (let depth = $pos.depth; depth > 0; depth -= 1) {
        const node = $pos.node(depth)

        if (node.type === nodeType) {
          const from = $pos.before(depth)
          const to = $pos.after(depth)
          return {
            from,
            to,
          }
        }
      }

      return {
        from: null,
        to: null,
      }
    }

    const { from, to } = getNodePos($pos)
    if (!from || !to || from > to) {
      return false
    }

    dispatch?.(state.tr.delete(from, to))
    return true
  }
}

removeNode satisfies CommandCreator
