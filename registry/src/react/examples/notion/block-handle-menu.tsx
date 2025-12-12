import { Menu } from '@base-ui/react'
import {
  useEditor,
  useEditorDerivedValue,
} from 'prosekit/react'
import BlockHandleMenuItem from './block-handle-menu-item'
import { useState } from 'react'
import type { Editor } from 'prosekit/core'

interface Props {
  children: React.ReactElement
}

function getTurnIntoMenuItems(editor: Editor) {
  return [
    {
      key: 'text',
      label: 'Text',
      onClick: () => {},
    },
    {
      key: 'h1',
      label: 'Heading 1',
      onClick: () => {},
    },
    {
      key: 'h2',
      label: 'Heading 2',
      onClick: () => {},
    },
    {
      key: 'h3',
      label: 'Heading 3',
      onClick: () => {},
    },
    {
      key: 'bullet-list',
      label: 'Bullet list',
      onClick: () => {},
    },
    {
      key: 'ordered-list',
      label: 'Ordered list',
      onClick: () => {},
    },
    {
      key: 'task-list',
      label: 'Task list',
      onClick: () => {},
    },
    {
      key: 'toggle-list',
      label: 'Toggle list',
      onClick: () => {},
    },
    {
      key: 'divider',
      label: 'Divider',
      onClick: () => {},
    },
    {
      key: 'equation',
      label: 'Equation',
      onClick: () => {},
    },
    {
      key: 'table',
      label: 'Table',
      onClick: () => {},
    },
    {
      key: 'embed',
      label: 'Embed',
      onClick: () => {},
    },
  ]
}

const POPUP_CLASSNAME =
  'origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300'

export default function BlockHandleMenu(props: Props) {
  const editor = useEditor()

  const [open, setOpen] = useState(false)

  const turnIntoMenuItems = useEditorDerivedValue(getTurnIntoMenuItems)

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
        <Menu.Backdrop className="w-100vh h-100vh flex fixed inset-0 opacity-0" />
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup className={POPUP_CLASSNAME}>
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className="flex cursor-default py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900">
                Turn into
              </Menu.SubmenuTrigger>
              <Menu.Portal>
                <Menu.Positioner align="center">
                  <Menu.Popup className={POPUP_CLASSNAME}>
                    {turnIntoMenuItems.map(item => {
                      return (
                        <BlockHandleMenuItem
                          onClick={item.onClick}
                          key={item.key}
                        >
                          {item.label}
                        </BlockHandleMenuItem>
                      )
                    })}
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.SubmenuRoot>
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
