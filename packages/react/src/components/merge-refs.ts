import type { Ref } from 'react'

/**
 * Assigns a value to a ref.
 * @returns The ref cleanup callback, if any.
 */
export function assignRef<T>(
  ref: Ref<T> | undefined,
  value: T | null,
): VoidFunction | undefined | void {
  if (typeof ref === 'function') {
    return ref(value)
  } else if (ref) {
    ref.current = value
  }
}

/**
 * Merges multiple refs into a single one.
 */
export function mergeRefs<T>(refs: (Ref<T> | undefined)[]): Ref<T> {
  return (value: T | null) => {
    const cleanups: VoidFunction[] = []

    for (const ref of refs) {
      const cleanup = assignRef(ref, value)
      const isCleanup = typeof cleanup === 'function'
      cleanups.push(isCleanup ? cleanup : () => assignRef(ref, null))
    }

    return () => {
      for (const cleanup of cleanups) cleanup()
    }
  }
}
