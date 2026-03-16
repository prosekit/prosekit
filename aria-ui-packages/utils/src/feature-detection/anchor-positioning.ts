let result: boolean | undefined

/**
 * Whether CSS Anchor Positioning is supported.
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
    if (typeof window === 'undefined' || typeof CSS === 'undefined') {
      return false
    }

    // https://caniuse.com/mdn-css_properties_position-try_span-self-x-start
    return CSS.supports('position-try', 'span-self-x-start')
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
