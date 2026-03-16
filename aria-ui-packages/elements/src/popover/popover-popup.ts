import type { HostElement, Store } from '@aria-ui-v2/core'
import { defineProps, useEffect } from '@aria-ui-v2/core'
import { useElementId } from '@aria-ui-v2/utils'

import { PopoverStoreContext } from './popover-store.ts'

/**
 * @public
 */
export interface PopoverPopupProps {}

/**
 * @internal
 */
export const PopoverPopupPropsDeclaration =
  /* @__PURE__ */ defineProps<PopoverPopupProps>({})

/**
 * @internal
 */
export function setupPopoverPopup(
  host: HostElement,
  _store: Store<PopoverPopupProps>,
) {
  const getStore = PopoverStoreContext.consume(host)
  const id = useElementId(host)

  // Register popup ID with store
  useEffect(host, () => {
    const store = getStore()
    if (!store) return

    store.setPopupId(id)
  })

  // Set role
  useEffect(host, () => {
    host.role = 'dialog'
  })
}
