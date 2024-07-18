import type { NodeAction } from '../editor/action'

/**
 * @internal
 */
export interface NodeTyping {
  [name: string]: Record<string, any>
}

/**
 * @internal
 */
export type ToNodeAction<T extends NodeTyping> = {
  [K in keyof T]: NodeAction<T[K]>
}
