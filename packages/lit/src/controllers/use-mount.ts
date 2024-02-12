import type { ReactiveControllerHost } from 'lit'

/**
 * @internal
 */
export function useMount(
  host: ReactiveControllerHost,
  onMount: () => VoidFunction | void,
) {
  let dispose: VoidFunction | undefined | void

  host.addController({
    hostConnected: () => {
      dispose?.()
      dispose = onMount()
    },
    hostDisconnected: () => {
      dispose?.()
      dispose = undefined
    },
  })
}
