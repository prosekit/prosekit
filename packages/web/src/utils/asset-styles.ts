export function assignStyles(element: HTMLElement | SVGElement | MathMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles)
}
