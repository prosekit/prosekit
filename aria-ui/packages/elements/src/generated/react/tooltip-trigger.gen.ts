import { createComponent } from "@aria-ui-v2/integrations/react";
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import {
  registerTooltipTriggerElement,
  type TooltipTriggerElement,
  type TooltipTriggerProps as TooltipTriggerElementProps,
} from "../../tooltip/index.ts";

/** Props for the {@link TooltipTrigger} React component. */
export interface TooltipTriggerProps extends HTMLAttributes<TooltipTriggerElement> {
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

const propNames: string[] = ["disabled", "openDelay", "closeDelay"];
const eventHandlersMap: Record<string, string> = {};
export const TooltipTrigger: ForwardRefExoticComponent<
  TooltipTriggerProps & RefAttributes<TooltipTriggerElement>
> = /* @__PURE__ */ createComponent(
  "aria-ui-tooltip-trigger",
  "TooltipTrigger",
  propNames,
  eventHandlersMap,
  registerTooltipTriggerElement,
);
