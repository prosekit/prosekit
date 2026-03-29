import { createContext } from '@aria-ui-v2/core'

import type { OverlayStore } from '../overlay/overlay-store.ts'


export interface PopoverStore extends OverlayStore {}

/**
 * @internal
 */
export const PopoverStoreContext = createContext<PopoverStore>(
  'PopoverStoreContext',
)
