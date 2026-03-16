import TooltipTriggerComponent from "./tooltip-trigger.gen.svelte";
import { type TooltipTriggerProps as TooltipTriggerElementProps } from "../../tooltip/index.ts";
import type { Component, Snippet } from "svelte";

/** Props for the {@link TooltipTrigger} Svelte component. */
export interface TooltipTriggerProps {
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
  children?: Snippet;
}

export const TooltipTrigger: Component<TooltipTriggerProps> =
  TooltipTriggerComponent;
