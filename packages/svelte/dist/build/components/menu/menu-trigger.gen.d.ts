import type { MenuTriggerElement, MenuTriggerProps as MenuTriggerElementProps } from '@prosekit/web/menu';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link MenuTrigger} Svelte component. */
export interface MenuTriggerProps {
    /**
     * Whether the component should ignore user interaction.
     *
     * @default false
     */
    disabled?: MenuTriggerElementProps['disabled'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-menu-trigger` custom element. */
export declare const MenuTrigger: Component<MenuTriggerProps & HTMLAttributes<MenuTriggerElement>>;
//# sourceMappingURL=menu-trigger.gen.d.ts.map