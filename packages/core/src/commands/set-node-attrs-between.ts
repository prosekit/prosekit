import type {
  Attrs,
  NodeType,
} from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getNodeTypes } from '../utils/get-node-types'

/**
 * @public
 */
export interface SetNodeAttrsBetweenOptions {
  /**
   * The type of node to set the attributes of.
   */
  type: string | NodeType | string[] | NodeType[]

  /**
   * The attributes to set.
   */
  attrs: Attrs

  /**
   * The position to start searching node. By default the selection from position will be used.
   */
  from?: number

  /**
   * The position to end searching node. By default the selection to position will be used.
   */
  to?: number
}

/**
 * Returns a command that set the attributes of all matching nodes between the
 * `from` and `to` positions.
 *
 * @param options
 *
 * @public
 */
export function setNodeAttrsBetween(options: SetNodeAttrsBetweenOptions): Command {
  return (state, dispatch) => {
    const from = options.from ?? state.selection.$from.pos
    const to = options.to ?? state.selection.$to.pos
    if (from > to) {
      return false
    }

    const nodeTypes = getNodeTypes(state.schema, options.type)
    const positions: number[] = []
    let found = false

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (nodeTypes.includes(node.type)) {
        positions.push(pos)
        found = true
      }
      if (!dispatch && found) {
        // Early return to prevent further iteration
        return false
      }
    })

    if (!found) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const [key, value] of Object.entries(options.attrs)) {
        for (const pos of positions) {
          tr.setNodeAttribute(pos, key, value)
        }
      }
      dispatch(tr)
    }
    return true
  }
}
