import { createComponent } from "@aria-ui-v2/integrations/preact";
import type { HTMLAttributes } from "preact";
import type { ForwardRefExoticComponent, RefAttributes } from "preact/compat";
import {
  registerPopoverRootElement,
  type PopoverRootElement,
  type PopoverRootProps as PopoverRootElementProps,
  type PopoverRootEvents as PopoverRootElementEvents,
} from "../../popover/popover-root";

/** Props for the {@link PopoverRoot} Preact component. */
export interface PopoverRootProps extends HTMLAttributes<PopoverRootElement> {
  /**
   * Whether the popover is initially open.
   *
   * To render a controlled popover, use the `open` property instead.
   * @default false
   */
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  /**
   * Whether the popover is currently open.
   *
   * @default null
   */
  open?: PopoverRootElementProps["open"];
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootElementProps["modal"];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverRootElementProps["disabled"];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
}

const propNames: string[] = ["defaultOpen", "open", "modal", "disabled"];
const eventHandlersMap: Record<string, string> = { onOpenChange: "openChange" };
export const PopoverRoot: ForwardRefExoticComponent<
  PopoverRootProps & RefAttributes<PopoverRootElement>
> = /* @__PURE__ */ createComponent(
  "aria-ui-popover-root",
  "PopoverRoot",
  propNames,
  eventHandlersMap,
  registerPopoverRootElement,
);
