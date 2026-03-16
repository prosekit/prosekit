import { effect } from 'alien-signals'

import type { HostElement } from './host-element.ts'
import { onMount } from './on-mount.ts'

export function useEffect(
  host: HostElement,
  callback: () => VoidFunction | void,
): VoidFunction {
  return onMount(host, () => {
    let callbackCleanup: VoidFunction | void

    const effectCleanup = effect(() => {
      callbackCleanup?.()
      callbackCleanup = undefined
      callbackCleanup = callback()
    })

    return () => {
      callbackCleanup?.()
      callbackCleanup = undefined
      effectCleanup()
    }
  })
}
