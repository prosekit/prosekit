import { getId } from '@ocavue/utils'

/**
 * Creates a deep clone of an Element, including all computed styles so that
 * it looks almost exactly the same as the original element.
 */
export function deepCloneElement<T extends Element>(element: T): [T, string] {
  const clonedElement = element.cloneNode(true) as T
  const style = deepCopyStyles(element, clonedElement)
  return [clonedElement, style]
}

/**
 * Creates a clone of an Element, including all computed styles so that
 * it looks similar enough to the original element.
 */
export function cloneElement<T extends Element>(element: T): [T, string] {
  const clonedElement = element.cloneNode() as T
  const style = copyStyles(element, clonedElement)
  return [clonedElement, style]
}

function deepCopyStyles(source: Element, target: Element): string {
  const sources = [source]
  const targets = [target]
  const styles: string[] = []

  while (sources.length > 0 && sources.length === targets.length) {
    const source = sources.pop()
    const target = targets.pop()

    if (!source || !target) {
      break
    }

    const style = copyStyles(source, target)
    if (style) {
      styles.push(style)
    }

    sources.push(...source.children)
    targets.push(...target.children)
  }

  return styles.join('\n')
}

function copyStyles(source: Element, target: Element): string {
  if (!source || !target) {
    return ''
  }

  const view = source.ownerDocument?.defaultView
  if (!view) {
    return ''
  }

  // Known issue: pseudo styles are not copied.
  const sourceStyle = view.getComputedStyle(source)
  const targetStyle = (target as HTMLElement | SVGElement | MathMLElement).style

  if (!sourceStyle || !targetStyle) {
    return ''
  }

  for (const key of sourceStyle) {
    targetStyle.setProperty(
      key,
      sourceStyle.getPropertyValue(key),
      sourceStyle.getPropertyPriority(key),
    )
  }

  const styles: string[] = []
  for (const pseudoSelector of [':before', ':after']) {
    const sourcePseudoStyle = view.getComputedStyle(source, pseudoSelector)
    const targetPseudoStyle = view.getComputedStyle(target, pseudoSelector)

    if (!sourcePseudoStyle) {
      continue
    }

    const content = sourcePseudoStyle.getPropertyValue('content')
    const hasPseudoElement = content && content !== 'none' && content !== 'normal'

    if (!hasPseudoElement) {
      continue
    }

    const cssProps: string[] = []
    for (const property of sourcePseudoStyle) {
      const sourceValue = sourcePseudoStyle.getPropertyValue(property)
      const sourcePriority = sourcePseudoStyle.getPropertyPriority(property)
      const targetValue = targetPseudoStyle.getPropertyValue(property)
      const targetPriority = targetPseudoStyle.getPropertyPriority(property)
      if (sourceValue !== targetValue || sourcePriority !== targetPriority) {
        cssProps.push(`${property}: ${sourceValue}${sourcePriority ? ' !important' : ''};`)
      }
    }

    const uniqueClassName = `clone-pseudo-element-${getId()}`
    target.classList.add(uniqueClassName)
    styles.push(`.${uniqueClassName}${pseudoSelector} { ${cssProps.join(' ')} }`)
  }

  return styles.join('\n')
}
