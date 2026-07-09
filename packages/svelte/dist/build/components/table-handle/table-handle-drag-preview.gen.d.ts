import type { TableHandleDragPreviewElement, TableHandleDragPreviewProps as TableHandleDragPreviewElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleDragPreview} Svelte component. */
export interface TableHandleDragPreviewProps {
    /**
     * @default null
     * @hidden
     */
    editor?: TableHandleDragPreviewElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-drag-preview` custom element. */
export declare const TableHandleDragPreview: Component<TableHandleDragPreviewProps & HTMLAttributes<TableHandleDragPreviewElement>>;
//# sourceMappingURL=table-handle-drag-preview.gen.d.ts.map