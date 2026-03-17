import TooltipPopupComponent from "./tooltip-popup.gen.svelte";
import type { Component, Snippet } from "svelte";

/**
 * Props for the {@link TooltipPopup} Svelte component.
 *
 * @public
 */
export interface TooltipPopupProps {
  children?: Snippet;
}

/**
 * A Svelte component that renders an `aria-ui-tooltip-popup` custom element.
 *
 * @public
 */
export const TooltipPopup: Component<TooltipPopupProps> = TooltipPopupComponent;
