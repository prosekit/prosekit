import { defineNodeViewFactory, type Extension } from '@prosekit/core'

import type { NodeViewFactory } from '../views/node-view/node-view-context'
import type { VueNodeViewUserOptions } from '../views/node-view/vue-node-view-options'

/**
 * Options for {@link defineVueNodeView}.
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

  return defineNodeViewFactory<VueNodeViewUserOptions>({
    group: 'vue',
    name,
    args: userOptions,
  })
}

/**
 * @internal
 */
export function defineVueNodeViewFactory(nodeViewFactory: NodeViewFactory) {
  return defineNodeViewFactory<VueNodeViewUserOptions>({
    group: 'vue',
    factory: nodeViewFactory,
  })
}
