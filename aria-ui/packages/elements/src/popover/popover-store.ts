import { createContext } from '@aria-ui-v2/core'

import { OverlayStore } from '../overlay/overlay-store.ts'

export { OverlayStore as PopoverStore }

/**
 * @internal
 */
export const PopoverStoreContext = createContext<OverlayStore>(
  'PopoverStoreContext',
)
