function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Record<string, string>,
  ...children: (string | HTMLElement)[]
): HTMLElementTagNameMap[K]
function createElement(
  tagName: string,
  attributes: Record<string, string>,
  ...children: (string | HTMLElement)[]
): HTMLElement {
  const element = document.createElement(tagName)
  const { class: className, ...rest } = attributes
  if (className) {
    element.classList.add(className)
  }
  Object.entries(rest).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })
  return element
}

export { createElement }
