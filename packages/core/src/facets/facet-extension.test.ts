import { describe, expect, it, vi } from 'vitest'

import { Priority } from '../types/priority'
import { isNotNull } from '../utils/is-not-null'

import { Facet, defineFacet } from './facet'
import { FacetExtensionImpl } from './facet-extension'
import { unionFacetNode } from './facet-node'
import type { FacetReducer } from './facet-types'
import { UnionExtensionImpl } from './union-extension'

describe('facet extension', () => {
  type KeyDownHandler = (key: string) => void
  type MouseDownHandler = (double: boolean) => void

  interface RootInput {
    onKeyDown?: KeyDownHandler
    onMouseDown?: MouseDownHandler
  }

  interface RootOutput {
    keyDownHandlers: KeyDownHandler[]
    mouseDownHandlers: MouseDownHandler[]
  }

  type KeyDownInput = KeyDownHandler
  type MouseDownInput = MouseDownHandler

  const rootReducerImpl: FacetReducer<RootInput, RootOutput> = (input) => {
    const keyDownHandlers = input.map((i) => i.onKeyDown).filter(isNotNull)
    const mouseDownHandlers = input.map((i) => i.onMouseDown).filter(isNotNull)
    return { keyDownHandlers, mouseDownHandlers }
  }
  const rootReducer = vi.fn(rootReducerImpl)
  const rootFacet = new Facet(null, true, rootReducer)

  const keyDownReduce: () => FacetReducer<KeyDownInput, RootInput> = () => {
    let keyDownHandlers: KeyDownHandler[] | undefined

    const onKeyDown = (key: string): void => {
      keyDownHandlers?.forEach((handler) => handler(key))
    }

    return (input) => {
      keyDownHandlers = input
      return { onKeyDown }
    }
  }
  const keyDownFacet = defineFacet({
    parent: rootFacet,
    reduce: keyDownReduce,
  })

  const mouseDownReducer: FacetReducer<MouseDownInput, RootInput> = (input) => {
    return {
      onMouseDown: (double: boolean) => {
        input.forEach((handler) => handler(double))
      },
    }
  }
  const mouseDownFacet = defineFacet({
    parent: rootFacet,
    reducer: mouseDownReducer,
  })

  it('can merge payloads', () => {
    const keyDownHandler1: KeyDownHandler = vi.fn()
    const keybindExtension1 = new FacetExtensionImpl(keyDownFacet, [
      keyDownHandler1,
    ])

    const keyDownHandler2: KeyDownHandler = vi.fn()
    const keybindExtension2 = new FacetExtensionImpl(keyDownFacet, [
      keyDownHandler2,
    ])

    const mouseDownHandler1: MouseDownHandler = vi.fn()
    const mouseExtension1 = new FacetExtensionImpl(mouseDownFacet, [
      mouseDownHandler1,
    ])

    const extension1 = new UnionExtensionImpl([
      keybindExtension1,
      keybindExtension2,
      mouseExtension1,
    ])

    const tree = extension1.createTree(Priority.default)
    const rootOutput = tree.getSingletonOutput() as RootOutput
    expect(rootOutput.keyDownHandlers).toHaveLength(1)
    expect(rootOutput.mouseDownHandlers).toHaveLength(1)

    expect(keyDownHandler1).toHaveBeenCalledTimes(0)
    expect(keyDownHandler2).toHaveBeenCalledTimes(0)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(0)

    rootOutput.keyDownHandlers.forEach((handler) => handler('a'))
    expect(keyDownHandler1).toHaveBeenCalledWith('a')
    expect(keyDownHandler1).toHaveBeenCalledTimes(1)
    expect(keyDownHandler2).toHaveBeenCalledWith('a')
    expect(keyDownHandler2).toHaveBeenCalledTimes(1)

    rootOutput.mouseDownHandlers.forEach((handler) => handler(true))
    expect(mouseDownHandler1).toHaveBeenCalledWith(true)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(1)
  })

  it('can skip unnecessary update', () => {
    const keyDownHandler1: KeyDownHandler = vi.fn()
    const keybindExtension1 = new FacetExtensionImpl(keyDownFacet, [
      keyDownHandler1,
    ])

    const keyDownHandler2: KeyDownHandler = vi.fn()
    const keybindExtension2 = new FacetExtensionImpl(keyDownFacet, [
      keyDownHandler2,
    ])

    const mouseDownHandler1: MouseDownHandler = vi.fn()
    const mouseExtension1 = new FacetExtensionImpl(mouseDownFacet, [
      mouseDownHandler1,
    ])

    const mouseDownHandler2: MouseDownHandler = vi.fn()
    const mouseExtension2 = new FacetExtensionImpl(mouseDownFacet, [
      mouseDownHandler2,
    ])

    const extension1 = new UnionExtensionImpl([
      keybindExtension1,
      mouseExtension1,
    ])

    const tree1 = extension1.createTree(Priority.default)
    const rootOutput1 = tree1.getSingletonOutput() as RootOutput
    const rootKeyDownHandlers1 = rootOutput1.keyDownHandlers
    const rootMouseDownHandlers1 = rootOutput1.mouseDownHandlers

    // Add keybindExtension2
    const tree2 = unionFacetNode(tree1, keybindExtension2.getTree())
    const rootOutput2 = tree2.getSingletonOutput() as RootOutput
    const rootKeyDownHandlers2 = rootOutput2.keyDownHandlers
    const rootMouseDownHandlers2 = rootOutput2.mouseDownHandlers

    expect(rootKeyDownHandlers1).toEqual(rootKeyDownHandlers2)
    expect(rootMouseDownHandlers1).toEqual(rootMouseDownHandlers2)
  })
})
