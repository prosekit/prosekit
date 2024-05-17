import type { Attrs, NodeType } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { attrsMatch } from './attrs-match'
import { getNodeTypes } from './get-node-types'

export function isNodeActive(
  state: EditorState,
  type: string | NodeType | string[] | NodeType[],
  attrs?: Attrs | null,
): boolean {
  const $pos = state.selection.$from
  const nodeTypes = getNodeTypes(state.schema, type)

  for (let depth = $pos.depth; depth >= 0; depth--) {
    const node = $pos.node(depth)
    if (nodeTypes.includes(node.type) && (!attrs || attrsMatch(node, attrs))) {
      return true
    }
  }
  return false
}
