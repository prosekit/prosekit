import { assignStyles } from '../../../utils/assign-styles'
import { deepCloneElement } from '../../../utils/clone-element'
import { getClientRect } from '../../../utils/get-client-rect'
import { maxZIndex } from '../../../utils/max-z-index'

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
  const { top, bottom, left, right } = getClientRect(element)
  const width = right - left
  const height = bottom - top
  const elementX = left
  const elementY = top

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
    // Ensuring we don't cause reflow when adding the element to the page using
    // `position:fixed` rather than `position:absolute` so we are positioned on
    // the current viewport. `position:fixed` also creates a new stacking
    // context, so we don't need to do that here.
    // https://github.com/atlassian/pragmatic-drag-and-drop/blob/56276552/packages/core/src/public-utils/element/custom-native-drag-preview/set-custom-native-drag-preview.ts#L60
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
    // A hardcoded opacity.
    opacity: '0.5',

    // The bounding client rect doesn't include the margin, so we need to remove
    // the margin too from the cloned element so that it can fit the container.
    margin: '0',
  })

  document.body.appendChild(container)
  container.appendChild(clonedElement)

  event.dataTransfer?.setDragImage(container, Math.max(-outsideX, 0), Math.max(-outsideY, 0))

  requestAnimationFrame(() => {
    container.remove()
  })
}
