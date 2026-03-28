import type { HostElement } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
import { Collection, useAriaDisabled, useElementId } from '@aria-ui-v2/utils'

import { MenuStoreContext } from './menu-store.ts'

const OPEN_DELAY = 200
const CLOSE_DELAY = 150

/**
 * @public
 */
export interface MenuSubmenuTriggerProps {
  /**
   * The unique value for this submenu trigger in the parent menu.
   *
   * @default ""
   */
  value: string

  /**
   * Whether this submenu trigger is disabled.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuSubmenuTriggerPropsDeclaration = /* @__PURE__ */ defineProps<MenuSubmenuTriggerProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
})

/**
 * @internal
 */
export function setupMenuSubmenuTrigger(
  host: HostElement,
  props: Store<MenuSubmenuTriggerProps>,
) {
  onMount(host, () => {
    host.role = 'menuitem'
    host.setAttribute('aria-haspopup', 'menu')
  })

  useElementId(host)

  const getStore = MenuStoreContext.consume(host)
  const getParentStore = () => getStore()?.parentStore ?? null

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()
    host.setAttribute('aria-expanded', String(open))
  })

  useAriaDisabled(host, () => props.disabled.get())

  useEffect(host, () => {
    host.dataset.value = props.value.get()
  })

  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const value = props.value.get()
    const isActive = parentStore.activeValue.get() === value
    if (isActive) {
      host.setAttribute('data-active', '')
    } else {
      host.removeAttribute('data-active')
    }
  })

  const rebuildCollection = () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const popup = host.closest('aria-ui-menu-popup')
    if (!popup) return
    const allItems = popup.querySelectorAll<HTMLElement>(
      'aria-ui-menu-item, aria-ui-menu-submenu-trigger',
    )
    const levelItems = [...allItems].filter(
      (el) => el.closest('aria-ui-menu-popup') === popup,
    )
    parentStore.collection.set(new Collection(levelItems))
  }

  onMount(host, () => {
    rebuildCollection()
    return () => rebuildCollection()
  })

  useEffect(host, () => {
    props.value.get()
    props.disabled.get()
    rebuildCollection()
  })

  let openTimer: ReturnType<typeof setTimeout> | null = null
  let closeTimer: ReturnType<typeof setTimeout> | null = null

  const clearTimers = () => {
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = null
    }
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  useEventListener(host, 'mouseenter', () => {
    if (props.disabled.get()) return
    clearTimers()

    const parentStore = getParentStore()
    if (parentStore) {
      parentStore.activeValue.set(props.value.get())
    }

    const store = getStore()
    if (store && !store.getOpen()) {
      openTimer = setTimeout(() => {
        store.emitOpenChange(true)
      }, OPEN_DELAY)
    }
  })

  useEventListener(host, 'mouseleave', (event: MouseEvent) => {
    clearTimers()

    const store = getStore()
    if (!store || !store.getOpen()) return

    const relatedTarget = event.relatedTarget as HTMLElement | null
    const submenuRoot = host.closest('aria-ui-menu-submenu-root')
    if (submenuRoot && relatedTarget && submenuRoot.contains(relatedTarget)) return

    closeTimer = setTimeout(() => {
      store.emitOpenChange(false)
    }, CLOSE_DELAY)
  })

  useEffect(host, () => {
    const parentStore = getParentStore()
    if (!parentStore) return
    const store = getStore()
    if (!store) return

    const parentActive = parentStore.activeValue.get()
    const myValue = props.value.get()

    if (parentActive !== myValue && store.getOpen()) {
      const timer = setTimeout(() => store.emitOpenChange(false), CLOSE_DELAY)
      return () => clearTimeout(timer)
    }
  })

  useEventListener(host, 'aria-ui:open-submenu' as 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.emitOpenChange(true)
  })

  useEventListener(host, 'click', () => {
    if (props.disabled.get()) return
    const store = getStore()
    if (!store) return
    store.emitOpenChange(!store.getOpen())
  })

  onMount(host, () => clearTimers)
}

/**
 * @public
 */
export class MenuSubmenuTriggerElement extends defineCustomElement(
  setupMenuSubmenuTrigger,
  MenuSubmenuTriggerPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuSubmenuTriggerElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-submenu-trigger', MenuSubmenuTriggerElement)
}
