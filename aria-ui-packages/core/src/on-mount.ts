import type { HostElement } from './host-element.ts'
import type { ReactiveController } from './reactive-controller.ts'

export function onMount(
  host: HostElement,
  callback: () => VoidFunction | void,
): VoidFunction {
  let callbackDispose: VoidFunction | void

  const hostConnected = () => {
    callbackDispose?.()
    callbackDispose = undefined
    callbackDispose = callback()
  }

  const hostDisconnected = () => {
    callbackDispose?.()
    callbackDispose = undefined
  }

  const controller: ReactiveController = {
    hostConnected,
    hostDisconnected,
  }

  host.addController(controller)

  return () => {
    host.removeController(controller)
    hostDisconnected()
  }
}
