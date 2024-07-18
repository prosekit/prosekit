import { NodeType, type Attrs } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'
import { findWrapping } from '@prosekit/pm/transform'

/**
 * @public
 */
export interface WrapOptions {
  nodeType: NodeType
  attrs?: Attrs | null
}

/**
 * Returns a command that wraps the selected textblock with the given node type
 * with the given attributes.
 *
 * @public
 */
export function wrap({ nodeType, attrs }: WrapOptions): Command {
  return (state, dispatch) => {
    const { $from, $to } = state.selection
    const range = $from.blockRange($to)
    if (!range) return false

    const wrapping = findWrapping(range, nodeType, attrs)
    if (!wrapping) return false

    dispatch?.(state.tr.wrap(range, wrapping))
    return true
  }
}
