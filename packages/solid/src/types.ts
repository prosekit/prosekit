import type { Accessor, JSX, JSXElement } from 'solid-js'

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
