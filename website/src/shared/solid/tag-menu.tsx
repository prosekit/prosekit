import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/solid/autocomplete'
import { For } from 'solid-js'

import type { EditorExtension } from './extension'
import { tags } from './tag-data'

export default function TagMenu() {
  const editor = useEditor<EditorExtension>()

  const handleTagInsert = (id: number, label: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover regex={/#[\da-z]*$/i} class="CSS_AUTOCOMPLETE_MENU">
      <AutocompleteList>
        <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
          No results
        </AutocompleteEmpty>

        <For each={tags}>
          {(tag) => (
            <AutocompleteItem
              class="CSS_AUTOCOMPLETE_MENU_ITEM"
              onSelect={() => handleTagInsert(tag.id, tag.label)}
            >
              #{tag.label}
            </AutocompleteItem>
          )}
        </For>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
