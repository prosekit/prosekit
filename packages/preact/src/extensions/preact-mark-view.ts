import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractPreactMarkView,
  buildPreactMarkViewCreator,
  type MarkViewContext,
  type PreactRendererResult,
} from '@prosemirror-adapter/preact'
import { createElement, type ComponentType } from 'preact'
import { createPortal } from 'preact/compat'

export interface PreactMarkViewProps extends MarkViewContext {}

export type PreactMarkViewComponent = ComponentType<PreactMarkViewProps>

/**
 * Options for {@link definePreactMarkView}.
 */
export interface PreactMarkViewOptions extends CoreMarkViewUserOptions<PreactMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

class ProseKitPreactMarkView extends AbstractPreactMarkView<PreactMarkViewComponent> {
  render = () => {
    const UserComponent = this.component
    const props = { ...this.context }
    return createPortal(
      createElement(UserComponent, props),
      this.dom,
    )
  }
}

/**
 * @internal
 */
export function definePreactMarkViewFactory(
  renderPreactRenderer: PreactRendererResult['renderPreactRenderer'],
  removePreactRenderer: PreactRendererResult['removePreactRenderer'],
): Extension {
  const factory = buildPreactMarkViewCreator(renderPreactRenderer, removePreactRenderer, ProseKitPreactMarkView)
  return defineMarkViewFactory<PreactMarkViewOptions>({
    group: 'preact',
    factory,
  })
}

/**
 * Defines a mark view using a Preact component.
 */
export function definePreactMarkView(options: PreactMarkViewOptions): Extension {
  return defineMarkViewComponent<PreactMarkViewOptions>({
    group: 'preact',
    name: options.name,
    args: options,
  })
}
