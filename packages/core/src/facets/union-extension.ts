import { Schema } from '@prosekit/pm/model'

import { ProseKitError } from '../error'
import type { Extension } from '../types/extension'
import type { ExtensionTyping } from '../types/extension-typing'

import { BaseExtension } from './base-extension'
import { updateExtension } from './flatten'

export class UnionExtensionImpl<T extends ExtensionTyping = ExtensionTyping>
  extends BaseExtension<T>
  implements Extension<T>
{
  private _schema: Schema | null | undefined = undefined

  private hasSchemaCount: number

  constructor(public extension: BaseExtension[] = []) {
    super()

    this.hasSchemaCount = 0

    for (const e of extension) {
      if (e instanceof BaseExtension) {
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
