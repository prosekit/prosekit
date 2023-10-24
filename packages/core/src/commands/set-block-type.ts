import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

export function setBlockType({
  nodeType,
  attrs,
  from,
  to,
}: {
  nodeType: NodeType
  attrs?: Attrs | null
  from?: number
  to?: number
}): Command {
  return (state, dispatch) => {
    from = from ?? state.selection.from
    to = from ?? state.selection.from
    dispatch?.(state.tr.setBlockType(from, to, nodeType, attrs))
    return true
  }
}
