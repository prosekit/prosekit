import PopoverRootComponent from "./popover-root.gen.svelte";
import {
  type PopoverRootEvents as PopoverRootElementEvents,
  type PopoverRootProps as PopoverRootElementProps,
} from "../../popover/index.ts";
import type { Component, Snippet } from "svelte";

/**
 * Props for the {@link PopoverRoot} Svelte component.
 *
 * @public
 */
export interface PopoverRootProps {
  /**
   * Whether the popover should be modal.
   * When true, the popover will trap focus and prevent interaction with the rest of the page.
   *
   * @default false
   */
  modal?: PopoverRootElementProps["modal"];
  /**
   * Whether the overlay is initially open.
   * @default false
   */
  defaultOpen?: PopoverRootElementProps["defaultOpen"];
  /**
   * Whether the overlay is currently open.
   * @default null
   */
  open?: PopoverRootElementProps["open"];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: PopoverRootElementProps["disabled"];
  /** Emitted when the popover is opened or closed. */
  onOpenChange?: (event: PopoverRootElementEvents["openChange"]) => void;
  children?: Snippet;
}

/**
 * A Svelte component that renders an `aria-ui-popover-root` custom element.
 *
 * @public
 */
export const PopoverRoot: Component<PopoverRootProps> = PopoverRootComponent;
