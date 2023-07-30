<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { useExampleEditor } from './use-example-editor'

const editor = useExampleEditor()

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

<template>
  <AutocompletePopover :editor="editor" :regex="/\/.*$/iu">
    <AutocompleteList :editor="editor" class="example-slash-menu">
      <AutocompleteEmpty class="example-slash-menu-item">
        No Command match
      </AutocompleteEmpty>

      <AutocompleteItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingInsert(1)"
      >
        Insert Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingInsert(2)"
      >
        Insert Heading 2
      </AutocompleteItem>
      <AutocompleteItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingConvert(1)"
      >
        Turn into Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingConvert(2)"
      >
        Turn into Heading 2
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
