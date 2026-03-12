import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import { ReactHeadlessMarkView, type MarkViewContext, type ReactRenderer, type ReactRendererResult } from '@prosemirror-adapter/react'
import { createElement, type ComponentType, type ReactPortal } from 'react'
import { createPortal } from 'react-dom'

/**
 * @public
 */
export interface ReactMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>

/**
 * Options for {@link defineReactMarkView}.
 *
 * @public
 */
export interface ReactMarkViewOptions extends CoreMarkViewUserOptions<ReactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

/**
 * Defines a mark view using a React component.
 *
 * @public
 */
export function defineReactMarkView(options: ReactMarkViewOptions): Extension {
  return defineMarkViewComponent<ReactMarkViewOptions>({
    group: 'react',
    name: options.name,
    args: options,
  })
}

class ReactMarkView extends ReactHeadlessMarkView<ReactMarkViewComponent> implements ReactRenderer<MarkViewContext> {
  render = (): ReactPortal => {
    const UserComponent = this.component

    return createPortal(
      createElement(UserComponent, this.context),
      this.dom,
      this.key,
    )
  }
}

type ReactMarkViewFactory = (options: ReactMarkViewOptions) => MarkViewConstructor

function createReactMarkViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): ReactMarkViewFactory {
  return (options: ReactMarkViewOptions): MarkViewConstructor => (mark, view, inline) => {
    const markView = new ReactMarkView({
      mark,
      view,
      inline,
      options: {
        ...options,
        destroy() {
          options.destroy?.()
          removeReactRenderer(markView)
        },
      },
    })
    renderReactRenderer(markView, false)

    return markView
  }
}

/**
 * @internal
 */
export function defineReactMarkViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): Extension {
  const factory = createReactMarkViewFactory(renderReactRenderer, removeReactRenderer)
  return defineMarkViewFactory<ReactMarkViewOptions>({ group: 'react', factory })
}
