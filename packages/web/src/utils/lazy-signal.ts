import type { Signal } from '@aria-ui/core'

export function createLazySignal<T>(
  getRemote: () => Signal<T> | undefined,
  fallback: T,
): Signal<T> {
  return {
    get: (): T => {
      const remote = getRemote()
      return remote ? remote.get() : fallback
    },
    set: (value: T): void => {
      const remote = getRemote()
      if (remote) remote.set(value)
    },
  }
}
