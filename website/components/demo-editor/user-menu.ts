import type { MentionAttrs } from 'prosekit/extensions/mention'
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { defineComponent, h } from 'vue'
import { useExampleEditor } from './use-example-editor'
import { users } from './users'

export const UserMenu = defineComponent({
  setup() {
    const editor = useExampleEditor()

    const handleUserInsert = (id: number, username: string) => {
      const attrs: MentionAttrs = {
        id: id.toString(),
        value: username,
        kind: 'user',
      }
      const node = editor.schema.nodes.mention.create(attrs)
      editor.commands.insertNode({ node })
      editor.commands.insertText({ text: ' ' })
    }

    return () =>
      h(AutocompletePopover, { editor: editor, regex: /@\w*$/ }, () => [
        h(AutocompleteList, { editor: editor, class: 'SLASH_MENU' }, () => [
          h(AutocompleteEmpty, { class: 'SLASH_MENU_ITEM' }, 'No User match'),
          users.map((user) =>
            h(
              AutocompleteItem,
              {
                class: 'SLASH_MENU_ITEM',
                onSelect: () => handleUserInsert(user.id, user.name),
              },
              user.name,
            ),
          ),
        ]),
      ])
  },
})
