/**

@module

## Anatomy

```html
<prosekit-inline-popover-root>
  <prosekit-inline-popover-positioner>
    <prosekit-inline-popover-popup>...</prosekit-inline-popover-popup>
  </prosekit-inline-popover-positioner>
</prosekit-inline-popover-root>
```
*/

export {
  InlinePopoverPopupElement,
  InlinePopoverPopupPropsDeclaration,
  registerInlinePopoverPopupElement,
  setupInlinePopoverPopup,
  type InlinePopoverPopupProps,
} from './inline-popover-popup.ts'

export {
  InlinePopoverPositionerElement,
  InlinePopoverPositionerPropsDeclaration,
  registerInlinePopoverPositionerElement,
  setupInlinePopoverPositioner,
  type InlinePopoverPositionerProps,
} from './inline-popover-positioner.ts'

export {
  InlinePopoverRootElement,
  InlinePopoverRootPropsDeclaration,
  registerInlinePopoverRootElement,
  setupInlinePopoverRoot,
  type InlinePopoverRootEvents,
  type InlinePopoverRootProps,
} from './inline-popover-root.ts'

export { OpenChangeEvent } from '@aria-ui/elements/overlay'
