import { BaseElementConstructor, ConnectableElement, EventDeclarations, PropDeclarations, SetupOptions } from "@aria-ui/core";
import { Editor } from "@prosekit/core";

//#region src/components/drop-indicator/drop-indicator/types.d.ts
interface DropIndicatorProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * The line width in pixels.
   *
   * @default 2
   */
  width: number;
}
/** @internal */
declare const dropIndicatorProps: PropDeclarations<DropIndicatorProps>;
interface DropIndicatorEvents {}
/** @internal */
declare const dropIndicatorEvents: EventDeclarations<DropIndicatorEvents>;
//#endregion
//#region src/components/drop-indicator/drop-indicator/element.gen.d.ts
declare const DropIndicatorElementBase: BaseElementConstructor<DropIndicatorProps>;
declare class DropIndicatorElement extends DropIndicatorElementBase {}
//#endregion
//#region src/components/drop-indicator/drop-indicator/setup.d.ts
/**
 * @internal
 */
declare function useDropIndicator(host: ConnectableElement, {
  state
}: SetupOptions<DropIndicatorProps, DropIndicatorEvents>): void;
//#endregion
export { DropIndicatorElement, type DropIndicatorEvents, type DropIndicatorProps, dropIndicatorEvents, dropIndicatorProps, useDropIndicator };
//# sourceMappingURL=prosekit-web-drop-indicator.d.ts.map