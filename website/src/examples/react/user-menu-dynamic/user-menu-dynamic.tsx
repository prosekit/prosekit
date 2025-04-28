import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import { useUserQuery } from './use-user-query'

export default function UserMenuDynamic() {
  const editor = useEditor<EditorExtension>()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const handleUserInsert = (id: number, username: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  const { loading, users } = useUserQuery(query, open)

  return (
    <AutocompletePopover
      regex={/@\w*$/}
      onQueryChange={setQuery}
      onOpenChange={setOpen}
      className="CSS_AUTOCOMPLETE_MENU"
    >
      <AutocompleteList filter={null}>
        <AutocompleteEmpty className="CSS_AUTOCOMPLETE_MENU_ITEM">
          {loading ? 'Loading...' : 'No results'}
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="CSS_AUTOCOMPLETE_MENU_ITEM"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            <span className={loading ? 'opacity-50' : undefined}>
              {user.name}
            </span>
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
