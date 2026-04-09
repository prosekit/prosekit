import {
  registerTooltipPopupElement,
  registerTooltipPositionerElement,
  registerTooltipRootElement,
  registerTooltipTriggerElement,
} from '@prosekit/web/tooltip'

export * from '@prosekit/web/tooltip'

export {
  TooltipPopupElement as TooltipPopup,
  TooltipPositionerElement as TooltipPositioner,
  TooltipRootElement as TooltipRoot,
  TooltipTriggerElement as TooltipTrigger,
} from '@prosekit/web/tooltip'

registerTooltipRootElement()
registerTooltipTriggerElement()
registerTooltipPositionerElement()
registerTooltipPopupElement()
