import { defineNodeViewComponent, defineNodeViewFactory, definePlugin } from '@prosekit/core';
import { AbstractSvelteNodeView, buildSvelteNodeViewCreator, } from '@prosemirror-adapter/svelte';
import { flushSync, mount, unmount } from 'svelte';
const isServer = typeof window === 'undefined';
class ProseKitSvelteNodeView extends AbstractSvelteNodeView {
    constructor() {
        super(...arguments);
        this.render = (options) => {
            const UserComponent = this.component;
            const props = this.context;
            const component = mount(UserComponent, {
                target: this.dom,
                context: options.context,
                props,
            });
            flushSync();
            return () => unmount(component);
        };
    }
}
/**
 * @internal
 */
export function defineSvelteNodeViewFactory(renderSvelteRenderer, removeSvelteRenderer, context) {
    const factory = buildSvelteNodeViewCreator(renderSvelteRenderer, removeSvelteRenderer, ProseKitSvelteNodeView, context);
    return defineNodeViewFactory({
        group: 'svelte',
        factory,
    });
}
/**
 * Defines a node view using a Svelte component.
 */
export function defineSvelteNodeView(options) {
    // Don't register node views on the server
    if (isServer) {
        return definePlugin([]);
    }
    return defineNodeViewComponent({
        group: 'svelte',
        name: options.name,
        args: options,
    });
}
