import { test, expect } from 'vitest'

import { isElement } from './is-element'

test('isElement', () => {
  const textNode = document.createTextNode('text node')
  const htmlElement = document.createElement('div')
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  )

  expect(textNode instanceof Node).toBe(true)
  expect(htmlElement instanceof Node).toBe(true)
  expect(svgElement instanceof Node).toBe(true)

  expect(textNode instanceof Element).toBe(false)
  expect(htmlElement instanceof Element).toBe(true)
  expect(svgElement instanceof Element).toBe(true)

  expect(textNode instanceof HTMLElement).toBe(false)
  expect(htmlElement instanceof HTMLElement).toBe(true)
  expect(svgElement instanceof HTMLElement).toBe(false)

  expect(textNode instanceof SVGElement).toBe(false)
  expect(htmlElement instanceof SVGElement).toBe(false)
  expect(svgElement instanceof SVGElement).toBe(true)

  expect(isElement({})).toBe(false)
  expect(isElement(null)).toBe(false)
  expect(isElement(undefined)).toBe(false)
  expect(isElement('string')).toBe(false)
  expect(isElement(123)).toBe(false)
  expect(isElement(true)).toBe(false)
  expect(isElement(() => void 0)).toBe(false)
  expect(isElement(textNode)).toBe(false)
  expect(isElement(htmlElement)).toBe(true)
  expect(isElement(svgElement)).toBe(true)
})
