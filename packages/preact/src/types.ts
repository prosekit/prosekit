import type { ComponentChildren } from 'preact'

/**
 * @internal
 */
export type PropsWithClass<P = unknown> = P & {
  class?: string | undefined
  className?: string | undefined
}

/**
 * @internal
 */
export type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren | undefined
}
