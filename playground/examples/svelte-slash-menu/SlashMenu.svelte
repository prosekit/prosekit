<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete-item'
import { AutocompletePopover } from 'prosekit/svelte/autocomplete-popover'
import { AutocompleteEmpty } from 'prosekit/svelte/autocomplete-empty'
import { AutocompleteList } from 'prosekit/svelte/autocomplete-list'
import { getEditor } from 'prosekit/svelte'
import type { ExampleExtension } from './extension'

const editor = getEditor<ExampleExtension>()

const handleHeadingInsert = (level: number) => {
  editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  editor.commands.setHeading({ level })
}
</script>

<AutocompletePopover {editor} regex={/\/.*$/iu}>
  <AutocompleteList {editor} class="SLASH_MENU">
    <AutocompleteEmpty class="SLASH_MENU_ITEM">
      No Command match
    </AutocompleteEmpty>

    <AutocompleteItem
      class="SLASH_MENU_ITEM"
      onSelect={() => handleHeadingInsert(1)}
    >
      Insert Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="SLASH_MENU_ITEM"
      onSelect={() => handleHeadingInsert(2)}
    >
      Insert Heading 2
    </AutocompleteItem>
    <AutocompleteItem
      class="SLASH_MENU_ITEM"
      onSelect={() => handleHeadingConvert(1)}
    >
      Turn into Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="SLASH_MENU_ITEM"
      onSelect={() => handleHeadingConvert(2)}
    >
      Turn into Heading 2
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
