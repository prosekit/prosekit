import type { TableHandleRowMenuRootElement, TableHandleRowMenuRootProps as TableHandleRowMenuRootElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleRowMenuRoot} Svelte component. */
export interface TableHandleRowMenuRootProps {
    /**
     * Whether the overlay is initially open.
     * @default false
     */
    defaultOpen?: TableHandleRowMenuRootElementProps['defaultOpen'];
    /**
     * Whether the overlay is currently open.
     * @default null
     */
    open?: TableHandleRowMenuRootElementProps['open'];
    /**
     * Whether the component should ignore user interaction.
     * @default false
     */
    disabled?: TableHandleRowMenuRootElementProps['disabled'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-row-menu-root` custom element. */
export declare const TableHandleRowMenuRoot: Component<TableHandleRowMenuRootProps & HTMLAttributes<TableHandleRowMenuRootElement>>;
//# sourceMappingURL=table-handle-row-menu-root.gen.d.ts.map