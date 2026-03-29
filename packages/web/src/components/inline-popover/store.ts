import { createContext, type Context } from '@aria-ui/core'
import type { OverlayStore } from '@aria-ui/elements/overlay'

export const InlinePopoverStoreContext: Context<OverlayStore> = createContext<OverlayStore>(
  'prosekit-inline-popover-store',
)
