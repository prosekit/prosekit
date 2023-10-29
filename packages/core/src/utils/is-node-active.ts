import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { attrsMatch } from './attrs-match'
import { getNodeType } from './get-node-type'

export function isNodeActive(
  state: EditorState,
  type: string | NodeType,
  attrs?: Attrs | null,
): boolean {
  const $pos = state.selection.$from
  const nodeType = getNodeType(state.schema, type)

  for (let depth = $pos.depth; depth >= 0; depth--) {
    const node = $pos.node(depth)
    if (node.type === nodeType && (!attrs || attrsMatch(node, attrs))) {
      return true
    }
  }
  return false
}
