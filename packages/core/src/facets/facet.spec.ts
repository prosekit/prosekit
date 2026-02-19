import { expect, test } from 'vitest'

import { Facet } from './facet.ts'

type RootInput = {
  count: number
}
type RootOutput = {
  count: number
  id: symbol
}
const id = Symbol('root-facet')
const rootFacet = new Facet<RootInput, RootOutput>(null, true, (input) => {
  const count = input
    .map(({ count }) => count)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  return {
    count,
    id,
  }
})

const doubleFacet = new Facet<RootOutput, RootOutput>(
  rootFacet,
  false,
  (input) => {
    const id = input[0].id
    const count = input
      .map(({ count }) => count)
      .reduce((acc, cur) => {
        return acc + cur
      }, 0)

    return {
      count: count * 2,
      id,
    }
  },
)

test('Root Facet', () => {
  expect(rootFacet.parent).toBe(null)
  expect(rootFacet.singleton).toBe(true)
  expect(rootFacet.path).toEqual([])
  expect(
    rootFacet.reducer([
      { count: 1 },
      { count: 2 },
      { count: 3 },
      { count: 4 },
      { count: 0 },
    ]),
  ).toEqual({ count: 10, id })
})

test('Child Facet', () => {
  expect(doubleFacet.parent).toBe(rootFacet)
  expect(doubleFacet.singleton).toBe(false)
  expect(doubleFacet.path).toEqual([1])
  expect(
    doubleFacet.reducer([
      { count: 1, id },
      { count: 2, id },
      { count: 3, id },
    ]),
  ).toEqual({
    count: 12,
    id,
  })
})
