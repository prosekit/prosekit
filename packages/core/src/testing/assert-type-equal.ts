import type { IsEqual } from 'type-fest'

/**
 * Utility function assert that two types are equal in tests.
 */
export function assertTypeEqual<T, U>(_val: IsEqual<T, U>): void {
  // noop
}
