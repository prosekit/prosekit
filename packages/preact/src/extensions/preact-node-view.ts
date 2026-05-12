import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractPreactNodeView,
  buildPreactNodeViewCreator,
  type NodeViewContext,
  type PreactRendererResult,
} from '@prosemirror-adapter/preact'
import { createElement, type ComponentType } from 'preact'
import { createPortal } from 'preact/compat'

export interface PreactNodeViewProps extends NodeViewContext {}

export type PreactNodeViewComponent = ComponentType<PreactNodeViewProps>

/**
 * Options for {@link definePreactNodeView}.
 */
export interface PreactNodeViewOptions extends CoreNodeViewUserOptions<PreactNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

class ProseKitPreactNodeView extends AbstractPreactNodeView<PreactNodeViewComponent> {
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
export function definePreactNodeViewFactory(
  renderPreactRenderer: PreactRendererResult['renderPreactRenderer'],
  removePreactRenderer: PreactRendererResult['removePreactRenderer'],
): Extension {
  const factory = buildPreactNodeViewCreator(renderPreactRenderer, removePreactRenderer, ProseKitPreactNodeView)
  return defineNodeViewFactory<PreactNodeViewOptions>({
    group: 'preact',
    factory,
  })
}

/**
 * Defines a node view using a Preact component.
 */
export function definePreactNodeView(options: PreactNodeViewOptions): Extension {
  return defineNodeViewComponent<PreactNodeViewOptions>({
    group: 'preact',
    name: options.name,
    args: options,
  })
}
