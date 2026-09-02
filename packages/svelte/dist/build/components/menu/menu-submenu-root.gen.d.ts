import type { MenuSubmenuRootElement, MenuSubmenuRootEvents, MenuSubmenuRootProps as MenuSubmenuRootElementProps } from '@prosekit/web/menu';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link MenuSubmenuRoot} Svelte component. */
export interface MenuSubmenuRootProps {
    /**
     * Whether the overlay is initially open.
     * @default false
     */
    defaultOpen?: MenuSubmenuRootElementProps['defaultOpen'];
    /**
     * Whether the overlay is currently open.
     * @default null
     */
    open?: MenuSubmenuRootElementProps['open'];
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: MenuSubmenuRootElementProps['disabled'];
    /** Emitted when the submenu is opened or closed. */
    onOpenChange?: (event: MenuSubmenuRootEvents['openChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-menu-submenu-root` custom element. */
export declare const MenuSubmenuRoot: Component<MenuSubmenuRootProps & HTMLAttributes<MenuSubmenuRootElement>>;
//# sourceMappingURL=menu-submenu-root.gen.d.ts.map