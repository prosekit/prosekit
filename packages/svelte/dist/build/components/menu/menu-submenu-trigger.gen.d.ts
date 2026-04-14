import type { MenuSubmenuTriggerElement, MenuSubmenuTriggerProps as MenuSubmenuTriggerElementProps } from '@prosekit/web/menu';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link MenuSubmenuTrigger} Svelte component. */
export interface MenuSubmenuTriggerProps {
    /**
     * The unique value for this submenu trigger in the parent menu.
     *
     * @default ""
     */
    value?: MenuSubmenuTriggerElementProps['value'];
    /**
     * Whether this submenu trigger is disabled.
     *
     * @default false
     */
    disabled?: MenuSubmenuTriggerElementProps['disabled'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-menu-submenu-trigger` custom element. */
export declare const MenuSubmenuTrigger: Component<MenuSubmenuTriggerProps & HTMLAttributes<MenuSubmenuTriggerElement>>;
//# sourceMappingURL=menu-submenu-trigger.gen.d.ts.map