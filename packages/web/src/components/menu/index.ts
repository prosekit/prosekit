import { registerCustomElement } from '@aria-ui/core'
import {
  MenuItemElement,
  MenuPopupElement,
  MenuPositionerElement,
  MenuRootElement,
  MenuTriggerElement,
} from '@aria-ui/elements/menu'
import { once } from '@ocavue/utils'

export {
  MenuItemElement,
  MenuItemPropsDeclaration,
  MenuItemSelectEvent,
  MenuPopupElement,
  MenuPopupPropsDeclaration,
  MenuPositionerElement,
  MenuPositionerPropsDeclaration,
  MenuRootElement,
  MenuRootPropsDeclaration,
  MenuTriggerElement,
  MenuTriggerPropsDeclaration,
  OpenChangeEvent,
  setupMenuItem,
  setupMenuPopup,
  setupMenuPositioner,
  setupMenuRoot,
  setupMenuTrigger,
  type MenuItemEvents,
  type MenuItemProps,
  type MenuPopupProps,
  type MenuPositionerProps,
  type MenuRootEvents,
  type MenuRootProps,
  type MenuTriggerEvents,
  type MenuTriggerProps,
} from '@aria-ui/elements/menu'

export const registerMenuRootElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-menu-root', MenuRootElement)
})
export const registerMenuTriggerElement: VoidFunction = /* @__PURE__  */ once(() => {
  registerCustomElement('prosekit-menu-trigger', MenuTriggerElement)
})
export const registerMenuPositionerElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-menu-positioner', MenuPositionerElement)
})
export const registerMenuPopupElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-menu-popup', MenuPopupElement)
})
export const registerMenuItemElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-menu-item', MenuItemElement)
})
