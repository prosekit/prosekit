import type { TableHandleDropIndicatorElement, TableHandleDropIndicatorProps as TableHandleDropIndicatorElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleDropIndicator} Svelte component. */
export interface TableHandleDropIndicatorProps {
    /**
     * @default null
     * @hidden
     */
    editor?: TableHandleDropIndicatorElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-drop-indicator` custom element. */
export declare const TableHandleDropIndicator: Component<TableHandleDropIndicatorProps & HTMLAttributes<TableHandleDropIndicatorElement>>;
//# sourceMappingURL=table-handle-drop-indicator.gen.d.ts.map