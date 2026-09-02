import { DefineSetupFnComponent, HTMLAttributes } from "vue";
import { DropIndicatorProps as DropIndicatorProps$1 } from "@prosekit/web/drop-indicator";
/** Props for the {@link DropIndicator} Vue component. */
interface DropIndicatorProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: DropIndicatorProps$1['editor'];
  /**
   * The line width in pixels.
   *
   * @default 2
   */
  width?: DropIndicatorProps$1['width'];
}
/** A Vue component that renders an `prosekit-drop-indicator` custom element. */
declare const DropIndicator: DefineSetupFnComponent<DropIndicatorProps & HTMLAttributes>;
export { DropIndicator, type DropIndicatorProps };
//# sourceMappingURL=drop-indicator.d.ts.map