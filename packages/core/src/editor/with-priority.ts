import { Extension } from '../types/extension'
import { Priority } from '../types/priority'

/** @public */
export function withPriority<T extends Extension>(
  extension: T,
  priority: Priority,
): T {
  return { extension, priority } as Extension as T
}
