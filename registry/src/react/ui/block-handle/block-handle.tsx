import { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot } from 'prosekit/react/block-handle'

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props) {
  return (
    <BlockHandleRoot>
      <BlockHandlePositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="CSS_BLOCK_HANDLE_POSITIONER"
      >
        <BlockHandlePopup className="CSS_BLOCK_HANDLE_POPUP">
          <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
            <div className="CSS_ICON_PLUS" />
          </BlockHandleAdd>
          <BlockHandleDraggable className="CSS_BLOCK_HANDLE_DRAG">
            <div className="CSS_ICON_DRAG_HANDLE" />
          </BlockHandleDraggable>
        </BlockHandlePopup>
      </BlockHandlePositioner>
    </BlockHandleRoot>
  )
}
