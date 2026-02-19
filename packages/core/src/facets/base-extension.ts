import type { Schema } from '@prosekit/pm/model'

import type { Extension, ExtensionTyping } from '../types/extension.ts'
import { Priority } from '../types/priority.ts'

import type { FacetNode } from './facet-node.ts'
import type { Tuple5 } from './facet-types.ts'
import type { Facet } from './facet.ts'
import { schemaFacet } from './schema.ts'

/**
 * @internal
 */
export abstract class BaseExtension<T extends ExtensionTyping = ExtensionTyping> implements Extension<T> {
  abstract extension: Extension | Extension[]
  priority?: Priority
  _type?: T

  private trees: Tuple5<FacetNode | null> = [null, null, null, null, null]

  /**
   * @internal
   */
  abstract createTree(priority: Priority): FacetNode

  /**
   * @internal
   */
  getTree(priority?: Priority): FacetNode {
    const pri = priority ?? this.priority ?? Priority.default
    return (this.trees[pri] ||= this.createTree(pri))
  }

  /**
   * @internal
   */
  findFacetOutput<I, O>(facet: Facet<I, O>): Tuple5<O | null> | null {
    let node: FacetNode | undefined = this.getTree()

    for (const index of facet.path) {
      node = node?.children.get(index)
    }

    return node?.getOutput() ?? null
  }

  get schema(): Schema | null {
    const output = this.findFacetOutput(schemaFacet)
    return output?.find(Boolean)?.schema ?? null
  }
}
