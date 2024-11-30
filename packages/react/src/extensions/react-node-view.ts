import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type BaseNodeViewOptions,
  type Extension,
} from '@prosekit/core'
import type {
  Attrs,
  ProseMirrorNode,
} from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
  NodeViewConstructor,
} from '@prosekit/pm/view'
import {
  useNodeViewContext,
  useNodeViewFactory,
  type ReactNodeViewUserOptions,
} from '@prosemirror-adapter/react'
import {
  createElement,
  useMemo,
  type ComponentType,
  type FC,
} from 'react'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface ReactNodeViewProps {
  // won't change
  contentRef: (node: HTMLElement | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: ProseMirrorNode
  selected: boolean
  decorations: readonly Decoration[]
  innerDecorations: DecorationSource
}

/**
 * @public
 */
export type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>

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

function withNodeViewProps(component: ReactNodeViewComponent) {
  return function NodeViewPropsWrapper() {
    const props: ReactNodeViewProps = useNodeViewContext()
    return createElement(component, props)
  }
}

/**
 * @internal
 */
export const ReactViewsConsumer: FC = () => {
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
