import { createContext } from '@aria-ui/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * @internal
 */
export interface BlockPopoverContext {
  pos: number | null
  node: ProseMirrorNode | null
  element: HTMLElement | null
}

/**
 * @internal
 */
export const blockPopoverContext = createContext<BlockPopoverContext>(
  'prosekit-block-positioner-context',
  {
    pos: null,
    node: null,
    element: null,
  },
)
