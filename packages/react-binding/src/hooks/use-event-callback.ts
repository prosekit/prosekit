import { useCallback, useLayoutEffect, useRef } from 'react'

export function useEventCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args: Args) => {
    return callbackRef.current(...args)
  }, [])
}
