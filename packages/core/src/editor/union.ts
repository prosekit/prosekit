import type { BaseExtension } from '../facets/base-extension'
import { UnionExtensionImpl } from '../facets/union-extension'
import type { Extension, UnionExtension } from '../types/extension'

/**
 * Merge multiple extensions into one.
 *
 * @public
 */
export function union<E extends Extension | Extension[]>(
  extension: E,
): UnionExtension<E> {
  const array = Array.isArray(extension) ? extension : [extension]
  return new UnionExtensionImpl(
    array as BaseExtension[],
  ) as Extension as UnionExtension<E>
}
