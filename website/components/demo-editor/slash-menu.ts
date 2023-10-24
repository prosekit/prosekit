import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'
import { defineComponent, h } from 'vue'

import { useExampleEditor } from './use-example-editor'

export const SlashMenu = defineComponent({
  setup() {
    const editor = useExampleEditor()

    const handleHeadingInsert = (level: number) => {
      editor.commands.insertHeading({ level })
    }

    const handleHeadingConvert = (level: number) => {
      editor.commands.setHeading({ level })
    }

    return () =>
      h(AutocompletePopover, { editor: editor, regex: /\/.*$/iu }, () => [
        h(AutocompleteList, { editor: editor, class: 'SLASH_MENU' }, () => [
          h(
            AutocompleteEmpty,
            { class: 'SLASH_MENU_ITEM' },
            'No Command match',
          ),
          h(
            AutocompleteItem,
            {
              class: 'SLASH_MENU_ITEM',
              onSelect: () => handleHeadingInsert(1),
            },
            'Insert Heading 1',
          ),
          h(
            AutocompleteItem,
            {
              class: 'SLASH_MENU_ITEM',
              onSelect: () => handleHeadingInsert(2),
            },
            'Insert Heading 2',
          ),
          h(
            AutocompleteItem,
            {
              class: 'SLASH_MENU_ITEM',
              onSelect: () => handleHeadingConvert(1),
            },
            'Turn into Heading 1',
          ),
          h(
            AutocompleteItem,
            {
              class: 'SLASH_MENU_ITEM',
              onSelect: () => handleHeadingConvert(2),
            },
            'Turn into Heading 2',
          ),
        ]),
      ])
  },
})
