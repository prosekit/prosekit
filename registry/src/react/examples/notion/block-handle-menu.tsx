import { Menu } from '@base-ui/react'
import { useEditor } from 'prosekit/react'
import BlockHandleMenuItem from './block-handle-menu-item'
import { useState } from 'react'

interface Props {
  children: React.ReactElement
}

export default function BlockHandleMenu(props: Props) {
  const editor = useEditor()

  const [open, setOpen] = useState(false)

  return (
    <Menu.Root
      open={open}
      onOpenChange={(open, details) => {
        // ignore the event to open the menu because by default Menu is opened
        // by a `mousedown` event but we only want to open the menu by a `click`
        // event.
        if (open && details.reason === 'trigger-press') {
          return
        }
        setOpen(open)
      }}
    >
      <Menu.Trigger
        render={props.children}
        nativeButton={false}
        onClick={(event) => {
          event.preventDefault()
          setOpen(open => !open)
        }}
      >
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Backdrop className="w-100vh h-100vh flex fixed inset-0 z-100 opacity-0" />
        <Menu.Positioner className="outline-none z-101" sideOffset={8}>
          <Menu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <BlockHandleMenuItem
              onClick={() => {
                console.debug('TODO')
              }}
            >
              Turn into
            </BlockHandleMenuItem>
            <BlockHandleMenuItem
              onClick={() => {
                console.log('TODO')
              }}
            >
              Color
            </BlockHandleMenuItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
