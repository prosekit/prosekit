import type { TableHandleRootElement, TableHandleRootProps as TableHandleRootElementProps } from '@prosekit/web/table-handle';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link TableHandleRoot} Svelte component. */
export interface TableHandleRootProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: TableHandleRootElementProps['editor'];
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-table-handle-root` custom element. */
export declare const TableHandleRoot: Component<TableHandleRootProps & HTMLAttributes<TableHandleRootElement>>;
//# sourceMappingURL=table-handle-root.gen.d.ts.map