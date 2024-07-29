import type { DOMOutputSpec } from '@prosekit/pm/model'

import { isElement } from './is-element'

export function insertOutputSpecAttrs(
  dom: DOMOutputSpec,
  attrs: Array<[key: string, value: string]>,
): DOMOutputSpec {
  if (!dom) {
    return dom
  }

  if (Array.isArray(dom)) {
    const rest = dom.slice(1) as Array<unknown>
    let oldAttrs: Record<string, unknown>

    if (rest.length > 0 && (rest[0] == null || typeof rest[0] === 'object')) {
      oldAttrs = rest.shift() as Record<string, unknown>
    } else {
      oldAttrs = {}
    }

    const newAttrs = setObjectAttributes(oldAttrs, attrs)
    return [dom[0], newAttrs, ...rest]
  }

  if (isElement(dom)) {
    return setElementAttributes(dom, attrs)
  }

  if (typeof dom === 'object' && 'dom' in dom && isElement(dom.dom)) {
    return { ...dom, dom: setElementAttributes(dom.dom, attrs) }
  }

  return dom
}

function setObjectAttributes(
  obj: Record<string, unknown>,
  attrs: Array<[key: string, value: string]>,
): Record<string, unknown> {
  obj = { ...obj }
  for (const [key, value] of attrs) {
    const oldValue = obj[key]
    const newValue =
      key === 'style'
        ? joinStyles(value, typeof oldValue === 'string' ? oldValue : '')
        : value
    obj[key] = newValue
  }
  return obj
}

function setElementAttributes(
  element: Element,
  attrs: Array<[key: string, value: string]>,
): Element {
  element = element.cloneNode(true) as Element
  for (const [key, value] of attrs) {
    const oldValue = element.getAttribute(key)
    const newValue =
      key === 'style'
        ? joinStyles(value, typeof oldValue === 'string' ? oldValue : '')
        : value
    element.setAttribute(key, newValue)
  }
  return element
}

function joinStyles(...styles: string[]) {
  return styles
    .map((style) => style.trim().replace(/;$/, ''))
    .filter(Boolean)
    .join('; ')
}
