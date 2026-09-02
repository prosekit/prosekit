import type { TooltipPopupElement } from '@prosekit/web/tooltip';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TooltipPopup} Svelte component. */
export interface TooltipPopupProps {
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-tooltip-popup` custom element. */
export declare const TooltipPopup: Component<TooltipPopupProps & HTMLAttributes<TooltipPopupElement>>;
//# sourceMappingURL=tooltip-popup.gen.d.ts.map