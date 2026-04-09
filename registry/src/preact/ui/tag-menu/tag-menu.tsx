import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/preact'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
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
    <AutocompleteRoot regex={regex} className="contents">
      <AutocompletePositioner>
        <AutocompletePopup className="CSS_AUTOCOMPLETE_MENU">
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
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
