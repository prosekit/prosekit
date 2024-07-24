import type { BaseExtension } from '../facets/base-extension'
import { UnionExtensionImpl } from '../facets/union-extension'
import type { Extension, UnionExtension } from '../types/extension'
import { assert } from '../utils/assert'

/**
 * Merge multiple extensions into one.
 *
 * @throws If no extensions are provided.
 *
 * @example
 *
 * ```ts
 * function defineFancyNodes() {
 *   return union([
 *     defineFancyParagraph(),
 *     defineFancyHeading(),
 *   ])
 * }
 * ```
 *
 * @public
 */
function union<const Extensions extends readonly Extension[]>(
  ...exts: Extensions
): UnionExtension<Extensions>
function union<const Extensions extends readonly Extension[]>(
  exts: Extensions,
): UnionExtension<Extensions>
function union(...exts: Array<Extension | Extension[]>): Extension {
  const extensions: Extension[] = exts.flat()
  assert(extensions.length > 0, 'At least one extension is required')
  return new UnionExtensionImpl(extensions as BaseExtension[]) as Extension
}

export { union }
