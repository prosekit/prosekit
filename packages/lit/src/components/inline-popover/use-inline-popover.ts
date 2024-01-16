import type { ReferenceElement } from '@floating-ui/dom'
import type { LitElement } from 'lit'

import { useEditorFocusChangeEvent } from '../../controllers/use-editor-focus-event'
import { useEditorUpdateEvent } from '../../controllers/use-editor-update-event'
import { usePointerDownEvent } from '../../controllers/use-pointer-down-event'
import type { WithEditor } from '../../types/with-editor'

import { getVirtualSelectionElement } from './helpers'

export function useInlinePopover(
  host: WithEditor<LitElement>,
  onReferenceChange: (reference: ReferenceElement | undefined) => void,
) {
  let interacting = false
  let reference: ReferenceElement | undefined

  usePointerDownEvent(host, () => {
    interacting = true
  })

  useEditorFocusChangeEvent(host, (focus) => {
    if (focus) {
      interacting = false
    }
  })

  useEditorUpdateEvent(host, (view) => {
    if (interacting) {
      return
    }

    const ref = getVirtualSelectionElement(view)

    if (reference !== ref) {
      reference = ref
      onReferenceChange(reference)
      host.requestUpdate()
    }
  })

  const getReference = () => reference

  return getReference
}
