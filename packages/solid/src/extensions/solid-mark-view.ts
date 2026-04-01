import { defineMarkViewComponent, defineMarkViewFactory, type Extension } from '@prosekit/core'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  AbstractSolidMarkView,
  buildSolidMarkViewCreator,
  type MarkViewContextProps,
  type SolidRendererResult,
} from '@prosemirror-adapter/solid'
import { createComponent, type Component, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'

import { hidePortalDiv } from './helpers.ts'

/**
 * @public
 */
export interface SolidMarkViewProps extends MarkViewContextProps {}

/**
 * @public
 */
export type SolidMarkViewComponent = Component<SolidMarkViewProps>

/**
 * Options for {@link defineSolidMarkView}.
 *
 * @public
 */
export interface SolidMarkViewOptions extends CoreMarkViewUserOptions<SolidMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

class ProseKitSolidMarkView extends AbstractSolidMarkView<SolidMarkViewComponent> {
  render = (): JSX.Element => {
    const UserComponent = this.component
    const getProps: () => SolidMarkViewProps = this.context
    const props: SolidMarkViewProps = {
      get contentRef() {
        return getProps().contentRef
      },
      get view() {
        return getProps().view
      },
      get mark() {
        return getProps().mark
      },
    }
    return createComponent(Portal, {
      mount: this.dom,
      children: createComponent(UserComponent, props),
      ref: hidePortalDiv,
    })
  }
}

/**
 * @internal
 */
export function defineSolidMarkViewFactory(
  renderSolidRenderer: SolidRendererResult['renderSolidRenderer'],
  removeSolidRenderer: SolidRendererResult['removeSolidRenderer'],
): Extension {
  const factory = buildSolidMarkViewCreator(renderSolidRenderer, removeSolidRenderer, ProseKitSolidMarkView)
  return defineMarkViewFactory<SolidMarkViewOptions>({
    group: 'solid',
    factory,
  })
}

/**
 * Defines a mark view using a Solid component.
 *
 * @public
 */
export function defineSolidMarkView(options: SolidMarkViewOptions): Extension {
  return defineMarkViewComponent<SolidMarkViewOptions>({
    group: 'solid',
    name: options.name,
    args: options,
  })
}
