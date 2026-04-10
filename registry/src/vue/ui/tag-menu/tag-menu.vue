<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/vue'
import { AutocompleteEmpty, AutocompleteItem, AutocompletePopup, AutocompletePositioner, AutocompleteRoot } from 'prosekit/vue/autocomplete'

const props = defineProps<{ tags: { id: number; label: string }[] }>()

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleTagInsert(id: number, label: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.value.commands.insertText({ text: ' ' })
}

const regex = /#[\da-z]*$/i
</script>

<template>
  <AutocompleteRoot :regex="regex">
    <AutocompletePositioner class="CSS_AUTOCOMPLETE_POSITIONER">
      <AutocompletePopup class="CSS_AUTOCOMPLETE_POPUP">
        <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          v-for="tag in props.tags"
          :key="tag.id"
          class="CSS_AUTOCOMPLETE_MENU_ITEM"
          @select="() => handleTagInsert(tag.id, tag.label)"
        >
          #{{ tag.label }}
        </AutocompleteItem>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompleteRoot>
</template>
