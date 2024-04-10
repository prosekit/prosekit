import { createContext } from '@aria-ui/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * @internal
 */
export interface BlockPositionerContext {
  pos: number | null
  node: ProseMirrorNode | null
  element: HTMLElement | null
}

/**
 * @internal
 */
export const blockPositionerContext = createContext<BlockPositionerContext>(
  'prosekit-block-positioner-context',
  {
    pos: null,
    node: null,
    element: null,
  },
)
