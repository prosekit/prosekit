import { createSignal, useEffect, type HostElement } from '@aria-ui/core'
import { getNearestOverflowAncestor, useGlobalEventListener } from '@aria-ui/utils'

export function useScrolling(host: HostElement): () => boolean {
  const { get: getScrolling, set: setScrolling } = createSignal(false)
  const handleMouseMove = () => {
    setScrolling(false)
  }
  const handleScroll = () => {
    setScrolling(true)
  }

  useGlobalEventListener(host, 'mousemove', handleMouseMove)
  useGlobalEventListener(host, 'pointermove', handleMouseMove)

  useEffect(host, () => {
    const scrollableParent = getNearestOverflowAncestor(host)

    const abortController = new AbortController()
    const abortSignal = abortController.signal

    scrollableParent.addEventListener('scroll', handleScroll, {
      passive: true,
      signal: abortSignal,
    })

    return () => {
      abortController.abort()
    }
  })

  return getScrolling
}
