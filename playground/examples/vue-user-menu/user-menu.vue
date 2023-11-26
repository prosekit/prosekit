<script setup lang="ts">
import type { MentionAttrs } from 'prosekit/extensions/mention'
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'

import { users } from './users'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>().value

const handleUserInsert = (id: number, username: string) => {
  const attrs: MentionAttrs = {
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  }
  const node = editor.nodes.mention(attrs)
  editor.commands.insertNode({ node })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/@\w*$/"
    class="AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No User match
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class="AUTOCOMPLETE_MENU_ITEM"
        @select="handleUserInsert(user.id, user.name)"
      >
        {{ user.name }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
