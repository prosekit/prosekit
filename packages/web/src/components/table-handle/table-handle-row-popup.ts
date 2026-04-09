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
import { once } from '@ocavue/utils'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleRowPopupProps {}

/** @internal */
export const TableHandleRowPopupPropsDeclaration: PropsDeclaration<TableHandleRowPopupProps> = defineProps<TableHandleRowPopupProps>({})

/** @internal */
export function setupTableHandleRowPopup(
  host: HostElement,
  _props: State<TableHandleRowPopupProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.rowOverlayStore
  setupOverlayPopup(host, getOverlayStore)
}

const TableHandleRowPopupElementBase: HostElementConstructor<TableHandleRowPopupProps> = defineCustomElement(
  setupTableHandleRowPopup,
  TableHandleRowPopupPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleRowPopupElement extends TableHandleRowPopupElementBase {}

/** @internal */
export const registerTableHandleRowPopupElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-row-popup', TableHandleRowPopupElement)
})
