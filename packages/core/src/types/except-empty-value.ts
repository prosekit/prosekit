import type { ConditionalExcept, EmptyObject } from 'type-fest'

type EmptyValue = undefined | null | EmptyObject
export type ExceptEmptyValue<T> = ConditionalExcept<T, EmptyValue>
