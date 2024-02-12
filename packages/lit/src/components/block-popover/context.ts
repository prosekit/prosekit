import { createContext } from '@lit/context'
import type { ProseMirrorNode } from '@prosekit/pm/model'

export interface BlockPopoverContext {
  pos?: number | null
  node?: ProseMirrorNode | null
  element?: HTMLElement | null
}

export const blockPopoverContext = createContext<BlockPopoverContext>(
  'prosekit-block-popover-context',
)
