import { registerCustomElement } from '@aria-ui-v2/core'
import { PopoverPopupElement, PopoverPositionerElement, PopoverRootElement, PopoverTriggerElement } from '@aria-ui-v2/elements/popover'
import { once } from '@ocavue/utils'

export {
  OpenChangeEvent,
  PopoverPopupElement,
  PopoverPopupPropsDeclaration,
  PopoverPositionerElement,
  PopoverPositionerPropsDeclaration,
  PopoverRootElement,
  PopoverRootPropsDeclaration,
  PopoverTriggerElement,
  PopoverTriggerPropsDeclaration,
  setupPopoverPopup,
  setupPopoverPositioner,
  setupPopoverRoot,
  setupPopoverTrigger,
  type PopoverPopupProps,
  type PopoverPositionerProps,
  type PopoverRootEvents,
  type PopoverRootProps,
  type PopoverTriggerEvents,
  type PopoverTriggerProps,
} from '@aria-ui-v2/elements/popover'

export const registerPopoverRootElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-popover-root', PopoverRootElement)
})
export const registerPopoverTriggerElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
})
export const registerPopoverPopupElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-popover-popup', PopoverPopupElement)
})
export const registerPopoverPositionerElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-popover-positioner', PopoverPositionerElement)
})
