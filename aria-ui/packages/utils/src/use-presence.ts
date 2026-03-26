import type { HostElement } from '@aria-ui-v2/core'
import { createSignal, useEffect } from '@aria-ui-v2/core'

/**
 * Manages element visibility with CSS animation awareness.
 *
 * When `open` becomes `true`, the element is shown immediately. When `open`
 * becomes `false`, the element is hidden after any running CSS animations
 * complete, enabling exit animations.
 *
 * @internal
 */
export function usePresence(
  host: HostElement,
  getOpen: () => boolean,
): () => boolean {
  const visible = createSignal(getOpen())

  useEffect(host, () => {
    if (visible.get()) {
      show(host)
    } else {
      hide(host)
    }
  })

  useEffect(host, () => {
    if (getOpen()) {
      visible.set(true)
      return
    }

    const animations = host.getAnimations()
    if (animations.length === 0) {
      visible.set(false)
      return
    }

    let canceled = false
    void Promise.allSettled(
      animations.map((animation) => animation.finished),
    ).then(() => {
      if (!canceled) {
        visible.set(false)
      }
    })

    return () => {
      canceled = true
    }
  })

  return visible.get
}

function show(element: HTMLElement): void {
  if (element.style.display === 'none') {
    element.style.display = ''
  }
}

function hide(element: HTMLElement): void {
  element.style.display = 'none'
}
