import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { setupOverlayPopup } from '@aria-ui/elements/overlay'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleColumnPopupProps {}

/** @internal */
export const TableHandleColumnPopupPropsDeclaration: PropsDeclaration<TableHandleColumnPopupProps> = defineProps<
  TableHandleColumnPopupProps
>({})

/** @internal */
export function setupTableHandleColumnPopup(
  host: HostElement,
  _props: State<TableHandleColumnPopupProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.columnOverlayStore
  setupOverlayPopup(host, getOverlayStore)
}

const TableHandleColumnPopupElementBase: HostElementConstructor<TableHandleColumnPopupProps> = defineCustomElement(
  setupTableHandleColumnPopup,
  TableHandleColumnPopupPropsDeclaration,
)

/**
 * `<prosekit-table-handle-column-popup>` custom element.
 *
 * Properties: {@link TableHandleColumnPopupProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 */
export class TableHandleColumnPopupElement extends TableHandleColumnPopupElementBase {}

/** @internal */
export function registerTableHandleColumnPopupElement(): void {
  registerCustomElement('prosekit-table-handle-column-popup', TableHandleColumnPopupElement)
}
