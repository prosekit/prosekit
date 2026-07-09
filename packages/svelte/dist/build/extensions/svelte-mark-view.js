import { defineMarkViewComponent, defineMarkViewFactory, definePlugin } from '@prosekit/core';
import { AbstractSvelteMarkView, buildSvelteMarkViewCreator, } from '@prosemirror-adapter/svelte';
import { flushSync, mount, unmount } from 'svelte';
const isServer = typeof window === 'undefined';
class ProseKitSvelteMarkView extends AbstractSvelteMarkView {
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
export function defineSvelteMarkViewFactory(renderSvelteRenderer, removeSvelteRenderer, context) {
    const factory = buildSvelteMarkViewCreator(renderSvelteRenderer, removeSvelteRenderer, ProseKitSvelteMarkView, context);
    return defineMarkViewFactory({
        group: 'svelte',
        factory,
    });
}
/**
 * Defines a mark view using a Svelte component.
 */
export function defineSvelteMarkView(options) {
    // Don't register mark views on the server
    if (isServer) {
        return definePlugin([]);
    }
    return defineMarkViewComponent({
        group: 'svelte',
        name: options.name,
        args: options,
    });
}
