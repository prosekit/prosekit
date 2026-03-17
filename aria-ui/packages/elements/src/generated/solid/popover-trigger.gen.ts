import {
  registerPopoverTriggerElement,
  type PopoverTriggerElement,
  type PopoverTriggerEvents as PopoverTriggerElementEvents,
  type PopoverTriggerProps as PopoverTriggerElementProps,
} from "../../popover/index.ts";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/**
 * Props for the {@link PopoverTrigger} Solid component.
 *
 * @public
 */
export interface PopoverTriggerProps extends JSX.HTMLAttributes<PopoverTriggerElement> {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverTriggerElementProps["disabled"];
  /**
   * Whether the popover should also open when the trigger is hovered.
   * @default false
   */
  openOnHover?: PopoverTriggerElementProps["openOnHover"];
  /**
   * The delay in milliseconds before opening the popover when hovering.
   * Only applies when `openOnHover` is true.
   * @default 300
   */
  delay?: PopoverTriggerElementProps["delay"];
  /**
   * The delay in milliseconds before closing the popover when hover ends.
   * Only applies when `openOnHover` is true.
   * @default 0
   */
  closeDelay?: PopoverTriggerElementProps["closeDelay"];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverTriggerElementEvents["openChange"]) => void;
}

/**
 * A Solid component that renders an `aria-ui-popover-trigger` custom element.
 *
 * @public
 */
export const PopoverTrigger: Component<PopoverTriggerProps> = (props): any => {
  registerPopoverTriggerElement();

  const [elementProps, eventHandlers, restProps] = splitProps(
    props,
    ["disabled", "openOnHover", "delay", "closeDelay"],
    ["onOpenChange"],
  );

  return h(
    "aria-ui-popover-trigger",
    mergeProps(restProps, {
      "prop:disabled": () => elementProps.disabled,
      "prop:openOnHover": () => elementProps.openOnHover,
      "prop:delay": () => elementProps.delay,
      "prop:closeDelay": () => elementProps.closeDelay,
      "on:openChange": (event: PopoverTriggerElementEvents["openChange"]) =>
        eventHandlers.onOpenChange?.(event),
    }),
  );
};
