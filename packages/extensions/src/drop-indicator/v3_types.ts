import type { EditorView } from '@prosekit/pm/view'

/**
 * @internal
 */
export type Point = Readonly<{ x: number; y: number }>

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
  /**
   * The editor's view.
   */
  view: EditorView
  /**
   * The drop position in current document.
   */
  pos: number
  /**
   * The `dragover` event.
   */
  event: DragEvent
}

/**
 * @internal
 */
export interface DropIndicatorPluginOptions {
  width: number
  onDrag: DragEventHandler
}
