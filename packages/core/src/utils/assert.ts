import { ProseKitError } from '../error'

export function assert(
  condition: unknown,
  message = 'Assertion failed',
): asserts condition {
  if (!condition) {
    throw new ProseKitError(message)
  }
}
