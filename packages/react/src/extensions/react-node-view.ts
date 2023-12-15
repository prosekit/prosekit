import { defineNodeViewEffect, type Extension } from '@prosekit/core'

import type { NodeViewFactory } from '../views/node-view/node-view-context'
import type { ReactNodeViewUserOptions } from '../views/node-view/react-node-view-options'

/**
 * Options for {@link defineReactNodeView}.
 *
 * @public
 */
export interface ReactNodeViewOptions extends ReactNodeViewUserOptions {
  /**
   * The name of the node.
   */
  name: string
}

/**
 * Defines a node view using a React component.
 *
 * @public
 */
export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  const { name, ...userOptions } = options

  return defineNodeViewEffect<ReactNodeViewUserOptions>({
    group: 'react',
    name,
    args: userOptions,
  })
}

/**
 * @internal
 */
export function defineReactNodeViewRenderer(nodeViewFactory: NodeViewFactory) {
  return defineNodeViewEffect<ReactNodeViewUserOptions>({
    group: 'react',
    factory: nodeViewFactory,
  })
}
