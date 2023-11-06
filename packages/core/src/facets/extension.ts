import { Schema } from '@prosekit/pm/model'

import type { Extension } from '../types/extension'
import type { ExtensionTyping } from '../types/extension-typing'
import type { Priority } from '../types/priority'
import { notNull } from '../utils/not-null'

import { updateExtension } from './flatten'

export abstract class BaseExtensionImpl<
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

export class UnionExtensionImpl<
  T extends ExtensionTyping = ExtensionTyping,
> extends BaseExtensionImpl<T> {
  private _schema: Schema | null | undefined = undefined

  public hasSchema: boolean

  constructor(public extension: BaseExtensionImpl[] = []) {
    super()

    this.hasSchema =
      extension.length > 0 && extension.some((ext) => ext.hasSchema)
  }

  get schema(): Schema | null {
    if (!this.hasSchema) {
      return null
    }

    if (this._schema !== undefined) {
      return this._schema
    }

    const schemas = this.extension.map((ext) => ext.schema).filter(notNull)

    if (schemas.length === 0) {
      this._schema = null
    } else if (schemas.length === 1) {
      this._schema = schemas[0]
    } else {
      const { schemaInput } = updateExtension([], [], this, 'add')
      this._schema = schemaInput ? new Schema(schemaInput) : null
    }

    return this._schema
  }
}
