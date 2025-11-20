import {
  createComputed,
  createSignal,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SetupOptions,
} from '@aria-ui/core'
import { useOverlayPositionerState } from '@aria-ui/overlay/elements'
import { usePresence } from '@aria-ui/presence'
import type { ReferenceElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorFocused } from '../../../hooks/use-editor-focused'
import { useEditorUpdateEvent } from '../../../hooks/use-editor-update-event'
import { useKeymap } from '../../../hooks/use-keymap'

import type {
  InlinePopoverEvents,
  InlinePopoverProps,
} from './types'
import { getVirtualSelectionElement } from './virtual-selection-element'

/**
 * @internal
 */
export function useInlinePopover(
  host: ConnectableElement,
  { state, emit }: SetupOptions<InlinePopoverProps, InlinePopoverEvents>,
): void {
  const { editor, defaultOpen, open, ...overlayState } = state

  const reference = useInlinePopoverReference(host, editor)
  const hasReference = createComputed(() => !!reference.get())

  useEffect(host, () => {
    const hasReferenceValue = hasReference.get()
    const defaultOpenValue = defaultOpen.peek()
    const openValue = open.peek()

    if (defaultOpenValue || openValue) {
      emit('openChange', hasReferenceValue)
    }
  })

  useEffect(host, () => {
    const hasReferenceValue = hasReference.get()
    const defaultOpenValue = defaultOpen.peek()

    if (hasReferenceValue && defaultOpenValue) {
      open.set(true)
    } else if (!hasReferenceValue) {
      open.set(false)
    }
  })

  useKeymap(host, editor, {
    Escape: () => {
      if (!state.dismissOnEscape.peek() || !open.peek()) {
        return false
      }
      open.set(false)
      emit('openChange', false)
      return true
    },
  })

  useOverlayPositionerState(host, overlayState, { reference })

  useAttribute(host, 'data-state', () => (open.get() ? 'open' : 'closed'))
  usePresence(host, open)
}

function useInlinePopoverReference(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
) {
  const reference = createSignal<ReferenceElement | null>(null)
  const editorFocused = useEditorFocused(host, editor)

  useEditorUpdateEvent(host, editor, (view) => {
    const isPopoverFocused = !editorFocused.get() && host.contains(host.ownerDocument.activeElement)

    if (isPopoverFocused) {
      return
    }

    reference.set(getVirtualSelectionElement(view) || null)
  })

  return reference
}
