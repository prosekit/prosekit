import {
  computed,
  defineCustomElement,
  onMount,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '@aria-ui/elements/overlay'
import { usePresence } from '@aria-ui/utils'

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
  _props: State<InlinePopoverPopupProps>,
): void {
  const getStore = InlinePopoverStoreContext.consume(host)
  setupOverlayPopup(host, getStore)
  const getOpen = computed(() => getStore()?.getIsOpen() ?? false)
  usePresence(host, getOpen)

  onMount(host, () => {
    host.role = 'dialog'
  })
}

const InlinePopoverPopupElementBase: HostElementConstructor<InlinePopoverPopupProps> = defineCustomElement(
  setupInlinePopoverPopup,
  InlinePopoverPopupPropsDeclaration,
)

/**
 * `<prosekit-inline-popover-popup>` custom element.
 *
 * Properties: {@link InlinePopoverPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the inline popover is visible, `"closed"` otherwise |
 */
export class InlinePopoverPopupElement extends InlinePopoverPopupElementBase {}

/** @internal */
export function registerInlinePopoverPopupElement(): void {
  registerCustomElement('prosekit-inline-popover-popup', InlinePopoverPopupElement)
}
