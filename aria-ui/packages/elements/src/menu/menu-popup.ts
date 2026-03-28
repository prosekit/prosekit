import type { HostElement, TypedEventTarget } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
import { useElementId } from '@aria-ui-v2/utils'

import { MenuItemSelectEvent } from './menu-item.ts'
import { closeMenuTree, MenuStoreContext, type MenuStore } from './menu-store.ts'

/**
 * @public
 */
export interface MenuPopupProps {
  /**
   * By default, the MenuPopup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | null
}

/**
 * @internal
 */
export const MenuPopupPropsDeclaration = /* @__PURE__ */ defineProps<MenuPopupProps>({
  eventTarget: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupMenuPopup(
  host: HostElement,
  props: Store<MenuPopupProps>,
) {
  const getStore = MenuStoreContext.consume(host)
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  onMount(host, () => {
    host.role = 'menu'
    host.tabIndex = 0
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    host.dataset.state = store.getOpen() ? 'open' : 'closed'
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const activeValue = store.activeValue.get()
    if (activeValue == null) {
      host.removeAttribute('aria-activedescendant')
      return
    }
    const element = store.collection.get().getElement(activeValue)
    if (element?.id) {
      host.setAttribute('aria-activedescendant', element.id)
    } else {
      host.removeAttribute('aria-activedescendant')
    }
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()

    if (open) {
      requestAnimationFrame(() => {
        host.focus()
        const collection = store.collection.get()
        store.activeValue.set(collection.first())
      })
    } else {
      store.activeValue.set(null)
    }
  })

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.defaultPrevented) return

    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const collection = store.collection.get()
    if (collection.size() === 0) return

    const currentValue = store.activeValue.get()
    let nextValue: string | null = null

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        nextValue = collection.next(currentValue)
        break

      case 'ArrowUp':
        event.preventDefault()
        nextValue = collection.prev(currentValue)
        break

      case 'Home':
        event.preventDefault()
        nextValue = collection.first()
        break

      case 'End':
        event.preventDefault()
        nextValue = collection.last()
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl?.tagName.toLowerCase() === 'aria-ui-menu-submenu-trigger') {
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          } else {
            activateItem(store, currentValue)
          }
        }
        return

      case 'ArrowRight': {
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl?.tagName.toLowerCase() === 'aria-ui-menu-submenu-trigger') {
            event.preventDefault()
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          }
        }
        return
      }

      case 'ArrowLeft': {
        if (store.parentStore) {
          event.preventDefault()
          store.emitOpenChange(false)
        }
        return
      }

      case 'Escape':
        event.preventDefault()
        store.emitOpenChange(false)
        return

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          handleTypeahead(event.key, store)
        }
        return
    }

    if (nextValue != null) {
      store.activeValue.set(nextValue)
    }
  }

  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> =
      props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  useEventListener(host, 'focusout', (event: FocusEvent) => {
    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const relatedTarget = event.relatedTarget as Node | null
    const menuRoot = host.closest('aria-ui-menu-root')
    if (menuRoot && relatedTarget && menuRoot.contains(relatedTarget)) return

    closeMenuTree(store)
  })
}

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
const TYPEAHEAD_TIMEOUT = 500

function handleTypeahead(char: string, store: MenuStore) {
  if (typeaheadTimer) clearTimeout(typeaheadTimer)

  typeaheadBuffer += char.toLowerCase()
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, TYPEAHEAD_TIMEOUT)

  const collection = store.collection.get()
  const values = collection.getValues()

  for (const value of values) {
    if (value.toLowerCase().startsWith(typeaheadBuffer)) {
      store.activeValue.set(value)
      break
    }
  }
}

function activateItem(store: MenuStore, value: string) {
  const element = store.collection.get().getElement(value)
  if (!element) return

  const selectEvent = new MenuItemSelectEvent()
  element.dispatchEvent(selectEvent)

  if (!selectEvent.defaultPrevented) {
    closeMenuTree(store)
  }
}

/**
 * @public
 */
export class MenuPopupElement extends defineCustomElement(
  setupMenuPopup,
  MenuPopupPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuPopupElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-popup', MenuPopupElement)
}
