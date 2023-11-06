import { Schema } from '@prosekit/pm/model'

import { ProseKitError } from '..'
import type { Extension } from '../types/extension'
import type { ExtensionTyping } from '../types/extension-typing'
import type { Priority } from '../types/priority'

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
> extends BaseExtensionImpl<T> implements Extension<T> {
  private _schema: Schema | null | undefined = undefined

  private hasSchemaCount: number

  constructor(public extension: BaseExtensionImpl[] = []) {
    super()

    this.hasSchemaCount = 0

    for (const e of extension) {
      if (e instanceof BaseExtensionImpl) {
        this.hasSchemaCount += e.hasSchema ? 1 : 0
      } else {
        throw new ProseKitError('Invalid extension')
      }
    }
  }

  get hasSchema(): boolean {
    return this.hasSchemaCount > 0
  }

  get schema(): Schema | null {
    if (this._schema !== undefined) {
      return this._schema
    }

    if (this.hasSchemaCount === 0) {
      this._schema = null
      return this._schema
    }

    if (this.hasSchemaCount === 1) {
      const schema = this.extension.find((e) => e.hasSchema)?.schema
      if (schema) {
        this._schema = schema
        return this._schema
      }
    }

    const { schemaInput } = updateExtension([], [], this, 'add')
    this._schema = schemaInput ? new Schema(schemaInput) : null
    return this._schema
  }
}
