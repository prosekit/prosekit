<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { useExampleEditor } from './use-example-editor'
import type { MentionAttrs } from 'prosekit/extensions/mention'
import { tags } from './tags'

const editor = useExampleEditor()

const handleTagInsert = (id: number, value: string) => {
  const attrs: MentionAttrs = { id: id.toString(), value, kind: 'tag' }
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
        class="SLASH_MENU_ITEM"
        :onSelect="() => handleTagInsert(tag.id, tag.value)"
      >
        {{ tag.value }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
