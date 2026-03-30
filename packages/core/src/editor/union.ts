import type { BaseExtension } from '../facets/base-extension.ts'
import { UnionExtensionImpl } from '../facets/union-extension.ts'
import type { Extension, Union } from '../types/extension.ts'
import { assert } from '../utils/assert.ts'

/**
 * Merges multiple extensions into one. You can pass multiple extensions as
 * arguments or a single array containing multiple extensions.
 *
 * @throws If no extensions are provided.
 *
 * @example
 *
 * ```ts
 * function defineFancyNodes() {
 *   return union(
 *     defineFancyParagraph(),
 *     defineFancyHeading(),
 *   )
 * }
 * ```
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
function union<const E extends readonly Extension[]>(...exts: E): Union<E>
function union<const E extends readonly Extension[]>(exts: E): Union<E>
function union(...exts: Array<Extension | Extension[]>): Extension {
  const extensions: Extension[] = exts.flat()
  assert(extensions.length > 0, 'At least one extension is required')
  return new UnionExtensionImpl(extensions as BaseExtension[]) as Extension
}

export { union }
