<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/components/autocomplete-item'
import { AutocompletePopover } from 'prosekit/svelte/components/autocomplete-popover'
import { AutocompleteEmpty } from 'prosekit/svelte/components/autocomplete-empty'
import { AutocompleteList } from 'prosekit/svelte/components/autocomplete-list'
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
  <AutocompleteList {editor} class="example-slash-menu">
    <AutocompleteEmpty class="example-slash-menu-item">
      No Command match
    </AutocompleteEmpty>

    <AutocompleteItem
      class="example-slash-menu-item"
      onSelect={() => handleHeadingInsert(1)}
    >
      Insert Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="example-slash-menu-item"
      onSelect={() => handleHeadingInsert(2)}
    >
      Insert Heading 2
    </AutocompleteItem>
    <AutocompleteItem
      class="example-slash-menu-item"
      onSelect={() => handleHeadingConvert(1)}
    >
      Turn into Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class="example-slash-menu-item"
      onSelect={() => handleHeadingConvert(2)}
    >
      Turn into Heading 2
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
