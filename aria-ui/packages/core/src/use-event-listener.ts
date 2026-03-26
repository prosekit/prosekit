import type { HostElement } from './host-element.ts'
import { onMount } from './on-mount.ts'

/*
 * Attaches a DOM event listener to a host element. The listener is added when
 * the element connects to the DOM and removed when it disconnects. Returns a
 * dispose function for manual cleanup.
 */
export function useEventListener<K extends keyof HTMLElementEventMap>(
  host: HostElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): VoidFunction {
  return onMount(host, () => {
    host.addEventListener(type, listener, options)
    return () => {
      host.removeEventListener(type, listener, options)
    }
  })
}
