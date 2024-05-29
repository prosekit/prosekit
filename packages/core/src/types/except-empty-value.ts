import type { IsEmptyObject, IsNull } from 'type-fest'

type IsEmptyValue<T> =
  IsEmptyObject<T> extends true
    ? true
    : IsNull<T> extends true
      ? true
      : T extends undefined
        ? true
        : false

export type ExceptEmptyValue<T> = {
  [K in keyof T as IsEmptyValue<T[K]> extends true ? never : K]: T[K]
}
