import PopoverRootComponent from "./popover-root.gen.svelte";
import type {
  PopoverRootEvents as PopoverRootElementEvents,
  PopoverRootProps as PopoverRootElementProps,
} from "../../popover/popover-root";
import type { Component, Snippet } from "svelte";

/** Props for the {@link PopoverRoot} Svelte component. */
export interface PopoverRootProps {
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
   * @default undefined
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
  children?: Snippet;
}

export const PopoverRoot: Component<PopoverRootProps> = PopoverRootComponent;
