import type { LitElement } from 'lit'

/**
 * @internal
 */
export function usePointerDownEvent(
  host: LitElement,
  handler: (event: PointerEvent) => void,
) {
  host.addController({
    hostConnected: () => {
      host.addEventListener('pointerdown', handler)
    },
    hostDisconnected: () => {
      host.removeEventListener('pointerdown', handler)
    },
  })
}
