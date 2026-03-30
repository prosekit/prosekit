import { ProseKitError } from '../error.ts'

/**
 * @internal
 */
export function assert(
  condition: unknown,
  message = 'Assertion failed',
): asserts condition {
  if (!condition) {
    throw new ProseKitError(message)
  }
}
