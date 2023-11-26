import { useEditor } from 'prosekit/react'
import { AutocompleteEmpty } from 'prosekit/react/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/react/autocomplete-item'
import { AutocompleteList } from 'prosekit/react/autocomplete-list'
import { AutocompletePopover } from 'prosekit/react/autocomplete-popover'

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
      editor={editor}
      regex={/#[\da-z]*$/i}
      className="AUTOCOMPLETE_MENU"
    >
      <AutocompleteList editor={editor}>
        <AutocompleteEmpty className="AUTOCOMPLETE_MENU_ITEM">
          No Tag match
        </AutocompleteEmpty>

        {tags.map((tag) => (
          <AutocompleteItem
            key={tag.id}
            className="AUTOCOMPLETE_MENU_ITEM"
            onSelect={() => handleTagInsert(tag.id, tag.label)}
          >
            #{tag.label}
          </AutocompleteItem>
        ))}
      </AutocompleteList>
    </AutocompletePopover>
  )
}
