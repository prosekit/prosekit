import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import { useNodeViewContext, useNodeViewFactory, type NodeViewContext, type PreactNodeViewUserOptions } from '@prosemirror-adapter/preact'
import { h, type ComponentType, type FunctionComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import { useExtension } from '../hooks/use-extension.ts'

/**
 * @public
 */
export interface PreactNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type PreactNodeViewComponent = ComponentType<PreactNodeViewProps>

/**
 * Options for {@link definePreactNodeView}.
 *
 * @public
 */
export interface PreactNodeViewOptions extends CoreNodeViewUserOptions<PreactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

function withNodeViewProps(component: PreactNodeViewComponent) {
  return function NodeViewPropsWrapper() {
    const props: PreactNodeViewProps = useNodeViewContext()
    return h(component, props)
  }
}

/**
 * @internal
 */
export const PreactNodeViewConsumer: FunctionComponent = () => {
  const nodeViewFactory = useNodeViewFactory()
  const extension = useMemo(
    () => definePreactNodeViewFactory(nodeViewFactory),
    [nodeViewFactory],
  )
  useExtension(extension)

  return null
}

/**
 * Defines a node view using a Preact component.
 *
 * @public
 */
export function definePreactNodeView(options: PreactNodeViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: PreactNodeViewUserOptions = {
    ...userOptions,
    component: withNodeViewProps(component),
  }

  return defineNodeViewComponent<PreactNodeViewUserOptions>({
    group: 'preact',
    name,
    args,
  })
}

function definePreactNodeViewFactory(
  factory: (options: PreactNodeViewUserOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<PreactNodeViewUserOptions>({
    group: 'preact',
    factory,
  })
}
