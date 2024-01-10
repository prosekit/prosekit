import type { BaseExtension } from '../facets/base-extension'
import { UnionExtensionImpl } from '../facets/union-extension'
import type { Extension, SimplifyExtension } from '../types/extension'

/**
 * Merge multiple extensions into one. If only one extension is provided, it
 * will be returned directly.
 *
 * @public
 */
export function union<E extends Extension | Extension[]>(
  extension: E,
): SimplifyExtension<E> {
  if (!Array.isArray(extension)) {
    return extension as SimplifyExtension<E>
  }

  if (extension.length === 1) {
    return extension[0] as SimplifyExtension<E>
  }

  return new UnionExtensionImpl(
    extension as BaseExtension[],
  ) as Extension as SimplifyExtension<E>
}
