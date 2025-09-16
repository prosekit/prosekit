import { NodeSelection, Plugin } from "prosemirror-state";
import { Slice } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

//#region src/types.d.ts

/**
 * A function that will be called when the `dragover` event is fired. You can
 * return `false` to disable the current drop point and thus hide the drop
 * indicator.
 *
 * @public
 */
type DragEventHandler = (options: DragEventHandlerOptions) => boolean;
/**
 * Options for {@link DragEventHandler}.
 *
 * @public
 */
interface DragEventHandlerOptions {
  /**
   * The editor's view.
   */
  view: EditorView;
  /**
   * The drop position in current document.
   */
  pos: number;
  /**
   * The `dragover` event.
   */
  event: DragEvent;
}
/**
 * A function that will be called when the drop indicator should be shown.
 *
 * @public
 */
type ShowHandler = (options: ShowHandlerOptions) => void;
/**
 * Options for {@link ShowHandler}.
 *
 * @public
 */
interface ShowHandlerOptions {
  /**
   * The editor's view.
   */
  view: EditorView;
  /**
   * The ProseMirror position that the drop indicator should be shown at.
   */
  pos: number;
  /**
   * The line that the drop indicator should be shown at.
   */
  line: Line;
}
/**
 * @internal
 */
interface Point {
  readonly x: number;
  readonly y: number;
}
/**
 * @internal
 */
interface Line {
  readonly p1: Point;
  readonly p2: Point;
}
/**
 * An interface matching the internal ProseMirror implementation.
 *
 * See https://github.com/ProseMirror/prosemirror-view/blob/1.38.1/src/input.ts#L657
 *
 * @internal
 */
interface ViewDragging {
  readonly slice: Slice;
  readonly move: boolean;
  readonly node?: NodeSelection;
}
//#endregion
//#region src/drop-indicator-plugin.d.ts
/**
 * @public
 */
interface DropIndicatorPluginOptions {
  /**
   * A callback that is called when the drop indicator should be shown.
   */
  onShow?: ShowHandler;
  /**
   * A callback that is called when the drop indicator should be hidden.
   */
  onHide?: VoidFunction;
  /**
   * A callback that is called when the `dragover` event is fired. You can
   * return `false` to disable the current drop point and thus hide the drop
   * indicator.
   */
  onDrag?: DragEventHandler;
}
/**
 * @public
 *
 * @param options - The options for the drop indicator plugin.
 */
declare function createDropIndicatorPlugin(options: DropIndicatorPluginOptions): Plugin;
//#endregion
export { type DragEventHandler, type DragEventHandlerOptions, type DropIndicatorPluginOptions, type Line, type Point, type ShowHandler, type ShowHandlerOptions, type ViewDragging, createDropIndicatorPlugin };
//# sourceMappingURL=prosemirror-drop-indicator.d.ts.map