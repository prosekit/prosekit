<script setup lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { users } from './user-data'

const editor = useEditor<EditorExtension>()

const handleUserInsert = (id: number, username: string) => {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :regex="/@\w*$/" class="AUTOCOMPLETE_MENU">
    <AutocompleteList>
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class="AUTOCOMPLETE_MENU_ITEM"
        @select="handleUserInsert(user.id, user.name)"
      >
        <span :class="loading && 'AUTOCOMPLETE_MENU_ITEM_LOADING_TEXT'">
          {{ user.name }}
        </span>
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
