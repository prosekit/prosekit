import type { TableHandleRowMenuTriggerElement, TableHandleRowMenuTriggerProps as TableHandleRowMenuTriggerElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleRowMenuTrigger} Svelte component. */
export interface TableHandleRowMenuTriggerProps {
    /**
     * @default null
     * @hidden
     */
    editor?: TableHandleRowMenuTriggerElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-row-menu-trigger` custom element. */
export declare const TableHandleRowMenuTrigger: Component<TableHandleRowMenuTriggerProps & HTMLAttributes<TableHandleRowMenuTriggerElement>>;
//# sourceMappingURL=table-handle-row-menu-trigger.gen.d.ts.map