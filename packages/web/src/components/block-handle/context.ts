import { createContext, createSignal, type Context, type Signal } from '@aria-ui/core'
import type { OverlayStore } from '@aria-ui/elements/overlay'

import type { HoverState } from './hover-state.ts'

/**
 * @internal
 */
export class BlockHandleStore {
  readonly hoverState: Signal<HoverState | undefined> = createSignal<HoverState | undefined>(undefined)
  readonly dragging: Signal<boolean> = createSignal(false)
}

/**
 * @internal
 */
export const blockHandleStoreContext: Context<BlockHandleStore> = createContext<BlockHandleStore>('prosekit-block-handle-store')

/**
 * @internal
 */
export const blockHandleOverlayStoreContext: Context<OverlayStore> = createContext<OverlayStore>('prosekit-block-handle-overlay-store')
