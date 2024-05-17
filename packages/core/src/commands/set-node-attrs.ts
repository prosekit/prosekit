import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { getNodeTypes } from '../utils/get-node-types'

/**
 * Returns a command that set the attributes of the current node.
 *
 * @public
 */
export function setNodeAttrs(options: {
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
}): Command {
  return (state, dispatch) => {
    const nodeTypes = getNodeTypes(state.schema, options.type)
    const from = options.pos ?? state.selection.from
    const to = options.pos ?? state.selection.to

    const { tr } = state

    let found = false

    tr.doc.nodesBetween(from, to, (node, pos) => {
      if (nodeTypes.includes(node.type)) {
        found = true
        if (dispatch) {
          for (const [key, value] of Object.entries(options.attrs)) {
            tr.setNodeAttribute(pos, key, value)
          }
        }
      }
    })

    dispatch?.(tr)

    return found
  }
}
