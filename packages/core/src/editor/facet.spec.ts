import { describe, expect, it } from 'vitest'

import { Facet, sortFacets } from './facet'

describe('sortFacets', () => {
  const combine = (inputs: number[]) => Math.min(...inputs)

  it('sorts an array of facets with no dependencies', () => {
    const facet1 = Facet.defineSlot({ combine })
    const facet2 = Facet.defineSlot({ combine })

    const unsortedFacets = [facet2, facet1]
    const sortedFacets = sortFacets(unsortedFacets)

    expect(sortedFacets).toEqual([facet1, facet2])
  })

  it('sorts an array of facets with dependencies', () => {
    const facet1 = Facet.defineSlot({ combine })
    const facet2 = Facet.define({ combine, next: facet1 })
    const facet3 = Facet.define({ combine, next: facet1 })
    const facet4 = Facet.define({ combine, next: facet2 })

    const unsortedFacets = [facet1, facet2, facet3, facet4]
    const sortedFacets = sortFacets(unsortedFacets)

    expect(sortedFacets).toEqual([facet3, facet4, facet2, facet1])
  })

  it('throws an error when there is a circular dependency', () => {
    const facet1 = Facet.defineSlot({ combine })
    const facet2 = Facet.define({ combine, next: facet1 })
    // @ts-expect-error: facet1.next is readonly
    facet1.next = facet2

    const unsortedFacets = [facet1, facet2]

    expect(() => sortFacets(unsortedFacets)).toThrow(
      'Facet has circular dependency',
    )
  })
})
