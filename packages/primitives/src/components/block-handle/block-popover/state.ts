import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorExtension } from '../../../hooks/use-editor-extension'

import { blockPopoverContext, type BlockPopoverContext } from '../context'
import {
  defineElementHoverHandler,
  type ElementHoverHandler,
} from './pointer-move'
import { defaultBlockPopoverProps, type BlockPopoverProps } from './props'

export function useBlockPopover(
  host: ConnectableElement,
  props?: Partial<BlockPopoverProps>,
): SignalState<BlockPopoverProps> {
  const state = mapSignals(assignProps(defaultBlockPopoverProps, props))
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)
  useOverlayPositionerState(host, overlayState, { reference })

  const context = createSignal<BlockPopoverContext>({
    pos: null,
    node: null,
    element: null,
  })
  blockPopoverContext.provide(host, context)

  const open = createSignal(false)

  useEffect(host, () => {
    open.value = !!context.value.element
  })

  useHoverExtension(host, editor, (referenceValue, element, node, pos) => {
    reference.value = referenceValue
    context.value = { element, node, pos }
  })

  const presence = createComputed(() => !!reference.value)
  useAttribute(host, 'data-state', () => (presence.value ? 'open' : 'closed'))
  usePresence(host, presence)

  return state
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
