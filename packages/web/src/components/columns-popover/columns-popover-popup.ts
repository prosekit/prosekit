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

import { columnsPopoverStoreContext } from './store.ts'

export interface ColumnsPopoverPopupProps extends OverlayPopupProps {}

/** @internal */
export const ColumnsPopoverPopupPropsDeclaration: PropsDeclaration<ColumnsPopoverPopupProps> = OverlayPopupPropsDeclaration

/** @internal */
export function setupColumnsPopoverPopup(
  host: HostElement,
  _props: State<ColumnsPopoverPopupProps>,
): void {
  const getStore = columnsPopoverStoreContext.consume(host)
  setupOverlayPopup(host, getStore)
  const getOpen = computed(() => getStore()?.getIsOpen() ?? false)
  usePresence(host, getOpen)

  onMount(host, () => {
    host.role = 'dialog'
  })
}

const ColumnsPopoverPopupElementBase: HostElementConstructor<ColumnsPopoverPopupProps> = defineCustomElement(
  setupColumnsPopoverPopup,
  ColumnsPopoverPopupPropsDeclaration,
)

/**
 * `<prosekit-columns-popover-popup>` custom element.
 *
 * Properties: {@link ColumnsPopoverPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the columns popover is visible, `"closed"` otherwise |
 */
export class ColumnsPopoverPopupElement extends ColumnsPopoverPopupElementBase {}

/** @internal */
export function registerColumnsPopoverPopupElement(): void {
  registerCustomElement('prosekit-columns-popover-popup', ColumnsPopoverPopupElement)
}
