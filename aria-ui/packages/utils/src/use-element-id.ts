import type { HostElement } from '@aria-ui-v2/core'
import { onMount } from '@aria-ui-v2/core'
import { getId } from '@ocavue/utils'

/**
 * Generates a unique id for an element if it doesn't already have one. Returns the existing id if it has one.
 */
export function useElementId(element: HostElement): string {
  const existingId = element.id
  if (existingId) {
    return existingId
  }

  const newId = `aria-ui-id-${getId()}`
  onMount(element, () => {
    element.id = newId
  })

  return newId
}
