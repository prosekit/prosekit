<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/components/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/components/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/components/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/components/autocomplete-popover'
import { useExampleEditor } from './use-example-editor'
import type { MentionAttrs } from 'prosekit/extensions/mention'
import { users } from './users'

const editor = useExampleEditor()

const handleUserInsert = (id: number, username: string) => {
  console.log('handleUserInsert')

  const attrs: MentionAttrs = {
    id: id.toString(),
    value: username,
    kind: 'user',
  }
  const node = editor.schema.nodes.mention.create(attrs)
  editor.commands.insertNode({ node })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :editor="editor" :regex="/@\w*$/">
    <AutocompleteList :editor="editor" class="example-slash-menu">
      <AutocompleteEmpty class="example-slash-menu-item">
        No User match
      </AutocompleteEmpty>

      <template v-for="user in users" key="user.id">
        <AutocompleteItem
          class="example-slash-menu-item"
          :onSelect="() => handleUserInsert(user.id, user.name)"
        >
          {{ user.name }}
        </AutocompleteItem>
      </template>
    </AutocompleteList>
  </AutocompletePopover>
</template>
