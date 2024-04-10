import {
  assignProps,
  createComputed,
  createSignal,
  mapSignals,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SingalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor, Extension } from '@prosekit/core'

import { blockPositionerContext, type BlockPositionerContext } from './context'
import {
  defineElementHoverHandler,
  type ElementHoverHandler,
} from './pointer-move'
import { defaultBlockPositionerProps, type BlockPositionerProps } from './props'

export function useBlockPositioner(
  host: ConnectableElement,
  props?: Partial<BlockPositionerProps>,
): SingalState<BlockPositionerProps> {
  const state = mapSignals(assignProps(defaultBlockPositionerProps, props))
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)
  useOverlayPositionerState(host, overlayState, { reference })

  const context = createSignal<BlockPositionerContext>({
    pos: null,
    node: null,
    element: null,
  })
  blockPositionerContext.provide(host, context)

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

  useExtension(host, editor, extension)
}

function useExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  extension: Extension,
) {
  useEffect(host, () => {
    return editor.value?.use(extension)
  })
}
