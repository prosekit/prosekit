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
  for (const pesudoSelector of [':before', ':after']) {
    const sourcePesudoStyle = view.getComputedStyle(source, pesudoSelector)
    const targetPesudoStyle = view.getComputedStyle(target, pesudoSelector)

    if (!sourcePesudoStyle) {
      continue
    }

    const content = sourcePesudoStyle.getPropertyValue('content')
    const hasPesudoElement = content && content !== 'none' && content !== 'normal'

    if (!hasPesudoElement) {
      continue
    }

    const cssProps: string[] = []
    for (const property of sourcePesudoStyle) {
      const sourceValue = sourcePesudoStyle.getPropertyValue(property)
      const sourcePriority = sourcePesudoStyle.getPropertyPriority(property)
      const targetValue = targetPesudoStyle.getPropertyValue(property)
      const targetPriority = targetPesudoStyle.getPropertyPriority(property)
      if (sourceValue !== targetValue || sourcePriority !== targetPriority) {
        cssProps.push(`${property}: ${sourceValue}${sourcePriority ? ' !important' : ''}`)
      }
    }

    const uniqueClassName = `clone-pesudo-element-${getId()}`
    target.classList.add(uniqueClassName)
    styles.push(`.${uniqueClassName}${pesudoSelector} { ${cssProps.join('; ')} }`)
  }

  return styles.join('\n')
}
