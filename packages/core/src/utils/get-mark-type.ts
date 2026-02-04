import type { MarkType, Schema } from '@prosekit/pm/model'

import { ProseKitError } from '../error'

/**
 * @internal
 */
export function getMarkType(schema: Schema, type: string | MarkType): MarkType {
  if (typeof type === 'string') {
    const markType = schema.marks[type]
    if (!markType) {
      throw new ProseKitError(`Cannot find mark type "${type}"`)
    }
    return markType
  }
  return type
}
