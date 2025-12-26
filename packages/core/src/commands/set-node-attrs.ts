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
   * The position of the exact node to update.
   *
   * If not provided, the command will update the attributes for the nodes
   * around the selection, including all children as well as the deepest parent
   * that wraps the selection.
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
  return pos != null
    ? setNodeAttrsAt(type, attrs, pos)
    : setNodeAttrsAround(type, attrs)
}

/** Update the attributes at a specific position. */
function setNodeAttrsAt(
  type: string | NodeType | string[] | NodeType[],
  attrs: Attrs,
  pos: number,
): Command {
  return (state, dispatch) => {
    const nodeTypes = getNodeTypes(state.schema, type)
    const node = state.doc.nodeAt(pos)

    if (!node || !nodeTypes.includes(node.type)) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const [key, value] of Object.entries(attrs)) {
        tr.setNodeAttribute(pos, key, value)
      }
      dispatch(tr)
    }
    return true
  }
}

/**
 * Update the attributes for the nodes around the selection, including all
 * children as well as the deepest parent that wraps the selection
 */
function setNodeAttrsAround(
  type: string | NodeType | string[] | NodeType[],
  attrs: Attrs,
): Command {
  return (state, dispatch) => {
    const nodeTypes = getNodeTypes(state.schema, type)
    const { from, to } = state.selection
    const positions: number[] = []

    let found = false
    let parentPos = -1
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (nodeTypes.includes(node.type)) {
        found = true
        if (from <= pos && pos <= to) {
          // All positions within the selection are included
          positions.push(pos)
        } else {
          // The deepest parent is included
          parentPos = Math.max(parentPos, pos)
        }
      }
      if (found && !dispatch) {
        // Early return to stop the traversal
        return false
      }
    })

    if (parentPos >= 0) {
      positions.push(parentPos)
    }

    if (positions.length === 0) {
      return false
    }

    if (dispatch) {
      const { tr } = state
      for (const [key, value] of Object.entries(attrs)) {
        for (const pos of positions) {
          tr.setNodeAttribute(pos, key, value)
        }
      }
      dispatch(tr)
    }
    return true
  }
}
