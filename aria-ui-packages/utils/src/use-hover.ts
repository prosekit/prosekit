import { on } from '@remix-run/interaction'

/**
 * Options for the useHover hook
 * @public
 */
export interface UseHoverOptions {
  /**
   * Delay in milliseconds before calling onOpen when hovering starts.
   * If set to 0, onOpen is called immediately without setTimeout.
   *
   * @default 0
   */
  openDelay?: number

  /**
   * Delay in milliseconds before calling onClose when hovering ends.
   * If set to 0, onClose is called immediately without setTimeout.
   *
   * @default 0
   */
  closeDelay?: number

  /**
   * Callback function called when hovering starts (after openDelay).
   */
  onOpen?: () => void

  /**
   * Callback function called when hovering ends (after closeDelay).
   */
  onClose?: () => void
}

/**
 * Attaches hover event listeners to a target element with configurable delays.
 *
 * @param target - The HTML element to attach hover listeners to
 * @param options - Configuration options for hover behavior
 * @returns A cleanup function that removes event listeners and clears pending timeouts
 *
 * @example
 * ```typescript
 * const cleanup = useHover(element, {
 *   openDelay: 300,
 *   closeDelay: 0,
 *   onOpen: () => console.log('Hover started'),
 *   onClose: () => console.log('Hover ended'),
 * })
 *
 * // Later, when you need to cleanup:
 * cleanup()
 * ```
 *
 * @public
 */
export function useHover(
  target: HTMLElement,
  options: UseHoverOptions,
): VoidFunction {
  const { openDelay = 0, closeDelay = 0, onOpen, onClose } = options

  let openTimeout: number | undefined
  let closeTimeout: number | undefined

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout)
      closeTimeout = undefined
    }

    // Set timeout to open
    if (onOpen) {
      if (openDelay > 0) {
        openTimeout = window.setTimeout(onOpen, openDelay)
      } else {
        onOpen()
      }
    }
  }

  const handleMouseLeave = () => {
    // Clear any pending open timeout
    if (openTimeout !== undefined) {
      clearTimeout(openTimeout)
      openTimeout = undefined
    }

    // Set timeout to close
    if (onClose) {
      if (closeDelay > 0) {
        closeTimeout = window.setTimeout(onClose, closeDelay)
      } else {
        onClose()
      }
    }
  }

  const dispose = on(target, {
    mouseenter: handleMouseEnter,
    mouseleave: handleMouseLeave,
  })

  return () => {
    dispose()
    if (openTimeout !== undefined) clearTimeout(openTimeout)
    if (closeTimeout !== undefined) clearTimeout(closeTimeout)
  }
}
