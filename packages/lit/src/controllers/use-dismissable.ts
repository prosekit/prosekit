import type { ReferenceElement } from '@floating-ui/dom'
import { trackDismissableElement } from '@zag-js/dismissable'
import type { LitElement } from 'lit'

import { getReferenceContextElement } from '../utils/get-reference-context-element'

/**
 * @internal
 */
export function useDismissable(
  host: LitElement,
  {
    onEscapeKeyDown,
    onPointerDownOutside,
    onDismiss,
    getReference,
  }: {
    onEscapeKeyDown: (event: KeyboardEvent) => void
    onPointerDownOutside: (event: Event) => void
    onDismiss?: VoidFunction
    getReference?: () => ReferenceElement | null | undefined
  },
) {
  let cleanup: VoidFunction | undefined

  const hostConnected = () => {
    cleanup?.()
    cleanup = trackDismissableElement(host, {
      defer: false,
      pointerBlocking: false,
      exclude: () => {
        return getReferenceContextElement(getReference?.())
      },
      onDismiss: () => {
        onDismiss?.()
      },
      onEscapeKeyDown: (event) => {
        onEscapeKeyDown(event)
      },
      onPointerDownOutside: (event: Event) => {
        onPointerDownOutside(event)
      },
    })
  }

  const hostDisconnected = () => {
    cleanup?.()
    cleanup = undefined
  }

  host.addController({ hostConnected, hostDisconnected })
}
