import { useRef } from 'react'

/**
 * A React hook that returns a singleton instance of a value during re-renders.
 *
 * It uses the [Avoiding recreating the ref contents] pattern from React docs.
 *
 * [Avoiding recreating the ref contents]: https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
 *
 * @public
 */
export function useSingleton<T>(factory: () => T): T {
  const ref = useRef<T | null>(null)
  if (ref.current == null) {
    ref.current = factory()
  }
  return ref.current
}
