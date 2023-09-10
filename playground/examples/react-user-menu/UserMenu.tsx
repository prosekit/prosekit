import type { MentionAttrs } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/components/autocomplete-popover'
import React from 'react'

import type { ExampleExtension } from './extension'
import { users } from './users'

export default function UserMenu() {
  const editor = useEditor<ExampleExtension>()

  const handleUserInsert = (id: number, username: string) => {
    const attrs: MentionAttrs = {
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    }
    const node = editor.schema.nodes.mention.create(attrs)
    editor.commands.insertNode({ node })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover editor={editor} regex={/@\w*$/}>
      <AutocompleteList editor={editor} className="SLASH_MENU">
        <AutocompleteEmpty className="SLASH_MENU_ITEM">
          No User match
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="SLASH_MENU_ITEM"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            {user.name}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
