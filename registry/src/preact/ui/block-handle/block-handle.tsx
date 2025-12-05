import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/preact/block-handle'

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props) {
  return (
    <BlockHandlePopover
      placement={props.dir === 'rtl' ? 'right' : 'left'}
      className="CSS_BLOCK_HANDLE_POPOVER"
    >
      <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
        <div className="CSS_ICON_PLUS" />
      </BlockHandleAdd>
      <BlockHandleDraggable className="CSS_BLOCK_HANDLE_DRAG">
        <div className="CSS_ICON_DRAG_HANDLE" />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
