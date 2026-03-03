import { defineMarkViewComponent, defineMarkViewFactory, definePlugin } from '@prosekit/core';
import { MarkViewWrapper } from "../components/mark-view-wrapper/index.js";
const isServer = typeof window === 'undefined';
/**
 * Defines a mark view using a Svelte component.
 *
 * @public
 */
export function defineSvelteMarkView(options) {
    // Don't register mark views on the server
    if (isServer) {
        return definePlugin([]);
    }
    const { name, component, ...userOptions } = options;
    const args = {
        ...userOptions,
        component: wrapComponent(component),
    };
    return defineMarkViewComponent({
        group: 'svelte',
        name,
        args,
    });
}
function wrapComponent(component) {
    // `MarkViewWrapper` is an object during SSR
    if (!MarkViewWrapper || typeof MarkViewWrapper !== 'function') {
        return component;
    }
    const MarkViewPropsWrapper = (internals, props) => {
        return MarkViewWrapper(internals, { ...props, component });
    };
    return MarkViewPropsWrapper;
}
export function defineSvelteMarkViewFactory(factory) {
    return defineMarkViewFactory({
        group: 'svelte',
        factory,
    });
}
