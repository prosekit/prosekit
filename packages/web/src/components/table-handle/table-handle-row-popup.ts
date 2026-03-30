import {
  computed,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { useAttribute, usePresence } from '@aria-ui/utils'
import { once } from '@ocavue/utils'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleRowPopupProps {}

/** @internal */
export const TableHandleRowPopupPropsDeclaration: PropsDeclaration<TableHandleRowPopupProps> = defineProps<TableHandleRowPopupProps>({})

/** @internal */
export function setupTableHandleRowPopup(
  host: HostElement,
  _props: Store<TableHandleRowPopupProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getPresence = computed(() => !!getStore()?.getHoveringCell()?.rowFirstCellPos)
  useAttribute(host, 'data-state', () => (getPresence() ? 'open' : 'closed'))
  usePresence(host, getPresence)
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
