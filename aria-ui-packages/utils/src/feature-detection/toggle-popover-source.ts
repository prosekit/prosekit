import { detect as detectAnchorPositioningSupport } from './anchor-positioning.ts'

let result: boolean | undefined

/**
 * Whether `togglePopover({ source })` is supported.
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
  // All browsers that support CSS Anchor Positioning support `togglePopover({ source })`
  // https://caniuse.com/mdn-api_htmlelement_togglepopover_options_source_parameter
  return detectAnchorPositioningSupport()
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
