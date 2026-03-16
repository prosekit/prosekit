import {
  registerTooltipTriggerElement,
  type TooltipTriggerElement,
  type TooltipTriggerProps as TooltipTriggerElementProps,
} from "../../tooltip/index.ts";
import { mergeProps, splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";
import h from "solid-js/h";

/** Props for the {@link TooltipTrigger} Solid component. */
export interface TooltipTriggerProps extends JSX.HTMLAttributes<TooltipTriggerElement> {
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipTriggerElementProps["disabled"];
  /**
   * The delay in milliseconds before opening the tooltip on hover.
   * @default 600
   */
  openDelay?: TooltipTriggerElementProps["openDelay"];
  /**
   * The delay in milliseconds before closing the tooltip when hover/focus ends.
   * @default 0
   */
  closeDelay?: TooltipTriggerElementProps["closeDelay"];
}

export const TooltipTrigger: Component<TooltipTriggerProps> = (props): any => {
  registerTooltipTriggerElement();

  const [elementProps, restProps] = splitProps(props, [
    "disabled",
    "openDelay",
    "closeDelay",
  ]);

  return h(
    "aria-ui-tooltip-trigger",
    mergeProps(restProps, {
      "prop:disabled": () => elementProps.disabled,
      "prop:openDelay": () => elementProps.openDelay,
      "prop:closeDelay": () => elementProps.closeDelay,
    }),
  );
};
