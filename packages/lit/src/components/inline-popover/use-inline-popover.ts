import type { ReferenceElement } from '@floating-ui/dom'
import type { LitElement } from 'lit'

import { useEditorFocusChangeEvent } from '../../controllers/use-editor-focus-event'
import { useEditorUpdateEvent } from '../../controllers/use-editor-update-event'
import type { WithEditor } from '../../types/with-editor'

import { getVirtualSelectionElement } from './virtual-selection-element'

/**
 * @internal
 */
export function useInlinePopover(
  host: WithEditor<LitElement>,
  onReferenceChange: (reference: ReferenceElement | undefined) => void,
) {
  let reference: ReferenceElement | undefined
  let editorFocused = false

  const isPopoverFocused = () => {
    return !editorFocused && host.contains(host.ownerDocument.activeElement)
  }

  useEditorFocusChangeEvent(host, (focus) => {
    editorFocused = focus
  })

  useEditorUpdateEvent(host, (view) => {
    if (isPopoverFocused()) return

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
