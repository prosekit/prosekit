import { Menu } from 'prosekit/react/components/menu'
import { MenuItem } from 'prosekit/react/components/menu-item'
import { PopoverSuggestion } from 'prosekit/react/components/popover-suggestion'

import './slash-menu.css'

import { useSlashMenu } from './use-slash-menu'

export function SlashMenu() {
  const { editor, getItems } = useSlashMenu()

  return (
    <PopoverSuggestion
      editor={editor}
      rules={[
        {
          match: /\/.*$/iu,
          matchAfter: /^\S*/,
        },
      ]}
      render={(context) => {
        return context.active ? (
          <Menu editor={editor} className="my-slash-menu">
            {getItems(context).map((item) => (
              <MenuItem
                key={item.id}
                onSelect={item.callback}
                className="my-slash-menu-item"
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        ) : null
      }}
    />
  )
}
