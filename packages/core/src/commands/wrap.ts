import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'
import { findWrapping } from '@prosekit/pm/transform'

import { getNodeType } from '../utils/get-node-type.ts'

/**
 * @public
 */
export interface WrapOptions {
  /**
   * The node type to wrap the selected textblock with.
   */
  type: NodeType | string

  /**
   * Optional attributes to apply to the node.
   */
  attrs?: Attrs | null
}

/**
 * Returns a command that wraps the selected textblock with the given node type.
 *
 * @param options
 *
 * @public
 */
export function wrap(options: WrapOptions): Command {
  return (state, dispatch) => {
    const { $from, $to } = state.selection
    const range = $from.blockRange($to)
    if (!range) return false

    const nodeType = getNodeType(state.schema, options.type)
    const wrapping = findWrapping(range, nodeType, options.attrs)
    if (!wrapping) return false

    dispatch?.(state.tr.wrap(range, wrapping))
    return true
  }
}
