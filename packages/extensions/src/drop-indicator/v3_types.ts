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
 * Options for {@link defineDropIndicatorHandlers}.
 *
 * @public
 */
export interface DropIndicatorHandlersOptions {
  onDrag?: DragEventHandler
}

/**
 * A function that will be called when the `dragover` event is fired. You can
 * return `false` to disable the current drop point and thus hide the drop
 * indicator.
 *
 * @public
 */
export type DragEventHandler = (options: DragEventHandlerOptions) => boolean | void

/**
 * Options for {@link DragEventHandler}.
 *
 * @public
 */
export interface DragEventHandlerOptions {
  view: EditorView
  pos: number
}

/**
 * @internal
 */
export interface DropIndicatorPluginOptions {
  width: number
  onDrag: DragEventHandler
}
