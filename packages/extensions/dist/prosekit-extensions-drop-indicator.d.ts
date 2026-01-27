import { PlainExtension } from "@prosekit/core";
import { DragEventHandler, DragEventHandlerOptions, DropIndicatorPluginOptions, Line, Point, ShowHandler, ShowHandlerOptions, ViewDragging } from "prosemirror-drop-indicator";

//#region src/drop-indicator/drop-indicator.d.ts
/**
 * @internal
 */
type DropIndicatorExtension = PlainExtension;
/**
 * Defines an extension that controls the behavior of the drop indicator.
 *
 * This extension itself doesn't draw the drop indicator, but it provides the
 * necessary callbacks to do so. You probably don't want to use this extension
 * directly, but rather use the `<DropIndicator>` component.
 *
 * You can add this extension multiple times. If any extension has `onDrag`
 * callback defined, and it returns `false`, then the drop point will be
 * discarded.
 *
 * @public
 */
declare function defineDropIndicator(options?: DropIndicatorOptions): DropIndicatorExtension;
/**
 * Options for {@link defineDropIndicator}.
 *
 * @public
 */
interface DropIndicatorOptions extends DropIndicatorPluginOptions {}
//#endregion
export { type DragEventHandler, type DragEventHandlerOptions, type DropIndicatorExtension, type DropIndicatorOptions, type Line, type Point, type ShowHandler, type ShowHandlerOptions, type ViewDragging, defineDropIndicator };
//# sourceMappingURL=prosekit-extensions-drop-indicator.d.ts.map