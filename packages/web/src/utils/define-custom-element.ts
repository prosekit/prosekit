export function defineCustomElement(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  if (typeof customElements === 'undefined') {
    return
  }

  customElements.define(name, constructor, options)
}
