import TooltipPopupComponent from "./tooltip-popup.gen.svelte";
import type { Component, Snippet } from "svelte";

/** Props for the {@link TooltipPopup} Svelte component. */
export interface TooltipPopupProps {
  children?: Snippet;
}

export const TooltipPopup: Component<TooltipPopupProps> = TooltipPopupComponent;
