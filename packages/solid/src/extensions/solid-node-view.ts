import { defineNodeViewComponent, defineNodeViewFactory, type Extension } from '@prosekit/core'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractSolidNodeView,
  buildSolidNodeViewCreator,
  type NodeViewContextProps,
  type SolidRendererResult,
} from '@prosemirror-adapter/solid'
import { createComponent, type Component, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'

import { hidePortalDiv } from './helpers.ts'

/**
 * @public
 */
export interface SolidNodeViewProps extends NodeViewContextProps {}

/**
 * @public
 */
export type SolidNodeViewComponent = Component<SolidNodeViewProps>

/**
 * Options for {@link defineSolidNodeView}.
 *
 * @public
 */
export interface SolidNodeViewOptions extends CoreNodeViewUserOptions<SolidNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
}

class ProseKitSolidNodeView extends AbstractSolidNodeView<SolidNodeViewComponent> {
  render = (): JSX.Element => {
    const UserComponent = this.component
    const getProps = this.context
    return createComponent(Portal, {
      mount: this.dom,
      get children() {
        const props: SolidNodeViewProps = getProps()
        return createComponent(UserComponent, props)
      },
      ref: hidePortalDiv,
    })
  }
}

/**
 * @internal
 */
export function defineSolidNodeViewFactory(
  renderSolidRenderer: SolidRendererResult['renderSolidRenderer'],
  removeSolidRenderer: SolidRendererResult['removeSolidRenderer'],
): Extension {
  const factory = buildSolidNodeViewCreator(renderSolidRenderer, removeSolidRenderer, ProseKitSolidNodeView)
  return defineNodeViewFactory<SolidNodeViewOptions>({
    group: 'solid',
    factory,
  })
}

/**
 * Defines a node view using a Solid component.
 *
 * @public
 */
export function defineSolidNodeView(options: SolidNodeViewOptions): Extension {
  return defineNodeViewComponent<SolidNodeViewOptions>({
    group: 'solid',
    name: options.name,
    args: options,
  })
}
