import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/react/block-handle'

export default function BlockHandle() {
  return (
    <BlockHandlePopover className="CSS_BLOCK_HANDLE_POPOVER">
      <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
        <div className="CSS_ICON_PLUS" />
      </BlockHandleAdd>
      <BlockHandleDraggable className="CSS_BLOCK_HANDLE_DRAG">
        <div className="CSS_ICON_DRAG_HANDLE" />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
