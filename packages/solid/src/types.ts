import type { JSXElement } from 'solid-js'

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
