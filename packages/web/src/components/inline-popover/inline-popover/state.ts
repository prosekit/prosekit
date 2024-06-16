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
import type { ReferenceElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

import { useEditorFocusChangeEvent } from '../../../hooks/use-editor-focus-event'
import { useEditorUpdateEvent } from '../../../hooks/use-editor-update-event'

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

function useInlinePopoverState(
  host: ConnectableElement,
  state: SignalState<InlinePopoverProps>,
) {
  const { editor, defaultOpen, open, onOpenChange, ...overlayState } = state

  const reference = useInlinePopoverReference(host, editor)
  const hasReference = createComputed(() => !!reference.get())

  useEffect(host, () => {
    const hasReferenceValue = hasReference.get()
    const onOpenChangeValue = onOpenChange.peek()
    const defaultOpenValue = defaultOpen.peek()
    const openValue = open.peek()

    if (onOpenChangeValue && (defaultOpenValue || openValue)) {
      onOpenChangeValue(hasReferenceValue)
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

  useOverlayPositionerState(host, overlayState, { reference })

  useAttribute(host, 'data-state', () => (open.get() ? 'open' : 'closed'))
  usePresence(host, open)
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

    reference.set(getVirtualSelectionElement(view))
  })

  return reference
}
