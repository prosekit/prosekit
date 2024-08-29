import { Themes } from '@prosekit/themes'
import { BlockDragHandle, BlockPopover } from 'prosekit/react/block-handle'

export default function BlockHandle() {
  return (
    <BlockPopover className={Themes.BLOCK_HANDLE}>
      <BlockDragHandle>
        <div className={Themes.ICON_DRAG_HANDLE} />
      </BlockDragHandle>
    </BlockPopover>
  )
}
