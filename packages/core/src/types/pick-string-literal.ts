import type { PickSubType } from './pick-sub-type'

/**
 * @internal
 */
export type PickStringLiteral<T> = PickSubType<T, string>
