/**
 * Whether the browser supports the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 */
export const popoverAvailable: boolean =
  typeof HTMLElement !== 'undefined' &&
  HTMLElement.prototype.hasOwnProperty('popover')

/**
 * If the browser supports the Popover API, we use the body as the boundary
 * since we don't need to worry about the popover overflowing the parent
 * element.
 */
export const boundary: HTMLElement | undefined =
  (popoverAvailable && typeof document !== 'undefined' && document.body) ||
  undefined
