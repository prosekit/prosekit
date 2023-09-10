import type { MentionAttrs } from 'prosekit/extensions/mention'
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { defineComponent, h } from 'vue'

import { tags } from './tags'
import { useExampleEditor } from './use-example-editor'

export const TagMenu = defineComponent({
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

    return () =>
      h(AutocompletePopover, { editor: editor, regex: /#[\da-z]*$/i }, [
        h(AutocompleteList, { editor: editor, class: 'SLASH_MENU' }, [
          h(AutocompleteEmpty, { class: 'SLASH_MENU_ITEM' }, 'No Tag match'),
          ...tags.map((tag) =>
            h(
              AutocompleteItem,
              {
                class: 'SLASH_MENU_ITEM',
                onSelect: () => handleTagInsert(tag.id, tag.label),
              },
              tag.label,
            ),
          ),
        ]),
      ])
  },
})
