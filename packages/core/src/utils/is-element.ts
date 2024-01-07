const hasElement = typeof Element !== 'undefined'

export function isElement(value: unknown): value is Element {
  return hasElement && value instanceof Element
}
