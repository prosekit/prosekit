<script setup lang="ts">
import { Themes } from '@prosekit/themes'
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
    :class="Themes.AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :filter="null">
      <AutocompleteEmpty :class="Themes.AUTOCOMPLETE_MENU_ITEM">
        {{ loading ? 'Loading...' : 'No results' }}
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        @select="() => handleUserInsert(user.id, user.name)"
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
      >
        <span :class="loading && 'opacity-50'">
          {{ user.name }}
        </span>
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
