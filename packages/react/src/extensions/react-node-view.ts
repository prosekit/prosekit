import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractReactNodeView,
  buildReactNodeViewCreator,
  type NodeViewContext,
  type ReactRendererResult,
} from '@prosemirror-adapter/react'
import { createElement, type ComponentType, type ReactPortal } from 'react'
import { createPortal } from 'react-dom'

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

class ProseKitReactNodeView extends AbstractReactNodeView<ReactNodeViewComponent> {
  render = (): ReactPortal => {
    const UserComponent = this.component
    const props = { ...this.context }
    return createPortal(
      createElement(UserComponent, props),
      this.dom,
      this.key,
    )
  }
}

/**
 * @internal
 */
export function defineReactNodeViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): Extension {
  const factory = buildReactNodeViewCreator(renderReactRenderer, removeReactRenderer, ProseKitReactNodeView)
  return defineNodeViewFactory<ReactNodeViewOptions>({
    group: 'react',
    factory,
  })
}

/**
 * Defines a node view using a React component.
 *
 * @public
 */
export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  return defineNodeViewComponent<ReactNodeViewOptions>({
    group: 'react',
    name: options.name,
    args: options,
  })
}
