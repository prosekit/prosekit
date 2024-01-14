import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getNodeType } from '../utils/get-node-type'

/**
 * Returns a command that tries to set the attributes of the current node.
 *
 * @public
 */
export function setNodeAttrs(options: {
  /**
   * The type of node to set the attributes of.
   *
   * If current node is not of this type, the command will do nothing.
   */
  type: string | NodeType

  /**
   * The attributes to set.
   */
  attrs: Attrs

  /**
   * The position of the node. Defaults to the position of the wrapping node
   * containing the current selection.
   */
  pos?: number
}): Command {
  return (state, dispatch) => {
    const nodeType = getNodeType(state.schema, options.type)
    const pos = options.pos ?? state.selection.$from.before()
    const node = state.doc.nodeAt(pos)
    if (!node || node.type !== nodeType) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const [key, value] of Object.entries(options.attrs)) {
        if (value !== undefined) {
          tr.setNodeAttribute(pos, key, value)
        }
      }
      dispatch(tr)
    }
    return true
  }
}
