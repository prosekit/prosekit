import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/preact'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/preact/autocomplete'

const regex = /#[\da-z]*$/i

export default function TagMenu(props: { tags: { id: number; label: string }[] }) {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

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
      regex={regex}
      className="CSS_AUTOCOMPLETE_MENU"
    >
      <AutocompleteList>
        <AutocompleteEmpty className="CSS_AUTOCOMPLETE_MENU_ITEM">
          No results
        </AutocompleteEmpty>

        {props.tags.map((tag) => (
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
