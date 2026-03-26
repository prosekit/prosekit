import { createContext, type Context } from '@aria-ui-v2/core'

import type { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export const TooltipStoreContext: Context<OverlayStore> = createContext<OverlayStore>(
  'TooltipStoreContext',
)
