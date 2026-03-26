import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'

import { ListboxStoreContext } from './listbox-store.ts'

/**
 * @public
 */
export interface ListboxEmptyProps {}

/**
 * @internal
 */
export const ListboxEmptyPropsDeclaration = defineProps<ListboxEmptyProps>({})

/**
 * @internal
 */
export function setupListboxEmpty(
  host: HostElement,
  _props: Store<ListboxEmptyProps>,
) {
  const getStore = ListboxStoreContext.consume(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const hasItems = store.collection.get().size() > 0
    host.style.display = hasItems ? 'none' : ''
  })
}

/**
 * @public
 */
export class ListboxEmptyElement extends defineCustomElement(
  setupListboxEmpty,
  ListboxEmptyPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerListboxEmptyElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-listbox-empty', ListboxEmptyElement)
}
