import TooltipRootComponent from "./tooltip-root.gen.svelte";
import {
  type TooltipRootEvents as TooltipRootElementEvents,
  type TooltipRootProps as TooltipRootElementProps,
} from "../../tooltip/index.ts";
import type { Component, Snippet } from "svelte";

/** Props for the {@link TooltipRoot} Svelte component. */
export interface TooltipRootProps {
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: TooltipRootElementProps["defaultOpen"];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: TooltipRootElementProps["open"];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: TooltipRootElementProps["disabled"];
  /** Emitted when the tooltip is opened or closed. */
  onOpenChange?: (event: TooltipRootElementEvents["openChange"]) => void;
  children?: Snippet;
}

export const TooltipRoot: Component<TooltipRootProps> = TooltipRootComponent;
