import { isNotNullish } from '@ocavue/utils'

import { Priority } from '../types/priority.ts'
import { arraySubtract, uniqPush } from '../utils/array.ts'
import { assert } from '../utils/assert.ts'

import type { FacetReducer, Tuple5 } from './facet-types.ts'
import type { Facet } from './facet.ts'
import type { RootOutput } from './root.ts'

function zip5<T>(
  a: Tuple5<T>,
  b: Tuple5<T>,
  mapper: (a: T, b: T) => T,
): Tuple5<T> {
  return [
    mapper(a[0], b[0]),
    mapper(a[1], b[1]),
    mapper(a[2], b[2]),
    mapper(a[3], b[3]),
    mapper(a[4], b[4]),
  ]
}

function unionInput<T>(a: T[] | null, b: T[] | null): T[] | null {
  if (!a && !b) return null
  return uniqPush(a ?? [], b ?? [])
}

function subtractInput<T>(a: T[] | null, b: T[] | null): T[] | null {
  if (!a) return null
  if (!b) return [...a]
  return arraySubtract(a, b)
}

function unionChildren(
  a: Map<number, FacetNode>,
  b: Map<number, FacetNode>,
): Map<number, FacetNode> {
  const merged = new Map(a)
  for (const [key, valueB] of b.entries()) {
    const valueA = a.get(key)
    merged.set(key, valueA ? unionFacetNode(valueA, valueB) : valueB)
  }
  return merged
}

function subtractChildren(
  a: Map<number, FacetNode>,
  b: Map<number, FacetNode>,
): Map<number, FacetNode> {
  const merged = new Map(a)
  for (const [key, valueB] of b.entries()) {
    const valueA = a.get(key)
    if (valueA) {
      merged.set(key, subtractFacetNode(valueA, valueB))
    }
  }
  return merged
}

/**
 * Takes two facet nodes and returns a new facet node containing inputs and
 * children from both nodes.
 *
 * The reducers of the first facet node will be reused.
 *
 * @internal
 */
export function unionFacetNode<I, O>(
  a: FacetNode<I, O>,
  b: FacetNode<I, O>,
): FacetNode<I, O> {
  assert(a.facet === b.facet)
  return new FacetNode(
    a.facet,
    zip5(a.inputs, b.inputs, unionInput),
    unionChildren(a.children, b.children),
    a.reducers,
  )
}

/**
 * Takes two facet nodes and returns a new facet node containing inputs and
 * children from the first node but not the second.
 *
 * The reducers of the first facet node will be reused.
 *
 * @internal
 */
export function subtractFacetNode<I, O>(
  a: FacetNode<I, O>,
  b: FacetNode<I, O>,
): FacetNode<I, O> {
  assert(a.facet === b.facet)
  return new FacetNode(
    a.facet,
    zip5(a.inputs, b.inputs, subtractInput),
    subtractChildren(a.children, b.children),
    a.reducers,
  )
}

export class FacetNode<I = any, O = any> {
  output: Tuple5<O | null> | null = null

  constructor(
    readonly facet: Facet<I, O>,
    readonly inputs: Tuple5<I[] | null> = [null, null, null, null, null],
    readonly children: Map<number, FacetNode> = new Map(),
    readonly reducers: Tuple5<FacetReducer<I, O> | null> = [
      null,
      null,
      null,
      null,
      null,
    ],
  ) {}

  private calcOutput(): Tuple5<O | null> {
    const inputs: Tuple5<I[] | null> = [null, null, null, null, null]
    const output: Tuple5<O | null> = [null, null, null, null, null]

    for (let pri = 0; pri < 5; pri++) {
      const input = this.inputs[pri]
      if (input) {
        inputs[pri] = [...input]
      }
    }

    for (const child of this.children.values()) {
      const childOutput = child.getOutput()
      for (let pri = 0; pri < 5; pri++) {
        if (childOutput[pri]) {
          const input = (inputs[pri] ||= [])
          input.push(childOutput[pri] as I)
        }
      }
    }

    if (this.facet.singleton) {
      const reducer = (this.reducers[Priority.default] ||= this.facet.reducer)
      const input: I[] = inputs.filter(isNotNullish).flat()
      output[Priority.default] = reducer(input)
    } else {
      for (let pri = 0; pri < 5; pri++) {
        const input = inputs[pri]
        if (input) {
          const reducer = (this.reducers[pri] ||= this.facet.reducer)
          output[pri] = reducer(input)
        }
      }
    }

    return output
  }

  getOutput(): Tuple5<O | null> {
    if (!this.output) {
      this.output = this.calcOutput()
    }
    return this.output
  }

  getSingletonOutput(): O | null {
    assert(this.facet.singleton)
    return this.getOutput()[Priority.default]
  }

  getRootOutput(): RootOutput {
    assert(this.isRoot())
    const output = this.getSingletonOutput()
    assert(output)
    return output
  }

  isRoot(): boolean {
    return !this.facet.parent
  }
}
