/**
 * Creates a deep clone of an Element, including all computed styles so that
 * it looks almost exactly the same as the original element.
 */
export function deepCloneElement<T extends Element>(element: T): T {
  const clonedElement = element.cloneNode(true) as T
  deepCopyStyles(element, clonedElement)
  return clonedElement
}

/**
 * Creates a clone of an Element, including all computed styles so that
 * it looks similar enough to the original element.
 */
export function cloneElement<T extends Element>(element: T): T {
  const clonedElement = element.cloneNode() as T
  copyStyles(element, clonedElement)
  return clonedElement
}

function deepCopyStyles(source: Element, target: Element) {
  const sources = [source]
  const targets = [target]

  while (sources.length > 0 && sources.length === targets.length) {
    const source = sources.pop()
    const target = targets.pop()

    if (!source || !target) {
      return
    }

    copyStyles(source, target)

    sources.push(...source.children)
    targets.push(...target.children)
  }
}

function copyStyles(source: Element, target: Element): void {
  if (!source || !target) {
    return
  }

  // Known issue: pseudo styles are not copied.
  const sourceStyle = source.ownerDocument?.defaultView?.getComputedStyle(source)
  const targetStyle = (target as HTMLElement | SVGElement | MathMLElement).style

  if (!sourceStyle || !targetStyle) {
    return
  }

  for (const key of sourceStyle) {
    targetStyle.setProperty(
      key,
      sourceStyle.getPropertyValue(key),
      sourceStyle.getPropertyPriority(key),
    )
  }
}
