import { ProseKitError } from '..'
import type { Extension } from '../types/extension'

import type { Slot } from './slot'

/** @public */
export interface FacetOptions<Input, Output> {
  combine?: (inputs: Input[]) => Output
  slot?: () => Slot<Input, Output>
  next: Facet<Output, any>
  single?: boolean
}

let nextIndex = 0

/** @public */
export class Facet<Input, Output> {
  /** @internal */
  readonly index = nextIndex++
  /** @internal */
  readonly slot: () => Slot<Input, Output>
  /** @internal */
  readonly next: Facet<Output, any> | null
  /** @internal */
  readonly single: boolean

  private constructor(
    slot: () => Slot<Input, Output>,
    next: Facet<Output, any> | null,
    single: boolean,
  ) {
    this.slot = slot
    this.next = next
    this.single = single
  }

  static define<Input, Output>({
    slot,
    combine,
    next,
    single,
  }: FacetOptions<Input, Output>) {
    // TODO: Remove combine
    const slotFn = slot
      ? slot
      : combine
      ? () => ({
          create: combine,
          update: combine,
        })
      : null

    if (!slotFn) {
      throw new ProseKitError(
        "Facet must have either 'slot' or 'combine' option",
      )
    }

    return new Facet<Input, Output>(slotFn, next, single ?? false)
  }

  /** @internal */
  static defineSlot<Input>(options: Omit<FacetOptions<Input, Input>, 'next'>) {
    // @ts-expect-error: next is empty here
    return Facet.define(options)
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
