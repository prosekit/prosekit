/**

@module

## Anatomy

```html
<prosekit-block-handle-root>
  <prosekit-block-handle-positioner>
    <prosekit-block-handle-popup>
      <prosekit-block-handle-add>...</prosekit-block-handle-add>
      <prosekit-block-handle-draggable>...</prosekit-block-handle-draggable>
    </prosekit-block-handle-popup>
  </prosekit-block-handle-positioner>
</prosekit-block-handle-root>
```
*/

export {
  BlockHandleAddElement,
  BlockHandleAddPropsDeclaration,
  registerBlockHandleAddElement,
  setupBlockHandleAdd,
  type BlockHandleAddProps,
} from './block-handle-add.ts'

export {
  BlockHandleDraggableElement,
  BlockHandleDraggablePropsDeclaration,
  registerBlockHandleDraggableElement,
  setupBlockHandleDraggable,
  type BlockHandleDraggableProps,
} from './block-handle-draggable.ts'

export {
  BlockHandlePopupElement,
  BlockHandlePopupPropsDeclaration,
  registerBlockHandlePopupElement,
  setupBlockHandlePopup,
  type BlockHandlePopupProps,
} from './block-handle-popup.ts'

export {
  BlockHandlePositionerElement,
  BlockHandlePositionerPropsDeclaration,
  registerBlockHandlePositionerElement,
  setupBlockHandlePositioner,
  type BlockHandlePositionerProps,
} from './block-handle-positioner.ts'

export {
  BlockHandleRootElement,
  BlockHandleRootPropsDeclaration,
  BlockHandleStateChangeEvent,
  registerBlockHandleRootElement,
  setupBlockHandleRoot,
  type BlockHandleRootEvents,
  type BlockHandleRootProps,
} from './block-handle-root.ts'
