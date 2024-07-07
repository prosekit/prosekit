import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type BaseNodeViewOptions,
  type Extension,
} from '@prosekit/core'

import type { NodeViewFactory } from '../views/node-view/node-view-context'
import type {
  VueNodeViewComponent,
  VueNodeViewUserOptions,
} from '../views/node-view/vue-node-view-options'

/**
 * Options for {@link defineVueNodeView}.
 *
 * @public
 */
export interface VueNodeViewOptions extends BaseNodeViewOptions {
  /**
   * The name of the node type.
   */
  name: string

  /**
   * The Vue component to render the node.
   */
  component: VueNodeViewComponent
}

/**
 * Defines a node view using a Vue component.
 *
 * @public
 */
export function defineVueNodeView(options: VueNodeViewOptions): Extension {
  const { name, ...userOptions } = options

  return defineNodeViewComponent<VueNodeViewUserOptions>({
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
