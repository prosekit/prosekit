import { Mark, ProseMirrorNode } from '@prosekit/pm/model'
import {
  AllSelection,
  NodeSelection,
  TextSelection,
  Selection,
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
export function isSelection(sel: unknown): sel is Selection {
  return sel instanceof Selection
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

/**
 * @internal
 */
export function isAllSelection(sel: Selection): sel is AllSelection {
  return sel instanceof AllSelection
}
