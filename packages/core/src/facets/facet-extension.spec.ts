import { isNotNullish } from '@ocavue/utils'
import { describe, expect, it, vi } from 'vitest'

import { Priority } from '../types/priority'

import { defineFacet, Facet } from './facet'
import { FacetExtensionImpl } from './facet-extension'
import { subtractFacetNode, unionFacetNode } from './facet-node'
import type { FacetReducer } from './facet-types'
import { UnionExtensionImpl } from './union-extension'

describe('facet extension', () => {
  type FooHandler = (foo: string) => void
  type BarHandler = (bar: string) => void

  interface RootInput {
    onFoo?: FooHandler
    onBar?: BarHandler
  }

  interface RootOutput {
    fooHandlers: FooHandler[]
    barHandlers: BarHandler[]
  }

  type FooInput = FooHandler
  type BarInput = BarHandler

  const rootReducerImpl: FacetReducer<RootInput, RootOutput> = (input) => {
    const fooHandlers = input.map((i) => i.onFoo).filter(isNotNullish)
    const barHandlers = input.map((i) => i.onBar).filter(isNotNullish)
    return { fooHandlers, barHandlers }
  }
  const rootReducer = vi.fn(rootReducerImpl)
  const rootFacet = new Facet(null, true, rootReducer)

  // Foo facet uses `reduce` closure to return the same `onFoo` function every time.
  const fooReduce: () => FacetReducer<FooInput, RootInput> = () => {
    let fooHandlers: FooHandler[] | undefined

    const onFoo = (value: string): void => {
      fooHandlers?.forEach((handler) => handler(value))
    }

    return (input) => {
      fooHandlers = input
      return { onFoo }
    }
  }
  const fooFacet = defineFacet<FooInput, RootInput>({
    parent: rootFacet,
    reduce: fooReduce,
  })

  // Bar facet uses `reducer` directly thus the `onBar` function is a different instance every time.
  const barReducer: FacetReducer<BarInput, RootInput> = (input) => {
    return {
      onBar: (value: string) => {
        input.forEach((handler) => handler(value))
      },
    }
  }
  const barFacet = defineFacet<BarInput, RootInput>({
    parent: rootFacet,
    reducer: barReducer,
  })

  it('can merge payloads', () => {
    const fooHandler1: FooHandler = vi.fn()
    const fooExtension1 = new FacetExtensionImpl(fooFacet, [fooHandler1])

    const fooHandler2: FooHandler = vi.fn()
    const fooExtension2 = new FacetExtensionImpl(fooFacet, [fooHandler2])

    const barHandler1: BarHandler = vi.fn()
    const barExtension1 = new FacetExtensionImpl(barFacet, [barHandler1])

    const extension1 = new UnionExtensionImpl([
      fooExtension1,
      fooExtension2,
      barExtension1,
    ])

    const tree = extension1.createTree(Priority.default)
    const rootOutput = tree.getSingletonOutput() as RootOutput
    expect(rootOutput.fooHandlers).toHaveLength(1)
    expect(rootOutput.barHandlers).toHaveLength(1)

    expect(fooHandler1).toHaveBeenCalledTimes(0)
    expect(fooHandler2).toHaveBeenCalledTimes(0)
    expect(barHandler1).toHaveBeenCalledTimes(0)

    rootOutput.fooHandlers.forEach((handler) => handler('a'))
    expect(fooHandler1).toHaveBeenCalledWith('a')
    expect(fooHandler1).toHaveBeenCalledTimes(1)
    expect(fooHandler2).toHaveBeenCalledWith('a')
    expect(fooHandler2).toHaveBeenCalledTimes(1)

    rootOutput.barHandlers.forEach((handler) => handler('b'))
    expect(barHandler1).toHaveBeenCalledWith('b')
    expect(barHandler1).toHaveBeenCalledTimes(1)
  })

  it('can skip unnecessary update', () => {
    const fooHandler1: FooHandler = vi.fn()
    const fooExtension1 = new FacetExtensionImpl(fooFacet, [fooHandler1])

    const fooHandler2: FooHandler = vi.fn()
    const fooExtension2 = new FacetExtensionImpl(fooFacet, [fooHandler2])

    const barHandler1: BarHandler = vi.fn()
    const barExtension1 = new FacetExtensionImpl(barFacet, [barHandler1])

    const barHandler2: BarHandler = vi.fn()
    const barExtension2 = new FacetExtensionImpl(barFacet, [barHandler2])

    // Initial the root output with fooExtension1 and barExtension1.
    const rootExtension = new UnionExtensionImpl([fooExtension1, barExtension1])
    let tree = rootExtension.createTree(Priority.default)
    let rootOutput = tree.getSingletonOutput() as RootOutput

    // Save the initial root output.
    const rootFooHandlers1 = [...rootOutput.fooHandlers]
    const rootBarHandlers1 = [...rootOutput.barHandlers]

    // Add fooExtension2.
    // This should not trigger any updates to the root output.
    tree = unionFacetNode(tree, fooExtension2.getTree())
    rootOutput = tree.getSingletonOutput() as RootOutput
    const rootFooHandlers2 = [...rootOutput.fooHandlers]
    const rootBarHandlers2 = [...rootOutput.barHandlers]
    expect(rootFooHandlers2).toEqual(rootFooHandlers1)
    expect(rootBarHandlers2).toEqual(rootBarHandlers1)

    // Add barExtension2.
    // This should change rootOutput.barHandlers
    tree = unionFacetNode(tree, barExtension2.getTree())
    rootOutput = tree.getSingletonOutput() as RootOutput
    const rootFooHandlers3 = [...rootOutput.fooHandlers]
    const rootBarHandlers3 = [...rootOutput.barHandlers]
    expect(rootFooHandlers3).toEqual(rootFooHandlers2)
    expect(rootBarHandlers3).not.toEqual(rootBarHandlers2)

    // Remove fooExtension1
    // This should not trigger any updates to the root output.
    tree = subtractFacetNode(tree, fooExtension1.getTree())
    rootOutput = tree.getSingletonOutput() as RootOutput
    const rootFooHandlers4 = [...rootOutput.fooHandlers]
    const rootBarHandlers4 = [...rootOutput.barHandlers]
    expect(rootFooHandlers4).toEqual(rootFooHandlers3)
    expect(rootBarHandlers4).toEqual(rootBarHandlers3)

    // Remove barExtension2
    // This should change rootOutput.barHandlers
    tree = subtractFacetNode(tree, barExtension2.getTree())
    rootOutput = tree.getSingletonOutput() as RootOutput
    const rootFooHandlers5 = [...rootOutput.fooHandlers]
    const rootBarHandlers5 = [...rootOutput.barHandlers]
    expect(rootFooHandlers5).toEqual(rootFooHandlers4)
    expect(rootBarHandlers5).not.toEqual(rootBarHandlers4)
  })
})
