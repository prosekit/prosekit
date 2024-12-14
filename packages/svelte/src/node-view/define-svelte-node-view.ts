import {
  defineNodeViewComponent,
  definePlugin,
  type Extension,
} from '@prosekit/core'
import type { SvelteNodeViewUserOptions } from '@prosemirror-adapter/svelte'
import type { Component } from 'svelte'

import { NodeViewWrapper } from '../components/node-view-wrapper'

import type {
  SvelteNodeViewComponent,
  SvelteNodeViewOptions,
} from './types'

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
