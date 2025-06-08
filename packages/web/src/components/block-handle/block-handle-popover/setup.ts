import {
  createSignal,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay/elements'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import {
  blockPopoverContext,
  type BlockPopoverContext,
  type HoverState,
} from '../context'

import {
  defineElementHoverHandler,
  type ElementHoverHandler,
} from './pointer-move'
import type { BlockHandlePopoverProps } from './types'

/**
 * @internal
 */
export function useBlockHandlePopover(
  host: ConnectableElement,
  { state }: { state: SignalState<BlockHandlePopoverProps> },
): void {
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)
  useOverlayPositionerState(host, overlayState, { reference })

  const context = createSignal<BlockPopoverContext>(null)
  blockPopoverContext.provide(host, context)

  const open = createSignal(false)

  useEffect(host, () => {
    open.set(!!context.get())
  })

  useHoverExtension(host, editor, (referenceValue, hoverState) => {
    reference.set(referenceValue)
    context.set(hoverState)
  })

  useAttribute(host, 'data-state', () => (open.get() ? 'open' : 'closed'))
  usePresence(host, open)
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: ElementHoverHandler,
) {
  let prevHoverState: HoverState | null = null

  const extension = defineElementHoverHandler((reference, hoverState) => {
    if (isHoverStateEqual(prevHoverState, hoverState)) {
      return
    }

    prevHoverState = hoverState
    handler(reference, hoverState)
  })

  useEditorExtension(host, editor, extension)
}

function isHoverStateEqual(a: HoverState | null, b: HoverState | null) {
  if (!a && !b) return true
  if (!a || !b) return false
  return a.pos === b.pos && a.node.eq(b.node)
}
