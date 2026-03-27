import { Fragment, Mark, ProseMirrorNode, Slice } from '@prosekit/pm/model'
import { AllSelection, NodeSelection, Selection, TextSelection } from '@prosekit/pm/state'

/**
 * Checks if the given object is a {@link ProseMirrorNode} instance.
 */
export function isProseMirrorNode(value: unknown): value is ProseMirrorNode {
  return value instanceof ProseMirrorNode
}

/**
 * Checks if the given object is a {@link Mark} instance.
 *
 * @public
 */
export function isMark(value: unknown): value is Mark {
  return value instanceof Mark
}

/**
 * Checks if the given object is a {@link Fragment} instance.
 *
 * @public
 */
export function isFragment(value: unknown): value is Fragment {
  return value instanceof Fragment
}

/**
 * Checks if the given object is a {@link Slice} instance.
 *
 * @public
 */
export function isSlice(value: unknown): value is Slice {
  return value instanceof Slice
}

/**
 * Checks if the given object is a {@link Selection} instance.
 *
 * @public
 */
export function isSelection(value: unknown): value is Selection {
  return value instanceof Selection
}

/**
 * Checks if the given object is a {@link TextSelection} instance.
 *
 * @public
 */
export function isTextSelection(value: Selection): value is TextSelection {
  return value instanceof TextSelection
}

/**
 * Checks if the given object is a {@link NodeSelection} instance.
 *
 * @public
 */
export function isNodeSelection(value: Selection): value is NodeSelection {
  return value instanceof NodeSelection
}

/**
 * Checks if the given object is a {@link AllSelection} instance.
 *
 * @public
 */
export function isAllSelection(value: Selection): value is AllSelection {
  return value instanceof AllSelection
}
