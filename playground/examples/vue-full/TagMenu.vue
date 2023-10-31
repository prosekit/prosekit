<script setup lang="ts">
import type { MentionAttrs } from 'prosekit/extensions/mention'
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'

import { tags } from './tags'
import { useExampleEditor } from './use-example-editor'

const editor = useExampleEditor()

const handleTagInsert = (id: number, label: string) => {
  const attrs: MentionAttrs = {
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  }
  const node = editor.schema.nodes.mention.create(attrs)
  editor.commands.insertNode({ node })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :editor="editor" :regex="/#[\da-z]*$/i">
    <AutocompleteList :editor="editor" class="SLASH_MENU">
      <AutocompleteEmpty class="SLASH_MENU_ITEM">
        No Tag match
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="tag in tags"
        :key="tag.id"
        class="SLASH_MENU_ITEM"
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        {{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
