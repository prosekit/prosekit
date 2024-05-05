<script setup lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { useUserQuery } from './use-user-query'
import { ref } from 'vue'

const editor = useEditor<EditorExtension>()

const handleUserInsert = (id: number, username: string) => {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}

const query = ref('')
const open = ref(false)
const handleQueryChange = (value: string) => (query.value = value)
const handleOpenChange = (value: boolean) => (open.value = value)
const { users, loading } = useUserQuery(query, open)
</script>

<template>
  <AutocompletePopover
    :regex="/@\w*$/"
    @query-change="handleQueryChange"
    @open-change="handleOpenChange"
    class="AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :filter="null">
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        @select="handleUserInsert(user.id, user.name)"
        class="AUTOCOMPLETE_MENU_ITEM"
      >
        <span :class="loading && 'AUTOCOMPLETE_MENU_ITEM_LOADING_TEXT'">
          {{ user.name }}
        </span>
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
