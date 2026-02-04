import type { Extension, ExtensionTyping } from '../types/extension'
import type { Priority } from '../types/priority'
import { assert } from '../utils/assert'

import { BaseExtension } from './base-extension'
import { unionFacetNode, type FacetNode } from './facet-node'

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
