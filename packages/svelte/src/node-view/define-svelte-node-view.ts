import {
  type Extension,
  defineNodeViewComponent,
  definePlugin,
} from '@prosekit/core'
import type { SvelteNodeViewUserOptions } from '@prosemirror-adapter/svelte'
import type {
  ComponentConstructorOptions,
  ComponentType,
  SvelteComponent,
} from 'svelte'

import { NodeViewWrapper } from '../components/node-view-wrapper'

import type { SvelteNodeViewComponent, SvelteNodeViewOptions } from './types'

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
): ComponentType<SvelteComponent> {
  // `NodeViewWrapper` is an object during SSR
  if (!NodeViewWrapper || typeof NodeViewWrapper !== 'function') {
    return component
  }

  class NodeViewPropsWrapper extends NodeViewWrapper {
    constructor(options: ComponentConstructorOptions) {
      super({ ...options, props: { ...options.props, component } })
    }
  }
  return NodeViewPropsWrapper
}
