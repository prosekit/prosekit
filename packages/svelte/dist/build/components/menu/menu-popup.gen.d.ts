import type { MenuPopupElement, MenuPopupProps as MenuPopupElementProps } from '@prosekit/web/menu';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link MenuPopup} Svelte component. */
export interface MenuPopupProps {
    /**
     * By default, the MenuPopup element will listen for keydown events.
     * You can pass a different element to listen for keydown events.
     *
     * @default null
     */
    eventTarget?: MenuPopupElementProps['eventTarget'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-menu-popup` custom element. */
export declare const MenuPopup: Component<MenuPopupProps & HTMLAttributes<MenuPopupElement>>;
//# sourceMappingURL=menu-popup.gen.d.ts.map