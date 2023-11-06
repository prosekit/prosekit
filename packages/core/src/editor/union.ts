import { BaseExtensionImpl, UnionExtensionImpl } from '../facets/extension'
import type { SimplifyExtension, Extension } from '../types/extension'

export function union<E extends Extension | Extension[]>(
  extension: E,
): SimplifyExtension<E> {
  const array = Array.isArray(extension) ? extension : [extension]
  return new UnionExtensionImpl(
    array as BaseExtensionImpl[],
  ) as Extension as SimplifyExtension<E>
}
