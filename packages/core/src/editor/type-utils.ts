import type { SimplifyExtension, Extension } from '../types/extension'

export function union<E extends Extension | Extension[]>(
  extension: E,
): SimplifyExtension<E> {
  if (extension && Array.isArray(extension)) {
    return { extension } as SimplifyExtension<E>
  }
  return extension as SimplifyExtension<E>
}
