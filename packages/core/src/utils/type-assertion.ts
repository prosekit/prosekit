import {
  Fragment,
  Mark,
  ProseMirrorNode,
  Slice,
} from '@prosekit/pm/model'
import {
  AllSelection,
  NodeSelection,
  Selection,
  TextSelection,
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
 * Checks if the given object is a `Fragment` instance.
 *
 * @public
 */
export function isFragment(fragment: unknown): fragment is Fragment {
  return fragment instanceof Fragment
}

/**
 * Checks if the given object is a `Slice` instance.
 *
 * @public
 */
export function isSlice(slice: unknown): slice is Slice {
  return slice instanceof Slice
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

/**
 * @internal
 */
export function isNotNullish<T>(
  value: T | null | undefined | void,
): value is T {
  return value != null
}
