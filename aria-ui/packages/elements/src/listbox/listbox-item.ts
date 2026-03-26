import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
import { Collection, useAriaDisabled, useAriaSelected } from '@aria-ui-v2/utils'

import { ListboxStoreContext } from './listbox-store.ts'

/**
 * @public
 */
export interface ListboxItemProps {
  /**
   * The unique value for this option.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this option is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const ListboxItemPropsDeclaration = defineProps<ListboxItemProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @internal
 */
export function setupListboxItem(
  host: HostElement,
  props: Store<ListboxItemProps>,
) {
  onMount(host, () => {
    host.role = 'option'
  })

  const getStore = ListboxStoreContext.consume(host)

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  useAriaDisabled(host, () => props.disabled.get())
  useAriaSelected(host, () => {
    const store = getStore()
    if (!store) return false
    return store.selectedValues.get().includes(props.value.get())
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return

    const query = store.query.get()
    const filter = store.filter.get()

    if (filter == null) {
      host.hidden = false
    } else {
      const value = props.value.get()
      host.hidden = !filter({ value, query })
    }
  })

  const rebuildCollection = () => {
    const store = getStore()
    if (!store) return
    const root = host.closest('aria-ui-listbox-root')
    if (!root) return
    const itemElements = root.querySelectorAll<HTMLElement>('aria-ui-listbox-item:not([hidden])')
    store.collection.set(new Collection(itemElements))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    const store = getStore()
    store?.query.get()
    store?.filter.get()
    rebuildCollection()
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const value = props.value.get()
    const isActive = store.activeValue.get() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return

    const value = props.value.get()
    store.activeValue.set(value)

    if (store.multiple.get()) {
      const current = store.selectedValues.get()
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      store.emitSelectionChange(next)
    } else {
      store.emitSelectionChange([value])
    }
  })

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.activeValue.set(props.value.get())
  })
}

/**
 * @public
 */
export class ListboxItemElement extends defineCustomElement(
  setupListboxItem,
  ListboxItemPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerListboxItemElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-listbox-item', ListboxItemElement)
}
