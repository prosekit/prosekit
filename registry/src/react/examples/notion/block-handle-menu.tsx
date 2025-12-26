import { Menu } from '@base-ui/react'
import type { Editor } from 'prosekit/core'
import { clsx } from 'prosekit/core'
import type { ListAttrs } from 'prosekit/extensions/list'
import { useEditorDerivedValue } from 'prosekit/react'
import { useState } from 'react'

import type { EditorExtension } from './extension'

const POPUP_CLASSNAME =
  'origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 w-50'

const ITEM_CLASSNAME =
  'flex items-center justify-between gap-2 cursor-default py-2 px-3 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900'

const TEXT_COLOR_CLASSNAME = clsx(`border rounded-sm relative after:absolute after:inset-0 after:flex after:items-center after:justify-center after:content-['A']`)

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
  isActive?: boolean
  iconClassName?: string
  shortcut?: string
  danger?: boolean
  onClick: () => void
  children?: never
}

type ItemInfo = SubmenuInfo | MenuItemInfo

function getActiveBlockType(editor: Editor<EditorExtension>) {
  if (editor.nodes.heading.isActive({ level: 1 })) {
    return 'h1'
  }

  if (editor.nodes.heading.isActive({ level: 2 })) {
    return 'h2'
  }

  if (editor.nodes.heading.isActive({ level: 3 })) {
    return 'h3'
  }

  if (editor.nodes.list.isActive({ kind: 'bullet' })) {
    return 'bullet-list'
  }

  if (editor.nodes.list.isActive({ kind: 'ordered' })) {
    return 'ordered-list'
  }

  if (editor.nodes.list.isActive({ kind: 'task' })) {
    return 'task-list'
  }

  if (editor.nodes.list.isActive({ kind: 'toggle' })) {
    return 'toggle-list'
  }

  return 'text'
}

function turnIntoList(editor: Editor<EditorExtension>, attrs: ListAttrs) {
  editor.commands.setParagraph()
  editor.commands.wrapInList(attrs)
}

function getMenuItems(editor: Editor<EditorExtension>): ItemInfo[] {
  const activeBlockType = getActiveBlockType(editor)

  return [
    {
      key: 'turn-into',
      label: 'Turn into',
      iconClassName: 'i-lucide-refresh-cw',
      children: [
        {
          key: 'text',
          label: 'Text',
          iconClassName: 'i-lucide-type',
          onClick: () => {
            editor.commands.setParagraph()
          },
          isActive: activeBlockType === 'text',
        },
        {
          key: 'h1',
          label: 'Heading 1',
          iconClassName: 'i-lucide-heading-1',
          onClick: () => {
            editor.commands.setHeading({ level: 1 })
          },
          isActive: activeBlockType === 'h1',
        },
        {
          key: 'h2',
          label: 'Heading 2',
          iconClassName: 'i-lucide-heading-2',
          onClick: () => {
            editor.commands.setHeading({ level: 2 })
          },
          isActive: activeBlockType === 'h2',
        },
        {
          key: 'h3',
          label: 'Heading 3',
          iconClassName: 'i-lucide-heading-3',
          onClick: () => {
            editor.commands.setHeading({ level: 3 })
          },
          isActive: activeBlockType === 'h3',
        },
        {
          key: 'bullet-list',
          label: 'Bullet list',
          iconClassName: 'i-lucide-list',
          onClick: () => {
            turnIntoList(editor, { kind: 'bullet' })
          },
          isActive: activeBlockType === 'bullet-list',
        },
        {
          key: 'ordered-list',
          label: 'Ordered list',
          iconClassName: 'i-lucide-list-ordered',
          onClick: () => {
            turnIntoList(editor, { kind: 'ordered' })
          },
          isActive: activeBlockType === 'ordered-list',
        },
        {
          key: 'task-list',
          label: 'Task list',
          iconClassName: 'i-lucide-list-checks',
          onClick: () => {
            turnIntoList(editor, { kind: 'task' })
          },
          isActive: activeBlockType === 'task-list',
        },
        {
          key: 'toggle-list',
          label: 'Toggle list',
          iconClassName: 'i-lucide-list-collapse',
          onClick: () => {
            turnIntoList(editor, { kind: 'toggle' })
          },
          isActive: activeBlockType === 'toggle-list',
        },
      ],
    },
    {
      key: 'color',
      label: 'Color',
      iconClassName: 'i-lucide-paint-roller',
      children: [
        {
          key: 'default',
          label: 'Default Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-current text-current'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: null })
          },
        },
        {
          key: 'gray',
          label: 'Gray Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-gray-300 text-gray-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'gray' })
          },
        },
        {
          key: 'orange',
          label: 'Orange Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-orange-300 text-orange-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'orange' })
          },
        },
        {
          key: 'yellow',
          label: 'Yellow Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-yellow-300 text-yellow-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'yellow' })
          },
        },
        {
          key: 'green',
          label: 'Green Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-green-300 text-green-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'green' })
          },
        },
        {
          key: 'blue',
          label: 'Blue Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-blue-300 text-blue-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'blue' })
          },
        },
        {
          key: 'purple',
          label: 'Purple Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-purple-300 text-purple-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'purple' })
          },
        },
        {
          key: 'pink',
          label: 'Pink Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-pink-300 text-pink-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'pink' })
          },
        },
        {
          key: 'red',
          label: 'Red Text',
          iconClassName: clsx(TEXT_COLOR_CLASSNAME, 'border-red-300 text-red-500'),
          onClick: () => {
            editor.commands.toggleColor({ textColor: 'red' })
          },
        },
      ],
    },
    {
      key: 'delete',
      label: 'Delete',
      iconClassName: 'i-lucide-trash-2',
      shortcut: 'Del',
      danger: true,
      onClick: () => {
        editor.view.dispatch(editor.view.state.tr.deleteSelection())
      },
    },
  ]
}

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
        className={clsx(ITEM_CLASSNAME, 'group')}
        onClick={props.item.onClick}
      >
        {props.item.iconClassName && <span className={clsx('inline-block size-5', props.item.iconClassName)} />}
        <span className={clsx('flex-1', props.item.danger && 'group-data-highlighted:text-red-500')}>{props.item.label}</span>
        {props.item.isActive && <span className="inline-block size-4 i-lucide-check"></span>}
        {!props.item.isActive && props.item.shortcut && <span className="opacity-50">{props.item.shortcut}</span>}
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
        <Menu.Backdrop className="size-dvw flex fixed inset-0 opacity-0" />
        <Menu.Positioner className="outline-none" side="right" align="center">
          <Menu.Popup className={POPUP_CLASSNAME}>
            {items.map(item => <BlockHandleItem key={item.key} item={item} />)}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
