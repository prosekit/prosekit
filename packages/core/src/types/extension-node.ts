import type { NodeAction, NodeBuilder } from '../editor/action.ts'

/**
 * @internal
 */
export interface NodeTyping {
  [name: string]: Record<string, any>
}

/**
 * @internal
 */
export type ToNodeBuilder<T extends NodeTyping> = {
  [K in keyof T]: NodeBuilder<T[K]>
}

/**
 * @internal
 */
export type ToNodeAction<T extends NodeTyping> = {
  [K in keyof T]: NodeAction<T[K]>
}
