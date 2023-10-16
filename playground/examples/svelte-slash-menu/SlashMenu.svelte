<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete-item'
import { AutocompletePopover } from 'prosekit/svelte/autocomplete-popover'
import { AutocompleteEmpty } from 'prosekit/svelte/autocomplete-empty'
import { AutocompleteList } from 'prosekit/svelte/autocomplete-list'
import { getExampleEditor } from './get-example-editor'

const editor = getExampleEditor()

const handleHeadingInsert = (level: number) => {
  const node = editor.schema.nodes.heading.create({ level })
  editor.commands.insertNode({ node })
}

const handleHeadingConvert = (level: number) => {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
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
