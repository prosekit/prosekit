import { t as AnchorReference } from "./resolve-anchor.js";
import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { OpenChangeEvent, OpenChangeEvent as OpenChangeEvent$1, OverlayPopupProps, OverlayPositionerProps, OverlayRootProps } from "@aria-ui/elements/overlay";
import { Editor } from "@prosekit/core";
interface InlinePopoverPopupProps extends OverlayPopupProps {}
/** @internal */
declare const InlinePopoverPopupPropsDeclaration: PropsDeclaration<InlinePopoverPopupProps>;
/** @internal */
declare function setupInlinePopoverPopup(host: HostElement, _props: State<InlinePopoverPopupProps>): void;
declare const InlinePopoverPopupElementBase: HostElementConstructor<InlinePopoverPopupProps>;
/**
 * `<prosekit-inline-popover-popup>` custom element.
 *
 * Properties: {@link InlinePopoverPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the inline popover is visible, `"closed"` otherwise |
 */
declare class InlinePopoverPopupElement extends InlinePopoverPopupElementBase {}
/** @internal */
declare function registerInlinePopoverPopupElement(): void;
interface InlinePopoverPositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'offset' | 'hide' | 'hoist' | 'overlap' | 'inline' | 'overflowPadding'> {
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: OverlayPositionerProps['placement'];
  /**
   * The distance between the reference and floating element.
   *
   * @default 12
   */
  offset: OverlayPositionerProps['offset'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default true
   */
  hide: OverlayPositionerProps['hide'];
  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean;
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default true
   */
  overlap: OverlayPositionerProps['overlap'];
  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default true
   */
  inline: OverlayPositionerProps['inline'];
  /**
   * Describes the virtual padding around the boundary to check for overflow.
   *
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding'];
}
/** @internal */
declare const InlinePopoverPositionerPropsDeclaration: PropsDeclaration<InlinePopoverPositionerProps>;
/** @internal */
declare function setupInlinePopoverPositioner(host: HostElement, props: State<InlinePopoverPositionerProps>): void;
declare const InlinePopoverPositionerElementBase: HostElementConstructor<InlinePopoverPositionerProps>;
/**
 * `<prosekit-inline-popover-positioner>` custom element.
 *
 * Properties: {@link InlinePopoverPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the inline popover is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
declare class InlinePopoverPositionerElement extends InlinePopoverPositionerElementBase {}
/** @internal */
declare function registerInlinePopoverPositionerElement(): void;
interface InlinePopoverRootProps extends OverlayRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * Whether the popover is open by default when some inline content is
   * selected.
   *
   * @default true
   */
  defaultOpen: boolean;
  /**
   * Whether the inline popover should be dismissed when the editor receives an
   * Escape key press.
   *
   * @default true
   */
  dismissOnEscape: boolean;
  /**
   * The reference to position the popover against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   *
   * When set, the popover is anchored to this reference instead of the current
   * text selection, and the text selection no longer drives the open state, so
   * control it with the `open` property.
   *
   * @default null
   */
  anchor: AnchorReference;
}
/** @internal */
declare const InlinePopoverRootPropsDeclaration: PropsDeclaration<InlinePopoverRootProps>;
interface InlinePopoverRootEvents {
  /**
   * Emitted when the open state of the popover changes.
   */
  openChange: OpenChangeEvent$1;
}
/** @internal */
declare function setupInlinePopoverRoot(host: HostElement, props: State<InlinePopoverRootProps>): void;
declare const InlinePopoverRootElementBase: HostElementConstructor<InlinePopoverRootProps>;
/**
 * `<prosekit-inline-popover-root>` custom element.
 *
 * Properties: {@link InlinePopoverRootProps}
 *
 * Events: {@link InlinePopoverRootEvents}
 */
declare class InlinePopoverRootElement extends InlinePopoverRootElementBase {}
/** @internal */
declare function registerInlinePopoverRootElement(): void;
export { InlinePopoverPopupElement, type InlinePopoverPopupProps, InlinePopoverPopupPropsDeclaration, InlinePopoverPositionerElement, type InlinePopoverPositionerProps, InlinePopoverPositionerPropsDeclaration, InlinePopoverRootElement, type InlinePopoverRootEvents, type InlinePopoverRootProps, InlinePopoverRootPropsDeclaration, OpenChangeEvent, registerInlinePopoverPopupElement, registerInlinePopoverPositionerElement, registerInlinePopoverRootElement, setupInlinePopoverPopup, setupInlinePopoverPositioner, setupInlinePopoverRoot };
//# sourceMappingURL=inline-popover.d.ts.map