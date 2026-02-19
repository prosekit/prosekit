import type { PickSubType } from './pick-sub-type.ts'

/**
 * @internal
 */
export type PickStringLiteral<T> = PickSubType<T, string>
