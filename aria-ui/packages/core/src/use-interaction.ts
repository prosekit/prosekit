import { on, type EventListeners } from '@remix-run/interaction'

import type { HostElement } from './host-element.ts'
import { onMount } from './on-mount.ts'

export function useInteraction<T extends HostElement>(
  host: T,
  listeners: EventListeners<T>,
): VoidFunction {
  return onMount(host, () => {
    return on(host, listeners)
  })
}
