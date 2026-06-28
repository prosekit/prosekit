import {
  registerColumnsPopoverPopupElement,
  registerColumnsPopoverPositionerElement,
  registerColumnsPopoverRootElement,
} from '@prosekit/web/columns-popover'

export * from '@prosekit/web/columns-popover'

export {
  ColumnsPopoverPopupElement as ColumnsPopoverPopup,
  ColumnsPopoverPositionerElement as ColumnsPopoverPositioner,
  ColumnsPopoverRootElement as ColumnsPopoverRoot,
} from '@prosekit/web/columns-popover'

registerColumnsPopoverRootElement()
registerColumnsPopoverPositionerElement()
registerColumnsPopoverPopupElement()
