/**

@module

## Anatomy

```html
<prosekit-popover-root>
  <prosekit-popover-trigger>...</prosekit-popover-trigger>
  <prosekit-popover-positioner>
    <prosekit-popover-popup>...</prosekit-popover-popup>
  </prosekit-popover-positioner>
</prosekit-popover-root>
```
*/

import { registerCustomElement } from '@aria-ui/core'
import { PopoverPopupElement, PopoverPositionerElement, PopoverRootElement, PopoverTriggerElement } from '@aria-ui/elements/popover'

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
} from '@aria-ui/elements/popover'

export function registerPopoverRootElement(): void {
  registerCustomElement('prosekit-popover-root', PopoverRootElement)
}
export function registerPopoverTriggerElement(): void {
  registerCustomElement('prosekit-popover-trigger', PopoverTriggerElement)
}
export function registerPopoverPopupElement(): void {
  registerCustomElement('prosekit-popover-popup', PopoverPopupElement)
}
export function registerPopoverPositionerElement(): void {
  registerCustomElement('prosekit-popover-positioner', PopoverPositionerElement)
}
