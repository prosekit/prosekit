import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import type { NodeViewContext, ReactRenderer, ReactRendererResult } from '@prosemirror-adapter/react'
import { ReactHeadlessNodeView } from '@prosemirror-adapter/react'
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

class ReactNodeView extends ReactHeadlessNodeView<ReactNodeViewComponent> implements ReactRenderer<NodeViewContext> {
  render = (): ReactPortal => {
    const UserComponent = this.component

    return createPortal(
      createElement(UserComponent, this.context),
      this.dom,
      this.key,
    )
  }
}

type ReactNodeViewFactory = (options: ReactNodeViewOptions) => NodeViewConstructor

function createReactNodeViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): ReactNodeViewFactory {
  return (
    (options: ReactNodeViewOptions): NodeViewConstructor => (node, view, getPos, decorations, innerDecorations) => {
      const nodeView = new ReactNodeView({
        node,
        view,
        getPos,
        decorations,
        innerDecorations,
        options: {
          ...options,
          onUpdate() {
            options.onUpdate?.()
            renderReactRenderer(nodeView)
          },
          selectNode() {
            options.selectNode?.()
            renderReactRenderer(nodeView)
          },
          deselectNode() {
            options.deselectNode?.()
            renderReactRenderer(nodeView)
          },
          destroy() {
            options.destroy?.()
            removeReactRenderer(nodeView)
          },
        },
      })

      renderReactRenderer(nodeView, false)

      return nodeView
    }
  )
}

/**
 * @internal
 */
export function defineReactNodeViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): Extension {
  const factory = createReactNodeViewFactory(renderReactRenderer, removeReactRenderer)
  return defineNodeViewFactory<ReactNodeViewOptions>({ group: 'react', factory })
}
