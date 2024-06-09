import { describe, expect, it, vi } from 'vitest'

import { Priority } from '../types/priority'

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
    onKeyDown: KeyDownHandler
    onMouseDown: MouseDownHandler
  }

  type KeyDownInput = KeyDownHandler
  type MouseDownInput = MouseDownHandler

  const rootReducerImpl: FacetReducer<RootInput, RootOutput> = (input) => {
    console.log('rootReducerImpl')
    return {
      onKeyDown: (key: string) => {
        input.forEach((input) => input?.onKeyDown?.(key))
      },
      onMouseDown: (double: boolean) => {
        input.forEach((input) => input?.onMouseDown?.(double))
      },
    }
  }
  const rootReducer = vi.fn(rootReducerImpl)
  const rootFacet = new Facet(null, true, rootReducer)

  const keyDownReduce: () => FacetReducer<KeyDownInput, RootInput> = () => {
    let keyDownHandlers: KeyDownHandler[] = []

    return (input) => {
      keyDownHandlers = input
      return {
        onKeyDown: (key: string) => {
          keyDownHandlers.forEach((handler) => handler(key))
        },
      }
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
    expect(rootOutput.onKeyDown).toBeTypeOf('function')
    expect(rootOutput.onMouseDown).toBeTypeOf('function')

    expect(keyDownHandler1).toHaveBeenCalledTimes(0)
    expect(keyDownHandler2).toHaveBeenCalledTimes(0)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(0)

    rootOutput.onKeyDown('a')
    expect(keyDownHandler1).toHaveBeenCalledWith('a')
    expect(keyDownHandler1).toHaveBeenCalledTimes(1)
    expect(keyDownHandler2).toHaveBeenCalledWith('a')
    expect(keyDownHandler2).toHaveBeenCalledTimes(1)

    rootOutput.onMouseDown(true)
    expect(mouseDownHandler1).toHaveBeenCalledWith(true)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(1)
  })

  it.only('can skip unnecessary update', () => {
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
    const rootOnKeyDown1 = rootOutput1.onKeyDown
    const rootOnMouseDown1 = rootOutput1.onMouseDown

    expect(keyDownHandler1).toHaveBeenCalledTimes(0)
    expect(keyDownHandler2).toHaveBeenCalledTimes(0)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(0)
    expect(mouseDownHandler2).toHaveBeenCalledTimes(0)

    rootOnKeyDown1('a')
    expect(keyDownHandler1).toHaveBeenCalledWith('a')
    expect(keyDownHandler1).toHaveBeenCalledTimes(1)
    expect(keyDownHandler2).toHaveBeenCalledTimes(0)

    rootOnMouseDown1(true)
    expect(mouseDownHandler1).toHaveBeenCalledWith(true)
    expect(mouseDownHandler1).toHaveBeenCalledTimes(1)
    expect(mouseDownHandler2).toHaveBeenCalledTimes(0)

    // Add mouseExtension2
    const tree2 = unionFacetNode(tree1, mouseExtension2.getTree())
    const rootOutput2 = tree2.getSingletonOutput() as RootOutput
    const rootOnKeyDown2 = rootOutput2.onKeyDown
    const rootOnMouseDown2 = rootOutput2.onMouseDown

    expect(rootOnKeyDown1).toBe(rootOnKeyDown2)
    expect(rootOnMouseDown1).toBe(rootOnMouseDown2)
  })
})
