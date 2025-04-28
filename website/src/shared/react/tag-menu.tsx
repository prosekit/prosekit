import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

import type { EditorExtension } from './extension'
import { tags } from './tag-data'

export default function TagMenu() {
  const editor = useEditor<EditorExtension>()

  const handleTagInsert = (id: number, label: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompletePopover
      regex={/#[\da-z]*$/i}
      className="CSS_AUTOCOMPLETE_MENU"
    >
      <AutocompleteList>
        <AutocompleteEmpty className="CSS_AUTOCOMPLETE_MENU_ITEM">
          No results
        </AutocompleteEmpty>

        {tags.map((tag) => (
          <AutocompleteItem
            key={tag.id}
            className="CSS_AUTOCOMPLETE_MENU_ITEM"
            onSelect={() => handleTagInsert(tag.id, tag.label)}
          >
            #{tag.label}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
