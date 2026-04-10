<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind, type Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/vue'
import { AutocompleteEmpty, AutocompleteItem, AutocompletePopup, AutocompletePositioner, AutocompleteRoot } from 'prosekit/vue/autocomplete'

const props = defineProps<{
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}>()

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleUserInsert(id: number, username: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u
</script>

<template>
  <AutocompleteRoot
    :regex="regex"
    class="contents"
    @query-change="(event) => props.onQueryChange?.(event.detail)"
    @open-change="(event) => props.onOpenChange?.(event.detail)"
  >
    <AutocompletePositioner>
      <AutocompletePopup class="CSS_AUTOCOMPLETE_MENU">
        <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
          {{ props.loading ? 'Loading...' : 'No results' }}
        </AutocompleteEmpty>

        <AutocompleteItem
          v-for="user in props.users"
          :key="user.id"
          class="CSS_AUTOCOMPLETE_MENU_ITEM"
          @select="() => handleUserInsert(user.id, user.name)"
        >
          <span v-if="props.loading" class="opacity-50">
            {{ user.name }}
          </span>
          <span v-else>
            {{ user.name }}
          </span>
        </AutocompleteItem>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompleteRoot>
</template>
