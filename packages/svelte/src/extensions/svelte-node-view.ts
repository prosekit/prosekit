import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  definePlugin,
  type Extension,
} from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type {
  NodeViewContext,
  SvelteNodeViewUserOptions,
} from '@prosemirror-adapter/svelte'
import type { Component } from 'svelte'

import { NodeViewWrapper } from '../components/node-view-wrapper'

/**
 * @public
 */
export interface SvelteNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type SvelteNodeViewComponent = Component<SvelteNodeViewProps>

/**
 * Options for {@link defineSvelteNodeView}.
 *
 * @public
 */
export interface SvelteNodeViewOptions extends CoreNodeViewUserOptions<SvelteNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

const isServer = typeof window === 'undefined'

/**
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export function defineSvelteNodeView(
  options: SvelteNodeViewOptions,
): Extension {
  // Don't register node views on the server
  if (isServer) {
    return definePlugin([])
  }

  const { name, component, ...userOptions } = options

  const args: SvelteNodeViewUserOptions = {
    ...userOptions,
    component: wrapComponent(component),
  }

  return defineNodeViewComponent<SvelteNodeViewUserOptions>({
    group: 'svelte',
    name,
    args,
  })
}

function wrapComponent(
  component: SvelteNodeViewComponent,
): Component<any, any> {
  // `NodeViewWrapper` is an object during SSR
  if (!NodeViewWrapper || typeof NodeViewWrapper !== 'function') {
    return component
  }

  const NodeViewPropsWrapper: Component = (internals, props) => {
    return NodeViewWrapper(internals, { ...props, component })
  }

  return NodeViewPropsWrapper
}

export function defineSvelteNodeViewFactory(
  factory: (options: SvelteNodeViewUserOptions) => NodeViewConstructor,
): Extension {
  return defineNodeViewFactory<SvelteNodeViewUserOptions>({
    group: 'svelte',
    factory,
  })
}
