import { registerCustomElement } from '@aria-ui-v2/core'
import { TooltipPopupElement, TooltipPositionerElement, TooltipRootElement, TooltipTriggerElement } from '@aria-ui-v2/elements/tooltip'
import { once } from '@ocavue/utils'

export {
  OpenChangeEvent,
  setupTooltipPopup,
  setupTooltipPositioner,
  setupTooltipRoot,
  setupTooltipTrigger,
  TooltipPopupElement,
  TooltipPopupPropsDeclaration,
  TooltipPositionerElement,
  TooltipPositionerPropsDeclaration,
  TooltipRootElement,
  TooltipRootPropsDeclaration,
  TooltipTriggerElement,
  TooltipTriggerPropsDeclaration,
  type TooltipPopupProps,
  type TooltipPositionerProps,
  type TooltipRootEvents,
  type TooltipRootProps,
  type TooltipTriggerProps,
} from '@aria-ui-v2/elements/tooltip'

export const registerTooltipRootElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-tooltip-root', TooltipRootElement)
})
export const registerTooltipTriggerElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
})
export const registerTooltipPopupElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-tooltip-popup', TooltipPopupElement)
})
export const registerTooltipPositionerElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-tooltip-positioner', TooltipPositionerElement)
})
