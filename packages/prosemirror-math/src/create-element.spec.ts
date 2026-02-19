import { describe, expect, it } from 'vitest'

import { createElement } from './create-element.ts'

describe('createElement', () => {
  it('creates an element with the given tag', () => {
    const el = createElement('div')
    expect(el.tagName).toBe('DIV')
  })

  it('sets the className when provided', () => {
    const el = createElement('span', 'my-class')
    expect(el.className).toBe('my-class')
  })

  it('does not set className when empty string', () => {
    const el = createElement('div', '')
    expect(el.className).toBe('')
  })

  it('appends children', () => {
    const child1 = document.createElement('span')
    const child2 = document.createElement('em')
    const el = createElement('div', '', child1, child2)
    expect(el.children.length).toBe(2)
    expect(el.children[0]).toBe(child1)
    expect(el.children[1]).toBe(child2)
  })

  it('sets className and appends children together', () => {
    const child = document.createElement('code')
    const el = createElement('pre', 'source', child)
    expect(el.tagName).toBe('PRE')
    expect(el.className).toBe('source')
    expect(el.children.length).toBe(1)
    expect(el.children[0]).toBe(child)
  })
})
