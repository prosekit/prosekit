import {
  createComputed,
  createSignal,
  useAttribute,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorExtension } from '../../../hooks/use-editor-extension'

import {
  type ElementHoverHandler,
  defineElementHoverHandler,
} from './cell-pointer'
import type { TableCellPopoverRootProps } from './props'
import { usePopoverRoot } from '@aria-ui/popover'
import { useMenuRoot } from '@aria-ui/menu'

export function useTableCellPopoverRoot(
  host: ConnectableElement,
  state: SignalState<TableCellPopoverRootProps>,
) {
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)

  const defaultContentOpen = createSignal<false>(false)

  const contentOpen = createSignal(false)

  const onOpenChange = createSignal((open: boolean) => {
    console.log('open', open)
  })

  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(host, editor, (referenceValue) => {
    reference.set(referenceValue)
    contentOpen.set(false)
  })

  const presence = createComputed(() => !!reference.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  useMenuRoot(host, {
    defaultOpen: defaultContentOpen,
    onOpenChange,
    open: contentOpen,
  })
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: ElementHoverHandler,
) {
  let prevElement: HTMLElement | null = null
  let prevPos: number | null = null

  const extension = defineElementHoverHandler(
    (reference, element, node, pos) => {
      if (prevElement === element && prevPos === pos) {
        return
      }

      prevElement = element
      prevPos = pos

      handler(reference, element, node, pos)
    },
  )

  useEditorExtension(host, editor, extension)
}
