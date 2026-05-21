/**

@module

## Anatomy

```html
<prosekit-columns-popover-root>
  <prosekit-columns-popover-positioner>
    <prosekit-columns-popover-popup>...</prosekit-columns-popover-popup>
  </prosekit-columns-popover-positioner>
</prosekit-columns-popover-root>
```
*/

export {
  ColumnsPopoverPopupElement,
  ColumnsPopoverPopupPropsDeclaration,
  registerColumnsPopoverPopupElement,
  setupColumnsPopoverPopup,
  type ColumnsPopoverPopupProps,
} from './columns-popover-popup.ts'

export {
  ColumnsPopoverPositionerElement,
  ColumnsPopoverPositionerPropsDeclaration,
  registerColumnsPopoverPositionerElement,
  setupColumnsPopoverPositioner,
  type ColumnsPopoverPositionerProps,
} from './columns-popover-positioner.ts'

export {
  ColumnsPopoverRootElement,
  ColumnsPopoverRootPropsDeclaration,
  registerColumnsPopoverRootElement,
  setupColumnsPopoverRoot,
  type ColumnsPopoverRootEvents,
  type ColumnsPopoverRootProps,
} from './columns-popover-root.ts'

export { OpenChangeEvent } from '@aria-ui/elements/overlay'
