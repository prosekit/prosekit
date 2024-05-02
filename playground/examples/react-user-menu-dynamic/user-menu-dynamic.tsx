import { clsx } from 'prosekit/core'
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

  const handleUserInsert = (id: number, username: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  const { loading, users } = useUserQuery(query)

  return (
    <AutocompletePopover
      regex={/@\w*$/}
      onQueryChange={setQuery}
      className="AUTOCOMPLETE_MENU"
    >
      <AutocompleteList filter={null}>
        <AutocompleteEmpty className="AUTOCOMPLETE_MENU_ITEM">
          {loading ? 'Loading...' : 'No results'}
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className={clsx('AUTOCOMPLETE_MENU_ITEM')}
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            <span
              className={
                loading ? 'AUTOCOMPLETE_MENU_ITEM_LOADING_TEXT' : undefined
              }
            >
              {user.name}
            </span>
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
