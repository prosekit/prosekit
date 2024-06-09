import type { Extension, ExtensionTyping } from '../types/extension'
import { Priority } from '../types/priority'

import { BaseExtension } from './base-extension'
import { FacetNode, unionFacetNode } from './facet-node'
import { rootFacet } from './root'

export class UnionExtensionImpl<T extends ExtensionTyping = ExtensionTyping>
  extends BaseExtension<T>
  implements Extension<T>
{
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

    if (children.length === 0) {
      return new FacetNode(rootFacet)
    } else if (children.length === 1) {
      return children[0]
    } else {
      let node = children[0]
      for (let i = 1; i < children.length; i++) {
        node = unionFacetNode(node, children[i])
      }
      return node
    }
  }
}
