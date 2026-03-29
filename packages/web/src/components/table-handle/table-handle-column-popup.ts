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

export interface TableHandleColumnPopupProps {}

/** @internal */
export const TableHandleColumnPopupPropsDeclaration: PropsDeclaration<TableHandleColumnPopupProps> = defineProps<
  TableHandleColumnPopupProps
>({})

/** @internal */
export function setupTableHandleColumnPopup(
  host: HostElement,
  _props: Store<TableHandleColumnPopupProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getPresence = computed(() => !!getStore()?.getHoveringCell()?.colFirstCellPos)
  useAttribute(host, 'data-state', () => (getPresence() ? 'open' : 'closed'))
  usePresence(host, getPresence)
}

const TableHandleColumnPopupElementBase: HostElementConstructor<TableHandleColumnPopupProps> = defineCustomElement(
  setupTableHandleColumnPopup,
  TableHandleColumnPopupPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleColumnPopupElement extends TableHandleColumnPopupElementBase {}

/** @internal */
export const registerTableHandleColumnPopupElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-column-popup', TableHandleColumnPopupElement)
})
