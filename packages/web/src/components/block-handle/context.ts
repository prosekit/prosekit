import { createContext } from '@aria-ui/core'
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
export type BlockPopoverContext = HoverState | null

/**
 * @internal
 */
export const blockPopoverContext = createContext<BlockPopoverContext>(
  'prosekit-block-popover-context',
  null,
)
