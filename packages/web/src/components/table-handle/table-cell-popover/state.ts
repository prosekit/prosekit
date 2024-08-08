import {
  createComputed,
  createSignal,
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
import type { TableCellPopoverProps } from './props'

export function useTableCellPopover(
  host: ConnectableElement,
  state: SignalState<TableCellPopoverProps>,
) {
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)
  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(host, editor, (referenceValue) => {
    console.log(referenceValue)
    reference.set(referenceValue)
  })

  const presence = createComputed(() => !!reference.get())
  usePresence(host, presence)
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
      console.log(prevElement === element && prevPos === pos, reference, node?.textContent)
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
