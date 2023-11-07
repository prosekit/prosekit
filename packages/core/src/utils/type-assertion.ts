import { Mark, ProseMirrorNode } from '@prosekit/pm/model'
import {
  NodeSelection,
  TextSelection,
  type Selection,
} from '@prosekit/pm/state'

/**
 * @internal
 */
export function isProseMirrorNode(node: unknown): node is ProseMirrorNode {
  return node instanceof ProseMirrorNode
}

/**
 * @internal
 */
export function isMark(mark: unknown): mark is Mark {
  return mark instanceof Mark
}

/**
 * @internal
 */
export function isTextSelection(sel: Selection): sel is TextSelection {
  return sel instanceof TextSelection
}

/**
 * @internal
 */
export function isNodeSelection(sel: Selection): sel is NodeSelection {
  return sel instanceof NodeSelection
}
