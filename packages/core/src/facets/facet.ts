import { assert } from '../utils/assert.ts'

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

  /**
   * @internal
   */
  constructor(
    parent: Facet<Output, any> | null,
    singleton: boolean,
    private _reducer?: FacetReducer<Input, Output> | undefined,
    private _reduce?: () => FacetReducer<Input, Output>,
  ) {
    // Only one of _reducer or _reduce can be defined
    assert((_reduce || _reducer) && !(_reduce && _reducer))

    this.parent = parent
    this.singleton = singleton
    this.path = parent ? [...parent.path, this.index] : []
  }

  get reducer(): FacetReducer<Input, Output> {
    return (this._reducer ?? this._reduce?.())!
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
