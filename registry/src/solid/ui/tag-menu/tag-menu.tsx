import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'
import { For, type JSX } from 'solid-js'

const regex = /#[\da-z]*$/i

export default function TagMenu(props: { tags: { id: number; label: string }[] }): JSX.Element {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleTagInsert = (id: number, label: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompleteRoot regex={regex} class="contents">
      <AutocompletePositioner>
        <AutocompletePopup class="CSS_AUTOCOMPLETE_MENU">
          <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
            No results
          </AutocompleteEmpty>

          <For each={props.tags}>
            {(tag) => (
              <AutocompleteItem
                class="CSS_AUTOCOMPLETE_MENU_ITEM"
                onSelect={() => handleTagInsert(tag.id, tag.label)}
              >
                #{tag.label}
              </AutocompleteItem>
            )}
          </For>
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
