import { BaseElementConstructor, EventDeclarations, PropDeclarations } from "@aria-ui/core";
import { Editor } from "@prosekit/core";
import { OverlayPositionerEvents, OverlayPositionerProps } from "@aria-ui/overlay";

//#region src/components/inline-popover/inline-popover/types.d.ts
interface InlinePopoverProps extends Omit<OverlayPositionerProps, "placement" | "offset" | "hide" | "overlap" | "inline" | "overflowPadding"> {
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
  * When `defaultOpen` is true, the popover will open or close based on the
  * inline selection. When `defaultOpen` is false, the popover will never be
  * opened unless the `open` prop is true.
  *
  * @default true
  */
  defaultOpen: boolean;
  /**
  * Whether the popover is open.
  *
  * Notice that the popover will be always hidden if the inline selection is
  * empty.
  *
  * @default false
  */
  open: boolean;
  /**
  * Whether the inline popover should be dismissed when the editor receives an
  * Escape key press.
  *
  * @default true
  */
  dismissOnEscape: boolean;
  /**
  * @default "top"
  */
  placement: OverlayPositionerProps["placement"];
  /**
  * @default 12
  */
  offset: OverlayPositionerProps["offset"];
  /**
  * @default true
  */
  hide: OverlayPositionerProps["hide"];
  /**
  * @default true
  */
  overlap: OverlayPositionerProps["overlap"];
  /**
  * @default true
  */
  inline: OverlayPositionerProps["inline"];
  /**
  * @default 8
  */
  overflowPadding: OverlayPositionerProps["overflowPadding"];
}
/** @internal */
declare const inlinePopoverProps: PropDeclarations<InlinePopoverProps>;
interface InlinePopoverEvents extends OverlayPositionerEvents {
  /**
  * Fired when the open state changes.
  */
  openChange: CustomEvent<boolean>;
}
/** @internal */
declare const inlinePopoverEvents: EventDeclarations<InlinePopoverEvents>; //#endregion
//#region src/components/inline-popover/inline-popover/element.gen.d.ts
declare const InlinePopoverElementBase: BaseElementConstructor<InlinePopoverProps>;
declare class InlinePopoverElement extends InlinePopoverElementBase {}

//#endregion
export { InlinePopoverElement, InlinePopoverEvents, InlinePopoverProps, inlinePopoverEvents, inlinePopoverProps };