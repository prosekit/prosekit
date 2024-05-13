import type { Extension } from '../types/extension'
import { Priority } from '../types/priority'

import { BaseExtension } from './base-extension'
import { Facet } from './facet'
import { FacetNode } from './facet-node'
import type { Tuple5 } from './facet-types'

/**
 * @internal
 */
export class FacetExtensionImpl<Input, Output> extends BaseExtension {
  declare extension: Extension

  /**
   * @internal
   */
  constructor(
    readonly facet: Facet<Input, Output>,
    readonly payloads: Input[],
  ) {
    super()
  }

  /**
   * @internal
   */
  createTree(priority: Priority) {
    const pri = this.priority ?? priority

    const inputs: Tuple5<Input[] | null> = [null, null, null, null, null]
    inputs[pri] = [...this.payloads]

    let node: FacetNode = new FacetNode(this.facet, inputs)

    while (node.facet.parent) {
      const children = new Map([[node.facet.index, node]])
      node = new FacetNode(node.facet.parent, undefined, children)
    }

    return node
  }
}

/**
 * @internal
 */
export function defineFacetPayload<Input>(
  facet: Facet<Input, any>,
  payloads: Input[],
): Extension {
  return new FacetExtensionImpl(facet, payloads)
}
