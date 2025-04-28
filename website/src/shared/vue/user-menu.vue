<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import type { EditorExtension } from './extension'
import { users } from './user-data'

const editor = useEditor<EditorExtension>()

function handleUserInsert(id: number, username: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :regex="/@\w*$/" class="CSS_AUTOCOMPLETE_MENU">
    <AutocompleteList>
      <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class="CSS_AUTOCOMPLETE_MENU_ITEM"
        @select="() => handleUserInsert(user.id, user.name)"
      >
        {{ user.name }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
