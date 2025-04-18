import type {
  Accessor,
  JSX,
  JSXElement,
} from 'solid-js'

/**
 * @internal
 */
export type PropsWithClass<P = unknown> = P & {
  class?: string | undefined
}

/**
 * @internal
 */
export type PropsWithChildren<P = unknown> = P & {
  children?: JSXElement | undefined
}

/**
 * @internal
 */
export type PropsWithElement<Props extends object, CustomElement extends HTMLElement> = Props & JSX.HTMLAttributes<CustomElement>

/**
 * T or a reactive/non-reactive function returning T
 */
export type MaybeAccessor<T> = T | Accessor<T>

/**
 * Accessed value of a MaybeAccessor
 *
 * @example
 *
 * ```ts
 * MaybeAccessorValue<MaybeAccessor<string>>
 * // => string
 * MaybeAccessorValue<MaybeAccessor<() => string>>
 * // => string | (() => string)
 * MaybeAccessorValue<MaybeAccessor<string> | Function>
 * // => string | void
 * ```
 */
export type MaybeAccessorValue<T extends MaybeAccessor<any>> = T extends () => any ? ReturnType<T> : T
