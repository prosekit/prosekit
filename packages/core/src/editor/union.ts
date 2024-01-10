import { BaseExtension } from '../facets/base-extension'
import { UnionExtensionImpl } from '../facets/union-extension'
import type { SimplifyExtension, Extension } from '../types/extension'

export function union<E extends Extension | Extension[]>(
  extension: E,
): SimplifyExtension<E> {
  const array = Array.isArray(extension) ? extension : [extension]
  return new UnionExtensionImpl(
    array as BaseExtension[],
  ) as Extension as SimplifyExtension<E>
}
