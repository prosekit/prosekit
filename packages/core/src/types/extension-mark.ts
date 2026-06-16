import type { MarkAction, MarkBuilder } from '../editor/action.ts'

/**
 * @internal
 */
export interface MarkTyping {
  [name: string]: Record<string, any>
}

/**
 * @internal
 */
export type ToMarkBuilder<T extends MarkTyping> = {
  [K in keyof T]: MarkBuilder<T[K]>
}

/**
 * @internal
 */
export type ToMarkAction<T extends MarkTyping> = {
  [K in keyof T]: MarkAction<T[K]>
}
