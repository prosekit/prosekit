import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { EditorState } from 'prosekit/pm/state'

export function isSelectionInsideCodeBlock(
  state: EditorState,
  pos: number,
  node: ProseMirrorNode,
): boolean {
  if (node.type.name !== 'codeBlock') return false

  const from = pos
  const to = pos + node.nodeSize
  const { selection } = state

  return selection.from < to && selection.to > from
}
