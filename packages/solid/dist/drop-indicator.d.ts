import { Component, JSX } from "solid-js";
import { DropIndicatorElement, DropIndicatorProps as DropIndicatorProps$1 } from "@prosekit/web/drop-indicator";
/** Props for the {@link DropIndicator} Solid component. */
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
/** A Solid component that renders an `prosekit-drop-indicator` custom element. */
declare const DropIndicator: Component<DropIndicatorProps & JSX.HTMLAttributes<DropIndicatorElement>>;
export { DropIndicator, type DropIndicatorProps };
//# sourceMappingURL=drop-indicator.d.ts.map