import { ContextConsumer } from '@lit/context'
import type { Editor } from '@prosekit/core'
import { Slice, Fragment } from '@prosekit/pm/model'
import { NodeSelection } from '@prosekit/pm/state'
import type { PropertyDeclarations } from 'lit'

import { useEventListener } from '../../controllers/use-event-listener'
import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { blockPopoverContext } from '../block-popover/context'

export const propNames = ['editor'] as const

export interface DragHandleProps {
  editor: Editor
}

/**
 * @deprecated Please use BlockDragHandle instead.
 */
export class DragHandle extends LightElement {
  /**
   * @hidden
   */
  static properties = {
    editor: { type: Object, reflect: false, attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor

  private blockPopoverContext = new ContextConsumer(this, {
    context: blockPopoverContext,
    subscribe: true,
  })

  constructor() {
    super()
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.draggable = true

    useEventListener(this, 'pointerdown', () => {
      const { pos } = this.blockPopoverContext.value ?? {}
      const { view } = this.editor ?? {}

      if (pos == null || !view) {
        return
      }

      view.dispatch(
        view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)),
      )

      // Clicking the handle will blur the editor, so we need to focus it again.
      // We cannot call `event.preventDefault()` here to prevent the blur
      // because it will prevent the drag event from firing.
      requestAnimationFrame(() => {
        view.focus()
      })
    })

    useEventListener(this, 'dragstart', (event) => {
      const { pos, element, node } = this.blockPopoverContext.value ?? {}
      const { view } = this.editor ?? {}

      if (pos == null || !element || !node || !view || !event.dataTransfer) {
        return
      }

      event.dataTransfer.clearData()
      event.dataTransfer.setData('text/html', element.outerHTML)
      event.dataTransfer.effectAllowed = 'copyMove'
      event.dataTransfer.setDragImage(element, 0, 0)

      view.dragging = {
        slice: new Slice(Fragment.from(node), 0, 0),
        move: true,
      }
    })
  }
}

defineCustomElement('prosekit-drag-handle', DragHandle)
