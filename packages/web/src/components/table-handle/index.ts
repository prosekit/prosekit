/**

@module

## Anatomy

```html
<prosekit-table-handle-root>
  <prosekit-table-handle-drag-preview></prosekit-table-handle-drag-preview>
  <prosekit-table-handle-drop-indicator></prosekit-table-handle-drop-indicator>
  <prosekit-table-handle-column-positioner>
    <prosekit-table-handle-column-popup>
      <prosekit-table-handle-column-menu-root>
        <prosekit-table-handle-column-menu-trigger>...</prosekit-table-handle-column-menu-trigger>
        <prosekit-menu-positioner>
          <prosekit-menu-popup>
            <prosekit-menu-item>...</prosekit-menu-item>
          </prosekit-menu-popup>
        </prosekit-menu-positioner>
      </prosekit-table-handle-column-menu-root>
    </prosekit-table-handle-column-popup>
  </prosekit-table-handle-column-positioner>
  <prosekit-table-handle-row-positioner>
    <prosekit-table-handle-row-popup>
      <prosekit-table-handle-row-menu-root>
        <prosekit-table-handle-row-menu-trigger>...</prosekit-table-handle-row-menu-trigger>
        <prosekit-menu-positioner>
          <prosekit-menu-popup>
            <prosekit-menu-item>...</prosekit-menu-item>
          </prosekit-menu-popup>
        </prosekit-menu-positioner>
      </prosekit-table-handle-row-menu-root>
    </prosekit-table-handle-row-popup>
  </prosekit-table-handle-row-positioner>
</prosekit-table-handle-root>
```
*/

export {
  registerTableHandleColumnPopupElement,
  setupTableHandleColumnPopup,
  TableHandleColumnPopupElement,
  TableHandleColumnPopupPropsDeclaration,
  type TableHandleColumnPopupProps,
} from './table-handle-column-popup.ts'

export {
  registerTableHandleColumnPositionerElement,
  setupTableHandleColumnPositioner,
  TableHandleColumnPositionerElement,
  TableHandleColumnPositionerPropsDeclaration,
  type TableHandleColumnPositionerProps,
} from './table-handle-column-positioner.ts'

export {
  registerTableHandleColumnMenuRootElement,
  setupTableHandleColumnMenuRoot,
  TableHandleColumnMenuRootElement,
  TableHandleColumnMenuRootPropsDeclaration,
  type TableHandleColumnMenuRootProps,
} from './table-handle-column-menu-root.ts'

export {
  registerTableHandleColumnMenuTriggerElement,
  setupTableHandleColumnMenuTrigger,
  TableHandleColumnMenuTriggerElement,
  TableHandleColumnMenuTriggerPropsDeclaration,
  type TableHandleColumnMenuTriggerProps,
} from './table-handle-column-menu-trigger.ts'

export {
  registerTableHandleDragPreviewElement,
  setupTableHandleDragPreview,
  TableHandleDragPreviewElement,
  TableHandleDragPreviewPropsDeclaration,
  type TableHandleDragPreviewProps,
} from './table-handle-drag-preview.ts'

export {
  registerTableHandleDropIndicatorElement,
  setupTableHandleDropIndicator,
  TableHandleDropIndicatorElement,
  TableHandleDropIndicatorPropsDeclaration,
  type TableHandleDropIndicatorProps,
} from './table-handle-drop-indicator.ts'

export {
  registerTableHandleRootElement,
  setupTableHandleRoot,
  TableHandleRootElement,
  TableHandleRootPropsDeclaration,
  type TableHandleRootProps,
} from './table-handle-root.ts'

export {
  registerTableHandleRowPopupElement,
  setupTableHandleRowPopup,
  TableHandleRowPopupElement,
  TableHandleRowPopupPropsDeclaration,
  type TableHandleRowPopupProps,
} from './table-handle-row-popup.ts'

export {
  registerTableHandleRowPositionerElement,
  setupTableHandleRowPositioner,
  TableHandleRowPositionerElement,
  TableHandleRowPositionerPropsDeclaration,
  type TableHandleRowPositionerProps,
} from './table-handle-row-positioner.ts'

export {
  registerTableHandleRowMenuRootElement,
  setupTableHandleRowMenuRoot,
  TableHandleRowMenuRootElement,
  TableHandleRowMenuRootPropsDeclaration,
  type TableHandleRowMenuRootProps,
} from './table-handle-row-menu-root.ts'

export {
  registerTableHandleRowMenuTriggerElement,
  setupTableHandleRowMenuTrigger,
  TableHandleRowMenuTriggerElement,
  TableHandleRowMenuTriggerPropsDeclaration,
  type TableHandleRowMenuTriggerProps,
} from './table-handle-row-menu-trigger.ts'
