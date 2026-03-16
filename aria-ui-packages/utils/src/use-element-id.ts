import { useId } from '@aria-ui-v2/core'

/**
 * Generates a unique id for an element if it doesn't already have one. Returns the existing id if it has one.
 */
export function useElementId(element: Element): string {
  let existingId = element.id
  if (existingId) {
    return existingId
  }

  const newId = useId()
  element.id = newId
  return newId
}
