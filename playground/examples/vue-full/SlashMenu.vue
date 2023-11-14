<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>().value

const handleHeadingInsert = (level: number) => {
  editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  editor.commands.setHeading({ level })
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/\/.*$/iu"
    class="AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No Command match
      </AutocompleteEmpty>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleHeadingInsert(1)"
      >
        Insert Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleHeadingInsert(2)"
      >
        Insert Heading 2
      </AutocompleteItem>
      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleHeadingConvert(1)"
      >
        Turn into Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleHeadingConvert(2)"
      >
        Turn into Heading 2
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
