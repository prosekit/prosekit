import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/solid/autocomplete'
import { For } from 'solid-js'

import type { EditorExtension } from './extension'
import { users } from './user-data'

export default function UserMenu() {
  const editor = useEditor<EditorExtension>()

  const handleUserInsert = (id: number, username: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover regex={/@\w*$/} class="CSS_AUTOCOMPLETE_MENU">
      <AutocompleteList>
        <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
          No results
        </AutocompleteEmpty>

        <For each={users}>
          {(user) => (
            <AutocompleteItem
              class="CSS_AUTOCOMPLETE_MENU_ITEM"
              onSelect={() => handleUserInsert(user.id, user.name)}
            >
              {user.name}
            </AutocompleteItem>
          )}
        </For>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
