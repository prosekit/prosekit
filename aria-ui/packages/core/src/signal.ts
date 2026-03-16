import { signal } from 'alien-signals'

/**
 * A reactive signal.
 *
 * @public
 */
export interface Signal<T> {
  get: () => T
  set: (value: T) => void
}

export interface ReadonlySignal<T> {
  get: () => T
}

/**
 * Create a reactive signal.
 *
 * @internal
 */
export function createSignal<T>(initialValue: T): Signal<T> {
  const fn = signal(initialValue)
  return {
    get: () => fn(),
    set: (value: T) => fn(value),
  }
}
