import type { MarkAction } from '../editor/action'

/**
 * @internal
 */
export interface MarkTyping {
  [name: string]: Record<string, any>
}

/**
 * @internal
 */
export type ToMarkAction<T extends MarkTyping> = {
  [K in keyof T]: MarkAction<T[K]>
}

