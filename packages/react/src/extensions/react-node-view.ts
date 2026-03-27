import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import { useNodeViewContext, useNodeViewFactory, type NodeViewContext, type ReactNodeViewUserOptions } from '@prosemirror-adapter/react'
import { createElement, useMemo, type ComponentType, type FC } from 'react'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface ReactNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>

/**
 * Options for {@link defineReactNodeView}.
 *
 * @public
 */
export interface ReactNodeViewOptions extends CoreNodeViewUserOptions<ReactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

function withNodeViewProps(component: ReactNodeViewComponent) {
  return function NodeViewPropsWrapper() {
    const props: ReactNodeViewProps = useNodeViewContext()
    return createElement(component, props)
  }
}

/**
 * @internal
 */
export const ReactNodeViewConsumer: FC = () => {
  const nodeViewFactory = useNodeViewFactory()
  const extension = useMemo(
    () => defineReactNodeViewFactory(nodeViewFactory),
    [nodeViewFactory],
  )
  useExtension(extension)

  return null
}

/**
 * Defines a node view using a React component.
 *
 * @public
 */
export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: ReactNodeViewUserOptions = {
    ...userOptions,
    component: withNodeViewProps(component),
  }

  return defineNodeViewComponent<ReactNodeViewUserOptions>({
    group: 'react',
    name,
    args,
  })
}

function defineReactNodeViewFactory(
  factory: (options: ReactNodeViewUserOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<ReactNodeViewUserOptions>({
    group: 'react',
    factory,
  })
}
