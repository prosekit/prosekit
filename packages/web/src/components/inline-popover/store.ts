import { createContext, type Context } from '@aria-ui-v2/core'
import type { OverlayStore } from '@aria-ui-v2/elements/overlay'

export const InlinePopoverStoreContext: Context<OverlayStore> = createContext<OverlayStore>(
  'prosekit-inline-popover-store',
)


