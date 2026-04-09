/**

@module

## Anatomy

```html
<prosekit-tooltip-root>
  <prosekit-tooltip-trigger>...</prosekit-tooltip-trigger>
  <prosekit-tooltip-positioner>
    <prosekit-tooltip-popup>...</prosekit-tooltip-popup>
  </prosekit-tooltip-positioner>
</prosekit-tooltip-root>
```
*/

import { registerCustomElement } from '@aria-ui/core'
import { TooltipPopupElement, TooltipPositionerElement, TooltipRootElement, TooltipTriggerElement } from '@aria-ui/elements/tooltip'

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
} from '@aria-ui/elements/tooltip'

export function registerTooltipRootElement(): void {
  registerCustomElement('prosekit-tooltip-root', TooltipRootElement)
}
export function registerTooltipTriggerElement(): void {
  registerCustomElement('prosekit-tooltip-trigger', TooltipTriggerElement)
}
export function registerTooltipPopupElement(): void {
  registerCustomElement('prosekit-tooltip-popup', TooltipPopupElement)
}
export function registerTooltipPositionerElement(): void {
  registerCustomElement('prosekit-tooltip-positioner', TooltipPositionerElement)
}
