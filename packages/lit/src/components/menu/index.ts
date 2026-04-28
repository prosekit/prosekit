import {
  registerMenuItemElement,
  registerMenuPopupElement,
  registerMenuPositionerElement,
  registerMenuRootElement,
  registerMenuSubmenuRootElement,
  registerMenuSubmenuTriggerElement,
  registerMenuTriggerElement,
} from '@prosekit/web/menu'

export * from '@prosekit/web/menu'

export {
  MenuItemElement as MenuItem,
  MenuPopupElement as MenuPopup,
  MenuPositionerElement as MenuPositioner,
  MenuRootElement as MenuRoot,
  MenuSubmenuRootElement as MenuSubmenuRoot,
  MenuSubmenuTriggerElement as MenuSubmenuTrigger,
  MenuTriggerElement as MenuTrigger,
} from '@prosekit/web/menu'

registerMenuRootElement()
registerMenuTriggerElement()
registerMenuPositionerElement()
registerMenuPopupElement()
registerMenuItemElement()
registerMenuSubmenuRootElement()
registerMenuSubmenuTriggerElement()
