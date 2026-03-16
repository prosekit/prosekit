import type { Context, HostElement, Store } from '@aria-ui-v2/core'
import { defineProps, useEffect } from '@aria-ui-v2/core'
import { useElementId } from '@aria-ui-v2/utils'

import type { OverlayStore } from './overlay-store.ts'

/**
 * @public
 */
export interface OverlayPopupProps {}

/**
 * @internal
 */
export const OverlayPopupPropsDeclaration = /* @__PURE__ */ defineProps<OverlayPopupProps>({})

/**
 * @internal
 */
export function setupOverlayPopup(
  host: HostElement,
  _props: Store<OverlayPopupProps>,
  storeContext: Context<OverlayStore>,
  role: string,
): void {
  const getStore = storeContext.consume(host)
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  // TODO: move it out of this function. Just set role in different element setup functions direclty.
  useEffect(host, () => {
    host.role = role
  })
}
