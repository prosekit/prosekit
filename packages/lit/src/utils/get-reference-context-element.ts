import type { VirtualElement } from '@floating-ui/dom'
import { isHTMLElement } from '@zag-js/dom-query'

export function getReferenceContextElement(
  reference: HTMLElement | VirtualElement | undefined | null,
): HTMLElement | null {
  if (!reference) {
    return null
  }

  if (isHTMLElement(reference)) {
    return reference
  }

  const contextElement = reference.contextElement
  if (isHTMLElement(contextElement)) {
    return contextElement
  }

  return null
}
