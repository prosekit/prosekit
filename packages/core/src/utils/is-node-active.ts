import type { Attrs, NodeType, ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorState } from '@prosekit/pm/state'

import { attrsMatch } from './attrs-match'
import { getNodeType } from './get-node-type'
import { isNodeSelection } from './type-assertion'

/**
 * @internal
 */
export function isNodeActive(
  state: EditorState,
  type: string | NodeType,
  attrs?: Attrs | null,
): boolean {
  const { selection, schema } = state
  const $pos = selection.$from
  const nodeType = getNodeType(schema, type)

  if (isNodeSelection(selection) && checkNode(selection.node, nodeType, attrs)) {
    return true
  }

  for (let depth = $pos.depth; depth >= 0; depth--) {
    if (checkNode($pos.node(depth), nodeType, attrs)) {
      return true
    }
  }
  return false
}

function checkNode(node: ProseMirrorNode, nodeType: NodeType, attrs?: Attrs | null): boolean {
  return node.type === nodeType && (!attrs || attrsMatch(node, attrs))
}
