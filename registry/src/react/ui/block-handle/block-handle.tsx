import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/react/block-handle'

interface Props {
  placement?: 'left' | 'right'
}

export default function BlockHandle(props: Props) {
  return (
    <BlockHandlePopover className="CSS_BLOCK_HANDLE_POPOVER" placement={props.placement}>
      <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
        <div className="CSS_ICON_PLUS" />
      </BlockHandleAdd>
      <BlockHandleDraggable className="CSS_BLOCK_HANDLE_DRAG">
        <div className="CSS_ICON_DRAG_HANDLE" />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
