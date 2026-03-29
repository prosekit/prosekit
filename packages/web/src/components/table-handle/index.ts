export {
  registerTableHandleColumnRootElement,
  setupTableHandleColumnRoot,
  TableHandleColumnRootElement,
  TableHandleColumnRootPropsDeclaration,
  type TableHandleColumnRootProps,
} from './table-handle-column-root.ts'

export {
  registerTableHandleColumnTriggerElement,
  setupTableHandleColumnTrigger,
  TableHandleColumnTriggerElement,
  TableHandleColumnTriggerPropsDeclaration,
  type TableHandleColumnTriggerProps,
} from './table-handle-column-trigger.ts'

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
  registerTableHandlePopoverItemElement,
  setupTableHandlePopoverItem,
  TableHandlePopoverItemElement,
  TableHandlePopoverItemPropsDeclaration,
  TableHandlePopoverItemSelectEvent,
  type TableHandlePopoverItemEvents,
  type TableHandlePopoverItemProps,
} from './table-handle-popover-item.ts'

export {
  registerTableHandlePopoverPopupElement,
  setupTableHandlePopoverPopup,
  TableHandlePopoverPopupElement,
  TableHandlePopoverPopupPropsDeclaration,
  type TableHandlePopoverPopupProps,
} from './table-handle-popover-popup.ts'

export {
  registerTableHandlePopoverPositionerElement,
  setupTableHandlePopoverPositioner,
  TableHandlePopoverPositionerElement,
  TableHandlePopoverPositionerPropsDeclaration,
  type TableHandlePopoverPositionerProps,
} from './table-handle-popover-positioner.ts'

export {
  registerTableHandleRootElement,
  setupTableHandleRoot,
  TableHandleRootElement,
  TableHandleRootPropsDeclaration,
  type TableHandleRootProps,
} from './table-handle-root.ts'

export {
  registerTableHandleRowRootElement,
  setupTableHandleRowRoot,
  TableHandleRowRootElement,
  TableHandleRowRootPropsDeclaration,
  type TableHandleRowRootProps,
} from './table-handle-row-root.ts'

export {
  registerTableHandleRowTriggerElement,
  setupTableHandleRowTrigger,
  TableHandleRowTriggerElement,
  TableHandleRowTriggerPropsDeclaration,
  type TableHandleRowTriggerProps,
} from './table-handle-row-trigger.ts'


/**

TODO: use the following sturcutre:



<TableHandleRoot class="contents">
  <TableHandleDragPreview />
  <TableHandleDropIndicator />

  <!-- col -->
  <TableHandleColumnPositioner >
    <TableHandleColumnPopup>
      <TableHandleMenuRoot class="contents">
        <TableHandleMenuTrigger>
          <div class="i-lucide-icon-xxxx" />
        </TableHandleMenuTrigger>
        <TableHandleMenuPositioner>
          <TableHandleMenuPopup>
            <TableHandleMenuItem>Action 1</TableHandleMenuItem>
            <TableHandleMenuItem>Action 2</TableHandleMenuItem>
          </TableHandleMenuPopup>
        </TableHandleMenuPositioner>
      </TableHandleMenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner >
   
  <!-- row -->
  <TableHandleRowPositioner >
    <TableHandleRowPopup>
      <TableHandleMenuRoot class="contents">
        <TableHandleMenuTrigger>
          <div class="i-lucide-icon-xxxx" />
        </TableHandleMenuTrigger>
        <TableHandleMenuPositioner>
          <TableHandleMenuPopup>
            <TableHandleMenuItem>Action 3</TableHandleMenuItem>
            <TableHandleMenuItem>Action 3</TableHandleMenuItem>
          </TableHandleMenuPopup>
        </TableHandleMenuPositioner>
      </TableHandleMenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner >
</TableHandleRoot>

 */
