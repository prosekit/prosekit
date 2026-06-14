import type { VirtualElement } from '@floating-ui/dom'
import { describe, expect, it } from 'vitest'

import { resolveAnchor } from './resolve-anchor.ts'

describe('resolveAnchor', () => {
  it('returns undefined for null', () => {
    expect(resolveAnchor(null)).toBe(undefined)
  })

  it('returns the element for an element', () => {
    const element = { nodeType: 1 } as unknown as Element
    expect(resolveAnchor(element)).toBe(element)
  })

  it('returns the virtual element for a virtual element', () => {
    const virtualElement: VirtualElement = {
      getBoundingClientRect: () => ({}) as DOMRect,
    }
    expect(resolveAnchor(virtualElement)).toBe(virtualElement)
  })

  it('calls a function anchor and returns its result', () => {
    const element = { nodeType: 1 } as unknown as Element
    expect(resolveAnchor(() => element)).toBe(element)
  })

  it('returns undefined when a function anchor returns null', () => {
    expect(resolveAnchor(() => null)).toBe(undefined)
  })
})
