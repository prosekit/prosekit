import type { HostElement } from '@aria-ui-v2/core'
import { computed, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, type Store } from '@aria-ui-v2/core'
import { useAriaControls, useAriaDisabled, useAriaExpanded, usePress } from '@aria-ui-v2/utils'

import type { OpenChangeEvent } from '../overlay/open-change-event.ts'

import { MenuStoreContext } from './menu-store.ts'

/**
 * @public
 */
export interface MenuTriggerProps {
  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean
}

/**
 * @internal
 */
export const MenuTriggerPropsDeclaration = /* @__PURE__ */ defineProps<MenuTriggerProps>({
  disabled: {
    default: false,
    attribute: 'disabled',
    type: 'boolean',
  },
})

/**
 * @public
 */
export interface MenuTriggerEvents {
  /**
   * Emitted when the menu is opened or closed.
   */
  openChange: OpenChangeEvent
}

/**
 * @internal
 */
export function setupMenuTrigger(
  host: HostElement,
  props: Store<MenuTriggerProps>,
) {
  const getDisabled = props.disabled.get
  const getStore = MenuStoreContext.consume(host)
  const getOpen = computed(() => getStore()?.getOpen())
  const getPopupId = computed(() => getStore()?.getPopupId())

  usePress(host, () => {
    const store = getStore()
    if (!store) return
    if (!getDisabled()) store.emitOpenChange(!store.getOpen())
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.anchorElement.set(host)
  })

  useAriaExpanded(host, getOpen)
  useAriaDisabled(host, getDisabled)

  const getAriaControls = computed(() => getOpen() ? getPopupId() : undefined)
  useAriaControls(host, getAriaControls)

  onMount(host, () => {
    host.setAttribute('aria-haspopup', 'menu')
  })
}

/**
 * @public
 */
export class MenuTriggerElement extends defineCustomElement(
  setupMenuTrigger,
  MenuTriggerPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerMenuTriggerElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-menu-trigger', MenuTriggerElement)
}
