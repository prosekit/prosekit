import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * @internal
 */
export interface HoverState {
  node: ProseMirrorNode
  pos: number
}

/**
 * @internal
 */
export class BlockHandleStore {
  readonly hoverState: Signal<HoverState | null> = createSignal<HoverState | null>(null)
  readonly dragging: Signal<boolean> = createSignal(false)
}

/**
 * @internal
 */
export const blockHandleStoreContext: Context<BlockHandleStore> = createContext<BlockHandleStore>('prosekit-block-handle-store')
