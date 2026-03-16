import {
  registerPopoverRootElement,
  type PopoverRootElement,
  type PopoverRootEvents as PopoverRootElementEvents,
  type PopoverRootProps as PopoverRootElementProps,
} from "../../popover/index.ts";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/** Props for the {@link PopoverRoot} Solid component. */
export interface PopoverRootProps extends JSX.HTMLAttributes<PopoverRootElement> {
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

export const PopoverRoot: Component<PopoverRootProps> = (props): any => {
  registerPopoverRootElement();

  const [elementProps, eventHandlers, restProps] = splitProps(
    props,
    ["defaultOpen", "open", "modal", "disabled"],
    ["onOpenChange"],
  );

  return h(
    "aria-ui-popover-root",
    mergeProps(restProps, {
      "prop:defaultOpen": () => elementProps.defaultOpen,
      "prop:open": () => elementProps.open,
      "prop:modal": () => elementProps.modal,
      "prop:disabled": () => elementProps.disabled,
      "on:openChange": (event: PopoverRootElementEvents["openChange"]) =>
        eventHandlers.onOpenChange?.(event),
    }),
  );
};
