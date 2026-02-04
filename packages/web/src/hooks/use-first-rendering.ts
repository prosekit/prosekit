import { createSignal, useEffect, type ConnectableElement, type ReadonlySignal } from '@aria-ui/core'

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
