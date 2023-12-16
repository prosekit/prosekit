import {
  defineNodeViewFactory,
  type BaseNodeViewOptions,
  type Extension,
} from '@prosekit/core'

import type { NodeViewFactory } from '../views/node-view/node-view-context'
import type {
  ReactNodeViewComponent,
  ReactNodeViewUserOptions,
} from '../views/node-view/react-node-view-options'

/**
 * Options for {@link defineReactNodeView}.
 *
 * @public
 */
export interface ReactNodeViewOptions extends BaseNodeViewOptions {
  /**
   * The name of the node type.
   */
  name: string

  /**
   * The React component to render the node.
   */
  component: ReactNodeViewComponent
}

/**
 * Defines a node view using a React component.
 *
 * @public
 */
export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  const { name, ...userOptions } = options

  return defineNodeViewFactory<ReactNodeViewUserOptions>({
    group: 'react',
    name,
    args: userOptions,
  })
}

/**
 * @internal
 */
export function defineReactNodeViewFactory(nodeViewFactory: NodeViewFactory) {
  return defineNodeViewFactory<ReactNodeViewUserOptions>({
    group: 'react',
    factory: nodeViewFactory,
  })
}
