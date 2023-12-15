/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { _getId } from '@prosekit/core'
import { CoreNodeView } from '@prosemirror-adapter/core'
import { createElement, type ComponentType } from 'react'
import { createPortal } from 'react-dom'

import type { ReactRenderer } from '../react-renderer'

import type { ReactNodeViewComponent } from './react-node-view-options'
import type { ReactNodeViewProps } from './react-node-view-props'

export class ReactNodeView
  extends CoreNodeView<ReactNodeViewComponent>
  implements ReactRenderer<ReactNodeViewProps>
{
  key: string = _getId()

  context: ReactNodeViewProps = {
    contentRef: (element: HTMLElement | null) => {
      if (element && this.contentDOM && element.firstChild !== this.contentDOM)
        element.appendChild(this.contentDOM)
    },
    view: this.view,
    getPos: this.getPos,
    setAttrs: this.setAttrs,

    node: this.node,
    selected: this.selected,
    decorations: this.decorations,
    innerDecorations: this.innerDecorations,
  }

  updateContext = () => {
    Object.assign(this.context, {
      node: this.node,
      selected: this.selected,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
    })
  }

  render = () => {
    const UserComponent: ComponentType<ReactNodeViewProps> = this.component

    return createPortal(
      createElement(UserComponent, this.context),
      this.dom,
      this.key,
    )
  }
}
