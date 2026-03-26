import type { HostElement } from '@aria-ui-v2/core'
import { useEffect } from '@aria-ui-v2/core'

/**
 * Sets the computed attribute of the element when it's connected.
 *
 * @internal
 */
export function useAttribute(
  element: HostElement,
  key: string,
  compute: () => string | number | undefined | null,
): VoidFunction {
  return useEffect(element, () => {
    const value = compute()
    if (value == null) {
      element.removeAttribute(key)
    } else {
      element.setAttribute(key, String(value))
    }
  })
}
