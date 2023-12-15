import { defineNodeViewEffect, type Extension } from '@prosekit/core'

import type { NodeViewFactory } from '../views/node-view/node-view-context'
import type { VueNodeViewUserOptions } from '../views/node-view/vue-node-view-options'

/**
 * Options for {@link defineReactNodeView}.
 *
 * @public
 */
export interface VueNodeViewOptions extends VueNodeViewUserOptions {
  /**
   * The name of the node.
   */
  name: string
}

/**
 * Defines a node view using a Vue component.
 *
 * @public
 */
export function defineVueNodeView(options: VueNodeViewOptions): Extension {
  const { name, ...userOptions } = options

  return defineNodeViewEffect<VueNodeViewUserOptions>({
    group: 'vue',
    name,
    args: userOptions,
  })
}

/**
 * @internal
 */
export function defineVueNodeViewRenderer(nodeViewFactory: NodeViewFactory) {
  return defineNodeViewEffect<VueNodeViewUserOptions>({
    group: 'vue',
    factory: nodeViewFactory,
  })
}
