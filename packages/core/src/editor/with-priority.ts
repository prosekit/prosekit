import { type Extension } from '../types/extension'
import { Priority } from '../types/priority'

import { union } from './union'

/**
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
