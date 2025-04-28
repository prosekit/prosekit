<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'
import { ref } from 'vue'

import type { EditorExtension } from './extension'
import { useUserQuery } from './use-user-query'

const editor = useEditor<EditorExtension>()

function handleUserInsert(id: number, username: string) {
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
    class="CSS_AUTOCOMPLETE_MENU"
    @query-change="handleQueryChange"
    @open-change="handleOpenChange"
  >
    <AutocompleteList :filter="null">
      <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
        {{ loading ? 'Loading...' : 'No results' }}
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class="CSS_AUTOCOMPLETE_MENU_ITEM"
        @select="() => handleUserInsert(user.id, user.name)"
      >
        <span :class="loading && 'opacity-50'">
          {{ user.name }}
        </span>
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
