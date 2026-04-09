import {
  registerPopoverPopupElement,
  registerPopoverPositionerElement,
  registerPopoverRootElement,
  registerPopoverTriggerElement,
} from '@prosekit/web/popover'

export * from '@prosekit/web/popover'

export {
  PopoverPopupElement as PopoverPopup,
  PopoverPositionerElement as PopoverPositioner,
  PopoverRootElement as PopoverRoot,
  PopoverTriggerElement as PopoverTrigger,
} from '@prosekit/web/popover'

registerPopoverRootElement()
registerPopoverTriggerElement()
registerPopoverPositionerElement()
registerPopoverPopupElement()
