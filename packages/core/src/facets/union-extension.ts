import type { Extension, ExtensionTyping } from '../types/extension.ts'
import type { Priority } from '../types/priority.ts'
import { assert } from '../utils/assert.ts'

import { BaseExtension } from './base-extension.ts'
import { unionFacetNode, type FacetNode } from './facet-node.ts'

export class UnionExtensionImpl<T extends ExtensionTyping = ExtensionTyping> extends BaseExtension<T> implements Extension<T> {
  /**
   * @internal
   */
  constructor(public extension: BaseExtension[] = []) {
    super()
  }

  /**
   * @internal
   */
  createTree(priority: Priority): FacetNode {
    const pri = this.priority ?? priority

    const extensions = [...this.extension]
    extensions.sort((a, b) => (a.priority ?? pri) - (b.priority ?? pri))

    const children: FacetNode[] = extensions.map((ext) => ext.getTree(pri))

    assert(children.length > 0)

    let node = children[0]
    for (let i = 1; i < children.length; i++) {
      node = unionFacetNode(node, children[i])
    }
    return node
  }
}
