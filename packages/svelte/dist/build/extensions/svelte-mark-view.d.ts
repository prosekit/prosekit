import { type Extension } from '@prosekit/core';
import type { MarkViewConstructor } from '@prosekit/pm/view';
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core';
import type { MarkViewContext, SvelteMarkViewUserOptions } from '@prosemirror-adapter/svelte';
import type { Component } from 'svelte';
/**
 * @public
 */
export interface SvelteMarkViewProps extends MarkViewContext {
}
/**
 * @public
 */
export type SvelteMarkViewComponent = Component<SvelteMarkViewProps>;
/**
 * Options for {@link defineSvelteMarkView}.
 *
 * @public
 */
export interface SvelteMarkViewOptions extends CoreMarkViewUserOptions<SvelteMarkViewComponent> {
    /**
     * The name of the mark type.
     */
    name: string;
}
/**
 * Defines a mark view using a Svelte component.
 *
 * @public
 */
export declare function defineSvelteMarkView(options: SvelteMarkViewOptions): Extension;
export declare function defineSvelteMarkViewFactory(factory: (options: SvelteMarkViewUserOptions) => MarkViewConstructor): Extension;
//# sourceMappingURL=svelte-mark-view.d.ts.map