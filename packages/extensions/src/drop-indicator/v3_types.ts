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
}

/**
 * @internal
 */
export type Point = Readonly<{ x: number; y: number }>

/**
 * @public
 */
export interface DropIndicatorPredicateOptions {
  /** Whether to disable dropping (and thus also hide the drop indicator) in certain cases */
  disableDrop?: DisableDropFunction
}

/**
 * @public
 */
export type DisableDropFunction = (options: DisableDropOptions) => boolean

/**
 * @public
 */
export interface DisableDropOptions {
  view: EditorView
  pos: number
}

/**
 * @internal
 */
export interface DropIndicatorPluginOptions {
  width: number
  disableDrop: DisableDropFunction
}
