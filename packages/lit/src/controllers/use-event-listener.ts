import type { ReactiveElement } from 'lit'

import { useMount } from './use-mount'

export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: ReactiveElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useMount(target, () => {
    target.addEventListener(type, listener, options)
    return () => {
      target.removeEventListener(type, listener, options)
    }
  })
}
