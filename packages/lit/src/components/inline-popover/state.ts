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
import type { ReferenceElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorFocusChangeEvent } from '../../hooks/use-editor-focus-event'
import { useEditorUpdateEvent } from '../../hooks/use-editor-update-event'

import { defaultInlinePopoverProps, type InlinePopoverProps } from './props'
import { getVirtualSelectionElement } from './virtual-selection-element'

export function useInlinePopover(
  host: ConnectableElement,
  props?: Partial<InlinePopoverProps>,
) {
  const state = mapSignals(assignProps(defaultInlinePopoverProps, props))
  useInlinePopoverState(host, state)
  return state
}

export function useInlinePopoverState(
  host: ConnectableElement,
  state: SingalState<InlinePopoverProps>,
) {
  const { editor, available, onOpenChange, ...overlayState } = state

  const reference = useInlinePopoverReference(host, editor)

  useOverlayPositionerState(host, overlayState, { reference })

  const presence = createComputed(() => !!reference.value && available.value)
  useAttribute(host, 'data-state', () => (presence.value ? 'open' : 'closed'))
  usePresence(host, presence)

  useEffect(host, () => {
    const presenceValue = presence.value
    onOpenChange.peek()?.(presenceValue)
  })
}

function useInlinePopoverReference(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
) {
  const reference = createSignal<ReferenceElement | null>(null)
  let editorFocused = false

  useEditorFocusChangeEvent(host, editor, (focus) => {
    editorFocused = focus
  })

  useEditorUpdateEvent(host, editor, (view) => {
    const isPopoverFocused =
      !editorFocused && host.contains(host.ownerDocument.activeElement)

    if (isPopoverFocused) {
      return
    }

    reference.value = getVirtualSelectionElement(view)
  })

  return reference
}
