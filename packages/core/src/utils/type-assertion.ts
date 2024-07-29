import { Mark, ProseMirrorNode } from '@prosekit/pm/model'
import {
  AllSelection,
  NodeSelection,
  TextSelection,
  Selection,
} from '@prosekit/pm/state'

/**
 * Checks if the given object is a `ProseMirrorNode` instance.
 */
export function isProseMirrorNode(node: unknown): node is ProseMirrorNode {
  return node instanceof ProseMirrorNode
}

/**
 * Checks if the given object is a `Mark` instance.
 *
 * @public
 */
export function isMark(mark: unknown): mark is Mark {
  return mark instanceof Mark
}

/**
 * Checks if the given object is a `Selection` instance.
 *
 * @public
 */
export function isSelection(sel: unknown): sel is Selection {
  return sel instanceof Selection
}

/**
 * Checks if the given object is a `TextSelection` instance.
 *
 * @public
 */
export function isTextSelection(sel: Selection): sel is TextSelection {
  return sel instanceof TextSelection
}

/**
 * Checks if the given object is a `NodeSelection` instance.
 *
 * @public
 */
export function isNodeSelection(sel: Selection): sel is NodeSelection {
  return sel instanceof NodeSelection
}

/**
 * Checks if the given object is a `AllSelection` instance.
 *
 * @public
 */
export function isAllSelection(sel: Selection): sel is AllSelection {
  return sel instanceof AllSelection
}
