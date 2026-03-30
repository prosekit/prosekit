import type { Extension } from '../types/extension.ts'
import type { Priority } from '../types/priority.ts'

import { union } from './union.ts'

/**
 * Return an new extension with the given priority.
 *
 * @example
 * ```ts
 * import { Priority, withPriority } from 'prosekit/core'
 *
 * const extension = withPriority(defineMyExtension(), Priority.high)
 * ```
 *
 * @public
 */
export function withPriority<T extends Extension>(
  extension: T,
  priority: Priority,
): T {
  const result = union(extension)
  result.priority = priority
  return result as T
}
