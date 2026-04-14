import type { TableHandleColumnMenuTriggerElement, TableHandleColumnMenuTriggerProps as TableHandleColumnMenuTriggerElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleColumnMenuTrigger} Svelte component. */
export interface TableHandleColumnMenuTriggerProps {
    /**
     * @default null
     * @hidden
     */
    editor?: TableHandleColumnMenuTriggerElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-column-menu-trigger` custom element. */
export declare const TableHandleColumnMenuTrigger: Component<TableHandleColumnMenuTriggerProps & HTMLAttributes<TableHandleColumnMenuTriggerElement>>;
//# sourceMappingURL=table-handle-column-menu-trigger.gen.d.ts.map