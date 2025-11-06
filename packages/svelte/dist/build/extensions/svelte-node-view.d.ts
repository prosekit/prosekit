import { type Extension } from '@prosekit/core';
import type { NodeViewConstructor } from '@prosekit/pm/view';
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core';
import type { NodeViewContext, SvelteNodeViewUserOptions } from '@prosemirror-adapter/svelte';
import type { Component } from 'svelte';
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
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export declare function defineSvelteNodeView(options: SvelteNodeViewOptions): Extension;
export declare function defineSvelteNodeViewFactory(factory: (options: SvelteNodeViewUserOptions) => NodeViewConstructor): Extension;
//# sourceMappingURL=svelte-node-view.d.ts.map