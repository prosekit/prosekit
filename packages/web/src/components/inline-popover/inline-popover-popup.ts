import {
  computed,
  defineCustomElement,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui-v2/core'
import {
  OverlayPopupPropsDeclaration,
  setupOverlayPopup,
  type OverlayPopupProps,
} from '@aria-ui-v2/elements/overlay'
import { usePresence } from '@aria-ui-v2/utils'
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
  props: Store<InlinePopoverPopupProps>,
): void {
  setupOverlayPopup(host, props, InlinePopoverStoreContext, 'dialog')

  const getStore = InlinePopoverStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen() ?? false)
  usePresence(host, getOpen)
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
