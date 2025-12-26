import type {
  Attrs,
  NodeType,
} from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getNodeTypes } from '../utils/get-node-types'

/**
 * @public
 */
export interface SetNodeAttrsOptions {
  /**
   * The type of node to set the attributes of.
   *
   * If current node is not of this type, the command will do nothing.
   */
  type: string | NodeType | string[] | NodeType[]

  /**
   * The attributes to set.
   */
  attrs: Attrs

  /**
   * The position of the node. Defaults to the position of the wrapping node
   * containing the current selection.
   */
  pos?: number
}

/**
 * Returns a command that set the attributes of the current node.
 *
 * @public
 */
export function setNodeAttrs(options: SetNodeAttrsOptions): Command {
  return (state, dispatch) => {
    const nodeTypes = getNodeTypes(state.schema, options.type)
    const from = options.pos ?? state.selection.from
    const to = options.pos ?? state.selection.to
    const positions: number[] = []

    if (options.pos != null) {
      const node = state.doc.nodeAt(options.pos)
      if (node && nodeTypes.includes(node.type)) {
        positions.push(options.pos)
      }
    }

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (nodeTypes.includes(node.type)) {
        positions.push(pos)
      }
      if (!dispatch && positions.length > 0) {
        // Skip the rest of the nodes
        return false
      }
    })

    if (positions.length === 0) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const pos of positions) {
        for (const [key, value] of Object.entries(options.attrs)) {
          tr.setNodeAttribute(pos, key, value)
        }
      }
      dispatch(tr)
    }
    return true
  }
}
