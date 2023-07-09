import { Extension } from '../types/extension'

/** @public */
export interface FacetOptions<Input, Output> {
  combine: (inputs: Input[]) => Output
  next: Facet<Output, any>
}

let nextIndex = 0

/** @public */
export class Facet<Input, Output> {
  /** @internal */
  readonly index = nextIndex++
  /** @internal */
  readonly combine: (inputs: Input[]) => Output
  /** @internal */
  readonly next: Facet<Output, any> | null

  private constructor(
    combine: (inputs: Input[]) => Output,
    next: Facet<Output, any> | null,
  ) {
    this.combine = combine
    this.next = next
  }

  static define<Input, Output>({ combine, next }: FacetOptions<Input, Output>) {
    return new Facet<Input, Output>(combine, next)
  }

  /** @internal */
  static defineSlot<Input>({
    combine,
  }: Omit<FacetOptions<Input, Input>, 'next'>) {
    return new Facet<Input, Input>(combine, null)
  }

  extension(inputs: Input[]): FacetExtension<Input, Output> {
    return new FacetExtension(this, inputs)
  }
}

/** @public */
export class FacetExtension<Input, Output> {
  declare extension: Extension
  constructor(
    readonly facet: Facet<Input, Output>,
    readonly inputs: Input[],
  ) {}
}

/**
 * Use topological sort algorithm to sort facets.
 */
export function sortFacets(unsorted: readonly Facet<any, any>[]) {
  const facets: Facet<any, any>[] = unsorted.filter((val) => val)
  const facetMap: Facet<any, any>[] = []
  const inbounds: number[] = []
  let facetCount = 0

  for (const facet of facets) {
    const index = facet.index

    if (facetMap[index] != null) {
      continue
    }

    if (inbounds[index] == null) {
      inbounds[index] = 0
    }

    facetCount++
    facetMap[index] = facet

    if (facet.next) {
      const nextIndex = facet.next.index

      if (inbounds[nextIndex] == null) {
        inbounds[nextIndex] = 0
      }
      inbounds[nextIndex] += 1

      if (facetMap[nextIndex] == null) {
        facets.push(facet.next)
      }
    }
  }

  const sortedFacets: Facet<any, any>[] = []
  const sortedIndexes: number[] = []

  inbounds.forEach((inbound, index) => {
    if (inbound === 0) {
      sortedIndexes.push(index)
    }
  })

  for (const index of sortedIndexes) {
    const facet = facetMap[index]
    sortedFacets.push(facet)

    const nextIndex = facet.next?.index
    if (nextIndex == null) continue

    inbounds[nextIndex] -= 1
    if (inbounds[nextIndex] === 0) {
      sortedIndexes.push(nextIndex)
    }
  }

  if (facetCount !== sortedFacets.length) {
    throw new Error(`Facet has circular dependency`)
  }

  return sortedFacets
}
