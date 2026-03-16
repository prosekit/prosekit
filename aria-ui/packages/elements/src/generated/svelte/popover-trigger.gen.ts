import PopoverTriggerComponent from "./popover-trigger.gen.svelte";
import {
  type PopoverTriggerEvents as PopoverTriggerElementEvents,
  type PopoverTriggerProps as PopoverTriggerElementProps,
} from "../../popover/index.ts";
import type { Component, Snippet } from "svelte";

/** Props for the {@link PopoverTrigger} Svelte component. */
export interface PopoverTriggerProps {
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
  children?: Snippet;
}

export const PopoverTrigger: Component<PopoverTriggerProps> =
  PopoverTriggerComponent;
