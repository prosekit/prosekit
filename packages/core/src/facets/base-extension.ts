import { Schema } from '@prosekit/pm/model'

import type { Extension } from '../types/extension'
import type { ExtensionTyping } from '../types/extension-typing'
import type { Priority } from '../types/priority'

export abstract class BaseExtension<
  T extends ExtensionTyping = ExtensionTyping,
> implements Extension<T>
{
  extension: Extension | Extension[] = []
  priority?: Priority
  _type?: T

  /**
   * @internal
   *
   * Whether this extension has payload that can be converted to a schema.
   *
   * Notice that this does not mean that the extension has a schema. For
   * example, a `FacetExtension` with a `schemaFacet` will return `true` for
   * this property, but will return `null` for `schema`.
   */
  abstract hasSchema: boolean

  /**
   * @internal
   *
   * The schema that this extension represents.
   */
  abstract schema: Schema | null
}
