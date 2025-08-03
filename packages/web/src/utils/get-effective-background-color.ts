export function getEffectiveBackgroundColor(element: HTMLElement): string | undefined {
  let current: HTMLElement | null = element

  while (current) {
    const style = current.ownerDocument.defaultView?.getComputedStyle(current)
    const backgroundColor = style?.backgroundColor

    if (
      backgroundColor
      && backgroundColor !== 'transparent'
      && backgroundColor !== 'rgba(0, 0, 0, 0)'
    ) {
      return backgroundColor
    }

    current = current.parentElement
  }

  return undefined
}
