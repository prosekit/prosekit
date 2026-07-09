import { type Extension } from '@prosekit/core';
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core';
import { type MarkViewContext, type SvelteRendererResult } from '@prosemirror-adapter/svelte';
import { type Component } from 'svelte';
export interface SvelteMarkViewProps extends MarkViewContext {
}
export type SvelteMarkViewComponent = Component<SvelteMarkViewProps>;
/**
 * Options for {@link defineSvelteMarkView}.
 */
export interface SvelteMarkViewOptions extends CoreMarkViewUserOptions<SvelteMarkViewComponent> {
    /**
     * The name of the mark type.
     */
    name: string;
}
/**
 * @internal
 */
export declare function defineSvelteMarkViewFactory(renderSvelteRenderer: SvelteRendererResult['renderSvelteRenderer'], removeSvelteRenderer: SvelteRendererResult['removeSvelteRenderer'], context: Map<any, any>): Extension;
/**
 * Defines a mark view using a Svelte component.
 */
export declare function defineSvelteMarkView(options: SvelteMarkViewOptions): Extension;
//# sourceMappingURL=svelte-mark-view.d.ts.map