/**
 * ProseKit extension priority.
 *
 * There are five priority levels available:
 *
 * - `Priority.lowest`
 * - `Priority.low`
 * - `Priority.default`
 * - `Priority.high`
 * - `Priority.highest`
 *
 * @example
 *
 * ```ts
 * import { withPriority, Priority } from 'prosekit/core'
 * import { myExtension } from './my-extension.js'
 *
 * const myExtensionWithHighPriority = withPriority(myExtension, Priority.high)
 * ```
 *
 * @public
 */
const Priority = {
  lowest: 0,
  low: 1,
  default: 2,
  high: 3,
  highest: 4,
} as const

/**
 * ProseKit extension priority.
 *
 * There are five priority levels available:
 *
 * - `Priority.lowest`
 * - `Priority.low`
 * - `Priority.default`
 * - `Priority.high`
 * - `Priority.highest`
 *
 * @example
 *
 * ```ts
 * import { withPriority, Priority } from 'prosekit/core'
 * import { myExtension } from './my-extension.js'
 *
 * const myExtensionWithHighPriority = withPriority(myExtension, Priority.high)
 * ```
 *
 * @public
 */
type Priority = typeof Priority[keyof typeof Priority]

export { Priority }
