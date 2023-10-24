import { NodeType, type Attrs } from '@prosekit/pm/model'
import { type Command } from '@prosekit/pm/state'
import { findWrapping } from '@prosekit/pm/transform'

export function wrap({
  nodeType,
  attrs,
}: {
  nodeType: NodeType
  attrs?: Attrs | null
}): Command {
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
