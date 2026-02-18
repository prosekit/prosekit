export function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  className?: string,
  ...children: HTMLElement[]
): HTMLElementTagNameMap[Tag] {
  const element: HTMLElementTagNameMap[Tag] = document.createElement(tag)
  if (className) {
    element.className = className
  }
  if (children.length > 0) {
    element.append(...children)
  }
  return element
}
