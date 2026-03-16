import type { Component, Snippet } from 'svelte'

import PopoverPopupComponent from './popover-popup.gen.svelte'

/** Props for the {@link PopoverPopup} Svelte component. */
export interface PopoverPopupProps {
  children?: Snippet
}

export const PopoverPopup: Component<PopoverPopupProps> = PopoverPopupComponent
