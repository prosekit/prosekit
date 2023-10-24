import type { MentionAttrs } from 'prosekit/extensions/mention'
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'
import { defineComponent } from 'vue'

import { tags } from './tags'
import { useExampleEditor } from './use-example-editor'

export const TagMenu = defineComponent({
  name: 'TagMenu',
  setup() {
    const editor = useExampleEditor()

    const handleTagInsert = (id: number, label: string) => {
      const attrs: MentionAttrs = {
        id: id.toString(),
        value: '#' + label,
        kind: 'tag',
      }
      const node = editor.schema.nodes.mention.create(attrs)
      editor.commands.insertNode({ node })
      editor.commands.insertText({ text: ' ' })
    }

    return () => (
      <AutocompletePopover editor={editor} regex={/#[\da-z]*$/i}>
        <AutocompleteList editor={editor} class="SLASH_MENU">
          <AutocompleteEmpty class="SLASH_MENU_ITEM">
            No Tag match
          </AutocompleteEmpty>
          {tags.map((tag) => (
            <AutocompleteItem
              class="SLASH_MENU_ITEM"
              onSelect={() => handleTagInsert(tag.id, tag.label)}
            >
              {tag.label}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      </AutocompletePopover>
    )
  },
})
