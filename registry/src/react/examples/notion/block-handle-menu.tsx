import { Popover } from '@base-ui/react'
import { Menu } from '@base-ui/react/menu'
import { useEditor } from 'prosekit/react'
import BlockHandleMenuItem from './block-handle-menu-item'

interface Props {
  children: React.ReactElement
}

export default function BlockHandleMenu(props: Props) {
  const editor = useEditor()

  return (
    <Popover.Root>
      <Popover.Trigger render={props.children} nativeButton={false}>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Backdrop className="w-100vh h-100vh flex fixed inset-0 z-100 opacity-0" />
        <Popover.Positioner className="outline-none z-101" sideOffset={8}>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Menu.Root>
              <BlockHandleMenuItem
                onClick={() => {
                  console.log('add to library')
                }}
              >
                Add to Library
              </BlockHandleMenuItem>
            </Menu.Root>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
