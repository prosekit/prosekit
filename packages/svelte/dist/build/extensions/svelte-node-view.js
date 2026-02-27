import { defineNodeViewComponent, defineNodeViewFactory, definePlugin } from '@prosekit/core';
import { NodeViewWrapper } from "../components/node-view-wrapper/index.js";
const isServer = typeof window === 'undefined';
/**
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export function defineSvelteNodeView(options) {
    // Don't register node views on the server
    if (isServer) {
        return definePlugin([]);
    }
    const { name, component, ...userOptions } = options;
    const args = {
        ...userOptions,
        component: wrapComponent(component),
    };
    return defineNodeViewComponent({
        group: 'svelte',
        name,
        args,
    });
}
function wrapComponent(component) {
    // `NodeViewWrapper` is an object during SSR
    if (!NodeViewWrapper || typeof NodeViewWrapper !== 'function') {
        return component;
    }
    const NodeViewPropsWrapper = (internals, props) => {
        return NodeViewWrapper(internals, { ...props, component });
    };
    return NodeViewPropsWrapper;
}
export function defineSvelteNodeViewFactory(factory) {
    return defineNodeViewFactory({
        group: 'svelte',
        factory,
    });
}
