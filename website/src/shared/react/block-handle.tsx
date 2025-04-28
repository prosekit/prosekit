import { Themes } from '@prosekit/themes'
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/react/block-handle'

export default function BlockHandle() {
  return (
    <BlockHandlePopover className={Themes.BLOCK_HANDLE_POPOVER}>
      <BlockHandleAdd className={Themes.BLOCK_HANDLE_ADD}>
        <div className={Themes.CSS_ICON_PLUS} />
      </BlockHandleAdd>
      <BlockHandleDraggable className={Themes.BLOCK_HANDLE_DRAG}>
        <div className={Themes.CSS_ICON_DRAG_HANDLE} />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
