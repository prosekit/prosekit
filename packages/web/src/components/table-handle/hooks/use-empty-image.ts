import type { ConnectableElement } from '@aria-ui/core'
import { useEffect } from '@aria-ui/core'

/**
 * Returns a function that returns a 1x1 transparent image. This is used to
 * prevent the browser from showing the default drag image. An earth icon in
 * chrome is used as the default drag image. This image must be loaded before
 * the dragStart event triggers.
 *
 * See https://stackoverflow.com/a/40923520
 *
 * @internal
 */
export function useEmptyImage(
  host: ConnectableElement,
): () => HTMLImageElement | undefined {
  let image: HTMLImageElement | undefined

  useEffect(host, () => {
    image = new Image(1, 1)
    image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    return () => {
      image?.remove()
      image = undefined
    }
  })

  return () => image
}
