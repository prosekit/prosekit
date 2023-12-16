/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { _getId } from '@prosekit/core'
import { CoreNodeView } from '@prosemirror-adapter/core'
import { Teleport, defineComponent, h, markRaw, shallowRef } from 'vue'

import type { VueRenderer, VueRendererComponent } from '../vue-renderer'

import type { VueNodeViewComponent } from './vue-node-view-options'
import type { VueNodeViewProps } from './vue-node-view-props'

export class VueNodeView
  extends CoreNodeView<VueNodeViewComponent>
  implements VueRenderer<VueNodeViewProps>
{
  key: string = _getId()

  context: VueNodeViewProps = {
    contentRef: (element) => {
      if (
        element &&
        element instanceof HTMLElement &&
        this.contentDOM &&
        element.firstChild !== this.contentDOM
      )
        element.appendChild(this.contentDOM)
    },
    view: this.view,
    getPos: this.getPos,
    setAttrs: this.setAttrs,

    node: shallowRef(this.node),
    selected: shallowRef(this.selected),
    decorations: shallowRef(this.decorations),
    innerDecorations: shallowRef(this.innerDecorations),
  }

  updateContext = () => {
    Object.entries({
      node: this.node,
      selected: this.selected,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
    }).forEach(([key, value]) => {
      const prev =
        this.context[
          key as 'node' | 'selected' | 'decorations' | 'innerDecorations'
        ]
      if (prev.value !== value) prev.value = value
    })
  }

  render = () => {
    const UserComponent = this.component

    return markRaw(
      defineComponent({
        name: 'ProsemirrorNodeView',
        setup: () => {
          return () =>
            h(
              Teleport,
              {
                key: this.key,
                to: this.dom,
              },
              h(UserComponent, this.context),
            )
        },
      }),
    ) as VueRendererComponent
  }
}
