import { HTMLAttributes } from "preact";
import { ForwardRefExoticComponent, RefAttributes } from "preact/compat";
import { DropIndicatorElement, DropIndicatorProps as DropIndicatorProps$1 } from "@prosekit/web/drop-indicator";
/** Props for the {@link DropIndicator} Preact component. */
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
/** A Preact component that renders an `prosekit-drop-indicator` custom element. */
declare const DropIndicator: ForwardRefExoticComponent<DropIndicatorProps & HTMLAttributes<DropIndicatorElement> & RefAttributes<DropIndicatorElement>>;
export { DropIndicator, type DropIndicatorProps };
//# sourceMappingURL=drop-indicator.d.ts.map