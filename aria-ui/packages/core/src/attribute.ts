import type { AnyProps, PropDeclaration, PropsDeclaration } from './define-props.ts'
import type { HostElement } from './host-element.ts'
import type { Signal } from './signal.ts'
import type { Store } from './store.ts'
import { useEffect } from './use-effect.ts'

/**
 * @internal
 */
export function usePropertiesToAttributes(
  element: HostElement,
  store: Store<AnyProps>,
  declarations: PropsDeclaration<AnyProps>,
): void {
  for (const [propertyName, declaration] of Object.entries(declarations)) {
    const attributeName: string | false = declaration.attribute
    if (!attributeName) {
      continue
    }
    const defaultValue: unknown = declaration.default
    const signal: Signal<unknown> = store[propertyName]

    useEffect(element, () => {
      const propertyValue: unknown = signal.get()
      if (
        propertyValue === defaultValue
        && !element.hasAttribute(attributeName)
      ) {
        return
      }
      const attributeValue = propertyToAttribute(declaration, propertyValue)
      if (attributeValue !== element.getAttribute(attributeName)) {
        element.setAttribute(attributeName, attributeValue)
      }
    })
  }
}

/**
 * @internal
 */
export function handleAttributeChanged(
  store: Store<AnyProps>,
  declarations: PropsDeclaration<AnyProps>,
  attributeNameToPropertyName: Map<string, string>,
  attributeName: string,
  attributeValue: string | null | undefined,
): void {
  const propertyName = attributeNameToPropertyName.get(attributeName)
  if (!propertyName) {
    return
  }
  const declaration = declarations[propertyName]
  const signal: Signal<unknown> = store[propertyName]
  const defaultValue: unknown = declaration.default

  if (attributeValue == null) {
    if (signal.get() === defaultValue) {
      return
    }
    signal.set(defaultValue)
    return
  }

  if (propertyToAttribute(declaration, signal.get()) === attributeValue) {
    return
  }

  const propertyValue = propertyFromAttribute(declaration, attributeValue)
  signal.set(propertyValue)
}

/**
 * @internal
 */
export function createAttributePropertyNameMap(
  declarations: PropsDeclaration<AnyProps>,
): Map<string, string> {
  const attributeNameToPropertyName = new Map<string, string>()
  for (const [propertyName, declaration] of Object.entries(declarations)) {
    const attributeName: string | false = declaration.attribute
    if (attributeName) {
      attributeNameToPropertyName.set(attributeName, propertyName)
    }
  }
  return attributeNameToPropertyName
}

function propertyToAttribute(
  declaration: PropDeclaration<unknown>,
  propertyValue: unknown,
): string {
  switch (declaration.type) {
    case 'boolean':
      return booleanToAttribute(propertyValue)
    case 'string':
      return stringToAttribute(propertyValue)
    case 'number':
      return numberToAttribute(propertyValue)
    case 'json':
      return jsonToAttribute(propertyValue)
    default:
      throw new Error(
        `[aria-ui] Unsupported type: ${declaration.type satisfies never}`,
      )
  }
}

function propertyFromAttribute(
  declaration: PropDeclaration<unknown>,
  attributeValue: string,
): unknown {
  switch (declaration.type) {
    case 'boolean':
      return booleanFromAttribute(attributeValue)
    case 'string':
      return stringFromAttribute(attributeValue)
    case 'number':
      return numberFromAttribute(attributeValue)
    case 'json':
      return jsonFromAttribute(attributeValue)
    default:
      throw new Error(
        `[aria-ui] Unsupported type: ${declaration.type satisfies never}`,
      )
  }
}

function booleanToAttribute(value: unknown): string {
  if (value === true) {
    return 'true'
  }
  if (value === false) {
    return 'false'
  }
  throw new Error(`[aria-ui] Invalid boolean property value: ${value}`)
}
function booleanFromAttribute(value: string): boolean {
  if (value === 'true' || value === '') {
    return true
  }
  if (value === 'false') {
    return false
  }
  console.warn(`[aria-ui] Invalid boolean attribute value: ${value}`)
  return false
}

function stringToAttribute(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }
  throw new Error(`[aria-ui] Invalid string property value: ${value}`)
}
function stringFromAttribute(value: string): string {
  return value
}

function numberToAttribute(value: unknown): string {
  if (typeof value === 'number') {
    return String(value)
  }
  throw new Error(`[aria-ui] Invalid number property value: ${value}`)
}
function numberFromAttribute(value: string): number {
  const number = Number(value)
  if (Number.isNaN(number)) {
    console.warn(`[aria-ui] Invalid number attribute value: ${value}`)
    return 0
  }
  return number
}

function jsonToAttribute(value: unknown): string {
  if (value === undefined) {
    return ''
  }
  try {
    return JSON.stringify(value)
  } catch (error) {
    throw new Error(`[aria-ui] Invalid JSON property value: ${error}`, {
      cause: error,
    })
  }
}
function jsonFromAttribute(value: string): unknown {
  if (value === '') {
    return undefined
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    console.warn(`[aria-ui] Invalid JSON attribute value: ${value}`, error)
    return null
  }
}
