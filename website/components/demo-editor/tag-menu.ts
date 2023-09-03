import { defineComponent, h } from 'vue'
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { useExampleEditor } from './use-example-editor'
import type { MentionAttrs } from 'prosekit/extensions/mention'
import { tags } from './tags'

export const TagMenu = defineComponent({
  setup() {
    const editor = useExampleEditor()

    const handleTagInsert = (id: number, value: string) => {
      const attrs: MentionAttrs = { id: id.toString(), value, kind: 'tag' }
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
                onSelect: () => handleTagInsert(tag.id, tag.value),
              },
              tag.value,
            ),
          ),
        ]),
      ])
  },
})
