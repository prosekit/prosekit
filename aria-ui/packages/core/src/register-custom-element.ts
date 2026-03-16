/**
 * Adds the given custom element to the custom element registry.
 */
export function registerCustomElement(
  name: string,
  constructor: CustomElementConstructor,
): void {
  if (typeof window !== 'undefined') {
    const customElements = window.customElements
    if (customElements && !customElements.get(name)) {
      customElements.define(name, constructor)
    }
  }
}
