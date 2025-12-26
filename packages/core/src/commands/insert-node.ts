import {
  Fragment,
  Slice,
  type Attrs,
  type NodeType,
  type ProseMirrorNode,
} from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'
import { dropPoint } from '@prosekit/pm/transform'

import { assert } from '../utils/assert'
import { getNodeType } from '../utils/get-node-type'
import { setSelectionAround } from '../utils/set-selection-around'

/**
 * @public
 */
export interface InsertNodeOptions {
  /**
   * The node to insert. Either this or `type` must be provided.
   */
  node?: ProseMirrorNode

  /**
   * The type of the node to insert. Either this or `node` must be provided.
   */
  type?: string | NodeType

  /**
   * When `type` is provided, the attributes of the node to insert.
   */
  attrs?: Attrs

  /**
   * The position to insert the node at. By default it will be the anchor
   * position of current selection.
   */
  pos?: number
}

/**
 * Returns a command that inserts the given node at the current selection or at
 * the given position.
 *
 * @public
 */
function insertNode(options: InsertNodeOptions): Command {
  return (state, dispatch) => {
    const node = options.node
      ? options.node
      : options.type
      ? getNodeType(state.schema, options.type).createAndFill(options.attrs)
      : null

    assert(node, 'You must provide either a node or a type')

    const insertPos = dropPoint(
      state.doc,
      options.pos ?? state.selection.anchor,
      new Slice(Fragment.from([node]), 0, 0),
    )
    if (insertPos == null) return false

    if (dispatch) {
      const tr = state.tr.insert(insertPos, node)
      setSelectionAround(tr, insertPos + node.nodeSize)
      dispatch(tr)
    }
    return true
  }
}

export { insertNode }
