import PopoverPopupComponent from "./popover-popup.gen.svelte";
import type { Component, Snippet } from "svelte";

/** Props for the {@link PopoverPopup} Svelte component. */
export interface PopoverPopupProps {
  children?: Snippet;
}

export const PopoverPopup: Component<PopoverPopupProps> = PopoverPopupComponent;
