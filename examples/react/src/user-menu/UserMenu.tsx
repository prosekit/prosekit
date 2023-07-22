import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/components/autocomplete-popover'

import type { ExampleExtension } from './extension'
import { users } from './users'

export default function UserMenu() {
  const editor = useEditor<ExampleExtension>()

  const handleUserInsert = (name: string) => {
    editor.commands.insertText({ text: name })
  }

  return (
    <AutocompletePopover editor={editor} regex={/@\w*$/}>
      <AutocompleteList editor={editor} className="example-slash-menu">
        <AutocompleteEmpty className="example-slash-menu-item">
          No Command match
        </AutocompleteEmpty>

        {users.map((user) => (
          <AutocompleteItem
            key={user.id}
            className="example-slash-menu-item"
            onSelect={() => handleUserInsert(user.name)}
          >
            {user.name}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
