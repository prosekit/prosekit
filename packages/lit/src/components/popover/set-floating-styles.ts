import type { PositioningOptions } from './options'

export function setFloatingStyles(
  element: HTMLElement,
  options: PositioningOptions,
) {
  const { placement, sameWidth, fitViewport, strategy = 'absolute' } = options

  element.style.position = strategy
  element.style.isolation = 'isolate'
  element.style.minWidth = sameWidth ? '' : 'max-content'
  element.style.width = sameWidth ? 'var(--reference-width)' : ''
  element.style.maxWidth = fitViewport ? 'var(--available-width)' : ''
  element.style.maxHeight = fitViewport ? 'var(--available-height)' : ''
  element.style.top = '0px'
  element.style.left = '0px'
  element.style.transform = placement
    ? 'translate3d(var(--x), var(--y), 0)'
    : 'translate3d(0, -100vh, 0)'
  element.style.zIndex = 'var(--z-index)'
}
