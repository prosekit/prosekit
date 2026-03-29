import type { HostElement, TypedEventTarget } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
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
  const getMenuStore = MenuStoreContext.consume(host)
  const getOverlayStore = computed(() => getMenuStore()?.overlayStore)
  const id = useElementId(host)

  useEffect(host, () => {
    getOverlayStore()?.setPopupId(id)
  })

  onMount(host, () => {
    host.role = 'menu'
    host.tabIndex = 0
  })

  useEffect(host, () => {
    const overlayStore = getOverlayStore()
    if (!overlayStore) return
    host.dataset.state = overlayStore.getIsOpen() ? 'open' : 'closed'
  })

  useEffect(host, () => {
    const menuStore = getMenuStore()
    if (!menuStore) return
    const activeValue = menuStore.getActiveValue()
    if (activeValue == null) {
      host.removeAttribute('aria-activedescendant')
      return
    }
    const element = menuStore.getCollection().getElement(activeValue)
    if (element?.id) {
      host.setAttribute('aria-activedescendant', element.id)
    } else {
      host.removeAttribute('aria-activedescendant')
    }
  })

  useEffect(host, () => {
    const menuStore = getMenuStore()
    const overlayStore = getOverlayStore()
    if (!overlayStore || !menuStore) return
    const open = overlayStore.getIsOpen()

    if (open) {
      resetTypeahead()
      requestAnimationFrame(() => {
        host.focus()
        const collection = menuStore.getCollection()
        menuStore.setActiveValue(collection.first())
      })
    } else {
      menuStore.setActiveValue(null)
    }
  })

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.defaultPrevented) return

    const menuStore = getMenuStore()
    const overlayStore = getOverlayStore()
    const parentStore = menuStore?.getParentStore()
    if (!menuStore || !overlayStore) return
    if (!overlayStore.getIsOpen()) return

    const collection = menuStore.getCollection()
    if (collection.size() === 0) return

    const currentValue = menuStore.getActiveValue()
    let nextValue: string | null = null

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.next(currentValue)
        break

      case 'ArrowUp':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.prev(currentValue)
        break

      case 'Home':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.first()
        break

      case 'End':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.last()
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl ) {
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          } else {
            activateItem(menuStore, currentValue)
          }
        }
        return

      case 'ArrowRight': {
        if (currentValue != null) {
          const activeEl = collection.getElement(currentValue)
          if (activeEl ) {
            event.preventDefault()
            event.stopPropagation()
            activeEl.dispatchEvent(new Event('aria-ui:open-submenu', { bubbles: false }))
          }
        }
        return
      }

      case 'ArrowLeft': {
        if (parentStore) {
          event.preventDefault()
          event.stopPropagation()
          parentStore.overlayStore.requestOpenChange(false)
        }
        return 
      }

      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        overlayStore.requestOpenChange(false)
        return

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.stopPropagation()
          handleTypeahead(event.key, menuStore)
        }
        return
    }

    if (nextValue != null) {
      menuStore.setActiveValue(nextValue)
    }
  }

  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  useEventListener(host, 'focusout', (event: FocusEvent) => {
    const overlayStore = getOverlayStore()
    const menuStore = getMenuStore()
    if (!overlayStore || !menuStore) return
    if (!overlayStore.getIsOpen()) return

    const relatedTarget = event.relatedTarget as Node | null
    const menuRoot = host.closest('aria-ui-menu-root')
    if (menuRoot && relatedTarget && menuRoot.contains(relatedTarget)) return

    closeMenuTree(menuStore)
  })
}

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
const TYPEAHEAD_TIMEOUT = 500

function resetTypeahead() {
  typeaheadBuffer = ''
  if (typeaheadTimer) {
    clearTimeout(typeaheadTimer)
    typeaheadTimer = null
  }
}

function handleTypeahead(char: string, menuStore: MenuStore) {
  if (typeaheadTimer) clearTimeout(typeaheadTimer)

  typeaheadBuffer += char.toLowerCase()
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, TYPEAHEAD_TIMEOUT)

  const collection = menuStore.getCollection()
  const values = collection.getValues()

  for (const value of values) {
    if (value.toLowerCase().startsWith(typeaheadBuffer)) {
      menuStore.setActiveValue(value)
      break
    }
  }
}

function activateItem(menuStore: MenuStore, value: string) {
  const element = menuStore.getCollection().getElement(value)
  if (!element) return

  const selectEvent = new MenuItemSelectEvent()
  element.dispatchEvent(selectEvent)

  if (!selectEvent.defaultPrevented) {
    closeMenuTree(menuStore)
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
