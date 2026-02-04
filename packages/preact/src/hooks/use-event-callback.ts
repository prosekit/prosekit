import { useCallback, useLayoutEffect, useRef } from 'preact/hooks'

/**
 * @internal
 */
export function useEventCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])
  return useCallback((...args: Args) => callbackRef.current(...args), [])
}
