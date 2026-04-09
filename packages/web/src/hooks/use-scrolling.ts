import { createSignal, useEffect, type HostElement } from '@aria-ui/core'
import { getNearestOverflowAncestor } from '@aria-ui/utils'

export function useScrolling(host: HostElement): () => boolean {
  const scrolling = createSignal(false)

  useEffect(host, () => {
    const scrollableParent = getNearestOverflowAncestor(host)

    const handleScroll = () => {
      scrolling.set(true)
    }

    const handleMouseMove = () => {
      scrolling.set(false)
    }

    const abortController = new AbortController()
    const abortSignal = abortController.signal

    scrollableParent.addEventListener('scroll', handleScroll, { passive: true, signal: abortSignal })
    window.addEventListener('mousemove', handleMouseMove, { passive: true, signal: abortSignal })
    window.addEventListener('pointermove', handleMouseMove, { passive: true, signal: abortSignal })

    return () => {
      abortController.abort()
    }
  })

  return scrolling.get
}
