import {
  registerInlinePopoverPopupElement,
  registerInlinePopoverPositionerElement,
  registerInlinePopoverRootElement,
} from '@prosekit/web/inline-popover'

export * from '@prosekit/web/inline-popover'

export {
  InlinePopoverPopupElement as InlinePopoverPopup,
  InlinePopoverPositionerElement as InlinePopoverPositioner,
  InlinePopoverRootElement as InlinePopoverRoot,
} from '@prosekit/web/inline-popover'

registerInlinePopoverRootElement()
registerInlinePopoverPositionerElement()
registerInlinePopoverPopupElement()
