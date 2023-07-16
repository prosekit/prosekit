import type { ConditionalExcept, EmptyObject } from 'type-fest'

type EmptyValue = never | undefined | null | EmptyObject
export type ExceptEmptyValue<T> = ConditionalExcept<T, EmptyValue>
