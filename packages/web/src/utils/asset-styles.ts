export function assignStyles(element: HTMLElement | SVGElement | MathMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.assign(element.style, styles)
}
