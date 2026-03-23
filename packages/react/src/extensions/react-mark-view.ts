import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractReactMarkView,
  buildReactMarkViewCreator,
  type MarkViewContext,
  type ReactRendererResult,
} from '@prosemirror-adapter/react'
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

class ProseKitReactMarkView extends AbstractReactMarkView<ReactMarkViewComponent> {
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
export function defineReactMarkViewFactory(
  renderReactRenderer: ReactRendererResult['renderReactRenderer'],
  removeReactRenderer: ReactRendererResult['removeReactRenderer'],
): Extension {
  const factory = buildReactMarkViewCreator(renderReactRenderer, removeReactRenderer, ProseKitReactMarkView)
  return defineMarkViewFactory<ReactMarkViewOptions>({
    group: 'react',
    factory,
  })
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
