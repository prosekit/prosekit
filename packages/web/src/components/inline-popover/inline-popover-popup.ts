import {
  computed,
  defineCustomElement,
  onMount,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '@aria-ui/elements/overlay'
import { usePresence } from '@aria-ui/utils'
import { once } from '@ocavue/utils'

import { InlinePopoverStoreContext } from './store.ts'

/**
 * @public
 */
export interface InlinePopoverPopupProps extends OverlayPopupProps {}

/** @internal */
export const InlinePopoverPopupPropsDeclaration: PropsDeclaration<InlinePopoverPopupProps> = OverlayPopupPropsDeclaration

/** @internal */
export function setupInlinePopoverPopup(
  host: HostElement,
  _props: Store<InlinePopoverPopupProps>,
): void {
  const getStore = InlinePopoverStoreContext.consume(host)
  setupOverlayPopup(host,   getStore,  )
  const getOpen = computed(() => getStore()?.getIsOpen() ?? false)
  usePresence(host, getOpen)

  onMount(host, () => {
    host.role = "dialog"
  })
}

const InlinePopoverPopupElementBase: HostElementConstructor<InlinePopoverPopupProps> = defineCustomElement(
  setupInlinePopoverPopup,
  InlinePopoverPopupPropsDeclaration,
)

/**
 * @public
 */
export class InlinePopoverPopupElement extends InlinePopoverPopupElementBase {}

/** @internal */
export const registerInlinePopoverPopupElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-inline-popover-popup', InlinePopoverPopupElement)
})
