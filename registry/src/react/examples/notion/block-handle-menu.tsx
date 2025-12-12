import { Menu } from '@base-ui/react'
import {
  clsx,
  Editor,
} from 'prosekit/core'
import {
  useEditor,
  useEditorDerivedValue,
} from 'prosekit/react'
import { useState } from 'react'

interface Props {
  children: React.ReactElement
}

interface SubmenuInfo {
  key: string
  label: string
  iconClassName?: string
  children: ItemInfo[]
}

interface MenuItemInfo {
  key: string
  label: string
  iconClassName?: string
  shortcut?: string
  onClick: () => void
  children?: never
}

type ItemInfo = SubmenuInfo | MenuItemInfo

function getMenuItems(editor: Editor): ItemInfo[] {
  return [
    {
      key: 'turn-into',
      label: 'Turn into',
      iconClassName: 'i-lucide-refresh-cw',
      children: [
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
      ],
    },
    {
      key: 'color',
      label: 'Color',
      iconClassName: 'i-lucide-paint-roller',
      children: [
        {
          key: 'red',
          label: 'Red',
          onClick: () => {},
        },
        {
          key: 'green',
          label: 'Green',
          onClick: () => {},
        },
        {
          key: 'blue',
          label: 'Blue',
          onClick: () => {},
        },
      ],
    },
    {
      key: 'delete',
      label: 'Delete',
      iconClassName: 'i-lucide-trash-2',
      shortcut: 'Del',
      onClick: () => {},
    },
  ]
}

const POPUP_CLASSNAME =
  'origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 w-50'

const ITEM_CLASSNAME =
  'flex items-center justify-between gap-2 cursor-default py-2 px-3 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900'

function BlockHandleItem(props: { item: ItemInfo }) {
  if (props.item.children) {
    return (
      <Menu.SubmenuRoot>
        <Menu.SubmenuTrigger className={ITEM_CLASSNAME}>
          {props.item.iconClassName && <span className={clsx('inline-block size-4', props.item.iconClassName)} />}
          <span className="flex-1">{props.item.label}</span>
          <span className="inline-block size-4 i-lucide-chevron-right opacity-50">
          </span>
        </Menu.SubmenuTrigger>
        <Menu.Portal>
          <Menu.Positioner align="center">
            <Menu.Popup className={POPUP_CLASSNAME}>
              {props.item.children.map(item => <BlockHandleItem key={item.key} item={item} />)}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.SubmenuRoot>
    )
  } else {
    return (
      <Menu.Item
        className={ITEM_CLASSNAME}
        onClick={props.item.onClick}
      >
        {props.item.iconClassName && <span className={clsx('inline-block size-4', props.item.iconClassName)} />}
        <span className="flex-1">{props.item.label}</span>
        {props.item.shortcut && <span className="opacity-50">{props.item.shortcut}</span>}
      </Menu.Item>
    )
  }
}

export default function BlockHandleMenu(props: Props) {
  const [open, setOpen] = useState(false)

  const items = useEditorDerivedValue(getMenuItems)

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
        <Menu.Positioner className="outline-none" side="right" align="center">
          <Menu.Popup className={POPUP_CLASSNAME}>
            {items.map(item => <BlockHandleItem key={item.key} item={item} />)}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
