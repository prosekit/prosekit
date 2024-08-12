import type { ConnectableElement, ReadonlySignal } from '@aria-ui/core'
import { createSignal, useEffect } from '@aria-ui/core'

export function useFirstRendering(
  host: ConnectableElement,
): ReadonlySignal<boolean> {
  const firstRendering = createSignal(true)

  useEffect(host, () => {
    requestAnimationFrame(() => {
      firstRendering.set(false)
    })
  })

  return firstRendering
}
