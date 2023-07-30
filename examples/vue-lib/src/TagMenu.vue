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
    <AutocompleteList :editor="editor" class="example-slash-menu">
      <AutocompleteEmpty class="example-slash-menu-item">
        No Tag match
      </AutocompleteEmpty>

      <AutocompleteItem
        v-for="tag in tags"
        class="example-slash-menu-item"
        :onSelect="() => handleTagInsert(tag.id, tag.value)"
      >
        {{ tag.value }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
