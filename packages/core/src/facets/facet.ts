import { ProseKitError } from '../error.ts'

import type { FacetReducer } from './facet-types.ts'

let facetCount = 0

/**
 * @internal
 */
export class Facet<Input, Output> {
  /**
   * @internal
   */
  readonly index: number = facetCount++
  /**
   * @internal
   */
  readonly parent: Facet<Output, any> | null
  /**
   * @internal
   */
  readonly singleton: boolean
  /**
   * A index path to retrieve the current facet in a tree from the root.
   *
   * @internal
   */
  readonly path: number[]

  private reduce: () => FacetReducer<Input, Output>

  /**
   * @internal
   */
  constructor(
    parent: Facet<Output, any> | null,
    singleton: boolean,
    reducer?: FacetReducer<Input, Output>,
    reduce?: () => FacetReducer<Input, Output>,
  ) {
    if (reduce && !reducer) {
      this.reduce = reduce
    } else if (reducer && !reduce) {
      this.reduce = () => reducer
    } else {
      throw new ProseKitError('Incorrect reducer')
    }

    this.parent = parent
    this.singleton = singleton
    this.path = parent ? [...parent.path, this.index] : []
  }

  get reducer(): FacetReducer<Input, Output> {
    return this.reduce()
  }
}

/**
 * @internal
 */
export function defineFacet<Input, Output>(options: {
  /**
   * The parent facet in the tree.
   */
  parent: Facet<Output, any>

  /**
   * Set this to true if you only want to keep one facet payload. For example,
   * this facet corresponds to a ProseMirror plugin with a key.
   */
  singleton?: boolean

  /**
   * A reducer is a function that accepts an array of input and produce a single
   * output.
   */
  reducer?: FacetReducer<Input, Output>
  /**
   * A callback function that returns a reducer. This is useful if you want to
   * store something in the closure.
   */
  reduce?: () => FacetReducer<Input, Output>
}): Facet<Input, Output> {
  return new Facet(
    options.parent,
    options.singleton ?? false,
    options.reducer,
    options.reduce,
  )
}
