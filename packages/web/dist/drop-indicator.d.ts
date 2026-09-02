import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
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
declare const DropIndicatorPropsDeclaration: PropsDeclaration<DropIndicatorProps>;
/**
 * @internal
 */
declare function setupDropIndicator(host: HostElement, props: State<DropIndicatorProps>): void;
declare const DropIndicatorElementBase: HostElementConstructor<DropIndicatorProps>;
/**
 * `<prosekit-drop-indicator>` custom element.
 *
 * Properties: {@link DropIndicatorProps}
 */
declare class DropIndicatorElement extends DropIndicatorElementBase {}
/**
 * @internal
 */
declare function registerDropIndicatorElement(): void;
export { DropIndicatorElement, type DropIndicatorProps, DropIndicatorPropsDeclaration, registerDropIndicatorElement, setupDropIndicator };
//# sourceMappingURL=drop-indicator.d.ts.map