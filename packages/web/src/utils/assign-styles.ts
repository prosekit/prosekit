import type { ConditionalPick } from 'type-fest'

// Only include CSS properties whose value type is `string`
type StringStyleDeclaration = Partial<ConditionalPick<CSSStyleDeclaration, string>>

/**
 * A type-safe version of `Object.assign` for `element.style`.
 */
export function assignStyles(
  element: HTMLElement | SVGElement | MathMLElement,
  styles: StringStyleDeclaration,
): void {
  Object.assign(element.style, styles)
}
