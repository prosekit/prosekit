<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>()

function handleTagInsert(id: number, label: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :regex="/#[\da-z]*$/i" class="CSS_AUTOCOMPLETE_MENU">
    <AutocompleteList>
      <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="tag in tags"
        :key="tag.id"
        class="CSS_AUTOCOMPLETE_MENU_ITEM"
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        {{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
