import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
} from '@aria-ui/core'
import { getNearestOverflowAncestor } from '@zag-js/dom-query'

export function useScrolling(host: ConnectableElement): ReadonlySignal<boolean> {
  const scrolling = createSignal(false)

  useEffect(host, () => {
    const scrollableParent = getNearestOverflowAncestor(host)

    const handleScroll = () => {
      scrolling.set(true)
    }

    const handleMouseMove = () => {
      scrolling.set(false)
    }

    scrollableParent.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('pointermove', handleMouseMove, { passive: true })

    return () => {
      scrollableParent.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('pointermove', handleMouseMove)
    }
  })

  return scrolling
}
