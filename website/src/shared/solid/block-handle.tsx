import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/solid/block-handle'

export default function BlockHandle() {
  return (
    <BlockHandlePopover class="CSS_BLOCK_HANDLE_POPOVER">
      <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
        <div class="CSS_ICON_PLUS" />
      </BlockHandleAdd>
      <BlockHandleDraggable class="CSS_BLOCK_HANDLE_DRAG">
        <div class="CSS_ICON_DRAG_HANDLE" />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
