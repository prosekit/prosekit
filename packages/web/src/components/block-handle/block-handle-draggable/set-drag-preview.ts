import { assignStyles } from '../../../utils/asset-styles'
import { maxZIndex } from '../../../utils/max-z-index'

import { deepCloneElement } from './deep-clone-element'

/**
 * Sets a drag preview image for the given element and ensures the preview position
 * relative to the pointer is correct.
 *
 * This function does the following:
 *
 * - Creates a temporary container element.
 * - Puts the container at the end of the document body.
 * - Sets event's drag image.
 * - Removes the container from the document body after the next frame.
 */
export function setDragPreview(event: DragEvent, element: HTMLElement): void {
  const rect = element.getBoundingClientRect()
  const { width, height, x: elementX, y: elementY } = rect

  const { clientX, clientY } = event

  const document = element.ownerDocument

  const container = document.createElement('div')

  // If outsideX is positive, the point is at the left side of the element.
  const outsideX = Math.round(elementX - clientX)
  // If outsideY is positive, the point is above the element.
  const outsideY = Math.round(elementY - clientY)

  const borderX = Math.max(outsideX, 0)
  const borderY = Math.max(outsideY, 0)
  assignStyles(container, {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: maxZIndex,

    // Only reliable cross browser technique found to push a drag preview away
    // from the cursor is to use transparent borders on the container.
    // https://github.com/atlassian/pragmatic-drag-and-drop/blob/56276552/packages/core/src/public-utils/element/custom-native-drag-preview/pointer-outside-of-preview.ts#L13-L18
    borderLeft: `${borderX}px solid transparent`,
    borderTop: `${borderY}px solid transparent`,

    boxSizing: 'border-box',
    width: `${width + borderX}px`,
    height: `${height + borderY}px`,
  })

  const clonedElement = deepCloneElement(element)
  assignStyles(clonedElement, {
    outline: 'none',
    opacity: '0.5',
  })

  document.body.appendChild(container)
  container.appendChild(clonedElement)

  event.dataTransfer?.setDragImage(container, Math.max(-outsideX, 0), Math.max(-outsideY, 0))

  requestAnimationFrame(() => {
    container.remove()
  })
}
