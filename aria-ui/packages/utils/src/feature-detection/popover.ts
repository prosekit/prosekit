let result: boolean | undefined

/**
 * Whether Popover API is supported.
 * @internal
 */
export function get(): boolean {
  if (result == null) {
    result = detect()
  }
  return result
}

/**
 * @internal
 */
export function detect(): boolean {
  try {
    if (typeof window === 'undefined' || typeof HTMLElement === 'undefined') {
      return false
    }

    return Object.hasOwn(HTMLElement.prototype, 'popover')
  } catch {
    return false
  }
}

/**
 * Only used for testing.
 * @internal
 */
export function override(support: boolean): void {
  result = support
}

export function reset(): void {
  result = undefined
}
