import { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopover } from 'prosekit/solid/block-handle'
import type { JSX } from 'solid-js'

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props): JSX.Element {
  return (
    <BlockHandlePopover
      placement={props.dir === 'rtl' ? 'right' : 'left'}
      class="CSS_BLOCK_HANDLE_POPOVER"
    >
      <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
        <div class="CSS_ICON_PLUS" />
      </BlockHandleAdd>
      <BlockHandleDraggable class="CSS_BLOCK_HANDLE_DRAG">
        <div class="CSS_ICON_DRAG_HANDLE" />
      </BlockHandleDraggable>
    </BlockHandlePopover>
  )
}
