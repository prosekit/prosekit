import { Tooltip } from '@base-ui/react/tooltip'
import { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopover } from 'prosekit/react/block-handle'

import BlockHandleMenu from './block-handle-menu'

interface Props {
  enabled: boolean
  dir?: 'ltr' | 'rtl'
}

export default function BlockHandle(props: Props) {
  if (!props.enabled) {
    return null
  }

  return (
    <Tooltip.Provider>
      <BlockHandlePopover
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="CSS_BLOCK_HANDLE_POPOVER"
      >
        <Tooltip.Root>
          <Tooltip.Trigger className="m-0 p-0">
            <BlockHandleAdd className="CSS_BLOCK_HANDLE_ADD">
              <div className="CSS_ICON_PLUS" />
            </BlockHandleAdd>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10} side="bottom">
              <Tooltip.Popup className="
                  flex flex-col justify-center items-center
                  px-2 py-1
                  rounded-md
                  bg-[canvas]
                  text-sm
                  z-100
                  origin-(--transform-origin)
                  shadow-lg shadow-gray-200 outline-1 outline-gray-200
                  transition-[transform,scale,opacity]
                  data-ending-style:opacity-0 data-ending-style:scale-90
                  data-instant:transition-none
                  data-starting-style:opacity-0 data-starting-style:scale-90
                  dark:shadow-none dark:outline-gray-300 dark:-outline-offset-1">
                <span>
                  <span>Click{' '}</span>
                  <span className="opacity-50">to add below</span>
                </span>
                <span>
                  <span>Option-click{' '}</span>
                  <span className="opacity-50">to add above</span>
                </span>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger className="m-0 p-0">
            <BlockHandleMenu>
              <BlockHandleDraggable className="CSS_BLOCK_HANDLE_DRAG">
                <div className="CSS_ICON_DRAG_HANDLE" />
              </BlockHandleDraggable>
            </BlockHandleMenu>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner sideOffset={10} side="bottom">
              <Tooltip.Popup className="
                  flex flex-col justify-center items-center
                  px-2 py-1
                  rounded-md
                  bg-[canvas]
                  text-sm
                  z-100
                  origin-(--transform-origin)
                  shadow-lg shadow-gray-200 outline-1 outline-gray-200
                  transition-[transform,scale,opacity]
                  data-ending-style:opacity-0 data-ending-style:scale-90
                  data-instant:transition-none
                  data-starting-style:opacity-0 data-starting-style:scale-90
                  dark:shadow-none dark:outline-gray-300 dark:-outline-offset-1">
                <span>
                  <span>Drag{' '}</span>
                  <span className="opacity-50">to move</span>
                </span>
                <span>
                  <span>Click{' '}</span>
                  <span className="opacity-50">to open menu</span>
                </span>
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </BlockHandlePopover>
    </Tooltip.Provider>
  )
}
