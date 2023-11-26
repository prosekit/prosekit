<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>().value

const handleTagInsert = (id: number, label: string) => {
  editor.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/#[\da-z]*$/i"
    class="AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No Tag match
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="tag in tags"
        :key="tag.id"
        class="AUTOCOMPLETE_MENU_ITEM"
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        {{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
