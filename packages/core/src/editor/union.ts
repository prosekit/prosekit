import type { BaseExtension } from '../facets/base-extension'
import { UnionExtensionImpl } from '../facets/union-extension'
import type { Extension, UnionExtension } from '../types/extension'
import { assert } from '../utils/assert'

/**
 * Merge multiple extensions into one.
 *
 * Throws an error if no extensions are provided.
 *
 * @public
 */
export function union<E extends Extension | Extension[]>(
  extension: E,
): UnionExtension<E> {
  const array = Array.isArray(extension) ? extension : [extension]
  assert(array.length > 0, 'At least one extension is required')
  return new UnionExtensionImpl(
    array as BaseExtension[],
  ) as Extension as UnionExtension<E>
}
