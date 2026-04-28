import {
  registerBlockHandleAddElement,
  registerBlockHandleDraggableElement,
  registerBlockHandlePopupElement,
  registerBlockHandlePositionerElement,
  registerBlockHandleRootElement,
} from '@prosekit/web/block-handle'

export * from '@prosekit/web/block-handle'

export {
  BlockHandleAddElement as BlockHandleAdd,
  BlockHandleDraggableElement as BlockHandleDraggable,
  BlockHandlePopupElement as BlockHandlePopup,
  BlockHandlePositionerElement as BlockHandlePositioner,
  BlockHandleRootElement as BlockHandleRoot,
} from '@prosekit/web/block-handle'

registerBlockHandleRootElement()
registerBlockHandlePositionerElement()
registerBlockHandlePopupElement()
registerBlockHandleAddElement()
registerBlockHandleDraggableElement()
