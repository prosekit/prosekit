import type {
  Attrs,
  NodeType,
} from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { findParentNodeOfType } from '../utils/find-parent-node-of-type'
import { getNodeTypes } from '../utils/get-node-types'

/**
 * @public
 */
export interface SetNodeAttrsOptions {
  /**
   * The type of node to set the attributes of.
   */
  type: string | NodeType | string[] | NodeType[]

  /**
   * The attributes to set.
   */
  attrs: Attrs

  /**
   * The document position of the node to update. If not provided, the command
   * will find the closest ancestor node that matches the type based on the
   * anchor position of the selection.
   */
  pos?: number
}

/**
 * Returns a command that set the attributes of the current node.
 *
 * @param options
 *
 * @public
 */
export function setNodeAttrs({ type, attrs, pos }: SetNodeAttrsOptions): Command {
  return (state, dispatch) => {
    const nodeTypes = getNodeTypes(state.schema, type)
    let updatePos = -1

    if (pos == null) {
      const found = findParentNodeOfType(nodeTypes, state.selection.$anchor)
      if (!found) {
        return false
      }
      updatePos = found.pos
    } else {
      const found = state.doc.nodeAt(pos)
      if (!found || !nodeTypes.includes(found.type)) {
        return false
      }
      updatePos = pos
    }

    if (updatePos === -1) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const [key, value] of Object.entries(attrs)) {
        tr.setNodeAttribute(updatePos, key, value)
      }
      dispatch(tr)
    }
    return true
  }
}
