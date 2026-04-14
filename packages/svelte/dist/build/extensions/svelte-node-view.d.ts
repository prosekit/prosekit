import { type Extension } from '@prosekit/core';
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core';
import { type NodeViewContext, type SvelteRendererResult } from '@prosemirror-adapter/svelte';
import { type Component } from 'svelte';
/**
 * @public
 */
export interface SvelteNodeViewProps extends NodeViewContext {
}
/**
 * @public
 */
export type SvelteNodeViewComponent = Component<SvelteNodeViewProps>;
/**
 * Options for {@link defineSvelteNodeView}.
 *
 * @public
 */
export interface SvelteNodeViewOptions extends CoreNodeViewUserOptions<SvelteNodeViewComponent> {
    /**
     * The name of the node type.
     */
    name: string;
}
/**
 * @internal
 */
export declare function defineSvelteNodeViewFactory(renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'], removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'], context: Map<any, any>): Extension;
/**
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export declare function defineSvelteNodeView(options: SvelteNodeViewOptions): Extension;
//# sourceMappingURL=svelte-node-view.d.ts.map