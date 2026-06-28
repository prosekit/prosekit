import { createContext, type Context } from '@aria-ui/core'
import type { OverlayStore } from '@aria-ui/elements/overlay'

export const columnsPopoverStoreContext: Context<OverlayStore> = createContext<OverlayStore>(
  'prosekit-columns-popover-store',
)
