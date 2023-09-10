import { Mark, ProseMirrorNode } from '@prosekit/pm/model'

export function isProseMirrorNode(node: unknown): node is ProseMirrorNode {
  return node instanceof ProseMirrorNode
}

export function isMark(mark: unknown): mark is Mark {
  return mark instanceof Mark
}
