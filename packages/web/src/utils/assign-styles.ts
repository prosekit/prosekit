import type { ConditionalPick } from 'type-fest'

// Only include CSS properties whose value type is `string`
type StringStyleDeclaration = Partial<ConditionalPick<CSSStyleDeclaration, string>>

/**
 * A type-safe version of `Object.assign` for `element.style`.
 */
export function assignStyles(
  element: HTMLElement | SVGElement | MathMLElement,
  styles: StringStyleDeclaration,
  important = false,
): void {
  if (important) {
    for (const [key, value] of Object.entries(styles)) {
      if (value != null) {
        element.style.setProperty(key, value, 'important')
      }
    }
  } else {
    Object.assign(element.style, styles)
  }
}
