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

    const children = extensions.map((ext) => ext.getTree(pri))
    return children.reduce(unionFacetNode, new FacetNode(rootFacet))
  }
}
