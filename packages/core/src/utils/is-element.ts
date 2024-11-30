import { isObject } from './is-object'

const ELEMENT_NODE: typeof Node.ELEMENT_NODE = 1

export function isElement(el: unknown): el is Element {
  return (
    isObject(el)
    && el.nodeType === ELEMENT_NODE
    && typeof el.nodeName === 'string'
  )
}
