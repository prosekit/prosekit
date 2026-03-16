import { createContext } from '@aria-ui-v2/core'

import type { OverlayStore } from '../overlay/overlay-store.ts'

/**
 * @internal
 */
export const TooltipStoreContext = createContext<OverlayStore>(
  'TooltipStoreContext',
)
