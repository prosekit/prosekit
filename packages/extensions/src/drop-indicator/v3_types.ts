import type { EditorView } from '@prosekit/pm/view'

/**
 * Options for {@link defineDropIndicator}.
 *
 * @public
 */
export interface DropIndicatorOptions {
  /**
   * The precise width of the drop indicator in pixels.
   *
   * @default 2
   */
  width?: number

  /**
   * A function to check whether a drop point is valid.
   *
   * By default, all drop points are valid.
   */
  canDrop?: CanDropPredicate
}

/**
 * Options for {@link CanDropPredicate}.
 *
 * @public
 */
export interface CanDropOptions {
  view: EditorView
  pos: number
}

/**
 * A function to check whether a drop point is valid.
 *
 * @public
 */
export type CanDropPredicate = (options: CanDropPredicate) => boolean

/**
 * @internal
 */
export type Point = Readonly<{ x: number; y: number }>
