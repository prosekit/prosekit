import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

export default function UserMenu(props: {
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}) {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleUserInsert = (id: number, username: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover
      regex={/@\w*$/}
      className="CSS_AUTOCOMPLETE_MENU"
      onQueryChange={props.onQueryChange}
      onOpenChange={props.onOpenChange}
    >
      <AutocompleteList>
        <AutocompleteEmpty className="CSS_AUTOCOMPLETE_MENU_ITEM">
          {props.loading ? 'Loading...' : 'No results'}
        </AutocompleteEmpty>

        {props.users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="CSS_AUTOCOMPLETE_MENU_ITEM"
            onSelect={() => handleUserInsert(user.id, user.name)}
          >
            <span className={props.loading ? 'opacity-50' : undefined}>
              {user.name}
            </span>
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
