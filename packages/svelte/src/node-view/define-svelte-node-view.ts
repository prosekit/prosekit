import { defineNodeViewComponent, type Extension } from '@prosekit/core'
import type { SvelteNodeViewUserOptions } from '@prosemirror-adapter/svelte'
import type { ComponentConstructorOptions } from 'svelte'

import { NodeViewWrapper } from '../components/node-view-wrapper'

import type { SvelteNodeViewOptions } from './types'

/**
 * Defines a node view using a Svelte component.
 *
 * @public
 */
export function defineSvelteNodeView(
  options: SvelteNodeViewOptions,
): Extension {
  const { name, component, ...userOptions } = options

  const args: SvelteNodeViewUserOptions = {
    ...userOptions,
    component: class NodeViewPropsWrapper extends NodeViewWrapper {
      constructor(options: ComponentConstructorOptions) {
        super({
          ...options,
          props: { ...options.props, component },
        })
      }
    },
  }

  return defineNodeViewComponent<SvelteNodeViewUserOptions>({
    group: 'svelte',
    name,
    args,
  })
}
