import { useRef } from 'react'

/**
 * A React hook that returns a singleton instance of a value during re-renders.
 *
 * It uses the [Avoiding recreating the ref contents] pattern from React docs.
 *
 * @param factory - A function that returns the singleton value.
 * @returns The singleton value that's stable during re-renders.
 *
 * This pattern is better then using `useMemo` or `useState` because it ensures that
 * the factory function won't be called twice even during development mode.
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
