import type { Slice } from 'prosemirror-model'
import type { NodeSelection } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

/**
 * A function that will be called when the `dragover` event is fired. You can
 * return `false` to disable the current drop point and thus hide the drop
 * indicator.
 *
 * @public
 */
export type DragEventHandler = (options: DragEventHandlerOptions) => boolean

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
 * A function that will be called when the drop indicator should be shown.
 *
 * @public
 */
export type ShowHandler = (options: ShowHandlerOptions) => void

/**
 * Options for {@link ShowHandler}.
 *
 * @public
 */
export interface ShowHandlerOptions {
  /**
   * The editor's view.
   */
  view: EditorView

  /**
   * The ProseMirror position that the drop indicator should be shown at.
   */
  pos: number

  /**
   * The line that the drop indicator should be shown at.
   */
  line: Line
}

/**
 * @internal
 */
export interface Point {
  readonly x: number
  readonly y: number
}

/**
 * @internal
 */
export interface Line {
  readonly p1: Point
  readonly p2: Point
}

/**
 * An interface matching the internal ProseMirror implementation.
 *
 * See https://github.com/ProseMirror/prosemirror-view/blob/1.38.1/src/input.ts#L657
 *
 * @internal
 */
export interface ViewDragging {
  readonly slice: Slice
  readonly move: boolean
  readonly node?: NodeSelection
}
